import { attachment } from 'allure-js-commons';

export class AllureHelper {

    /**
     * Attaches the API request and response details to the Allure report.
     */
    public static async attachApiCall(
        method: string,
        endpoint: string,
        requestBody: unknown,
        statusCode: number,
        responseTime: number,
        responseBody: string
    ): Promise<void> {

        await attachment(
            'Request',
            JSON.stringify(
                {
                    method,
                    endpoint,
                    body: requestBody
                },
                null,
                2
            ),
            'application/json'
        );

        await attachment(
            'Response',
            JSON.stringify(
                {
                    statusCode,
                    responseTime: `${responseTime} ms`,
                    body: this.parseResponseBody(responseBody)
                },
                null,
                2
            ),
            'application/json'
        );

    }

    /**
     * Parses the response body before attaching it to the report.
     */
    private static parseResponseBody(
        responseBody: string
    ): unknown {

        try {

            return JSON.parse(responseBody);

        } catch {

            return responseBody;

        }

    }

}