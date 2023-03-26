const upsertTrack = async (track: Track, trackToProcess: TrackDto, artistIds: number[], albumId: number | null): Promise<number> => {
    return 0;
};

const upsertArtist = async (artist: Artist, artistToProcess: ArtistDto): Promise<number> => {
    return 0;
};

const upsertAlbum = async (album: Album, albumToProcess: AlbumDto): Promise<number> => {
    return 0;
}

const service = {
    upsertAlbum,
    upsertArtist,
    upsertTrack,
};

export default service;