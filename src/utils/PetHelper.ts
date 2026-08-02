import { Pet } from '../models/Pet';
import { Logger } from '../logger/Logger';

export class PetHelper {

    /**
     * Returns the Pet ID if available.
     * Throws an error when the ID is missing.
     */
    public static getPetId(
        pet: Pet
    ): number {
        if (pet.id === undefined) {
            Logger.error('Pet ID is not available.');
            throw new Error('Pet ID is not available.');
        }
        return pet.id;
    }
}