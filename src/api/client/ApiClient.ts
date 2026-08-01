import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {

    constructor(private readonly request: APIRequestContext) {}

    public async get(endpoint: string): Promise<APIResponse> {

        return await this.request.get(endpoint);

    }

    public async post(endpoint: string, body: unknown): Promise<APIResponse> {

        return await this.request.post(endpoint, {
            data: body
        });

    }

    public async put(endpoint: string, body: unknown): Promise<APIResponse> {

        return await this.request.put(endpoint, {
            data: body
        });

    }

    public async delete(endpoint: string): Promise<APIResponse> {

        return await this.request.delete(endpoint);

    }

}