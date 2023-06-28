import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { RouteProvider } from "@src/router/types";
import { ManualSpotifyResponseUploadRouteProvider } from "./manual-spotify-response-upload/route-provider";
import { ManualSpotifyResponseUploadHandler } from "@src/api/v1/ops/manual-spotify-response-upload/handler";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";

export function getOpsRouteProviders(): RouteProvider<any, any>[] {
    const spotifyMusicProvider = dependencyManager.get<SpotifyMusicProvider>(Dependencies.SpotifyMusicProvider);

    const manualSpotifyResponseUploadHandler = new ManualSpotifyResponseUploadHandler(spotifyMusicProvider);

    return [
        new ManualSpotifyResponseUploadRouteProvider(manualSpotifyResponseUploadHandler),
    ];
}