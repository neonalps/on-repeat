interface TrackProviderDao {
    id: number;
    name: string;
    displayName: string;
    enabled: boolean;
    createdAt: Date;
    oauthClientId: number;
};