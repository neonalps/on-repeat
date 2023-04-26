import cron from 'node-cron';

export class Scheduler {

    private static CRON_PATTERN_EVERY_MINUTE = '* * * * *';

    constructor() {}

    public run(): void {
        cron.schedule(Scheduler.CRON_PATTERN_EVERY_MINUTE, () => {
            this.schedule();
        })
    }

    private schedule(): void {
        console.log('scheduling jobs');
    }

}