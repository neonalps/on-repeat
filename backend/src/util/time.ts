const getNow = (): Date => {
    return new Date();
};

const getCurrentUnixTimestamp = (): number => {
    return Math.floor(Date.now() / 1000);
};

export {
    getCurrentUnixTimestamp,
    getNow,
}