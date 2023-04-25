import { v4 as uuidv4 } from 'uuid';

export class UuidSource {

    constructor() {}

    public getRandomUuid(): string {
        return uuidv4();
    }

}