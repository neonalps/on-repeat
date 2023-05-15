import { requireNonNull } from "@src/util/common";
import { MusicProviderMapper } from "./mapper";
import { validateNotNull } from "@src/util/validation";

export class MusicProviderService {

    private readonly mapper: MusicProviderMapper;

    constructor(mapper: MusicProviderMapper) {
        this.mapper = requireNonNull(mapper);
    }

    public async getExternalUrlsForAlbum(albumId: number): Promise<Record<string, string>> {
        validateNotNull(albumId, "albumId");

        return this.mapper.getExternalUrlsForAlbum(albumId);
    }

    public async getExternalUrlsForArtist(artistId: number): Promise<Record<string, string>> {
        validateNotNull(artistId, "artistId");

        return this.mapper.getExternalUrlsForArtist(artistId);
    }

}