import { getNewAccessToken, getRecentlyPlayedTracks } from "@src/oauth/spotify";
import { validateNotNull } from "@src/util/validation";
import playedTrackMapper from "./mapper";

export const getSpotifyPlayedTracks = async (refreshToken: string): Promise<PlayedTrackDto[]> => {
    // TODO it's probably better to load the refresh token in here
    const token = await getNewAccessToken(refreshToken);
    const playedTracksResponse = await getRecentlyPlayedTracks(token.accessToken, 10);

    // TODO here could be a looping logic to get all possible tracks

    return playedTracksResponse.playedTracks;
};

export const hasPlayedTrackAlreadyBeenProcessed = async (accountId: number, musicProviderId: number, playedAt: Date): Promise<boolean> => {
    validateNotNull(accountId, "accountId");
    validateNotNull(musicProviderId, "musicProviderId");
    validateNotNull(playedAt, "playedAt");

    const playedTrack = await playedTrackMapper.getByAccountIdAndMusicProviderIdAndPlayedAt(accountId, musicProviderId, playedAt);
    return playedTrack !== null;
};