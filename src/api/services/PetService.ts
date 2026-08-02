import { APIResponse } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { PetEndpoints } from '../endpoints/PetEndpoints';

export class PetService {

    constructor(private readonly apiClient: ApiClient) {}

    public async createPet(requestBody: unknown): Promise<APIResponse> {

        return await this.apiClient.post(
            PetEndpoints.PET,
            requestBody
        );

    }

    public async getPetById(petId: number | string): Promise<APIResponse> {
        return await this.apiClient.get(
            PetEndpoints.getPetById(petId)
        );

    }

    public async updatePet(requestBody: unknown): Promise<APIResponse> {
        return await this.apiClient.put(
            PetEndpoints.PET,
            requestBody
        );

    }

    public async deletePet(petId: number): Promise<APIResponse> {
        return await this.apiClient.delete(
            PetEndpoints.getPetById(petId)
        );

    }

    public async findPetsByStatus(status: string): Promise<APIResponse> {
    return await this.apiClient.get(
        PetEndpoints.findPetsByStatus(status)
    );

}

}