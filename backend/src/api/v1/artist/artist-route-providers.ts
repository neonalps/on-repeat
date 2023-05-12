import dependencyManager from "@src/di/manager";
import { GetArtistByIdHandler } from "@src/api/v1/artist/get-by-id/handler";
import { ArtistService } from "@src/modules/artist/service";
import { Dependencies } from "@src/di/dependencies";
import { GetArtistByIdRouteProvider } from "@src/api/v1/artist/get-by-id/route-provider";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { MusicProviderService } from "@src/modules/music-provider/service";

export const getArtistApiRouteProviders = () => {
    const artistService = dependencyManager.get<ArtistService>(Dependencies.ArtistService);
    const musicProviderService = dependencyManager.get<MusicProviderService>(Dependencies.MusicProviderService);
    const playedTrackService = dependencyManager.get<PlayedTrackService>(Dependencies.PlayedTrackService);

    const getArtistByIdHandler = new GetArtistByIdHandler(artistService, musicProviderService, playedTrackService);

    return [
        new GetArtistByIdRouteProvider(getArtistByIdHandler),
    ];
};