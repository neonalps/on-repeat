import cron from 'node-cron';

const CRON_PATTERN_EVERY_MINUTE = '* * * * *';

const runBaseScheduler = () => {
    // task scheduler runs every minute
    cron.schedule(CRON_PATTERN_EVERY_MINUTE, () => {
        schedule();
    });
};

const schedule = () => {
    // task that is executed on every scheduler interval
    console.log('scheduling');
}

export const scheduler = {
    run: () => {
        schedule();
        runBaseScheduler();
    }
};