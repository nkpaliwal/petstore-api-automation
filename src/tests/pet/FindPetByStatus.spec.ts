import { test } from '../../fixtures/api.fixture';
import { ApiAssertions } from '../../assertions/ApiAssertions';
import { Logger } from '../../logger/Logger';

test.describe.configure({
    mode: 'parallel',
    retries: 3
});

test.describe('Find Pet By Status API', () => {

    test('Should return status code 400 for an invalid pet status', async ({ petService }) => {

        // Uses an invalid status to verify the API error response
        const invalidStatus = 'instatus';

        Logger.info(`Finding pets with status : ${invalidStatus}`);

        const response = await petService.findPetsByStatus(invalidStatus);
        const responseBody = await response.text();
        console.log(responseBody);

        // Verifies the API returns the expected HTTP status code
        ApiAssertions.verifyStatusCode(
            response.status(),
            400
        );

        Logger.info(`Response Body : ${responseBody}`);
        Logger.success('Verified HTTP 400 for an invalid pet status.');

    });

});