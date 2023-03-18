import { getNewAccessToken, getRecentlyPlayedTracks } from "@src/oauth/spotify";

export const getSpotifyPlayedTracks = async (refreshToken: string): Promise<PlayedTrackDto[]> => {
    // TODO it's probably better to load the refresh token in here
    const token = await getNewAccessToken(refreshToken);
    const playedTracksResponse = await getRecentlyPlayedTracks(token.accessToken, 10);

    // TODO here could be a looping logic to get all possible tracks

    return playedTracksResponse.playedTracks;
};