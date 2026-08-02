import { test } from '../../fixtures/api.fixture';
import { ApiAssertions } from '../../assertions/ApiAssertions';
import { PetAssertions } from '../../assertions/PetAssertions';
import { PetBuilder } from '../../builders/PetBuilder';
import { Logger } from '../../logger/Logger';
import { Pet } from '../../models/Pet';

test.describe('Create Pet API', () => {

    test('Should create a pet with complete request payload', async ({ petService }) => {

        // Builds a pet with all supported attributes.
        const pet = PetBuilder.create().build();

        Logger.info('Creating a pet with complete request payload.');

        const response = await petService.createPet(pet);
        const responseBody: Pet = await response.json();

        ApiAssertions.verifyStatusCode(
            response.status(),
            200
        );

        // Verifies the created pet details.
        Logger.info('Verifying the created pet.');

        PetAssertions.verifyPet(
            responseBody,
            pet
        );

        Logger.success('Pet created successfully with complete request payload.');

    });

    test('Should create a pet with minimum required request payload', async ({ petService }) => {

        // Removes optional attributes to create a minimal request payload.
        const pet = PetBuilder.create()
            .remove('category')
            .remove('tags')
            .remove('status')
            .build();

        Logger.info('Creating a pet with minimum required request payload.');

        const response = await petService.createPet(pet);
        const responseBody: Pet = await response.json();

        ApiAssertions.verifyStatusCode(
            response.status(),
            200
        );

        // Verifies the created pet details.
        Logger.info('Verifying the created pet.');

        PetAssertions.verifyPet(
            responseBody,
            pet
        );

        Logger.success('Pet created successfully with minimum required request payload.');

    });

    test('Should create a pet with pending status', async ({ petService }) => {

        // Overrides the default pet status.
        const pet = PetBuilder.create()
            .with('status', 'pending')
            .build();

        Logger.info('Creating a pet with pending status.');

        const response = await petService.createPet(pet);
        const responseBody: Pet = await response.json();

        ApiAssertions.verifyStatusCode(
            response.status(),
            200
        );

        // Verifies the created pet details.
        Logger.info('Verifying the created pet.');

        PetAssertions.verifyPet(
            responseBody,
            pet
        );

        Logger.success('Pet created successfully with pending status.');

    });

});