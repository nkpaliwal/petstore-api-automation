import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from '../../logger/Logger';
import { ResponseTimeValidator } from '../../validators/ResponseTimeValidator';

export class ApiClient {

    constructor(private readonly request: APIRequestContext) {}

    public async get(endpoint: string): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : GET');
        Logger.line();
        Logger.info('HTTP Method : GET');

        const startTime = Date.now();
        const response = await this.request.get(endpoint);
        const responseTime = Date.now() - startTime;
        ResponseTimeValidator.record('GET', response.url(), responseTime);

        await this.logResponse(response);
        return response;
    }

    public async post(endpoint: string, body: unknown): Promise<APIResponse> {

        // Uncomment for debugging
        console.log('\n==========================================');
        console.log('HTTP Method : POST');
        console.log('Request Body:\n', JSON.stringify(body, null, 2));

        
        Logger.line();
        Logger.info('HTTP Method : POST');
        Logger.debug(`Request Body:\n${JSON.stringify(body, null, 2)}`);
        
        const startTime = Date.now();
        const response = await this.request.post(endpoint, {
            data: body
        });
        const responseTime = Date.now() - startTime;
        ResponseTimeValidator.record('POST', response.url(), responseTime);

        await this.logResponse(response);
        return response;
    }

    public async put(endpoint: string, body: unknown): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : PUT');

        Logger.line();
        Logger.info('HTTP Method : PUT');
        Logger.debug(`Request Body:\n${JSON.stringify(body, null, 2)}`);
        const startTime = Date.now();
        const response = await this.request.put(endpoint, {
            data: body
        });
        const responseTime = Date.now() - startTime;
        ResponseTimeValidator.record('PUT', response.url(), responseTime); 

        await this.logResponse(response);
        return response;
    }

    public async delete(endpoint: string): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : DELETE');
        Logger.line();
        Logger.info('HTTP Method : DELETE');

        const startTime = Date.now();
        const response = await this.request.delete(endpoint);
        const responseTime = Date.now() - startTime;
        ResponseTimeValidator.record('DELETE', response.url(), responseTime);

        await this.logResponse(response);
        return response;
    }

    private async logResponse(response: APIResponse): Promise<void> {

        console.log('Request URL :', response.url());
        console.log('Status Code :', response.status());
        console.log('==========================================\n');

        Logger.info(`Request URL : ${response.url()}`);
        if (response.ok()) {
            Logger.success(`Status Code : ${response.status()}`);
        } else if (response.status() >= 400 && response.status() < 500) {
            Logger.warn(`Status Code : ${response.status()}`);
        } else {
            Logger.error(`Status Code : ${response.status()}`);
        }
        Logger.line();
    }
}