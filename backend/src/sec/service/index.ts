import crypto from 'crypto';
import { keyProvider } from "@sec/key-provider";

const ENCRYPTION_ALGORITHM = "aes256";
const HMAC_ALGORITHM = "sha256";
const IV_SIZE = 16;
const HEX = "hex";
const JOIN_CHAR = ":";

const KEY_BUFFER = Buffer.from(keyProvider.getCryptoKey(), HEX);

const getIv = () => crypto.randomBytes(IV_SIZE);

const getHmac = () => crypto.createHmac(HMAC_ALGORITHM, KEY_BUFFER);

export const encrypt = (plaintext: string): string => {
    const iv = getIv();
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, KEY_BUFFER, iv)
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    return [iv.toString(HEX), encrypted.toString(HEX)].join(JOIN_CHAR);
};

export const decrypt = (ciphertext: string): string => {
    const ciphertextParts = ciphertext.split(JOIN_CHAR);

    if (!ciphertextParts || ciphertextParts.length != 2) {
        throw new Error("Invalid ciphertext provided");
    }

    const iv = Buffer.from(ciphertextParts[0], HEX);
    const encryptedText = Buffer.from(ciphertextParts[1], HEX);
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, KEY_BUFFER, iv);
    return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
};

export const hash = (input: string): string => {
    return getHmac().update(input).digest(HEX);
};