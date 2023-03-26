class PlayedTrackDao {
    private id!: number;
    private accountId!: number;
    private trackId!: number;
    private musicProviderId!: number;
    private playedAt!: Date;
    private createdAt!: Date;

    constructor(
        id: number,
        accountId: number,
        trackId: number,
        musicProviderId: number,
        playedAt: Date,
        createdAt: Date,
    ) {
        this.id = id;
        this.accountId = accountId;
        this.trackId = trackId;
        this.musicProviderId = musicProviderId;
        this.playedAt = playedAt;
        this.createdAt = createdAt;
    }

    public getId() {
        return this.id;
    }

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

    public getCreatedAt() {
        return this.createdAt;
    }
}

class PlayedTrackDaoBuilder {
    public id!: number;
    public accountId!: number;
    public trackId!: number;
    public musicProviderId!: number;
    public playedAt!: Date;
    public createdAt!: Date;

    setId(id: number) {
        this.id = id;
        return this;
    }

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

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
        return this;
    }

    build() {
        return new PlayedTrackDao(
            this.id,
            this.accountId,
            this.trackId,
            this.musicProviderId,
            this.playedAt,
            this.createdAt,
        )
    }
}