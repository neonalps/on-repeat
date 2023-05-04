export class TimeSource {
    public getNow(): Date {
        return new Date();
    };
    
    public getNowPlusSeconds(seconds: number = 0): Date {
        return this.addSeconds(this.getNow(), seconds);
    }

    public addSeconds(from: Date, seconds: number = 0): Date {
        return new Date(from.getTime() + seconds * 1000);
    }
    
    public getCurrentUnixTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    };
}