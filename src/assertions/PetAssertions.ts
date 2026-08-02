import { expect } from '@playwright/test';
import { Pet } from '../models/Pet';

export class PetAssertions {

    public static verifyPet(
        actual: Pet,
        expected: Partial<Pet>
    ): void {
        expect(actual).toMatchObject(expected);
    }
}