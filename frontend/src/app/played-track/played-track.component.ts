import { Component, Input } from '@angular/core';
import { ImageApiDto, PlayedTrackApiDto } from '@src/app/models';

@Component({
  selector: 'app-played-track',
  standalone: true,
  imports: [],
  templateUrl: './played-track.component.html',
  styleUrl: './played-track.component.css'
})
export class PlayedTrackComponent {

  @Input() playedTrack!: PlayedTrackApiDto;

  getArtists(): string {
    return this.playedTrack.track.artists.map(artist => artist.name).join(", ");
  }

  getTitle(): string {
    return this.playedTrack.track.name;
  }

  getPlayedAt(): Date {
    return this.playedTrack.playedAt;
  }

  getImageUrl(): string | undefined {
    return this.getImage()?.url;
  }

  getImageHeight(): number | undefined {
    return 64;
  }

  getImageWidth(): number | undefined {
    return 64;
  }

  private getImage(): ImageApiDto | undefined {
    return this.playedTrack.track.album?.images[0];
  }

}
