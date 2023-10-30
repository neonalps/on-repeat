import { JobHelper } from "@src/modules/job/helper";
import { FetchSpotifyRecentlyPlayedTracksJob } from "@src/modules/job/processors/fetch-spotify-recently-played-tracks";
import { JobExecutionContext } from "@src/modules/scheduler/scheduler";
import dependencyManager from "@src/di/manager";
import { Dependencies } from "@src/di/dependencies";
import { SpotifyMusicProvider } from "@src/modules/music-provider/spotify/music-provider";

export interface JobProcessor {
    process(executionContext: JobExecutionContext): Promise<void>;
    getJobId(): number;
}

export class JobRepository {

    private static jobs: Map<number, JobProcessor> = new Map();

    private constructor() {}

    public static initJobs(): void {
        const spotifyMusicProvider = dependencyManager.get<SpotifyMusicProvider>(Dependencies.SpotifyMusicProvider);

        const fetchSpotifyRecentlyPlayedTracksJob = new FetchSpotifyRecentlyPlayedTracksJob(spotifyMusicProvider);
        this.jobs.set(JobHelper.JOB_ID_FETCH_SPOTIFY_RECENT_PLAYED_TRACKS, fetchSpotifyRecentlyPlayedTracksJob);
    }

    public static getJob(id: number): JobProcessor {
        if (!this.jobs.has(id)) {
            throw new Error(`Job with id ${id} has not been registered`);
        }

        return this.jobs.get(id) as JobProcessor;
    }

}