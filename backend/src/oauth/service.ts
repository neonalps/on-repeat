import mapper from "./mapper";

const getAll = async (): Promise<OauthClient[]> => {
    const clients = await mapper.getAll();

    if (!clients || clients.length === 0) {
        return [];
    }

    return clients.map(toDto);
};

const getById = async (id: number): Promise<OauthClient | null> => {
    const client = await mapper.getById(id);

    if (!client) {
        return null;
    }

    return toDto(client);
};

const service = {
    getAll,
    getById,
};

const toDto = (dao: OauthClientDao): OauthClient => {
    return { ...dao };
};

export default service;