import { BucketPlayedInfoPair, PlayedTrackService } from "@src/modules/played-tracks/service";
import { removeNull, requireNonNull } from "@src/util/common";
import { validateNotNull, validateTrue } from "@src/util/validation";
import { CatalogueService } from "@src/modules/catalogue/service";
import { TrackDao } from "@src/models/classes/dao/track";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import logger from "@src/log/logger";
import { ApiHelper } from "@src/api/helper";
import { AlbumApiDto } from "@src/models/api/album";
import { AlbumDao } from "@src/models/classes/dao/album";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { ArtistApiDto } from "@src/models/api/artist";

export class ChartService {

    private static readonly ACCOUNT_TRACK_CHART_LIMIT = 50;

    private readonly apiHelper: ApiHelper;
    private readonly catalogueService: CatalogueService;
    private readonly playedTrackService: PlayedTrackService;

    constructor(apiHelper: ApiHelper, catalogueService: CatalogueService, playedTrackService: PlayedTrackService) {
        this.apiHelper = requireNonNull(apiHelper);
        this.catalogueService = requireNonNull(catalogueService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }

    public async createAccountTrackChartsForPeriod(accountId: number, from: Date, to: Date): Promise<ChartTrackApiDto[]> {
        validateNotNull(accountId, "accountId");
        validateNotNull(from, "from");
        validateNotNull(to, "to");
        validateTrue(from < to, "from must be before to");

        const bucketPlayedInfoPairs = await this.playedTrackService.getAccountTrackChartsForPeriod(accountId, from, to, ChartService.ACCOUNT_TRACK_CHART_LIMIT);
        
        const trackIds = bucketPlayedInfoPairs.map((pair: BucketPlayedInfoPair) => pair[0]);

        const trackDaos = await this.catalogueService.getMultipleTracksById(new Set(trackIds));

        const trackDaoArray = Array.from(trackDaos);
        const albumIds = trackDaoArray.map((track: TrackDao) => track.albumId).filter(removeNull) as number[];
        const artistIds = trackDaoArray.flatMap((track: TrackDao) => [...track.artistIds]);

        const [artistDaos, albumDaos] = await Promise.all([
            this.catalogueService.getMultipleArtistsById(new Set(artistIds)),
            this.catalogueService.getMultipleAlbumsById(new Set(albumIds)),
        ]);

        const chartTracks: ChartTrackApiDto[] = [];

        let currentPosition = 1;
        let lastSeenPlayedValue = null;
        let loopIndex = 1;

        for (const chartEntry of bucketPlayedInfoPairs) {
            const bucketId = chartEntry[0];
            const timesPlayed = chartEntry[1];

            const track = trackDaos.find(track => track.id === bucketId);

            if (!track) {
                logger.error(`Illegal state; track with bucket ID ${bucketId} was found in charts but not in DAOs`);
                continue;
            }

            const album = albumDaos.find(album => album.id === track.albumId);
            const artists = artistDaos.filter(artist => track.artistIds.has(artist.id));

            if (this.doesPositionNeedIncreasing(lastSeenPlayedValue, timesPlayed)) {
                currentPosition = loopIndex;
            }

            chartTracks.push({
                position: currentPosition,
                delta: null,
                track: this.apiHelper.convertTrackApiDto(track, artists, album),
                timesPlayed,
            });

            lastSeenPlayedValue = timesPlayed;
            loopIndex += 1;
        }
        
        return chartTracks;
    }

    private doesPositionNeedIncreasing(lastSeenValue: number | null, currentValue: number): boolean {
        if (currentValue === null) {
            return false;
        }

        return lastSeenValue !== currentValue;
    }

}