import { isDefined } from "@src/util/common";

const validateNotNull = (input: unknown, property: string): void => {
    if (!isDefined(input)) {
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

const validateTrue = (input: boolean, errorMessage: string): void => {
    if (input !== true) {
        throw new Error(errorMessage);
    }
};

const validateFalse = (input: boolean, errorMessage: string): void => {
    if (input !== false) {
        throw new Error(errorMessage);
    }
};

export {
    validateNotBlank,
    validateNotEmpty,
    validateFalse,
    validateNotNull,
    validateTrue,
};