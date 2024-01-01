import { Component } from '@angular/core';
import { PlayedTracksService } from '@src/app/played-tracks/played-tracks.service';
import { PlayedTrackApiDto } from '@src/app/models';
import { first } from 'rxjs';
import { AuthService } from '@src/app/auth/auth.service';
import { CommonModule } from '@angular/common';
import { PlayedTrackComponent } from '@src/app/played-track/played-track.component';
import { I18nPipe } from '@src/app/i18n/i18n.pipe';
import { groupBy } from '../util/collection';

@Component({
  selector: 'app-recently-played',
  standalone: true,
  imports: [CommonModule, I18nPipe, PlayedTrackComponent],
  templateUrl: './recently-played.component.html',
  styleUrl: './recently-played.component.css'
})
export class RecentlyPlayedComponent {

  loading: boolean = false;
  groupedPlayedTracks: Map<string, PlayedTrackApiDto[]> = new Map();

  constructor(
      private readonly authService: AuthService, 
      private readonly playedTracksService: PlayedTracksService,
  ) {
    this.loadRecentlyPlayedTracks();
  }

  loadRecentlyPlayedTracks(): void {
    this.loading = true;

    this.playedTracksService.fetchRecentlyPlayedTracks(this.authService.getAccessToken() as string)
      .pipe(first())
      .subscribe(response => {
        this.processIncomingPlayedTracks(response.items);
        this.loading = false;
      });
  }

  private processIncomingPlayedTracks(items: PlayedTrackApiDto[]): void {
    const groupedTracks = groupBy(items, (track: PlayedTrackApiDto) => new Date(track.playedAt).toDateString());

    for (const [key, tracks] of groupedTracks) {
      if (this.groupedPlayedTracks.has(key)) {
        const currentTracks = this.groupedPlayedTracks.get(key) as PlayedTrackApiDto[];
        currentTracks.push(...tracks);
        this.groupedPlayedTracks.set(key, currentTracks);
      } else {
        this.groupedPlayedTracks.set(key, tracks);
      }
    }
  }

}