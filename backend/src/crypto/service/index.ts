import * as crypto from 'crypto';
import { keyProvider } from "@crypto/key-provider";

const ALGORITHM = "aes256";
const IV_SIZE = 16;

const key = keyProvider.getCryptoKey();

const encrypt = (plaintext: string) => {
    
};

const getIv = () => crypto.randomBytes(IV_SIZE);

const createCipher = () => {
    return crypto.createCipheriv(ALGORITHM, key, getIv())
};

export const cryptoService = {
    encrypt
};