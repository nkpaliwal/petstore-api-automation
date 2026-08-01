import * as dotenv from 'dotenv';

export class Environment {

    public static load(): void {

        const env = process.env.ENV || 'dev';

        const result = dotenv.config({
            path: `.env.${env}`
        });

        if (result.error) {
            throw new Error(`Environment file '.env.${env}' not found`);
        }
        console.log(`Environment Loaded: ${env}`);
    }
}