import { validateNotNull } from "@src/util/validation";
import { MusicProvider } from "./abstract-music-provider";
import { TrackDao } from "@src/models/classes/dao/track";
import { MusicProviderMapper } from "./mapper";
import { CatalogueService } from "@src/modules/catalogue/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { requireNonNull } from "@src/util/common";
import { SpotifyClient } from "@src/modules/clients/spotify";

export class SpotifyMusicProvider extends MusicProvider {

    private static readonly OAUTH_SCOPE_EMAIL_AND_RECENTLY_PLAYED = "user-read-private user-read-email user-read-recently-played";
    private static readonly PROVIDER_ID = 1;
    private static readonly PROVIDER_NAME = "spotify";

    private readonly catalogueService: CatalogueService;
    private readonly playedTrackService: PlayedTrackService;
    private readonly spotifyClient: SpotifyClient;
    
    constructor(
        mapper: MusicProviderMapper, 
        catalogueService: CatalogueService,
        playedTrackService: PlayedTrackService,
        spotifyClient: SpotifyClient,
    ) {
        super(SpotifyMusicProvider.PROVIDER_ID, SpotifyMusicProvider.PROVIDER_NAME, mapper);
        this.catalogueService = requireNonNull(catalogueService);
        this.playedTrackService = requireNonNull(playedTrackService);
        this.spotifyClient = requireNonNull(spotifyClient);
    }

    public static get oauthProviderId(): string {
        return SpotifyMusicProvider.PROVIDER_NAME;
    }

    public static get oauthScopeRecentlyPlayed(): string {
        return SpotifyMusicProvider.OAUTH_SCOPE_EMAIL_AND_RECENTLY_PLAYED;
    }

    public async fetchAndProcessRecentlyPlayedTracks(accountId: number, accessToken: string): Promise<void> {

    }

    public async processPlayedTracks(accountId: number, playedTracks: PlayedTrackDto[]): Promise<void> {
        validateNotNull(accountId, "accountId");
        validateNotNull(playedTracks, "playedTracks");

        for (const playedTrack of playedTracks) {
            try {
                const playedAt = playedTrack.playedAt;
                if (!playedAt) {
                    throw new Error("No playedAt timestamp found");
                }

                if (await this.playedTrackService.hasPlayedTrackAlreadyBeenProcessed(accountId, this.providerId, playedAt)) {
                    continue;
                }

                const trackToProcess = playedTrack.track;
                if (!trackToProcess) {
                    throw new Error("No track to process found");
                }

                
                const albumToProcess = trackToProcess.album;
                const catalogueAlbumId = await this.processAlbum(albumToProcess);

                const artistsToProcess = trackToProcess.artists;
                const catalogueArtistIds = await this.processArtists(artistsToProcess);
    
                const catalogueTrackId = await this.processTrack(trackToProcess, catalogueArtistIds, catalogueAlbumId);

                const playedTrackDto = CreatePlayedTrackDto.Builder
                    .withAccountId(accountId)
                    .withMusicProviderId(this.providerId)
                    .withTrackId(catalogueTrackId)
                    .withPlayedAt(playedAt)
                    .withIncludeInStatistics(true)
                    .build();
    
                await this.playedTrackService.create(playedTrackDto);
            } catch (ex) {
                // TOOD log
            }
        }
    }

    private async processAlbum(albumToProcess: AlbumDto): Promise<number> {
        const storedAlbum = await this.getAlbumIdByProviderAlbumId(albumToProcess.id);
        const storedAlbumId = storedAlbum !== null ? storedAlbum.albumId : null;
        const catalogueAlbumId = await this.catalogueService.upsertAlbum(storedAlbumId, albumToProcess);

        if (!storedAlbumId) {
            await this.addMusicProviderAlbumRelation(catalogueAlbumId, albumToProcess.id, albumToProcess.uri);
        }

        return catalogueAlbumId;
    }

    private async processArtists(artistsToProcess: ArtistDto[]): Promise<Set<number>> {
        const catalogueArtistIds = new Set<number>();
        if (!artistsToProcess || artistsToProcess.length <= 0) {
            return catalogueArtistIds;
        }

        for (const artistToProcess of artistsToProcess) {
            const storedArtist = await this.getArtistByProviderArtistId(artistToProcess.id);
            const storedArtistId = storedArtist !== null ? storedArtist.artistId : null;

            const artist = ArtistDao.Builder
                .withName(artistToProcess.name)
                .build();

            const catalogueArtistId = await this.catalogueService.upsertArtist(storedArtistId, artist);
            catalogueArtistIds.add(catalogueArtistId);

            if (!storedArtistId) {
                await this.addMusicProviderArtistRelation(catalogueArtistId, artistToProcess.id, artistToProcess.href);
            }
        }
        return catalogueArtistIds;
    }

    private async processTrack(trackToProcess: TrackDto, catalogueArtistIds: Set<number>, catalogueAlbumId: number): Promise<number> {
        const storedTrack = await this.getTrackByProviderTrackId(trackToProcess.id);
        const storedTrackId = storedTrack !== null ? storedTrack.trackId : null;

        // TODO fix
        const track = TrackDao.Builder
            .withArtistIds(catalogueArtistIds)
            .withAlbumId(catalogueAlbumId)
            .build();

        const catalogueTrackId = await this.catalogueService.upsertTrack(storedTrackId, track);

        if (!storedTrackId) {
            await this.addMusicProviderTrackRelation(catalogueTrackId, trackToProcess.id, trackToProcess.href);
        }

        return catalogueTrackId;
    }
    
}