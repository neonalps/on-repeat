import { validateNotNull } from "@src/util/validation";
import { TrackDao } from "@src/models/classes/dao/track";
import { MusicProviderMapper } from "../mapper";
import { CatalogueService } from "@src/modules/catalogue/service";
import { PlayedTrackService } from "@src/modules/played-tracks/service";
import { TimeSource } from "@src/util/time";
import { AccountTokenService } from "@src/modules/account-token/service";
import { AccountTokenDao } from "@src/models/classes/dao/account-token";
import { SpotifyPlayedTrackDto } from "@src/models/dto/played-track";
import { SpotifyClient } from "@src/modules/music-provider/spotify/client";
import { MusicProvider } from "@src/modules/music-provider/abstract-music-provider";
import { AlbumDto } from "@src/models/dto/album";
import { AlbumDao } from "@src/models/classes/dao/album";
import { ArtistDto } from "@src/models/dto/artist";
import { ArtistDao } from "@src/models/classes/dao/artist";
import { TrackDto } from "@src/models/dto/track";
import { AlbumImageDao } from "@src/models/classes/dao/album-image";
import { CreatePlayedTrackDto } from "@src/models/classes/dto/create-played-track";
import { requireNonNull } from "@src/util/common";

export class SpotifyMusicProvider extends MusicProvider {

    private static readonly ERROR_NO_ACCOUNT_TOKEN_STORED = "No account token stored";
    private static readonly ERROR_DURING_ACCOUNT_TOKEN_UPDATE = "Something unexpected went wrong during the account token update";
    private static readonly OAUTH_SCOPE_EMAIL_AND_RECENTLY_PLAYED = "user-read-email user-read-recently-played user-read-private";
    private static readonly PROVIDER_ID = 1;
    private static readonly PROVIDER_NAME = "spotify";
    private static readonly DICT_KEY_ISRC = "isrc";
    
    private static readonly REQUEST_MAX_ITEMS = 50;
    private static readonly REQUEST_INITIAL_ITEMS = 5;
    private static readonly REQUEST_ADDITIONAL_ITEMS = SpotifyMusicProvider.REQUEST_MAX_ITEMS - SpotifyMusicProvider.REQUEST_INITIAL_ITEMS;

    private readonly accountTokenService: AccountTokenService;
    private readonly catalogueService: CatalogueService;
    private readonly playedTrackService: PlayedTrackService;
    private readonly spotifyClient: SpotifyClient;
    private readonly timeSource: TimeSource;
    
    constructor(
        mapper: MusicProviderMapper, 
        accountTokenService: AccountTokenService,
        catalogueService: CatalogueService,
        playedTrackService: PlayedTrackService,
        spotifyClient: SpotifyClient,
        timeSource: TimeSource,
    ) {
        super(SpotifyMusicProvider.PROVIDER_ID, SpotifyMusicProvider.PROVIDER_NAME, mapper);
        this.accountTokenService = requireNonNull(accountTokenService);
        this.catalogueService = requireNonNull(catalogueService);
        this.playedTrackService = requireNonNull(playedTrackService);
        this.spotifyClient = requireNonNull(spotifyClient);
        this.timeSource = requireNonNull(timeSource);
    }

    public static get oauthScopeRecentlyPlayed(): string {
        return SpotifyMusicProvider.OAUTH_SCOPE_EMAIL_AND_RECENTLY_PLAYED;
    }

    public async fetchAndProcessRecentlyPlayedTracks(accountId: number): Promise<void> {
        const lastSeenPlayedTrack = await this.playedTrackService.getMostRecentPlayedTrackByAccountAndMusicProvider(accountId, this.getProviderId());

        const initialRequestSize = lastSeenPlayedTrack === null ? SpotifyMusicProvider.REQUEST_MAX_ITEMS : SpotifyMusicProvider.REQUEST_INITIAL_ITEMS;

        const initiallyFetchedTracks = await this.fetchRecentlyPlayedTracksForAccount(accountId, initialRequestSize);
        if (!initiallyFetchedTracks || initiallyFetchedTracks.length === 0) {
            return;
        }
        await this.processPlayedTracks(accountId, initiallyFetchedTracks);

        if (lastSeenPlayedTrack === null || this.isPlayedAtTimestampInResponse(lastSeenPlayedTrack.playedAt, initiallyFetchedTracks)) {
            console.log('first fetch or played at timestamp was found in response; no additional fetching necessary');
            return;
        }

        // the last seen played at was not in the response, fetch the rest of the available played tracks now
        const oldestPlayedAtInResponse = this.findOldestPlayedAtTimestamp(initiallyFetchedTracks) as Date;
        const additionallyFetchedTracksResponse = await this.fetchRecentlyPlayedTracksForAccount(accountId, SpotifyMusicProvider.REQUEST_ADDITIONAL_ITEMS, oldestPlayedAtInResponse.getTime());
        await this.processPlayedTracks(accountId, additionallyFetchedTracksResponse);
    }

    public async processPlayedTracks(accountId: number, playedTracks: SpotifyPlayedTrackDto[]): Promise<void> {
        validateNotNull(accountId, "accountId");
        validateNotNull(playedTracks, "playedTracks");

        for (const playedTrack of playedTracks) {
            try {
                const playedAt = playedTrack.playedAt;
                if (!playedAt) {
                    throw new Error("No playedAt timestamp found");
                }

                if (await this.playedTrackService.hasPlayedTrackAlreadyBeenProcessed(accountId, this.getProviderId(), playedAt)) {
                    continue;
                }

                const trackToProcess = playedTrack.track;
                if (!trackToProcess) {
                    throw new Error("No track to process found");
                }

                const albumToProcess = trackToProcess.album;

                const albumArtistsToProcess = albumToProcess.artists;
                const albumCatalogueArtistIds = await this.processArtists(albumArtistsToProcess);

                const catalogueAlbumId = await this.processAlbum(albumToProcess, albumCatalogueArtistIds);

                const trackArtistsToProcess = trackToProcess.artists;
                const trackCatalogueArtistIds = await this.processArtists(trackArtistsToProcess);
    
                const catalogueTrackId = await this.processTrack(trackToProcess, trackCatalogueArtistIds, catalogueAlbumId);

                const playedTrackDto = CreatePlayedTrackDto.Builder
                    .withAccountId(accountId)
                    .withMusicProviderId(this.getProviderId())
                    .withTrackId(catalogueTrackId)
                    .withPlayedAt(playedAt)
                    .withIncludeInStatistics(true)
                    .build();
    
                await this.playedTrackService.create(playedTrackDto);
            } catch (ex) {
                console.error(ex);
            }
        }
    }

    private async fetchRecentlyPlayedTracksForAccount(accountId: number, batchSize: number, before?: number): Promise<SpotifyPlayedTrackDto[]> {
        const accountToken = await this.retrieveAccountToken(accountId);
        const playedTracksResponse = await this.spotifyClient.getRecentlyPlayedTracks(accountToken.accessToken, batchSize, before);
        return playedTracksResponse.items;
    }

    private isPlayedAtTimestampInResponse(playedAt: Date, tracks: SpotifyPlayedTrackDto[]): boolean {
        return tracks.some(track => playedAt.getTime() === track.playedAt.getTime());
    }

    private findOldestPlayedAtTimestamp(tracks: SpotifyPlayedTrackDto[]): Date {
        let oldestDate: Date | null = null;
        
        for (const track of tracks) {
            if (oldestDate === null || track.playedAt.getTime() < oldestDate.getTime()) {
                oldestDate = track.playedAt;
            }
        }

        if (oldestDate === null) {
            throw new Error("Illegal state, must pass tracks to findOldestPlayedAtTimestamp");
        }

        return oldestDate;
    }

    private async retrieveAccountToken(accountId: number): Promise<AccountTokenDao> {
        const storedAccountToken = await this.accountTokenService.getByAccountIdAndOauthProviderAndScope(accountId, this.getProviderName(), SpotifyMusicProvider.oauthScopeRecentlyPlayed);
        if (!storedAccountToken) {
            throw new Error(SpotifyMusicProvider.ERROR_NO_ACCOUNT_TOKEN_STORED);
        }

        if (storedAccountToken.accessTokenExpiresAt > this.timeSource.getNow()) {
            return storedAccountToken;
        }

        const newOauthToken = await this.spotifyClient.getNewAccessToken(storedAccountToken.refreshToken);
        await this.accountTokenService.updateAccessToken(storedAccountToken.id, newOauthToken.accessToken, newOauthToken.expiresIn);

        const updatedAccountToken = await this.accountTokenService.getById(storedAccountToken.id);
        if (!updatedAccountToken) {
            throw new Error(SpotifyMusicProvider.ERROR_DURING_ACCOUNT_TOKEN_UPDATE);
        }

        return updatedAccountToken;
    }

    private async processAlbum(albumToProcess: AlbumDto, catalogueArtistIds: Set<number>): Promise<number> {
        const spotifyAlbumId = albumToProcess.id;
        const spotifyAlbumHref = albumToProcess.href;

        const storedAlbum = await this.getAlbumIdByProviderAlbumId(spotifyAlbumId);
        const storedAlbumId = storedAlbum !== null ? storedAlbum.albumId : null;

        const albumImages = new Set<AlbumImageDao>();
        for (const image of albumToProcess.images) {
            const albumImage = AlbumImageDao.fromInterface(image);
            
            if (albumImage === null) {
                continue;
            }

            albumImages.add(albumImage);
        }

        const album = AlbumDao.Builder
            .withName(albumToProcess.name)
            .withArtistIds(catalogueArtistIds)
            .withAlbumGroup(albumToProcess.albumGroup)
            .withAlbumType(albumToProcess.albumType)
            .withTotalTracks(albumToProcess.totalTracks)
            .withReleaseDate(albumToProcess.releaseDate)
            .withReleaseDatePrecision(albumToProcess.releaseDatePrecision)
            .withImages(albumImages)
            .build();

        const catalogueAlbumId = await this.catalogueService.upsertAlbum(storedAlbumId, album as AlbumDao);

        if (!storedAlbumId) {
            await this.addMusicProviderAlbumRelation(catalogueAlbumId, spotifyAlbumId, spotifyAlbumHref);
        }

        return catalogueAlbumId;
    }

    private async processArtists(artistsToProcess: ArtistDto[]): Promise<Set<number>> {
        const catalogueArtistIds = new Set<number>();
        if (!artistsToProcess || artistsToProcess.length <= 0) {
            return catalogueArtistIds;
        }

        for (const artistToProcess of artistsToProcess) {
            const processedArtistId = await this.processArtist(artistToProcess);
            catalogueArtistIds.add(processedArtistId);
        }

        return catalogueArtistIds;
    }

    private async processArtist(artistToProcess: ArtistDto): Promise<number> {
        const spotifyArtistId = artistToProcess.id;
        const spotifyArtistHref = artistToProcess.href;

        const storedArtist = await this.getArtistByProviderArtistId(spotifyArtistId);
        const storedArtistId = storedArtist !== null ? storedArtist.artistId : null;

        const artist = ArtistDao.Builder
            .withName(artistToProcess.name)
            .build();

        const catalogueArtistId = await this.catalogueService.upsertArtist(storedArtistId, artist as ArtistDao);

        if (!storedArtistId) {
            await this.addMusicProviderArtistRelation(catalogueArtistId, spotifyArtistId, spotifyArtistHref);
        }

        return catalogueArtistId;
    }

    private async processTrack(trackToProcess: TrackDto, catalogueArtistIds: Set<number>, catalogueAlbumId: number): Promise<number> {
        const spotifyTrackId = trackToProcess.id;
        const spotifyTrackHref = trackToProcess.href;

        const storedTrack = await this.getTrackByProviderTrackId(spotifyTrackId);
        const storedTrackId = storedTrack !== null ? storedTrack.trackId : null;

        const track = TrackDao.Builder
            .withName(trackToProcess.name)
            .withArtistIds(catalogueArtistIds)
            .withAlbumId(catalogueAlbumId)
            .withIsrc(SpotifyMusicProvider.safelyExtractIsrc(trackToProcess.externalIds))
            .withDiscNumber(trackToProcess.discNumber)
            .withTrackNumber(trackToProcess.trackNumber)
            .withDurationMs(trackToProcess.durationMs)
            .withExplicit(trackToProcess.explicit)
            .build();

        const catalogueTrackId = await this.catalogueService.upsertTrack(storedTrackId, track);

        if (!storedTrackId) {
            await this.addMusicProviderTrackRelation(catalogueTrackId, spotifyTrackId, spotifyTrackHref);
        }

        return catalogueTrackId;
    }

    static safelyExtractIsrc(dict: Record<string, unknown>): string | null {
        if (!dict) {
            return null;
        }

        try {
            const isrc = dict[SpotifyMusicProvider.DICT_KEY_ISRC] as string;
            return isrc.toUpperCase();
        } catch {
            return null;
        }
    }
    
}