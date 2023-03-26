class PlayedTrackDto {
    constructor(
        id: number,
        accountId: number,
        trackId: number,
        musicProviderId: number,
        playedAt: Date,
        createdAt: Date,
    ) {}
}

class PlayedTrackDtoBuilder {
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
        return new PlayedTrackDto(
            this.id,
            this.accountId,
            this.trackId,
            this.musicProviderId,
            this.playedAt,
            this.createdAt,
        )
    }
}