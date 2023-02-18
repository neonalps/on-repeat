const getNow = (): Date => {
    return new Date();
};

const getNowPlusSeconds = (seconds: number): Date => {
    const now = getNow();
    return new Date(now.getTime() + seconds * 1000);
}

const getCurrentUnixTimestamp = (): number => {
    return Math.floor(Date.now() / 1000);
};

export {
    getCurrentUnixTimestamp,
    getNow,
    getNowPlusSeconds,
}