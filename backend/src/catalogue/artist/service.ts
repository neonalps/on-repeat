import { validateNotBlank, validateNotNull } from "@src/util/validation";
import mapper from "./mapper";

const areUpdateablePropertiesEqual = (first: ArtistDao, second: ArtistDao): boolean => {
    validateNotNull(first, "firstArtist");
    validateNotNull(second, "secondArtist");

    return first.name === second.name;
};

const create = async (dto: CreateArtistDto): Promise<ArtistDao | null> => {
    validateNotNull(dto, "createArtistDto");
    validateNotBlank(dto.name, "createArtistDto.name");

    const createdArtistId = await mapper.create(dto);
    return getById(createdArtistId);
};

const getById = async (id: number): Promise<ArtistDao | null> => {
    validateNotNull(id, "id");

    const artist = await mapper.getById(id);
    if (!artist) {
        return null;
    }

    return artist;
};

const update = async (id: number, dto: UpdateArtistDto): Promise<boolean> => {
    validateNotNull(id, "id");
    validateNotNull(dto, "dto");

    const updatedArtistId = await mapper.update(id, dto);
    return updatedArtistId !== null && updatedArtistId === id;
};

const service = {
    areUpdateablePropertiesEqual,
    create,
    getById,
    update,
};

export default service;