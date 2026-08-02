import { test } from '../../fixtures/api.fixture';
import { ApiAssertions } from '../../assertions/ApiAssertions';
import { PetAssertions } from '../../assertions/PetAssertions';
import { PetBuilder } from '../../builders/PetBuilder';
import { Logger } from '../../logger/Logger';
import { Pet } from '../../models/Pet';
import { PetHelper } from '../../utils/PetHelper';

test.describe('Update Pet API', () => {

    test('Should update all pet details successfully', async ({ petService }) => {

        // Arrange: Create a pet to be updated
        const pet = PetBuilder.create().build();

        Logger.info('Creating a pet for update validation.');

        const createResponse = await petService.createPet(pet);

        ApiAssertions.verifyStatusCode(
            createResponse.status(),
            200
        );

        // Arrange: Generate a new update payload
        const updatedPet = PetBuilder
            .from(pet)
            .randomUpdate()
            .build();

        Logger.info(
            `Updating pet with request payload:\n${JSON.stringify(updatedPet, null, 2)}`
        );

        // Act: Update the pet
        const updateResponse = await petService.updatePet(updatedPet);

        ApiAssertions.verifyStatusCode(
            updateResponse.status(),
            200
        );

        const petId = PetHelper.getPetId(updatedPet);

        Logger.info(`Retrieving updated pet with ID : ${petId}`);

        // Act: Retrieve the updated pet
        const getResponse = await petService.getPetById(petId);

        const responseBody: Pet = await getResponse.json();

        ApiAssertions.verifyStatusCode(
            getResponse.status(),
            200
        );

        // Assert: Verify updated pet details
        Logger.info('Verifying updated pet details.');

        PetAssertions.verifyPet(
            responseBody,
            updatedPet
        );

        Logger.success('Pet updated and verified successfully.');

    });

    test('Should update only pet status successfully', async ({ petService }) => {

        // Arrange: Create a pet before updating its status
        const pet = PetBuilder.create().build();

        Logger.info('Creating a pet for status update validation.');

        const createResponse = await petService.createPet(pet);

        ApiAssertions.verifyStatusCode(
            createResponse.status(),
            200
        );

        // Arrange: Update only the status while keeping all other attributes unchanged
        const updatedPet = PetBuilder
            .from(pet)
            .with('status', 'pending')
            .build();

        Logger.info(
            `Updating pet status with request payload:\n${JSON.stringify(updatedPet, null, 2)}`
        );

        // Act: Update the pet status
        const updateResponse = await petService.updatePet(updatedPet);

        ApiAssertions.verifyStatusCode(
            updateResponse.status(),
            200
        );

        const petId = PetHelper.getPetId(updatedPet);

        Logger.info(`Retrieving updated pet with ID : ${petId}`);

        // Act: Retrieve the updated pet
        const getResponse = await petService.getPetById(petId);

        const responseBody: Pet = await getResponse.json();

        ApiAssertions.verifyStatusCode(
            getResponse.status(),
            200
        );

        // Assert: Verify only the status has changed
        Logger.info('Verifying updated pet status.');

        PetAssertions.verifyPet(
            responseBody,
            updatedPet
        );

        Logger.success('Pet status updated and verified successfully.');

    });

});