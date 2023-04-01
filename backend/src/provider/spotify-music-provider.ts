import catalogueService from "@src/catalogue/service";
import { validateNotNull } from "@src/util/validation";
import { hasPlayedTrackAlreadyBeenProcessed } from "./played-tracks";
import { createPlayedTrack } from "./service";

const PROVIDER_ID = 1;
const PROVIDER_NAME = "spotify";

class SpotifyMusicProvider extends MusicProvider {
    
    constructor() {
        super(PROVIDER_ID, PROVIDER_NAME);
    }

    async processPlayedTracks(userId: number, playedTracks: PlayedTrackDto[]): Promise<void> {
        validateNotNull(userId, "userId");
        validateNotNull(playedTracks, "playedTracks");

        for (const playedTrack of playedTracks) {
            try {
                const playedAt = playedTrack.playedAt;
                if (!playedAt) {
                    throw new Error("No playedAt timestamp found");
                }

                if (await hasPlayedTrackAlreadyBeenProcessed(userId, this.id, playedAt)) {
                    continue;
                }

                const trackToProcess = playedTrack.track;
                if (!trackToProcess) {
                    throw new Error("No track to process found");
                }

                let catalogueAlbumId: number | null = null;
                const albumToProcess = trackToProcess.album;
                if (albumToProcess) {
                    const storedAlbumId = await this.getAlbumIdByProviderAlbumId(albumToProcess.id);
                    catalogueAlbumId = await catalogueService.upsertAlbum(storedAlbumId, albumToProcess);

                    if (!storedAlbumId) {
                        await this.addAlbumIdAndTrackProviderAlbumIdRelation(catalogueAlbumId, albumToProcess.id);
                    }
                }

                let catalogueArtistIds: number[] = [];
                const artistsToProcess = trackToProcess.artists;
                if (artistsToProcess && artistsToProcess.length > 0) {
                    for (const playedTrackArtist of artistsToProcess) {
                        const storedArtistId = await this.getArtistIdByProviderArtistId(playedTrackArtist.id);

                        const artistToProcess = ArtistDao.Builder
                            .withName(playedTrackArtist.name)
                            .build();

                        const catalogueArtistId = await catalogueService.upsertArtist(storedArtistId, artistToProcess);
                        catalogueArtistIds.push(catalogueArtistId);

                        if (!storedArtistId) {
                            await this.addArtistIdAndTrackProviderArtistIdRelation(catalogueArtistId, playedTrackArtist.id);
                        }
                    }
                }
    
                const storedTrackId = await this.getTrackIdByProviderTrackId(trackToProcess.id);
                const catalogueTrackId = await catalogueService.upsertTrack(storedTrackId, trackToProcess, catalogueArtistIds, catalogueAlbumId);

                if (!storedTrackId) {
                    await this.addTrackIdAndTrackProviderTrackIdRelation(catalogueTrackId, trackToProcess.id);
                }

                const playedTrackDto = new CreatePlayedTrackDtoBuilder()
                    .setAccountId(userId)
                    .setMusicProviderId(this.id)
                    .setTrackId(catalogueTrackId)
                    .setPlayedAt(playedAt)
                    .setExcludeFromStatistics(false)
                    .build();
    
                await createPlayedTrack(playedTrackDto);
            } catch (ex) {
                // TOOD log
            }
        }
    }

    async getTrackIdByProviderTrackId(providerTrackId: string): Promise<number | null> {
        throw new Error("Method not implemented.");
    }

    async getArtistIdByProviderArtistId(providerArtistId: string): Promise<number | null> {
        throw new Error("Method not implemented.");
    }
    
    async getAlbumIdByProviderAlbumId(providerAlbumId: string): Promise<number | null> {
        throw new Error("Method not implemented.");
    }

    async addTrackIdAndTrackProviderTrackIdRelation(trackId: number, providerTrackId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addArtistIdAndTrackProviderArtistIdRelation(artistId: number, providerArtistId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addAlbumIdAndTrackProviderAlbumIdRelation(albumId: number, providerAlbumId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}