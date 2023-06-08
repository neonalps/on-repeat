import { TrackBucketPlayedInfoPair, PlayedTrackService, ArtistPlayedInfoPair } from "@src/modules/played-tracks/service";
import { removeNull, requireNonNull } from "@src/util/common";
import { validateNotNull, validateTrue } from "@src/util/validation";
import { CatalogueService } from "@src/modules/catalogue/service";
import { TrackDao } from "@src/models/classes/dao/track";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import logger from "@src/log/logger";
import { ApiHelper } from "@src/api/helper";
import { ChartArtistApiDto } from "@src/models/api/chart-artist";
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

    public async getAccountTrackChartsForPeriod(accountId: number, from: Date | null, to: Date | null): Promise<ChartTrackApiDto[]> {
        validateNotNull(accountId, "accountId");

        if (from !== null && to !== null) {
            validateTrue(from < to, "from must be before to");
        }

        const bucketPlayedInfoPairs = await this.playedTrackService.getAccountTrackChartsForPeriod(accountId, from, to, ChartService.ACCOUNT_TRACK_CHART_LIMIT);
        
        const trackIds = bucketPlayedInfoPairs.map((pair: TrackBucketPlayedInfoPair) => pair[0]);

        const trackDaos = await this.catalogueService.getMultipleTracksById(new Set(trackIds));

        const albumIds = trackDaos.map((track: TrackDao) => track.albumId).filter(removeNull) as number[];
        const artistIds = trackDaos.flatMap((track: TrackDao) => [...track.artistIds]);

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

    public async getAccountArtistChartsForPeriod(accountId: number, from: Date | null, to: Date | null): Promise<ChartArtistApiDto[]> {
        validateNotNull(accountId, "accountId");

        if (from !== null && to !== null) {
            validateTrue(from < to, "from must be before to");
        }

        const artistPlayedInfoPairs = await this.playedTrackService.getAccountArtistChartsForPeriod(accountId, from, to, ChartService.ACCOUNT_TRACK_CHART_LIMIT);
        
        const artistIds = artistPlayedInfoPairs.map((pair: ArtistPlayedInfoPair) => pair[0]);

        const artistDaos = await this.catalogueService.getMultipleArtistsById(new Set(artistIds));

        const chartArtists: ChartArtistApiDto[] = [];

        let currentPosition = 1;
        let lastSeenPlayedValue = null;
        let loopIndex = 1;

        for (const chartEntry of artistPlayedInfoPairs) {
            const artistId = chartEntry[0];
            const timesPlayed = chartEntry[1];

            const artist = artistDaos.find(artist => artist.id === artistId);

            if (!artist) {
                logger.error(`Illegal state; artist with ID ${artistId} was found in charts but not in DAOs`);
                continue;
            }

            if (this.doesPositionNeedIncreasing(lastSeenPlayedValue, timesPlayed)) {
                currentPosition = loopIndex;
            }

            chartArtists.push({
                position: currentPosition,
                delta: null,
                artist: this.apiHelper.convertArtistApiDto(artist) as ArtistApiDto,
                timesPlayed,
            });

            lastSeenPlayedValue = timesPlayed;
            loopIndex += 1;
        }
        
        return chartArtists;
    }

    private doesPositionNeedIncreasing(lastSeenValue: number | null, currentValue: number): boolean {
        if (currentValue === null) {
            return false;
        }

        return lastSeenValue !== currentValue;
    }

}