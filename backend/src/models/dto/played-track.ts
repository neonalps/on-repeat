import { TrackDto } from "@src/models/dto/track";

export interface SpotifyPlayedTrackDto {
    track: TrackDto,
    playedAt: Date;
}