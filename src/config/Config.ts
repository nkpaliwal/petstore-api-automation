export class Config {

    public static getBaseUrl(): string {

        const baseUrl = process.env.BASE_URL;

        if (!baseUrl) {
            throw new Error('BASE_URL is not configured.');
        }

        return baseUrl;
    }

    public static getTimeout(): number {

        const timeout = process.env.TIMEOUT;

        if (!timeout) {
            return 30000;
        }

        return Number(timeout);
    }
}