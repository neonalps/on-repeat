import sql from "@src/db/db";

export class MusicProviderMapper {

    constructor() {}

    public async getTrackByProviderTrackId(providerId: number, providerTrackId: string): Promise<MusicProviderTrackDao | null> {
        const result = await sql<MusicProviderTrackDaoInterface[]>`
            select
                id,
                music_provider_id,
                track_id,
                music_provider_track_id,
                music_provider_track_uri,
                created_at
            from
                music_provider_tracks
            where
                music_provider_id = ${ providerId }
                and music_provider_track_id = ${ providerTrackId }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return MusicProviderTrackDao.fromDaoInterface(result[0]);
    }
    
    public async getArtistByProviderArtistId(providerId: number, providerArtistId: string): Promise<MusicProviderArtistDao | null> {
        const result = await sql<MusicProviderArtistDaoInterface[]>`
            select
                id,
                music_provider_id,
                artist_id,
                music_provider_artist_id,
                music_provider_artist_uri,
                created_at
            from
                music_provider_artists
            where
                music_provider_id = ${ providerId }
                and music_provider_artist_id = ${ providerArtistId }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return MusicProviderArtistDao.fromDaoInterface(result[0]);
    }
    
    public async getAlbumByProviderAlbumId(providerId: number, providerAlbumId: string): Promise<MusicProviderAlbumDao | null> {
        const result = await sql<MusicProviderAlbumDaoInterface[]>`
            select
                id,
                music_provider_id,
                album_id,
                music_provider_album_id,
                music_provider_album_uri,
                created_at
            from
                music_provider_albums
            where
                music_provider_id = ${ providerId }
                and music_provider_album_id = ${ providerAlbumId }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        return MusicProviderAlbumDao.fromDaoInterface(result[0]);
    }
    
    public async addMusicProviderTrackRelation(dto: CreateMusicProviderTrackRelationDto): Promise<void> {
        await sql`
            insert into music_provider_tracks
                (music_provider_id, track_id, music_provider_track_id, music_provider_track_uri, created_at)
            values
                (${ dto.musicProviderId }, ${ dto.trackId }, ${ dto.musicProviderTrackId }, ${ dto.musicProviderTrackUri }, now())
        `;
    }
    
    public async addMusicProviderArtistRelation(dto: CreateMusicProviderArtistRelationDto): Promise<void> {
        await sql`
            insert into music_provider_artists
                (music_provider_id, artist_id, music_provider_artist_id, music_provider_artist_uri, created_at)
            values
                (${ dto.musicProviderId }, ${ dto.artistId }, ${ dto.musicProviderArtistId }, ${ dto.musicProviderArtistUri }, now())
        `;
    }
    
    public async addMusicProviderAlbumRelation(dto: CreateMusicProviderAlbumRelationDto): Promise<void> {
        await sql`
            insert into music_provider_albums
                (music_provider_id, album_id, music_provider_album_id, music_provider_album_uri, created_at)
            values
                (${ dto.musicProviderId }, ${ dto.albumId }, ${ dto.musicProviderAlbumId }, ${ dto.musicProviderAlbumUri }, now())
        `;
    }

}