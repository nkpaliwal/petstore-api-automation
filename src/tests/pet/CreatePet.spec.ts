import { expect, test } from '@playwright/test';
import { ApiClient } from '../../api/client/ApiClient';
import { PetService } from '../../api/services/PetService';
import { PetBuilder } from '../../builders/PetBuilder';

test.describe('Pet API', () => {

    test('Should create a new pet successfully', async ({ request }) => {

        const apiClient = new ApiClient(request);
        const petService = new PetService(apiClient);
        const pet = PetBuilder.create().build();

        const response = await petService.createPet(pet);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toBe(pet.id);
        expect(responseBody.name).toBe(pet.name);
        expect(responseBody.status).toBe(pet.status);

    });

});