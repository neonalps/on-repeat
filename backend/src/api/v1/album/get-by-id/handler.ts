
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { AccountDao } from "@src/models/classes/dao/account";
import { IllegalStateError } from "@src/api/error/illegal-state-error";
import { GetAlbumByIdRequestDto } from "@src/models/api/get-album-by-id-request";
import { DetailedAlbumApiDto } from "@src/models/api/detailed-album";
import { ApiHelper } from "@src/api/helper";
import { CatalogueService } from "@src/modules/catalogue/service";
import { ArtistApiDto } from "@src/models/api/artist";

export class GetAlbumByIdHandler implements RouteHandler<GetAlbumByIdRequestDto, DetailedAlbumApiDto> {

    static readonly ERROR_ALBUM_NOT_FOUND = "No album with this ID exists";

    private readonly apiHelper: ApiHelper;
    private readonly catalogueService: CatalogueService;
    private readonly musicProviderService: MusicProviderService;
    private readonly playedTrackService: PlayedTrackService;
    
    constructor(
        apiHelper: ApiHelper,
        catalogueService: CatalogueService,
        musicProviderService: MusicProviderService, 
        playedTrackService: PlayedTrackService,
    ) {
        this.apiHelper = requireNonNull(apiHelper);
        this.catalogueService = requireNonNull(catalogueService);
        this.musicProviderService = requireNonNull(musicProviderService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }
    
    public async handle(context: AuthenticationContext, dto: GetAlbumByIdRequestDto): Promise<DetailedAlbumApiDto> {
        const accountId = (context.account as AccountDao).id;
        const albumId = dto.albumId;
        const album = await this.catalogueService.getAlbumById(albumId);

        if (!album) {
            throw new IllegalStateError(GetAlbumByIdHandler.ERROR_ALBUM_NOT_FOUND);
        }

        const [externalUrls, playedInfo, artists] = await Promise.all([
            this.musicProviderService.getExternalUrlsForAlbum(albumId),
            this.playedTrackService.getPlayedInfoForAlbum(accountId, albumId),
            this.catalogueService.getMultipleArtistsById(album.artistIds),
        ]);

        const artistsApiDtos: ArtistApiDto[] = [];
        for (const artist of artists) {
            artistsApiDtos.push({
                id: artist.id,
                name: artist.name,
                href: this.apiHelper.getArtistResourceUrl(artist.id),
                images: this.apiHelper.convertImageApiDtos(artist.images),
            });
        }

        return {
            id: album.id,
            name: album.name,
            artists: artistsApiDtos,
            externalUrls,
            playedInfo: { 
                firstPlayedAt: playedInfo.firstPlayedAt,
                lastPlayedAt: playedInfo.lastPlayedAt,
                timesPlayed: playedInfo.timesPlayed,
            },
            totalTracks: album.totalTracks,
            releaseDate: album.releaseDate,
            releaseDatePrecision: album.releaseDatePrecision,
            images: this.apiHelper.convertImageApiDtos(Array.from(album.images)),
        }
    }

}