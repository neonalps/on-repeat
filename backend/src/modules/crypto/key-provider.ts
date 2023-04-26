import { getCryptoKey } from "@src/config";

export class KeyProvider {

    public static getCryptoKey(): string {
        return getCryptoKey();
    }

}