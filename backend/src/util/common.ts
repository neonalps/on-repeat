const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

export const getQueryString = (params: Record<string, any>): string => {
    return new URLSearchParams(params).toString();
};

export const generateRandomString = (size: number) => {
    const result = [];
    for (let i = 0; i < size; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
};

export const removeNull = <T> (item: T): boolean => item !== null;

export const requireNonNull = <T> (arg: T): T => {
    if (arg === null || arg === undefined) {
        throw new Error(`null argument passed to requireNonNull`);
    }

    return arg;
}

export function isDefined(toCheck: unknown) {
    return toCheck !== null && toCheck !== undefined;
}

export function isNotDefined(toCheck: unknown) {
    return !isDefined(toCheck);
}