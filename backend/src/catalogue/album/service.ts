import { setEquals } from "@src/util/collection";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import mapper from "./mapper";

const areUpdateablePropertiesEqual = (first: AlbumDao, second: AlbumDao): boolean => {
    validateNotNull(first, "firstAlbum");
    validateNotNull(second, "secondAlbum");

    return first.getName() === second.getName()
        && setEquals(first.getArtistIds(), second.getArtistIds())
        && first.getType() === second.getType()
        && first.getAlbumType() === second.getAlbumType()
        && first.getAlbumGroup() === second.getAlbumGroup()
        && first.getReleaseDate() === second.getReleaseDate()
        && first.getReleaseDatePrecision() === second.getReleaseDatePrecision()
        && setEquals(first.getImages(), second.getImages());
};

const create = async (dto: CreateAlbumDto): Promise<AlbumDao | null> => {
    validateNotNull(dto, "createAlbumDto");
    validateNotBlank(dto.getName(), "createAlbumDto.name");
    validateNotNull(dto.getArtistIds(), "createAlbumDto.artistIds");
    validateNotBlank(dto.getType(), "createAlbumDto.type");
    validateNotBlank(dto.getAlbumType(), "createAlbumDto.albumType");
    validateNotBlank(dto.getAlbumGroup(), "createAlbumDto.albumGroup");
    validateNotNull(dto.getImages(), "createAlbumDto.images");

    const createdAlbumId = await mapper.create(dto);

    for (const artistId of dto.getArtistIds().values()) {
        await mapper.createAlbumArtistRelation(createdAlbumId, artistId);
    }

    for (const albumImage of dto.getImages().values())  {
        const albumImageDto = new CreateAlbumImageDtoBuilder()
            .setHeight(albumImage.getHeight())
            .setWidth(albumImage.getWidth())
            .setUrl(albumImage.getUrl())
            .build();

        await mapper.createAlbumImageRelation(createdAlbumId, albumImageDto);
    }

    return getById(createdAlbumId);
};

const getById = async (id: number): Promise<AlbumDao | null> => {
    validateNotNull(id, "id");

    const album = await mapper.getById(id);
    if (!album) {
        return null;
    }

    const [albumArtistIds, albumImages] = await Promise.all([mapper.getAlbumArtistIds(album.getId()), mapper.getAlbumImages(album.getId())]);
    album.setArtistIds(new Set(albumArtistIds));
    album.setImages(new Set(albumImages));

    return album;
};

const service = {
    areUpdateablePropertiesEqual,
    create,
    getById,
};

export default service;