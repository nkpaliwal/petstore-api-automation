import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from '../../logger/Logger';
import { AllureHelper } from '../../utils/AllureHelper';
import { ResponseTimeValidator } from '../../validators/ResponseTimeValidator';

export class ApiClient {

    constructor(
        private readonly request: APIRequestContext
    ) {}

    public async get(
        endpoint: string
    ): Promise<APIResponse> {

        // Logs the request details to the execution log.
        Logger.line();
        Logger.info('HTTP Method : GET');
        Logger.info(`Endpoint : ${endpoint}`);

        const startTime = Date.now();
        const response = await this.request.get(endpoint);
        const responseTime = Date.now() - startTime;
        const responseBody = await response.text();

        // Records the API response time for performance reporting.
        ResponseTimeValidator.record(
            'GET',
            response.url(),
            responseTime
        );

        await AllureHelper.attachApiCall(
            'GET',
            endpoint,
            undefined,
            response.status(),
            responseTime,
            responseBody
        );

        this.logResponse(
            response,
            responseBody
        );

        return response;

    }

    public async post(
        endpoint: string,
        body: unknown
    ): Promise<APIResponse> {

        // Logs the request details, including the request body.
        Logger.line();
        Logger.info('HTTP Method : POST');
        Logger.info(`Endpoint : ${endpoint}`);
        Logger.debug(`Request Body:\n${JSON.stringify(body, null, 2)}`);

        const startTime = Date.now();
        const response = await this.request.post(endpoint, {
            data: body
        });
        const responseTime = Date.now() - startTime;
        const responseBody = await response.text();

        // Records the API response time for performance reporting.
        ResponseTimeValidator.record(
            'POST',
            response.url(),
            responseTime
        );

        await AllureHelper.attachApiCall(
            'POST',
            endpoint,
            body,
            response.status(),
            responseTime,
            responseBody
        );

        this.logResponse(
            response,
            responseBody
        );

        return response;

    }

    public async put(
        endpoint: string,
        body: unknown
    ): Promise<APIResponse> {

        // Logs the request details, including the request body.
        Logger.line();
        Logger.info('HTTP Method : PUT');
        Logger.info(`Endpoint : ${endpoint}`);
        Logger.debug(`Request Body:\n${JSON.stringify(body, null, 2)}`);

        const startTime = Date.now();
        const response = await this.request.put(endpoint, {
            data: body
        });
        const responseTime = Date.now() - startTime;
        const responseBody = await response.text();

        // Records the API response time for performance reporting.
        ResponseTimeValidator.record(
            'PUT',
            response.url(),
            responseTime
        );

        await AllureHelper.attachApiCall(
            'PUT',
            endpoint,
            body,
            response.status(),
            responseTime,
            responseBody
        );

        this.logResponse(
            response,
            responseBody
        );

        return response;

    }

    public async delete(
        endpoint: string
    ): Promise<APIResponse> {

        // Logs the request details before deleting the resource.
        Logger.line();
        Logger.info('HTTP Method : DELETE');
        Logger.info(`Endpoint : ${endpoint}`);

        const startTime = Date.now();
        const response = await this.request.delete(endpoint);
        const responseTime = Date.now() - startTime;
        const responseBody = await response.text();

        // Records the API response time for performance reporting.
        ResponseTimeValidator.record(
            'DELETE',
            response.url(),
            responseTime
        );

        await AllureHelper.attachApiCall(
            'DELETE',
            endpoint,
            undefined,
            response.status(),
            responseTime,
            responseBody
        );

        this.logResponse(
            response,
            responseBody
        );

        return response;

    }

    /**
     * Logs the API response details to the execution log.
     */
    private logResponse(
        response: APIResponse,
        responseBody: string
    ): void {

        Logger.info(`Request URL : ${response.url()}`);

        if (response.ok()) {
            Logger.success(`Status Code : ${response.status()}`);
        } else if (response.status() >= 400 && response.status() < 500) {
            Logger.warn(`Status Code : ${response.status()}`);
        } else {
            Logger.error(`Status Code : ${response.status()}`);
        }

        Logger.debug(`Response Body:\n${responseBody}`);
        Logger.line();

    }

}