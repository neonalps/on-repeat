
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { AccountDao } from "@src/models/classes/dao/account";
import { IllegalStateError } from "@src/api/error/illegal-state-error";
import { AlbumService } from "@src/modules/album/service";
import { GetAlbumByIdRequestDto } from "@src/models/api/get-album-by-id-request";
import { DetailedAlbumApiDto } from "@src/models/api/detailed-album";
import { ArtistService } from "@src/modules/artist/service";
import { ApiHelper } from "@src/api/helper";

export class GetAlbumByIdHandler implements RouteHandler<GetAlbumByIdRequestDto, DetailedAlbumApiDto> {

    static readonly ERROR_ALBUM_NOT_FOUND = "No album with this ID exists";

    private readonly albumService: AlbumService;
    private readonly apiHelper: ApiHelper;
    private readonly artistService: ArtistService;
    private readonly musicProviderService: MusicProviderService;
    private readonly playedTrackService: PlayedTrackService;
    
    constructor(
        albumService: AlbumService,
        apiHelper: ApiHelper,
        artistService: ArtistService,
        musicProviderService: MusicProviderService, 
        playedTrackService: PlayedTrackService
    ) {
        this.albumService = requireNonNull(albumService);
        this.apiHelper = requireNonNull(apiHelper);
        this.artistService = requireNonNull(artistService);
        this.musicProviderService = requireNonNull(musicProviderService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }
    
    public async handle(context: AuthenticationContext, dto: GetAlbumByIdRequestDto): Promise<DetailedAlbumApiDto> {
        const accountId = (context.account as AccountDao).id;
        const albumId = dto.albumId;
        const album = await this.albumService.getById(albumId);

        if (!album) {
            throw new IllegalStateError(GetAlbumByIdHandler.ERROR_ALBUM_NOT_FOUND);
        }

        const [externalUrls, playedInfo, artists] = await Promise.all([
            this.musicProviderService.getExternalUrlsForAlbum(albumId),
            this.playedTrackService.getPlayedInfoForAlbum(accountId, albumId),
            this.artistService.getMultipleById(album.artistIds),
        ]);

        const artistsApiDtos = [];
        for (const artist of artists) {
            artistsApiDtos.push({
                id: artist.id,
                name: artist.name,
                href: this.apiHelper.getArtistResourceUrl(artist.id),
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
        }
    }

}