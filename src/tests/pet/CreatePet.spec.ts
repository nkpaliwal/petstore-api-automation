import { expect, test } from '../../fixtures/api.fixture';
import { PetBuilder } from '../../builders/PetBuilder';

test.describe('Create Pet API', () => {

    test('Should create a new pet successfully', async ({ petService }) => {

        const pet = PetBuilder.create().build();

        const response = await petService.createPet(pet);
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(pet.id);

        expect(responseBody.category.id).toBe(pet.category?.id);
        expect(responseBody.category.name).toBe(pet.category?.name);

        expect(responseBody.name).toBe(pet.name);
        expect(responseBody.photoUrls).toEqual(pet.photoUrls);
        expect(responseBody.tags).toEqual(pet.tags);
        expect(responseBody.status).toBe(pet.status);

    });

});