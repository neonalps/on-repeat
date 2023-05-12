
import { AuthenticationContext, RouteHandler } from "@src/router/types";
import { requireNonNull } from "@src/util/common";
import { ArtistService } from "@src/modules/artist/service";
import { GetArtistByIdRequestDto } from "@src/models/api/get-artist-by-id-request";
import { ArtistConverter } from "@src/modules/artist/converter";
import { ArtistApiDto } from "@src/models/api/artist";

export class GetArtistByIdHandler implements RouteHandler<GetArtistByIdRequestDto, ArtistApiDto> {

    static readonly ERROR_ARTIST_NOT_FOUND = "No artist with this ID exists";

    private readonly artistService: ArtistService;
    
    constructor(artistService: ArtistService) {
        this.artistService = requireNonNull(artistService);
    }
    
    public async handle(_: AuthenticationContext, dto: GetArtistByIdRequestDto): Promise<ArtistApiDto> {
        const artist = await this.artistService.getById(dto.artistId);

        if (!artist) {
            throw new Error(GetArtistByIdHandler.ERROR_ARTIST_NOT_FOUND);
        }

        return ArtistConverter.convertToApiDto(artist) as ArtistApiDto;
    }

}