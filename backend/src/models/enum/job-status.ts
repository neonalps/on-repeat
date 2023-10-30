import { isDefined } from "@src/util/common";

export enum JobStatus {
    READY = "READY",
    SCHEDULED = "SCHEDULED",
    STARTED = "STARTED",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
}

export function parseJobStatus(status: string): JobStatus {
    if (!isDefined(status)) {
        throw new Error("No string passed");
    }

    switch (status) {
        case "READY":
            return JobStatus.READY;
        case "SCHEDULED":
            return JobStatus.SCHEDULED;
        case "STARTED":
            return JobStatus.STARTED;
        case "SUCCEEDED":
            return JobStatus.SUCCEEDED;
        case "FAILED":
            return JobStatus.FAILED;
        default:
            throw new Error(`Illegal job status ${status} is not supported`);
    }
}