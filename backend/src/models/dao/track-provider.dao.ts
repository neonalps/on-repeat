interface TrackProviderDao {
    id: number;
    name: string;
    displayName: string;
    enabled: boolean;
    createdAt: Date;
    authProviderId: number;
};