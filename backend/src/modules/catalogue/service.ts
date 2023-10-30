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
import { CreateAlbumImageDto } from "@src/models/classes/dto/create-album-image";
import { SimpleTrackDetailsDao } from "@src/models/classes/dao/simple-track-details";
import { createIdNameDao } from "@src/util/dao";
import { SimpleAlbumDao } from "@src/models/classes/dao/album-simple";
import { CreateArtistImageDto } from "@src/models/classes/dto/create-artist-image";
import { ImageDao } from "@src/models/classes/dao/image";
import { SimpleArtistDao } from "@src/models/classes/dao/artist-simple";

interface TrackBucketContext {
    trackId: number;
    albumTotalTracks: number | null;
    albumReleaseDate: Date | null;
};

export class CatalogueService {

    private readonly trackService: TrackService;
    private readonly artistService: ArtistService;
    private readonly albumService: AlbumService;

    constructor(trackService: TrackService, artistService: ArtistService, albumService: AlbumService) {
        this.trackService = requireNonNull(trackService);
        this.artistService = requireNonNull(artistService);
        this.albumService = requireNonNull(albumService);
    }

    public async searchTracksFullText(input: string): Promise<SimpleTrackDetailsDao[]> {
        const tracks = await this.trackService.fullTextSearch(input);

        const result: SimpleTrackDetailsDao[] = [];

        for (const track of tracks) {
            const trackDetails = await this.getSimpleTrackDetailsById(track.id);

            if (trackDetails === null) {
                continue;
            }

            result.push(trackDetails);
        }

        return result;
    }

    public async getTrackById(trackId: number): Promise<TrackDao | null> {
        return this.trackService.getById(trackId);
    }

    public async getMultipleTracksById(trackIds: Set<number>): Promise<TrackDao[]> {
        return this.trackService.getMultipleById(trackIds);
    }

    public async upsertTrack(storedTrackId: number | null, trackToProcess: TrackDao): Promise<number> {
        validateNotNull(trackToProcess, "trackToProcess");
    
        if (!storedTrackId) {
            const createdTrackId = await this.insertTrack(trackToProcess);
            await this.performAutomaticTrackBucketAssignmentForTrackId(createdTrackId);
            return createdTrackId;
        }
    
        const storedTrack = await this.trackService.getById(storedTrackId);
        if (!storedTrack) {
            logger.error("error during upsert; storedTrackId was passed but artist could not be found", storedTrackId);
            throw new Error("Error during upsert track");
        }
    
        if (!storedTrack.areUpdateablePropertiesEqual(trackToProcess)) {
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

    public async getSimpleTrackDetailsById(trackId: number): Promise<SimpleTrackDetailsDao | null> {
        validateNotNull(trackId, "trackId");

        const track = await this.getTrackById(trackId);
        if (!track) {
            return null;
        }

        const [album, artists] = await Promise.all([
            this.getAlbumById(track.albumId),
            this.getMultipleArtistsById(Array.from(track.artistIds))
        ]);

        return SimpleTrackDetailsDao.Builder
            .withTrack(createIdNameDao(track.id, track.name))
            .withAlbum(album !== null ? SimpleAlbumDao.fromAlbumDao(album) : null)
            .withArtists(artists.map(artist => SimpleArtistDao.fromArtistDao(artist)))
            .build();
    }

    public async searchArtistsFullText(input: string): Promise<ArtistDao[]> {
        return this.artistService.fullTextSearch(input);
    }

    public async getArtistById(artistId: number): Promise<ArtistDao | null> {
        return this.artistService.getById(artistId);
    }

    public async getMultipleArtistsById(ids: number[]): Promise<ArtistDao[]> {
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
        const artistImages = Array.from(artistToCreate.images).map(item => {
            return CreateArtistImageDto.Builder
                .withHeight(item.height)
                .withWidth(item.width)
                .withUrl(item.url)
                .build();
        })

        const createArtistDto: CreateArtistDto = CreateArtistDto.Builder
            .withName(artistToCreate.name)
            .withImages(new Set(artistImages))
            .build();

        const createdArtist = await this.artistService.create(createArtistDto);
    
        if (!createdArtist) {
            logger.error("failed to insert artist during upset", createArtistDto);
            throw new Error("Failed to insert artist during upsert");
        }
    
        return createdArtist.id;
    }

    public async createArtistImageRelations(dtos: CreateArtistImageDto[]): Promise<void> {
        await this.artistService.createArtistImageRelations(dtos);
    }

    public async getAlbumById(albumId: number | null): Promise<AlbumDao | null> {
        if (albumId === null) {
            return null;
        }

        return this.albumService.getById(albumId);
    }

    public async getMultipleAlbumsById(albumIds: number[]): Promise<AlbumDao[]> {
        return this.albumService.getMultipleById(albumIds);
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
            .withArtistIds(new Set(album.artistIds))
            .withAlbumGroup(album.albumGroup)
            .withAlbumType(album.albumType)
            .withTotalTracks(album.totalTracks)
            .withReleaseDate(album.releaseDate)
            .withReleaseDatePrecision(album.releaseDatePrecision)
            .withImages(CatalogueService.convertAlbumImages(new Set(album.images)))
            .build();

        const createdAlbum = await this.albumService.create(createAlbumDto);

        if (!createdAlbum) {
            logger.error("failed to insert album during upset", createAlbumDto);
            throw new Error("Failed to insert artist during upsert");
        }
    
        return createdAlbum.id;
    }

    public async performAutomaticTrackBucketAssignmentForTrackId(trackId: number): Promise<void> {
        validateNotNull(trackId, "trackId");

        const track = await this.trackService.getById(trackId);
        if (!track || !track.isrc) {
            return;
        }
        
        const trackBucketContextItems = await this.getOrderedTrackBucketContextsForIsrc(track.isrc);

        // it's only the track itself, abort
        if (trackBucketContextItems.length === 1) {
            return;
        }

        // the ID of the bucket is the track ID of the primary track (i.e. the first element of the array)
        const trackBucketId = trackBucketContextItems[0].trackId;

        for (const trackBucketContextItem of trackBucketContextItems) {
            const currentTrack = await this.trackService.getById(trackBucketContextItem.trackId) as TrackDao;

            if (currentTrack.bucket === trackBucketId) {
                continue;
            }

            await this.trackService.updateBucket(currentTrack.id, trackBucketId);
        }
    }

    private async getOrderedTrackBucketContextsForIsrc(isrc: string): Promise<TrackBucketContext[]> {
        const tracksWithSameIsrc = await this.trackService.getByIsrc(isrc);
        if (!tracksWithSameIsrc || tracksWithSameIsrc.length === 0) {
            return [];
        }

        const trackBucketContexts: TrackBucketContext[] = [];
        for (const track of tracksWithSameIsrc) {
            trackBucketContexts.push(await this.buildTrackBucketContext(track));
        }

        return trackBucketContexts.sort(this.compareTrackBucketContexts);
    }

    /**
     * Returns the ordered tracks for this bucket. The first element is the primary track for the bucket.
     */
    private compareTrackBucketContexts(first: TrackBucketContext, second: TrackBucketContext): number {
        const firstReleaseDate = first.albumReleaseDate;
        const secondReleaseDate = second.albumReleaseDate;

        if (firstReleaseDate !== null && secondReleaseDate !== null) {
            const firstReleaseDateTime = firstReleaseDate.getTime();
            const secondReleaseDateTime = secondReleaseDate.getTime();

            if (firstReleaseDateTime > secondReleaseDateTime) {
                return -1;
            }

            if (secondReleaseDateTime > firstReleaseDateTime) {
                return 1;
            }
        }

        if (firstReleaseDate !== null && secondReleaseDate === null) {
            return -1;
        }

        if (firstReleaseDate === null && secondReleaseDate !== null) {
            return 1;
        }

        if (first.albumTotalTracks !== null && second.albumTotalTracks !== null) {
            if (first.albumTotalTracks > second.albumTotalTracks) {
                return -1;
            }

            if (second.albumTotalTracks > first.albumTotalTracks) {
                return 1;
            }
        }

        if (first.albumTotalTracks !== null && second.albumTotalTracks === null) {
            return -1;
        }

        if (first.albumTotalTracks === null && second.albumTotalTracks !== null) {
            return 1;
        }

        return first.trackId < second.trackId ? -1 : 1;
    }

    private async buildTrackBucketContext(track: TrackDao): Promise<TrackBucketContext> {
        if (!track.albumId) {
            return {
                trackId: track.id,
                albumReleaseDate: null,
                albumTotalTracks: null,
            };
        }

        const album = await this.albumService.getById(track.albumId);
        if (!album) {
            return {
                trackId: track.id,
                albumReleaseDate: null,
                albumTotalTracks: null,
            }
        }

        return {
            trackId: track.id,
            albumReleaseDate: album.releaseDate,
            albumTotalTracks: album.totalTracks,
        };
    }

    private static convertAlbumImages(images: Set<ImageDao>): Set<CreateAlbumImageDto> {
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