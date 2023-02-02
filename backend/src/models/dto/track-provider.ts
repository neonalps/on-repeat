interface TrackProvider {
    id: number;
    name: string;
    displayName: string;
    enabled: boolean;
    createdAt: Date;
    oauthClient: OauthClient | null;
}