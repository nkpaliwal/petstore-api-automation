import { APIResponse } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { UserEndpoints } from '../endpoints/UserEndpoints';

export class UserService {

    constructor(private readonly apiClient: ApiClient) {}

    public async createUser(requestBody: unknown): Promise<APIResponse> {

        return await this.apiClient.post(
            UserEndpoints.USER,
            requestBody
        );

    }

    public async getUser(username: string): Promise<APIResponse> {

        return await this.apiClient.get(
            UserEndpoints.getUserByUsername(username)
        );

    }

    public async updateUser(username: string, requestBody: unknown): Promise<APIResponse> {

        return await this.apiClient.put(
            UserEndpoints.getUserByUsername(username),
            requestBody
        );

    }

    public async deleteUser(username: string): Promise<APIResponse> {

        return await this.apiClient.delete(
            UserEndpoints.getUserByUsername(username)
        );

    }

    public async login(username: string, password: string): Promise<APIResponse> {

        return await this.apiClient.get(
            `${UserEndpoints.LOGIN}?username=${username}&password=${password}`
        );

    }

    public async logout(): Promise<APIResponse> {

        return await this.apiClient.get(
            UserEndpoints.LOGOUT
        );

    }

}