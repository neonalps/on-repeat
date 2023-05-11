import { SpotifyAlbumApiDto, SpotifyAlbumDto, SpotifyArtistApiDto, SpotifyArtistDto, SpotifyCursorApiDto, SpotifyCursorDto, SpotifyImageApiDto, SpotifyImageDto, SpotifyPlayedTrackApiDto, SpotifyPlayedTrackDto, SpotifyRecentlyPlayedTracksApiResponseDto, SpotifyRecentlyPlayedTracksResponseDto, SpotifyTrackApiDto, SpotifyTrackDto } from "./api-types";

export class SpotifyApiResponseConverter {

    public static convertRecentlyPlayedTracksApiResponse(apiResponse: SpotifyRecentlyPlayedTracksApiResponseDto): SpotifyRecentlyPlayedTracksResponseDto {
        return {
            cursors: SpotifyApiResponseConverter.convertCursors(apiResponse.cursors),
            href: apiResponse.href,
            items: SpotifyApiResponseConverter.convertPlayedTrackItems(apiResponse.items),
            limit: apiResponse.limit,
            next: apiResponse.next,
        }
    }

    private static convertCursors(cursor: SpotifyCursorApiDto): SpotifyCursorDto {
        return {
            after: cursor.after,
            before: cursor.before,
        };
    }

    private static convertPlayedTrackItems(items: SpotifyPlayedTrackApiDto[]): SpotifyPlayedTrackDto[] {
        if (!items || items.length === 0) {
            return [];
        }

        return items.map(SpotifyApiResponseConverter.convertPlayedTrackItem);
    }

    private static convertPlayedTrackItem(item: SpotifyPlayedTrackApiDto): SpotifyPlayedTrackDto {
        return {
            track: SpotifyApiResponseConverter.convertTrack(item.track),
            playedAt: item.played_at,
        };
    }

    private static convertTrack(item: SpotifyTrackApiDto): SpotifyTrackDto {
        return {
            album: SpotifyApiResponseConverter.convertAlbum(item.album),
            artists: SpotifyApiResponseConverter.convertArtists(item.artists),
            availableMarkets: item.available_markets,
            discNumber: item.disc_number,
            durationMs: item.duration_ms,
            explicit: item.explicit,
            externalIds: item.external_ids,
            externalUrls: item.external_urls,
            href: item.href,
            id: item.id,
            isLocal: item.is_local,
            name: item.name,
            popularity: item.popularity,
            previewUrl: item.preview_url,
            trackNumber: item.track_number,
            type: item.type,
            uri: item.uri,
        };
    }

    private static convertArtists(items: SpotifyArtistApiDto[]): SpotifyArtistDto[] {
        if (!items || items.length === 0) {
            return [];
        }

        return items.map(SpotifyApiResponseConverter.convertArtist);
    }

    private static convertArtist(item: SpotifyArtistApiDto): SpotifyArtistDto {
        return {
            externalUrls: item.external_urls,
            href: item.href,
            id: item.id,
            name: item.name,
            type: item.type,
            uri: item.uri,
        };
    }

    private static convertAlbum(item: SpotifyAlbumApiDto): SpotifyAlbumDto {
        return {
            albumGroup: item.album_group,
            albumType: item.album_type,
            availableMarkets: item.available_markets,
            artists: SpotifyApiResponseConverter.convertArtists(item.artists),
            externalUrls: item.external_urls,
            href: item.href,
            id: item.id,
            images: SpotifyApiResponseConverter.convertImages(item.images),
            isPlayable: item.is_playable,
            name: item.name,
            releaseDate: SpotifyApiResponseConverter.convertReleaseDate(item.release_date),
            releaseDatePrecision: item.release_date_precision,
            totalTracks: item.total_tracks,
            type: item.type,
            uri: item.uri,
        }
    }

    private static convertImages(items: SpotifyImageApiDto[]): SpotifyImageDto[] {
        if (!items || items.length === 0) {
            return [];
        }

        return items.map(SpotifyApiResponseConverter.convertImage);
    }

    private static convertImage(item: SpotifyImageApiDto): SpotifyImageDto {
        return {
            height: item.height,
            url: item.url,
            width: item.width,
        }
    }

    private static convertReleaseDate(releaseDate: string): Date {
        return new Date(Date.parse(releaseDate));
    };

}