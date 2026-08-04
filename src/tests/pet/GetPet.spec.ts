import { test } from '../../fixtures/api.fixture';
import { ApiAssertions } from '../../assertions/ApiAssertions';
import { PetAssertions } from '../../assertions/PetAssertions';
import { PetBuilder } from '../../builders/PetBuilder';
import { Logger } from '../../logger/Logger';
import { Pet } from '../../models/Pet';
import { PetHelper } from '../../utils/PetHelper';

test.describe('Get Pet API', () => {

    test('Should retrieve an existing pet by id', async ({ petService }) => {

        // Arrange: Create a pet before retrieving it
        const pet = PetBuilder.create().build();

        Logger.info('Creating a pet for retrieval validation.');

        const createResponse = await petService.createPet(pet);

        ApiAssertions.verifyStatusCode(
            createResponse.status(),
            200
        );

        const petId = PetHelper.getPetId(pet);

        Logger.info(`Retrieving pet with ID : ${petId}`);

        // Act: Retrieve the created pet
        const getResponse = await petService.getPetById(petId);

        const responseBody: Pet = await getResponse.json();

        ApiAssertions.verifyStatusCode(
            getResponse.status(),
            200
        );

        // Assert: Verify the retrieved pet matches the created pet
        Logger.info('Verifying retrieved pet details.');

        PetAssertions.verifyPet(
            responseBody,
            pet
        );

        Logger.success('Pet retrieved and verified successfully.');

    });

    test('Should return status code 404 for a non-existing pet id', async ({ petService }) => {

        // Arrange: Use a pet ID that does not exist
        const invalidPetId = 9900099;

        Logger.info(`Retrieving non-existing pet with ID : ${invalidPetId}`);

        // Act: Retrieve the pet using an invalid ID
        const response = await petService.getPetById(invalidPetId);

        ApiAssertions.verifyStatusCode(
            response.status(),
            404
        );

        // Assert: Verify the API returns HTTP 404
        Logger.success('Verified HTTP 404 for a non-existing pet.');

    });

    test('Should return status code 400 for an invalid pet id', async ({ petService }) => {

        // Arrange: Use an invalid pet ID format
        const invalidPetId = 'invalid-id';

        Logger.info(`Retrieving pet with invalid ID : ${invalidPetId}`);

        // Act: Retrieve the pet using an invalid ID
        const response = await petService.getPetById(invalidPetId);

        const responseBody = await response.json();

        // Assert: Verify the API returns HTTP 400
        ApiAssertions.verifyStatusCode(
            response.status(),
            400
        );

        Logger.info('Verifying error response.');

        ApiAssertions.verifyField(
            responseBody.message,
            'Invalid ID supplied',
            'Field : message'
        );

        Logger.success('Verified HTTP 400 for an invalid pet ID.');

    });

});