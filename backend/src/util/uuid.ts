import { v4 as uuidv4 } from 'uuid';

const getUuid = (): string => {
    return uuidv4();
};

export {
    getUuid,
};