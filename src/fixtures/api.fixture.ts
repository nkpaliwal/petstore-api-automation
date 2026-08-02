import { test as base } from '@playwright/test';
import { ApiClient } from '../api/client/ApiClient';
import { PetService } from '../api/services/PetService';

type ApiFixtures = {
    apiClient: ApiClient;
    petService: PetService;
};

export const test = base.extend<ApiFixtures>({

    apiClient: async ({ request }, use) => {
        const apiClient = new ApiClient(request);
        await use(apiClient);
    },

    petService: async ({ apiClient }, use) => {
        const petService = new PetService(apiClient);
        await use(petService);
    }
});

export { expect } from '@playwright/test';