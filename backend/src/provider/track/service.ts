import mapper from "./mapper";
import oauthClientService from "@oauth/service";

const getAll = async (): Promise<TrackProvider[]> => {
    const providers = await mapper.getAll();
    const oauthClients = await oauthClientService.getAll();

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
    const provider = await mapper.getById(id);

    if (!provider) {
        return null;
    }

    let oauthClient = null;
    if (provider.oauthClientId) {
        oauthClient = await oauthClientService.getById(provider.oauthClientId);
    }

    return toDto(provider, oauthClient);
};

const service = {
    getAll,
    getById,
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

export default service;