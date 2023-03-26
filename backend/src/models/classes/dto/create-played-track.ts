class CreatePlayedTrackDto {
    private accountId!: number;
    private trackId!: number;
    private musicProviderId!: number;
    private playedAt!: Date;

    constructor(
        accountId: number,
        trackId: number,
        musicProviderId: number,
        playedAt: Date,
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
}

class CreatePlayedTrackDtoBuilder {
    public accountId!: number;
    public trackId!: number;
    public musicProviderId!: number;
    public playedAt!: Date;

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

    build() {
        return new CreatePlayedTrackDto(
            this.accountId,
            this.trackId,
            this.musicProviderId,
            this.playedAt,
        )
    }
}