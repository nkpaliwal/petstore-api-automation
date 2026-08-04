import { test } from '../../fixtures/api.fixture';
import { ApiAssertions } from '../../assertions/ApiAssertions';
import { PetAssertions } from '../../assertions/PetAssertions';
import { PetBuilder } from '../../builders/PetBuilder';
import { Logger } from '../../logger/Logger';
import { Pet } from '../../models/Pet';
import { PetHelper } from '../../utils/PetHelper';

test.describe('Delete Pet API', () => {

    test('Should delete an existing pet successfully', async ({ petService }) => {

        // Arrange: Create a pet before deleting it
        const pet = PetBuilder.create().build();

        Logger.info('Creating a pet for delete validation.');

        const createResponse = await petService.createPet(pet);

        ApiAssertions.verifyStatusCode(
            createResponse.status(),
            200
        );

        const petId = PetHelper.getPetId(pet);

        Logger.info(`Retrieving pet with ID : ${petId}`);

        const getResponse = await petService.getPetById(petId);

        const responseBody: Pet = await getResponse.json();

        ApiAssertions.verifyStatusCode(
            getResponse.status(),
            200
        );

        Logger.info('Verifying retrieved pet details.');

        PetAssertions.verifyPet(
            responseBody,
            pet
        );

        Logger.info(`Deleting pet with ID : ${petId}`);

        const deleteResponse = await petService.deletePet(petId);

        const deleteResponseBody = await deleteResponse.json();

        // Verifies the API returns HTTP 200
        ApiAssertions.verifyStatusCode(
            deleteResponse.status(),
            200
        );

        // Verifies the delete response code.
        ApiAssertions.verifyField(
            deleteResponseBody.code,
            200,
            'Field: code'
        );

        // Verifies the deleted pet ID returned by the API.
        ApiAssertions.verifyField(
            deleteResponseBody.message,
            String(petId),
            'Field: message'
        );

        Logger.info('Verifying deleted pet.');

        const deletedPetResponse = await petService.getPetById(petId);

        ApiAssertions.verifyStatusCode(
            deletedPetResponse.status(),
            404
        );

        Logger.success('Pet deleted successfully.');

    });

});