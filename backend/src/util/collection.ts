export const setEquals = <T> (first: Set<T>, second: Set<T>): boolean => {
    const baseEquals = !!first && !!second && first.size === second.size;

    if (!baseEquals) {
        return false;
    }

    // primitive comparison
    if (["number", "string", "boolean", "symbol", "bigint"].includes(typeof first)) {
        return [...first].every(item => second.has(item));
    }

    try {
        // try to use the object's equals method
        return (first as any).equals(second);
    } catch {
        // if this throws an exception, fall back to the object's memory location comparison
        return first === second;
    }
};