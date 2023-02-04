const validateNotNull = (input: unknown, property: string): void => {
    if (!input) {
        throw new Error(`${property} must not be null or undefined`);
    }
};

const validateNotBlank = (input: string, property: string): void => {
    if (input.trim().length <= 0) {
        throw new Error(`${property} must not be blank`);
    }
};

export {
    validateNotBlank,
    validateNotNull,
};