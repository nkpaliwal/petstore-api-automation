import { faker } from '@faker-js/faker';
import { Pet } from '../models/Pet';

export class PetBuilder {

    private pet: Pet;

    private constructor() {

        this.pet = {
            id: faker.number.int({ min: 1, max: 999999 }),
            category: {
                id: faker.number.int({ min: 1, max: 10 }),
                name: 'Dogs'
            },
            name: faker.animal.dog(),
            photoUrls: [faker.image.url()],
            tags: [
                {
                    id: faker.number.int({ min: 1, max: 10 }),
                    name: faker.word.noun()
                }
            ],
            status: 'available'
        };

    }

    public static create(): PetBuilder {
        return new PetBuilder();
    }

    public with <K extends keyof Pet> (field: K, value: Pet[K]): PetBuilder {

        this.pet[field] = value;
        return this;

    }

    public remove <K extends keyof Pet> (field: K): PetBuilder {
        delete this.pet[field];
        return this;

    }

    public build(): Pet {
        return structuredClone(this.pet);
    }
}