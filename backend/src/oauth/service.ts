import mapper from "./mapper";
import cryptoService from "@sec/service";
import { validateNotNull } from "@util/validation";

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
    validateNotNull(id, "id");

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

const toDto = (dao: OauthClientDao): OauthClient => {
    return { ...dao };
};

const service = {
    getAll,
    getById,
};

export default service;