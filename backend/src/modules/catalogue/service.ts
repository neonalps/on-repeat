import logger from "@src/log/logger";
import { validateNotNull } from "@src/util/validation";
import { CreateTrackDto } from "@src/models/classes/dto/create-track";
import { TrackDao } from "@src/models/classes/dao/track";
import { AlbumService } from "./album/service";
import { requireNonNull } from "@src/util/common";
import { TrackService } from "./track/service";
import { ArtistService } from "./artist/service";

export class CatalogueService {

    private readonly trackService: TrackService;
    private readonly artistService: ArtistService;
    private readonly albumService: AlbumService;

    constructor(trackService: TrackService, artistService: ArtistService, albumService: AlbumService) {
        this.trackService = requireNonNull(trackService);
        this.artistService = requireNonNull(artistService);
        this.albumService = requireNonNull(albumService);
    }

    public async upsertTrack(storedTrackId: number | null, trackToProcess: TrackDao): Promise<number> {
        validateNotNull(trackToProcess, "trackToProcess");
    
        if (!storedTrackId) {
            return this.insertTrack(trackToProcess);
        }
    
        const storedTrack = await this.trackService.getById(storedTrackId);
        if (!storedTrack) {
            logger.error("error during upsert; storedTrackId was passed but artist could not be found", storedTrackId);
            throw new Error("Error during upsert track");
        }
    
        if (!storedTrack.areUpdateablePropertiesEqual(trackToProcess)) {
            //const updateTrackDto = UpdateTrackDto.createFromTrackDao(trackToProcess);
            //const updateSuccess = await this.trackService.update(storedTrack.id, updateTrackDto);
    
            //if (!updateSuccess) {
                //logger.warn("failed to update track", storedTrack.id, trackToProcess);
            //}
        }
    
        return storedTrack.id;
    }
    
    public async insertTrack(trackToCreate: TrackDao): Promise<number> {
        const createTrackDto = CreateTrackDto.createFromTrackDao(trackToCreate);
        const createdTrack = await this.trackService.create(createTrackDto as CreateTrackDto);
    
        if (!createdTrack) {
            logger.error("failed to insert track during upset", createTrackDto);
            throw new Error("Failed to insert track during upsert");
        }
    
        return createdTrack.id;
    }
    
    public async upsertArtist(storedArtistId: number | null, artistToProcess: ArtistDao): Promise<number> {
        validateNotNull(artistToProcess, "artistToProcess");
    
        if (!storedArtistId) {
            return this.insertArtist(artistToProcess);
        }
    
        const storedArtist = await this.artistService.getById(storedArtistId);
        if (!storedArtist) {
            logger.error("error during upsert; storedArtistId was passed but artist could not be found", storedArtistId);
            throw new Error("Error during upsert artist");
        }
    
        // TODO FIX
        /*if (!this.artistService.areUpdateablePropertiesEqual(storedArtist, artistToProcess)) {
            const updateArtistDto = UpdateArtistDto.createFromArtistDao(artistToProcess);
            await this.artistService.update(storedArtist.id, updateArtistDto);
        }*/
    
        return storedArtist.id;
    }
    
    public async insertArtist(artistToCreate: ArtistDao): Promise<number> {
        const createArtistDto = CreateArtistDto.createFromArtistDao(artistToCreate);
        const createdArtist = await this.artistService.create(createArtistDto as CreateArtistDto);
    
        if (!createdArtist) {
            logger.error("failed to insert artist during upset", createArtistDto);
            throw new Error("Failed to insert artist during upsert");
        }
    
        return createdArtist.id;
    };
    
    public async upsertAlbum(albumId: number | null, albumToProcess: AlbumDto): Promise<number> {
        return 0;
    }
}