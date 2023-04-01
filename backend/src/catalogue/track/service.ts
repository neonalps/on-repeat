import { setEquals } from "@src/util/collection";
import { validateNotBlank, validateNotNull } from "@src/util/validation";
import mapper from "./mapper";

const areUpdateablePropertiesEqual = (first: TrackDao, second: TrackDao): boolean => {
    validateNotNull(first, "firstTrack");
    validateNotNull(second, "secondTrack");

    return first.getName() === second.getName()
        && first.getAlbumId() === second.getAlbumId()
        && first.getIsrc() === second.getIsrc()
        && setEquals(first.getArtistIds(), second.getArtistIds())
        && first.getDiscNumber() === second.getDiscNumber()
        && first.getDurationMs() === second.getDurationMs();
};

const create = async (dto: CreateTrackDto): Promise<TrackDao | null> => {
    validateNotNull(dto, "createTrackDto");
    validateNotBlank(dto.getName(), "createTrackDto.name");
    validateNotNull(dto.getArtistIds(), "createTrackDto.artistIds");

    const createdTrackId = await mapper.create(dto);

    for (const artistId of dto.getArtistIds().values()) {
        await mapper.createTrackArtistRelation(createdTrackId, artistId);
    }

    return getById(createdTrackId);
};

const getById = async (id: number): Promise<TrackDao | null> => {
    validateNotNull(id, "id");

    const track = await mapper.getById(id);
    if (!track) {
        return null;
    }

    const trackArtistIds = await mapper.getTrackArtistIds(track.getId());
    track.setArtistIds(new Set(trackArtistIds));
    return track;
};

const service = {
    areUpdateablePropertiesEqual,
    create,
    getById,
};

export default service;