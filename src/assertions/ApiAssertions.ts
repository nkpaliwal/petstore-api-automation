import { expect } from '@playwright/test';

export class ApiAssertions {

    /**
     * Verifies the HTTP status code returned by an API.
     */
    public static verifyStatusCode(
        actualStatusCode: number,
        expectedStatusCode: number
    ): void {

        expect(actualStatusCode).toBe(expectedStatusCode);

    }

    /**
     * Verifies the value of a specific response field.
     */
    public static verifyField<T>(
        actual: T,
        expected: T,
        fieldName: string
    ): void {

        expect(
            actual,
            `${fieldName} mismatch`
        ).toBe(expected);

    }

}