import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {

    constructor(private readonly request: APIRequestContext) {}

    public async get(endpoint: string): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : GET');

        const response = await this.request.get(endpoint);
        await this.logResponse(response);
        return response;
    }

    public async post(endpoint: string, body: unknown): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : POST');

        // Uncomment for debugging
        // console.log('Request Body:\n', JSON.stringify(body, null, 2));

        const response = await this.request.post(endpoint, {
            data: body
        });

        await this.logResponse(response);
        return response;
    }

    public async put(endpoint: string, body: unknown): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : PUT');

        // Uncomment for debugging
        // console.log('Request Body:\n', JSON.stringify(body, null, 2));
        const response = await this.request.put(endpoint, {
            data: body
        });

        await this.logResponse(response);
        return response;
    }

    public async delete(endpoint: string): Promise<APIResponse> {

        console.log('\n==========================================');
        console.log('HTTP Method : DELETE');

        const response = await this.request.delete(endpoint);
        await this.logResponse(response);
        return response;
    }

    private async logResponse(response: APIResponse): Promise<void> {

        console.log('Request URL :', response.url());
        console.log('Status Code :', response.status());
        // Uncomment for debugging
        // try {
        //     console.log('Response Body:\n', JSON.stringify(await response.json(), null, 2));
        // } catch {
        //     console.log('Response Body:\n', await response.text());
        // }
        console.log('==========================================\n');
    }
}