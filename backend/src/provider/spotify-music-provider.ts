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

                let catalogueAlbumIds: number | null = null;
                const albumToProcess = trackToProcess.album;
                if (albumToProcess) {
                    const storedAlbum = await this.getAlbumByProviderAlbumId(albumToProcess.id);
                    catalogueAlbumIds = await catalogueService.upsertAlbum(storedAlbum, albumToProcess);

                    if (!storedAlbum) {
                        await this.addAlbumAndTrackProviderAlbumIdRelation(catalogueAlbumIds, albumToProcess.id);
                    }
                }

                let catalogueArtistIds: number[] = [];
                const artistsToProcess = trackToProcess.artists;
                if (artistsToProcess && artistsToProcess.length > 0) {
                    for (const playedTrackArtist of artistsToProcess) {
                        const storedArtist = await this.getArtistByProviderArtistId(playedTrackArtist.id);
                        const catalogueArtistId = await catalogueService.upsertArtist(storedArtist, playedTrackArtist);
                        catalogueArtistIds.push(catalogueArtistId);

                        if (!storedArtist) {
                            await this.addArtistAndTrackProviderArtistIdRelation(catalogueArtistId, playedTrackArtist.id);
                        }
                    }
                }
    
                const storedTrack = await this.getTrackByProviderTrackId(trackToProcess.id);
                const catalogueTrackId = await catalogueService.upsertTrack(storedTrack, trackToProcess, catalogueArtistIds, catalogueAlbumIds);

                if (!storedTrack) {
                    await this.addTrackAndTrackProviderTrackIdRelation(catalogueTrackId, trackToProcess.id);
                }

                const playedTrackDto = new CreatePlayedTrackDtoBuilder()
                    .setAccountId(userId)
                    .setMusicProviderId(this.id)
                    .setTrackId(catalogueTrackId)
                    .setPlayedAt(playedAt)
                    .build();
    
                await createPlayedTrack(playedTrackDto);
            } catch (ex) {
                // TOOD log
            }
        }
    }

    async getTrackByProviderTrackId(providerTrackId: string): Promise<Track> {
        throw new Error("Method not implemented.");
    }

    async getArtistByProviderArtistId(providerArtistId: string): Promise<Artist> {
        throw new Error("Method not implemented.");
    }
    
    async getAlbumByProviderAlbumId(providerAlbumId: string): Promise<Album> {
        throw new Error("Method not implemented.");
    }

    async addTrackAndTrackProviderTrackIdRelation(trackId: number, providerTrackId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addArtistAndTrackProviderArtistIdRelation(artistId: number, providerArtistId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addAlbumAndTrackProviderAlbumIdRelation(albumId: number, providerAlbumId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}