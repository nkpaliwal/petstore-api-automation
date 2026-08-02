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
            photoUrls: [
                faker.image.url()
            ],
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

    /**
     * Creates a builder from an existing Pet.
     */
    public static from(existingPet: Pet): PetBuilder {

        const builder = new PetBuilder();

        builder.pet = structuredClone(existingPet);

        return builder;

    }

    /**
     * Generates random values for update operations.
     * Any supplied values override the generated values.
     */
    public randomUpdate(
        overrides: Partial<Pet> = {}
    ): PetBuilder {

        this.pet.category = {
            id: faker.number.int({ min: 100, max: 999 }),
            name: faker.word.noun()
        };

        this.pet.name = faker.animal.dog();

        this.pet.photoUrls = [
            faker.image.url()
        ];

        this.pet.tags = [
            {
                id: faker.number.int({ min: 100, max: 999 }),
                name: faker.word.noun()
            }
        ];

        this.pet.status = 'sold';

        Object.assign(
            this.pet,
            overrides
        );

        return this;

    }

    public with<K extends keyof Pet>(
        field: K,
        value: Pet[K]
    ): PetBuilder {

        this.pet[field] = value;

        return this;

    }

    public remove<K extends keyof Pet>(
        field: K
    ): PetBuilder {

        delete this.pet[field];

        return this;

    }

    public build(): Pet {

        return structuredClone(this.pet);

    }

}