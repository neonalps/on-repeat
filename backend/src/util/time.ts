export class TimeSource {
    public getNow(): Date {
        return new Date();
    };
    
    public getNowPlusSeconds(seconds: number = 0): Date {
        const now = this.getNow();
        return new Date(now.getTime() + seconds * 1000);
    }
    
    public getCurrentUnixTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    };
}