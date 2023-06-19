export class TimeSource {

    public getNow(): Date {
        return new Date();
    };
    
    public getNowPlusSeconds(seconds: number = 0): Date {
        return this.getNowPlusMilliSeconds(seconds * 1000);
    }

    public getNowPlusMilliSeconds(milliSeconds: number = 0): Date {
        return this.addMilliSeconds(this.getNow(), milliSeconds);
    }

    public addSeconds(from: Date, seconds: number = 0): Date {
        return this.addMilliSeconds(from, seconds * 1000);
    }

    public addMilliSeconds(from: Date, milliseconds: number): Date {
        return new Date(from.getTime() + milliseconds);
    }
    
    public getCurrentUnixTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    }

}