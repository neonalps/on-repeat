import sql from "@src/db/db";
import { ImageDao } from "@src/models/classes/dao/image";
import { AlbumDao } from "@src/models/classes/dao/album";
import { CreateAlbumDto } from "@src/models/classes/dto/create-album";
import { CreateAlbumImageDto } from "@src/models/classes/dto/create-album-image";
import { UpdateAlbumDto } from "@src/models/classes/dto/update-album";
import { AlbumImageDaoInterface } from "@src/models/dao/album-image.dao";
import { AlbumArtistDaoInterface } from "@src/models/dao/album-artist.dao";
import { AlbumDaoInterface } from "@src/models/dao/album.dao";
import { removeNull } from "@src/util/common";

export class AlbumMapper {

    constructor() {}

    public async create(album: CreateAlbumDto): Promise<number> {
        const result = await sql`
            insert into album
                (name, album_type, album_group, total_tracks, release_date, release_date_precision, created_at, updated_at)
            values
                (${ album.name }, ${ album.albumType }, ${ album.albumGroup }, ${ album.totalTracks }, ${ album.releaseDate }, ${ album.releaseDatePrecision }, now(), null)
            returning id
        `;
    
        return result[0].id;
    }

    public async createAlbumArtistRelation(albumId: number, artistId: number): Promise<number> {
        const result = await sql`
            insert into album_artists
                (album_id, artist_id)
            values
                (${ albumId }, ${ artistId })
            returning id
        `;
    
        return result[0].id;
    }

    public async createAlbumImageRelation(albumId: number, image: CreateAlbumImageDto): Promise<number> {
        const result = await sql`
            insert into album_images
                (album_id, height, width, url)
            values
                (${ albumId }, ${ image.height }, ${ image.width }, ${ image.url })
            returning id
        `;
    
        return result[0].id;
    }

    public async getById(id: number): Promise<AlbumDao | null> {
        const result = await sql<AlbumDaoInterface[]>`
            select
                id,
                name,
                album_type,
                album_group,
                total_tracks,
                release_date,
                release_date_precision,
                created_at,
                updated_at
            from
                album
            where
                id = ${ id }
        `;
    
        if (!result || result.length === 0) {
            return null;
        }
    
        const item = result[0];

        const albumId = item.id;

        const [artistIds, albumImages] = await Promise.all([
            this.getAlbumArtistIds(albumId),
            this.getAlbumImages(albumId),
        ])

        return AlbumDao.Builder
            .withId(albumId)
            .withName(item.name)
            .withArtistIds([...artistIds])
            .withImages([...albumImages])
            .withAlbumType(item.albumType)
            .withAlbumGroup(item.albumGroup)
            .withTotalTracks(item.totalTracks)
            .withReleaseDate(item.releaseDate)
            .withReleaseDatePrecision(item.releaseDatePrecision)
            .withCreatedAt(item.createdAt)
            .build();
    }

    public async getMultipleById(ids: number[]): Promise<AlbumDao[]> {
        const albums = await Promise.all(ids.map(albumId => this.getById(albumId)));
        return albums.filter(removeNull) as AlbumDao[];
    }

    public async getAlbumArtistIds(albumId: number): Promise<number[]> {
        const result = await sql<AlbumArtistDaoInterface[]>`
            select
                id,
                album_id,
                artist_id
            from
                album_artists
            where
                album_id = ${ albumId }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }
    
        return result.map(item => item.artistId);
    };
    
    public async getAlbumImages(albumId: number): Promise<ImageDao[]> {
        const result = await sql<AlbumImageDaoInterface[]>`
            select
                id,
                height,
                width,
                url
            from
                album_images
            where
                album_id = ${ albumId }
        `;
    
        if (!result || result.length === 0) {
            return [];
        }

        return result.map(item => ImageDao.fromInterface(item)).filter(removeNull) as ImageDao[];
    };
    
    public async update(id: number, dto: UpdateAlbumDto): Promise<void> {
        sql`
            update album set
                name = ${ dto.name },
                album_type = ${ dto.albumType },
                album_group = ${ dto.albumGroup },
                total_tracks = ${ dto.totalTracks },
                release_date = ${ dto.releaseDate },
                release_date_precision = ${ dto.releaseDatePrecision },
                updated_at = now()
            where id = ${ id }
            `;
    };

}