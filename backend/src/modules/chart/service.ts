import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { removeNull, requireNonNull } from "@src/util/common";
import { validateNotNull, validateTrue } from "@src/util/validation";
import { CatalogueService } from "@src/modules/catalogue/service";
import { TrackDao } from "@src/models/classes/dao/track";
import { ChartTrackApiDto } from "@src/models/api/chart-track";
import logger from "@src/log/logger";
import { ApiHelper } from "@src/api/helper";
import { ChartArtistApiDto } from "@src/models/api/chart-artist";
import { ArtistApiDto } from "@src/models/api/artist";
import { ChartItem } from "@src/models/interface/chart-item";

export class ChartService {

    private static readonly CHART_DEFAULT_LIMIT = 10;
    private static readonly ACCOUNT_TRACK_CHART_MAX_LIMIT = 100;
    private static readonly ACCOUNT_ARTIST_CHART_MAX_LIMIT = 100;

    private readonly apiHelper: ApiHelper;
    private readonly catalogueService: CatalogueService;
    private readonly playedTrackService: PlayedTrackService;

    constructor(apiHelper: ApiHelper, catalogueService: CatalogueService, playedTrackService: PlayedTrackService) {
        this.apiHelper = requireNonNull(apiHelper);
        this.catalogueService = requireNonNull(catalogueService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }

    public async getAccountTrackChartsForPeriod(accountId: number, from: Date | null, to: Date | null, limit: number = ChartService.CHART_DEFAULT_LIMIT): Promise<ChartTrackApiDto[]> {
        validateNotNull(accountId, "accountId");
        validateTrue(limit <= ChartService.ACCOUNT_TRACK_CHART_MAX_LIMIT, `limit must not be larger than ${ChartService.ACCOUNT_TRACK_CHART_MAX_LIMIT}`);

        if (from !== null && to !== null) {
            validateTrue(from < to, "from must be before to");
        }

        const chartItems = await this.playedTrackService.getAccountTrackChartsForPeriod(accountId, from, to, limit);
        
        const trackIds = chartItems.map((item: ChartItem) => item.itemId);

        const trackDaos = await this.catalogueService.getMultipleTracksById(new Set(trackIds));

        const albumIds = trackDaos.map((track: TrackDao) => track.albumId).filter(removeNull) as number[];
        const artistIds = trackDaos.flatMap((track: TrackDao) => [...track.artistIds]);

        const [artistDaos, albumDaos] = await Promise.all([
            this.catalogueService.getMultipleArtistsById(artistIds),
            this.catalogueService.getMultipleAlbumsById(albumIds),
        ]);

        const chartTracks: ChartTrackApiDto[] = [];

        for (const chartItem of chartItems) {
            const bucketId = chartItem.itemId;
            const timesPlayed = chartItem.timesPlayed;

            const track = trackDaos.find(track => track.id === bucketId);

            if (!track) {
                logger.error(`Illegal state; track with bucket ID ${bucketId} was found in charts but not in DAOs`);
                continue;
            }

            const album = albumDaos.find(album => album.id === track.albumId);
            const artists = artistDaos.filter(artist => track.artistIds.indexOf(artist.id) >= 0);

            chartTracks.push({
                position: chartItem.rank,
                delta: null,
                track: this.apiHelper.convertTrackApiDto(track, artists, album),
                timesPlayed,
            });
        }
        
        return chartTracks;
    }

    public async getAccountArtistChartsForPeriod(accountId: number, from: Date | null, to: Date | null, limit: number = ChartService.CHART_DEFAULT_LIMIT): Promise<ChartArtistApiDto[]> {
        validateNotNull(accountId, "accountId");
        validateTrue(limit <= ChartService.ACCOUNT_ARTIST_CHART_MAX_LIMIT, `limit must not be larger than ${ChartService.ACCOUNT_ARTIST_CHART_MAX_LIMIT}`);

        if (from !== null && to !== null) {
            validateTrue(from < to, "from must be before to");
        }

        const chartItems = await this.playedTrackService.getAccountArtistChartsForPeriod(accountId, from, to, limit);
        
        const artistIds = chartItems.map((item: ChartItem) => item.itemId);

        const artistDaos = await this.catalogueService.getMultipleArtistsById(artistIds);

        const chartArtists: ChartArtistApiDto[] = [];

        for (const chartItem of chartItems) {
            const artistId = chartItem.itemId;
            const timesPlayed = chartItem.timesPlayed;

            const artist = artistDaos.find(artist => artist.id === artistId);

            if (!artist) {
                logger.error(`Illegal state; artist with ID ${artistId} was found in charts but not in DAOs`);
                continue;
            }

            chartArtists.push({
                position: chartItem.rank,
                delta: null,
                artist: this.apiHelper.convertArtistApiDto(artist) as ArtistApiDto,
                timesPlayed,
            });
        }
        
        return chartArtists;
    }

}