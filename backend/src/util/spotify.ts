const getAuthHeader = (clientId: string, clientSecret: string): string => {
    return Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64');
};

export {
    getAuthHeader,
};