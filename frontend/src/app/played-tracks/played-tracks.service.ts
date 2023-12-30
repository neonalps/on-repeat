import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { PaginatedResponseDto, PlayedTrackApiDto } from '@src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayedTracksService {

  private static readonly PLAYED_TRACKS_URL =`${environment.apiBaseUrl}/api/v1/played-tracks`;

  constructor(private readonly http: HttpClient) {}

  fetchRecentlyPlayedTracks(accessToken: string): Observable<PaginatedResponseDto<PlayedTrackApiDto>> {
    return this.http.get<PaginatedResponseDto<PlayedTrackApiDto>>(PlayedTracksService.PLAYED_TRACKS_URL, 
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
  }

}
