import * as dotenv from 'dotenv';

export class Environment {

    private static currentEnvironment = 'dev';

    public static load(): void {

        this.currentEnvironment = process.env.ENV || 'dev';
        const result = dotenv.config({
            path: `.env.${this.currentEnvironment}`
        });
        if (result.error) {
            throw new Error(`Environment file '.env.${this.currentEnvironment}' not found`);
        }
        console.log(`Environment Loaded: ${this.currentEnvironment}`);
    }

    public static getEnvName(): string {
        return this.currentEnvironment;
    }

    public static getBaseUrl(): string {
        return process.env.BASE_URL!;
    }

    public static getLogLevel(): string {
        return process.env.LOG_LEVEL ?? 'info';
    }

    public static getMaxResponseTime(): number {
        return Number(process.env.MAX_RESPONSE_TIME) || 2000;
    }

}