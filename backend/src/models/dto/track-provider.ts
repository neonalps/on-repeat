interface TrackProvider {
    id: number;
    name: string;
    displayName: string;
    enabled: boolean;
    createdAt: Date;
    authProvider: OauthClient | null;
}