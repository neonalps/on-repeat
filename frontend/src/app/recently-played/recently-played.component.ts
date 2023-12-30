import { Component } from '@angular/core';
import { PlayedTracksService } from '@src/app/played-tracks/played-tracks.service';
import { PlayedTrackApiDto } from '@src/app/models';
import { first } from 'rxjs';
import { AuthService } from '@src/app/auth/auth.service';
import { CommonModule } from '@angular/common';
import { PlayedTrackComponent } from '@src/app/played-track/played-track.component';

@Component({
  selector: 'app-recently-played',
  standalone: true,
  imports: [CommonModule, PlayedTrackComponent],
  templateUrl: './recently-played.component.html',
  styleUrl: './recently-played.component.css'
})
export class RecentlyPlayedComponent {

  loading: boolean = false;
  playedTracks: PlayedTrackApiDto[] = [];

  constructor(private readonly authService: AuthService, private readonly playedTracksService: PlayedTracksService) {
    this.loadRecentlyPlayedTracks();
  }

  loadRecentlyPlayedTracks(): void {
    this.loading = true;

    this.playedTracksService.fetchRecentlyPlayedTracks(this.authService.getAccessToken() as string)
      .pipe(first())
      .subscribe(response => {
        this.playedTracks = response.items;
        this.loading = false;
      });
  }

}
