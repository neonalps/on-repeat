
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { ArtistService } from "@src/modules/artist/service";
import { GetArtistByIdRequestDto } from "@src/models/api/get-artist-by-id-request";
import { DetailedArtistApiDto } from "@src/models/api/detailed-artist";
import { MusicProviderService } from "@src/modules/music-provider/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { AccountDao } from "@src/models/classes/dao/account";
import { IllegalStateError } from "@src/api/error/illegal-state-error";

export class GetArtistByIdHandler implements RouteHandler<GetArtistByIdRequestDto, DetailedArtistApiDto> {

    static readonly ERROR_ARTIST_NOT_FOUND = "No artist with this ID exists";

    private readonly artistService: ArtistService;
    private readonly musicProviderService: MusicProviderService;
    private readonly playedTrackService: PlayedTrackService;
    
    constructor(artistService: ArtistService, musicProviderService: MusicProviderService, playedTrackService: PlayedTrackService) {
        this.artistService = requireNonNull(artistService);
        this.musicProviderService = requireNonNull(musicProviderService);
        this.playedTrackService = requireNonNull(playedTrackService);
    }
    
    public async handle(context: AuthenticationContext, dto: GetArtistByIdRequestDto): Promise<DetailedArtistApiDto> {
        const accountId = (context.account as AccountDao).id;
        const artistId = dto.artistId;
        const artist = await this.artistService.getById(artistId);

        if (!artist) {
            throw new IllegalStateError(GetArtistByIdHandler.ERROR_ARTIST_NOT_FOUND);
        }

        const [externalUrls, playedInfo] = await Promise.all([
            this.musicProviderService.getExternalUrlsForArtist(artistId),
            this.playedTrackService.getPlayedInfoForArtist(accountId, artistId),
        ]);

        return {
            id: artist.id,
            name: artist.name,
            externalUrls,
            playedInfo: { 
                firstPlayedAt: playedInfo.firstPlayedAt,
                lastPlayedAt: playedInfo.lastPlayedAt,
                timesPlayed: playedInfo.timesPlayed,
            },
        }
    }

}