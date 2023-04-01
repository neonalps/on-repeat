class CreatePlayedTrackDto {
    private accountId!: number;
    private trackId!: number;
    private musicProviderId!: number;
    private playedAt!: Date;
    private excludeFromStatistics!: boolean;

    constructor(
        accountId: number,
        trackId: number,
        musicProviderId: number,
        playedAt: Date,
        excludeFromStatistics: boolean,
    ) {}
    
    public getAccountId() {
        return this.accountId;
    }

    public getTrackId() {
        return this.trackId;
    }

    public getMusicProviderId() {
        return this.musicProviderId;
    }

    public getPlayedAt() {
        return this.playedAt;
    }

    public shouldExcludeFromStatistics() {
        return this.excludeFromStatistics;
    }
}

class CreatePlayedTrackDtoBuilder {
    public accountId!: number;
    public trackId!: number;
    public musicProviderId!: number;
    public playedAt!: Date;
    public excludeFromStatistics!: boolean;

    setAccountId(accountId: number) {
        this.accountId = accountId;
        return this;
    }

    setTrackId(trackId: number) {
        this.trackId = trackId;
        return this;
    }

    setMusicProviderId(musicProviderId: number) {
        this.musicProviderId = musicProviderId;
        return this;
    }

    setPlayedAt(playedAt: Date) {
        this.playedAt = playedAt;
        return this;
    }

    setExcludeFromStatistics(excludeFromStatistics: boolean) {
        this.excludeFromStatistics = excludeFromStatistics;
        return this;
    }

    build() {
        return new CreatePlayedTrackDto(
            this.accountId,
            this.trackId,
            this.musicProviderId,
            this.playedAt,
            this.excludeFromStatistics,
        )
    }
}