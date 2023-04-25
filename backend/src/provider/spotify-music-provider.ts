import catalogueService from "@src/catalogue/service";
import { validateNotNull } from "@src/util/validation";
import { MusicProvider } from "./abstract-music-provider";
import { hasPlayedTrackAlreadyBeenProcessed } from "./played-tracks";
import { createPlayedTrack } from "./service";
import { TrackDao } from "@src/models/classes/dao/track";

const PROVIDER_ID = 1;
const PROVIDER_NAME = "spotify";

export class SpotifyMusicProvider extends MusicProvider {
    
    constructor() {
        super(PROVIDER_ID, PROVIDER_NAME);
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

                if (await hasPlayedTrackAlreadyBeenProcessed(accountId, this.providerId, playedAt)) {
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
    
                await createPlayedTrack(playedTrackDto);
            } catch (ex) {
                // TOOD log
            }
        }
    }

    private async processAlbum(albumToProcess: AlbumDto): Promise<number> {
        const storedAlbum = await this.getAlbumIdByProviderAlbumId(albumToProcess.id);
        const storedAlbumId = storedAlbum !== null ? storedAlbum.albumId : null;
        const catalogueAlbumId = await catalogueService.upsertAlbum(storedAlbumId, albumToProcess);

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

            const catalogueArtistId = await catalogueService.upsertArtist(storedArtistId, artist);
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

        const track = TrackDao.Builder
            .wi
            .withArtistIds(catalogueArtistIds)
            .withAlbumId(catalogueAlbumId)

        const catalogueTrackId = await catalogueService.upsertTrack(storedTrackId, trackToProcess);

        if (!storedTrackId) {
            await this.addMusicProviderTrackRelation(catalogueTrackId, trackToProcess.id, trackToProcess.href);
        }

        return catalogueTrackId;
    }
    
}