export class Base64Utils {

    public static decode(toDecode: string): string {
        return Buffer.from(toDecode, 'base64').toString('utf8');
    }

    public static encode(toEncode: string): string {
        return Buffer.from(toEncode).toString('base64');
    }

}