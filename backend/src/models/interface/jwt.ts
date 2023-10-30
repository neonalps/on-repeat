export interface Jwt {
    iss: string;
    aud: string;
    sub: string;
    scp: string[];
    iat: number;
    exp: number;
    nbf: number;
}