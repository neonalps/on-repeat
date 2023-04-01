import sql from "@src/db/db";

const create = async (album: CreateAlbumDto): Promise<number> => {
    const result = await sql`
        insert into album
            (name, type, album_type, album_group, release_date, release_date_precision, created_at)
        values
            (${ album.getName() }, ${ album.getType() }, ${ album.getAlbumType() }, ${ album.getAlbumGroup() }, ${ album.getReleaseDate() }, ${ album.getReleaseDatePrecision() }, now())
        returning id
    `;

    return result[0].id;
};

const createAlbumArtistRelation = async (albumId: number, artistId: number): Promise<number> => {
    const result = await sql`
        insert into album_artists
            (album_id, artist_id)
        values
            (${ albumId }, ${ artistId })
        returning id
    `;

    return result[0].id;
};

const createAlbumImageRelation = async (albumId: number, image: CreateAlbumImageDto): Promise<number> => {
    const result = await sql`
        insert into album_images
            (album_id, height, width, url)
        values
            (${ albumId }, ${ image.getHeight() }, ${ image.getWidth() }, ${ image.getUrl() })
        returning id
    `;

    return result[0].id;
};

const getById = async (id: number): Promise<AlbumDao | null> => {
    const result = await sql<AlbumDaoInterface[]>`
        select
            id,
            name,
            type,
            album_type,
            album_group,
            release_date,
            release_date_precision,
            created_at
        from
            album
        where
            id = ${ id }
    `;

    if (!result || result.length === 0) {
        return null;
    }

    const item = result[0];

    return new AlbumDaoBuilder()
        .setId(item.id)
        .setName(item.name)
        .setType(item.type)
        .setAlbumType(item.albumType)
        .setAlbumGroup(item.albumGroup)
        .setReleaseDate(item.releaseDate)
        .setReleaseDatePrecision(item.releaseDatePrecision)
        .setCreatedAt(item.createdAt)
        .build();
};

const getAlbumArtistIds = async (albumId: number): Promise<number[]> => {
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

const getAlbumImages = async (albumId: number): Promise<AlbumImage[]> => {
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

    return result.map(item => {
        return new AlbumImageBuilder()
            .setHeight(item.height)
            .setWidth(item.width)
            .setUrl(item.url)
            .build();
    });
};

const update = async (id: number, dto: UpdateAlbumDto): Promise<void> => {
    sql`
        update album set
            name = ${dto.getName()},
            type = ${dto.getType()},
            album_type = ${dto.getAlbumType()},
            album_group = ${dto.getAlbumGroup()},
            release_date = ${dto.getReleaseDate()},
            release_date_precision = ${dto.getReleaseDatePrecision()}
        where id = ${ id }
        `;
};

const mapper = {
    create,
    createAlbumArtistRelation,
    createAlbumImageRelation,
    getById,
    getAlbumArtistIds,
    getAlbumImages,
    update,
};

export default mapper;
