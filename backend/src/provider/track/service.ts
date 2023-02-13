import mapper from "./mapper";
import { validateNotNull } from "@util/validation";

const getAll = async (): Promise<TrackProvider[]> => {
    const providers = await mapper.getAll();
    const oauthClients: OauthClient[] = [];

    if (!providers || providers.length === 0) {
        return [];
    }

    return providers.map(provider => {
        let oauthClient = null;
        if (provider.oauthClientId) {
            oauthClient = oauthClients.find(client => client.id === provider.oauthClientId) || null;
        }
        return toDto(provider, oauthClient);
    });
};

const getById = async (id: number): Promise<TrackProvider | null> => {
    validateNotNull(id, "id");

    const provider = await mapper.getById(id);

    if (!provider) {
        return null;
    }

    return toDto(provider, null);
};

const toDto = (dao: TrackProviderDao, client: OauthClient | null): TrackProvider => {
    return {
        id: dao.id,
        name: dao.name,
        displayName: dao.displayName,
        enabled: dao.enabled,
        createdAt: dao.createdAt,
        oauthClient: client
    };
};

const service = {
    getAll,
    getById,
};

export default service;