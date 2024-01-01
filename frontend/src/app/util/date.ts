import { validateDefined } from "@src/app/util/validation";

export function getDateWithoutTime(input: Date): Date {
    validateDefined(input, "input");

    return new Date(input.toDateString());
}

export function getDateFromUnixTimestamp(unix: number): Date {
    return new Date(unix * 1000);
}