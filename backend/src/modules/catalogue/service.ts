import logger from "@src/log/logger";
import { validateNotNull } from "@src/util/validation";
import { CreateTrackDto } from "@src/models/classes/dto/create-track";
import { TrackDao } from "@src/models/classes/dao/track";
import { requireNonNull } from "@src/util/common";
import { AlbumDao } from "@src/models/classes/dao/album";
import { CreateAlbumDto } from "@src/models/classes/dto/create-album";
import { UpdateAlbumDto } from "@src/models/classes/dto/update-album";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { CreateArtistDto } from "@src/models/classes/dto/create-artist";
import { TrackService } from "@src/modules/track/service";
import { ArtistService } from "@src/modules/artist/service";
import { AlbumService } from "@src/modules/album/service";
import { UpdateTrackDto } from "@src/models/classes/dto/update-track";
import { UpdateArtistDto } from "@src/models/classes/dto/update-artist";
import { AlbumImageDao } from "@src/models/classes/dao/album-image";
import { CreateAlbumImageDto } from "@src/models/classes/dto/create-album-image";

export class CatalogueService {

    private readonly trackService: TrackService;
    private readonly artistService: ArtistService;
    private readonly albumService: AlbumService;

    constructor(trackService: TrackService, artistService: ArtistService, albumService: AlbumService) {
        this.trackService = requireNonNull(trackService);
        this.artistService = requireNonNull(artistService);
        this.albumService = requireNonNull(albumService);
    }

    public async getTrackById(trackId: number): Promise<TrackDao | null> {
        return this.trackService.getById(trackId);
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
            console.log('we have to update track');
            console.log('stored', storedTrack);
            console.log('incoming', trackToProcess);
            const updateTrackDto = UpdateTrackDto.createFromTrackDao(trackToProcess) as UpdateTrackDto;
            await this.trackService.update(storedTrack.id, updateTrackDto);
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

    public async getArtistById(artistId: number): Promise<ArtistDao | null> {
        return this.artistService.getById(artistId);
    }

    public async getMultipleArtistsById(ids: Set<number>): Promise<Set<ArtistDao>> {
        return this.artistService.getMultipleById(ids);
    }
    
    public async upsertArtist(storedArtistId: number | null, artistToProcess: ArtistDao): Promise<number> {
        validateNotNull(artistToProcess, "artistToProcess");
    
        if (!storedArtistId) {
            return this.insertArtist(artistToProcess);
        }
    
        const storedArtist = await this.artistService.getById(storedArtistId);
        if (!storedArtist) {
            logger.error("error during upsert; storedArtistId was passed but artist could not be found", storedArtistId);
            throw new Error("Error during artist upsert");
        }
    
        if (!storedArtist.areUpdateablePropertiesEqual(artistToProcess)) {
            const updateArtistDto = UpdateArtistDto.createFromArtistDao(artistToProcess) as UpdateArtistDto;
            await this.artistService.update(storedArtist.id, updateArtistDto);
        }
    
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
    }

    public async getAlbumById(albumId: number | null): Promise<AlbumDao | null> {
        if (albumId === null) {
            return null;
        }

        return this.albumService.getById(albumId);
    }
    
    public async upsertAlbum(storedAlbumId: number | null, albumToProcess: AlbumDao): Promise<number> {
        validateNotNull(albumToProcess, "albumToProcess");

        if (!storedAlbumId) {
            return this.insertAlbum(albumToProcess);
        }

        const storedAlbum = await this.albumService.getById(storedAlbumId);
        if (!storedAlbum) {
            logger.error("error during upsert; storedArtistId was passed but artist could not be found", storedAlbumId);
            throw new Error("Error during upsert album");
        }

        if (!storedAlbum.areUpdateablePropertiesEqual(albumToProcess)) {
            const updateAlbumDto = UpdateAlbumDto.createFromAlbumDao(albumToProcess) as UpdateAlbumDto;
            await this.albumService.update(storedAlbum.id, updateAlbumDto);
        }

        return storedAlbum.id;
    }

    public async insertAlbum(album: AlbumDao): Promise<number> {
        const createAlbumDto = CreateAlbumDto.Builder
            .withName(album.name)
            .withArtistIds(album.artistIds)
            .withAlbumGroup(album.albumGroup)
            .withAlbumType(album.albumType)
            .withTotalTracks(album.totalTracks)
            .withReleaseDate(album.releaseDate)
            .withReleaseDatePrecision(album.releaseDatePrecision)
            .withImages(CatalogueService.convertAlbumImages(album.images))
            .build();

        const createdAlbum = await this.albumService.create(createAlbumDto);

        if (!createdAlbum) {
            logger.error("failed to insert album during upset", createAlbumDto);
            throw new Error("Failed to insert artist during upsert");
        }
    
        return createdAlbum.id;
    }

    private static convertAlbumImages(images: Set<AlbumImageDao>): Set<CreateAlbumImageDto> {
        if (!images || images.size === 0) {
            return new Set();
        }

        const imageSet = new Set<CreateAlbumImageDto>();

        for (const image of images) {
            const createAlbumImageDto = CreateAlbumImageDto.fromDao(image);

            if (createAlbumImageDto === null) {
                continue;
            }

            imageSet.add(createAlbumImageDto);
        }

        return imageSet;
    }
}