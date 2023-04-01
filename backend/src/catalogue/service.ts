import logger from "@src/log/logger";
import { validateNotNull } from "@src/util/validation";
import artistService from "./artist/service";

const upsertTrack = async (storedTrackId: number | null, trackToProcess: TrackDto, artistIds: number[], albumId: number | null): Promise<number> => {
    return 0;
};

const upsertArtist = async (storedArtistId: number | null, artistToProcess: ArtistDao): Promise<number> => {
    validateNotNull(artistToProcess, "artistToProcess");

    if (!storedArtistId) {
        return insertArtist(artistToProcess);
    }

    const storedArtist = await artistService.getById(storedArtistId);
    if (!storedArtist) {
        logger.error("error during upsert; storedArtistId was passed but artist could not be found", storedArtistId);
        throw new Error("Error during upsert artist");
    }

    if (!artistService.areUpdateablePropertiesEqual(storedArtist, artistToProcess)) {
        const updateArtistDto = UpdateArtistDto.createFromArtistDao(artistToProcess);
        const updatedSuccess = await artistService.update(storedArtist.id, updateArtistDto);
        if (!updatedSuccess) {
            logger.warn("failed to update artist", storedArtistId, artistToProcess);
        }
    }

    return storedArtist.id;
};

const insertArtist = async (artistToCreate: ArtistDao): Promise<number> => {
    const createArtistDto = CreateArtistDto.createFromArtistDao(artistToCreate);
    const createdArtist = await artistService.create(createArtistDto);

    if (!createdArtist) {
        logger.error("failed to insert artist during upset", createArtistDto);
        throw new Error("Failed to insert artist during upsert");
    }

    return createdArtist.id;
};

const upsertAlbum = async (albumId: number | null, albumToProcess: AlbumDto): Promise<number> => {
    return 0;
}

const service = {
    upsertAlbum,
    upsertArtist,
    upsertTrack,
};

export default service;