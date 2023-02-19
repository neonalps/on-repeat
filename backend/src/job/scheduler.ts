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
}

const scheduler = {
    run: () => {
        schedule();
        runBaseScheduler();
    }
};

export default scheduler;