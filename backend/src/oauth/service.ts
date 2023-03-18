import { validateNotBlank, validateNotNull } from "@src/util/validation";
import { OAUTH_PROVIDER_GOOGLE, OAUTH_PROVIDER_SPOTIFY } from "./constants";
import { exchangeCodeForToken, getUserProfile } from "./spotify";

const retrieveOauthToken = (dto: RetrieveOauthTokenDto): Promise<OauthTokenResponse> => {
    validateNotNull(dto, "dto");
    validateNotBlank(dto.provider, "dto.provider");
    validateNotBlank(dto.code, "dto.code");

    switch (dto.provider) {
        case OAUTH_PROVIDER_SPOTIFY:
            return retrieveSpotifyOauthToken(dto);

        case OAUTH_PROVIDER_GOOGLE:
            return retrieveGoogleOauthToken(dto);

        default:
            throw new Error(`Unknown Oauth provider ${dto.provider}`);
    }
};

const retrieveIdentityInformation = (accessToken: string): Promise<SpotifyUserProfile> => {
    validateNotBlank(accessToken, "accessToken");
    return getUserProfile(accessToken);
};

const retrieveSpotifyOauthToken = (dto: RetrieveOauthTokenDto): Promise<OauthTokenResponse> => {
    return exchangeCodeForToken(dto.code);
};

const retrieveGoogleOauthToken = (dto: RetrieveOauthTokenDto): Promise<OauthTokenResponse> => {
    return exchangeCodeForToken(dto.code);
};

const service = {
    retrieveIdentityInformation,
    retrieveOauthToken,
};

export default service;