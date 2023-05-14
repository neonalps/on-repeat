export class DateUtils {

    public static getUnixTimestampFromDate(date: Date): number {
        return Math.floor(date.getTime() / 1000);
    }

}