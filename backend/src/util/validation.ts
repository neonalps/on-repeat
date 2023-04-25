const validateNotNull = (input: unknown, property: string): void => {
    if (!input) {
        throw new Error(`${property} must not be null or undefined`);
    }
};

const validateNotEmpty = (input: Set<unknown>, property: string): void => {
    if (!input || input.size === 0) {
        throw new Error(`${property} must not be empty`);
    }
};

const validateNotBlank = (input: string, property: string): void => {
    if (!input || input.trim().length <= 0) {
        throw new Error(`${property} must not be blank`);
    }
};

export {
    validateNotBlank,
    validateNotEmpty,
    validateNotNull,
};