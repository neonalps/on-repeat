import { IdNameDao } from "@src/models/classes/dao/id-name";

export function createIdNameDao(id: number, name: string): IdNameDao {
    return IdNameDao.Builder
        .withId(id)
        .withName(name)
        .build();
}