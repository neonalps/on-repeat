import mapper from "./mapper";
import { validateNotBlank, validateNotNull } from "@util/validation";
import { getUuid } from "@util/uuid";
import { hash } from "@src/sec/service";

const getOrCreate = async (email: string): Promise<User | null> => {
    validateNotBlank(email, "email");

    const existingUser = await getByEmail(email);

    if (existingUser) {
        return existingUser;
    }

    const user: CreateUserDto = {
        id: getUuid(),
        hashedEmail: hash(email),
        enabled: true,
    };

    return create(user);
};

const create = async (user: CreateUserDto): Promise<User | null> => {
    validateNotNull(user, "user");
    validateNotBlank(user.id, "user.id");
    validateNotBlank(user.hashedEmail, "user.hashedEmail");

    const userId = await mapper.create({ ...user });

    if (user.id !== userId) {
        throw new Error("Failed to create user");
    }

    return getById(userId);
};

const getAll = async (): Promise<User[]> => {
    const users = await mapper.getAll();

    if (!users || users.length === 0) {
        return [];
    }

    return users.map(toDto);
}

const getByEmail = async (email: string): Promise<User | null> => {
    validateNotNull(email, "email");

    const userDao = await mapper.getByHashedEmail(hash(email));

    if (userDao == null) {
        return null;
    }

    return toDto(userDao);
}

const getById = async (id: string): Promise<User | null> => {
    validateNotNull(id, "id");

    const userDao = await mapper.getById(id);

    if (userDao == null) {
        return null;
    }

    return toDto(userDao);
};

const toDto = (userDao: UserDao): User => {
    return { 
        ...userDao,
     };
}

const service = {
    getAll,
    getByEmail,
    getById,
    getOrCreate,
};

export default service;