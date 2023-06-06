export class DateUtils {

    public static getUnixTimestampFromDate(date: Date): number {
        return Math.floor(date.getTime() / 1000);
    }

    public static getDateFromUnixTimestamp(unixTimestamp: number): Date {
        return new Date(unixTimestamp * 1000);
    }

}