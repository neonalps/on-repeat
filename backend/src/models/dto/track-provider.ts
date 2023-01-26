interface TrackProvider {
    id: number;
    name: string;
    enabled: boolean;
    createdAt: Date;
    authProvider: OauthClient | null;
}