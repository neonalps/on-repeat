import dependencyManager from "@src/di/manager";
import { GetArtistByIdHandler } from "@src/api/v1/artist/get-by-id/handler";
import { ArtistService } from "@src/modules/artist/service";
import { Dependencies } from "@src/di/dependencies";
import { GetArtistByIdRouteProvider } from "@src/api/v1/artist/get-by-id/route-provider";

export const getArtistApiRouteProviders = () => {
    const artistService = dependencyManager.get<ArtistService>(Dependencies.ArtistService);

    const getArtistByIdHandler = new GetArtistByIdHandler(artistService);

    return [
        new GetArtistByIdRouteProvider(getArtistByIdHandler),
    ];
};