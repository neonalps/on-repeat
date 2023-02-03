import mapper from "./mapper";
import cryptoService from "@sec/service";

const getAll = async (): Promise<OauthClient[]> => {
    const clients = await mapper.getAll();

    if (!clients || clients.length === 0) {
        return [];
    }

    return clients
        .map(client => {
            return { ...client, clientSecret: decryptClientSecret(client.clientSecret) };
        })
        .map(toDto);
};

const getById = async (id: number): Promise<OauthClient | null> => {
    const client = await mapper.getById(id);

    if (!client) {
        return null;
    }

    client.clientSecret = decryptClientSecret(client.clientSecret);

    return toDto(client);
};

const decryptClientSecret = (encryptedSecret: string): string => {
    return cryptoService.decrypt(encryptedSecret);
};

const service = {
    getAll,
    getById,
};

const toDto = (dao: OauthClientDao): OauthClient => {
    return { ...dao };
};

export default service;