import sql from "@src/db/db";
import { MusicProviderAlbumDao } from "@src/models/classes/dao/music-provider-album";
import { MusicProviderArtistDao } from "@src/models/classes/dao/music-provider-artist";
import { MusicProviderTrackDao } from "@src/models/classes/dao/music-provider-track";
import { SimpleMusicProviderArtistDao } from "@src/models/classes/dao/simple-music-provider-artist";
import { CreateMusicProviderAlbumRelationDto } from "@src/models/classes/dto/create-music-provider-album-relation";
import { CreateMusicProviderArtistRelationDto } from "@src/models/classes/dto/create-music-provider-artist-relation";
import { CreateMusicProviderTrackRelationDto } from "@src/models/classes/dto/create-music-provider-track-relation";
import { ArtistExternalUriDaoInterface } from "@src/models/dao/artist-external-uri.dao";
import { MusicProviderAlbumDaoInterface } from "@src/models/dao/music-provider-album.dao";
import { MusicProviderArtistDaoInterface } from "@src/models/dao/music-provider-artist.dao";
import { MusicProviderTrackDaoInterface } from "@src/models/dao/music-provider-track.dao";
import { SimpleMusicProviderArtistDaoInterface } from "@src/models/dao/simple-music-provider-artist.dao";
import { EntityId } from "@src/models/interface/id";
import postgres from "postgres";

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

    public async getExternalUrlsForAlbum(albumId: number): Promise<Record<string, string>> {
        const result = await sql<ArtistExternalUriDaoInterface[]>`
            select
                mp.name as music_provider_name,
                mpa.music_provider_album_uri as external_uri
            from
                music_provider_albums mpa left join
                music_provider mp on mp.id = mpa.music_provider_id
            where
                mpa.album_id = ${ albumId }
        `;

        return MusicProviderMapper.convertResultToRecord(result);
    }

    public async getExternalUrlsForArtist(artistId: number): Promise<Record<string, string>> {
        const result = await sql<ArtistExternalUriDaoInterface[]>`
            select
                mp.name as music_provider_name,
                mpa.music_provider_artist_uri as external_uri
            from
                music_provider_artists mpa left join
                music_provider mp on mp.id = mpa.music_provider_id
            where
                mpa.artist_id = ${ artistId }
        `;

        return MusicProviderMapper.convertResultToRecord(result);
    }

    public async getExternalUrlsForTrack(trackId: number): Promise<Record<string, string>> {
        const result = await sql<ArtistExternalUriDaoInterface[]>`
            select
                mp.name as music_provider_name,
                mpt.music_provider_track_uri as external_uri
            from
                music_provider_tracks mpt left join
                music_provider mp on mp.id = mpt.music_provider_id
            where
                mpt.track_id = ${ trackId }
        `;

        return MusicProviderMapper.convertResultToRecord(result);
    }

    public async getArtistIdsWithoutImagesForMusicProvider(musicProviderId: number, artistIds: string[]): Promise<SimpleMusicProviderArtistDao[]> {
        const result = await sql<SimpleMusicProviderArtistDaoInterface[]>`
            select 
                mpa.artist_id,
                mpa.music_provider_artist_id
            from
                music_provider_artists mpa left join 
                artist a on a.id = mpa.artist_id left join 
                artist_images ai on ai.artist_id = a.id 
            where
                mpa.music_provider_id = ${ musicProviderId } and 
                mpa.music_provider_artist_id in ${ sql(artistIds) } and 
                ai.artist_id is null
        `;

        if (!result || result.length === 0) {
            return [];
        }

        return result.map(item => SimpleMusicProviderArtistDao.fromDaoInterface(item));
    }

    private static convertResultToRecord(result: postgres.RowList<ArtistExternalUriDaoInterface[]>): Record<string, string> {
        if (!result || result.length === 0) {
            return {};
        }

        const externalUrls: Record<string, string> = {};

        for (const item of result) {
            externalUrls[item.musicProviderName] = item.externalUri;
        }

        return externalUrls;
    }

}