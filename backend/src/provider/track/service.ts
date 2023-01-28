const spotifyOauthClient: OauthClient = {
    id: 1,
    name: 'Spotify',
    clientId: 'spotify-oauth-client',
    clientSecret: 'secret',
    grantType: 'authorization_code',
    scope: 'recently-played',
    authorizeUrl: 'aurl',
    authorizeRedirectUrl: 'authred',
    refreshTokenUrl: 'refr',
    stateProvider: 'random'
};

const spotify: TrackProvider = {
    id: 1,
    name: 'spotify',
    displayName: 'Spotify',
    enabled: true,
    createdAt: new Date(),
    authProvider: spotifyOauthClient
};

const trackProviders = [
    spotify
];

const getAll = async (): Promise<TrackProvider[]> => {
    return [...trackProviders];
};

const getById = async (id: number): Promise<TrackProvider | null> => {
    const item = trackProviders.find(provider => provider.id === id);

    if (!item) {
        return null;
    } 

    return { ...item };
};

const service = {
    getAll,
    getById,
};

export default service;