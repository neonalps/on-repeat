import { ArtistApiDto } from "@src/models/api/artist";
import { ArtistDao } from "@src/models/classes/dao/artist";

export class ArtistConverter {

    public static convertToApiDto(artist: ArtistDao): ArtistApiDto | null {
        if (!artist) {
            return null;
        }

        return {
            id: artist.id,
            name: artist.name,
        };
    }

}