import { APIResponse } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { StoreEndpoints } from '../endpoints/StoreEndpoints';

export class StoreService {

    constructor(private readonly apiClient: ApiClient) {}

    public async getInventory(): Promise<APIResponse> {

        return await this.apiClient.get(
            StoreEndpoints.INVENTORY
        );

    }

    public async placeOrder(requestBody: unknown): Promise<APIResponse> {

        return await this.apiClient.post(
            StoreEndpoints.ORDER,
            requestBody
        );

    }

    public async getOrderById(orderId: number): Promise<APIResponse> {

        return await this.apiClient.get(
            StoreEndpoints.getOrderById(orderId)
        );

    }

    public async deleteOrder(orderId: number): Promise<APIResponse> {

        return await this.apiClient.delete(
            StoreEndpoints.getOrderById(orderId)
        );

    }

}