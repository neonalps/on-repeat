import crypto from 'crypto';
import { KeyProvider } from '@src/modules/crypto/key-provider';

export class CryptoService {

    private static readonly ENCRYPTION_ALGORITHM = "aes256";
    private static readonly HMAC_ALGORITHM = "sha256";
    private static readonly IV_SIZE = 16;
    private static readonly HEX = "hex";
    private static readonly JOIN_CHAR = ":";
    private static readonly KEY_BUFFER = Buffer.from(KeyProvider.getCryptoKey(), CryptoService.HEX);

    constructor() {}

    public encrypt(plaintext: string): string {
        const iv = this.getIv();
        const cipher = crypto.createCipheriv(CryptoService.ENCRYPTION_ALGORITHM, CryptoService.KEY_BUFFER, iv)
        const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
        return [iv.toString(CryptoService.HEX), encrypted.toString(CryptoService.HEX)].join(CryptoService.JOIN_CHAR);
    };
    
    public decrypt(ciphertext: string): string {
        const ciphertextParts = ciphertext.split(CryptoService.JOIN_CHAR);
    
        if (!ciphertextParts || ciphertextParts.length != 2) {
            throw new Error("Invalid ciphertext provided");
        }
    
        const iv = Buffer.from(ciphertextParts[0], CryptoService.HEX);
        const encryptedText = Buffer.from(ciphertextParts[1], CryptoService.HEX);
        const decipher = crypto.createDecipheriv(CryptoService.ENCRYPTION_ALGORITHM, CryptoService.KEY_BUFFER, iv);
        return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
    };
    
    public hash(input: string): string {
        return this.getHmac().update(input).digest(CryptoService.HEX);
    };

    private getIv(): Buffer {
        return crypto.randomBytes(CryptoService.IV_SIZE);
    }

    private getHmac(): crypto.Hmac {
        return crypto.createHmac(CryptoService.HMAC_ALGORITHM, CryptoService.KEY_BUFFER);
    }
    
}
