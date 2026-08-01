import { faker } from '@faker-js/faker';
import { Pet, Category, Tag } from '../models/Pet';

export class PetBuilder {

    private pet: Pet;

    private constructor() {

        this.pet = {
            id: faker.number.int({ min: 1, max: 999999 }),
            category: {
                id: faker.number.int({ min: 1, max: 9 }),
                name: 'Dogs'
            },
            name: faker.animal.dog(),
            photoUrls: [
                faker.image.url()
            ],
            tags: [
                {
                    id: faker.number.int({ min: 1, max: 9 }),
                    name: faker.word.noun()
                }
            ],
            status: 'available'
        };

    }

    public static create(): PetBuilder {
        return new PetBuilder();

    }

    public withId(id: number): PetBuilder {

        this.pet.id = id;
        return this;
    }

    public withName(name: string): PetBuilder {

        this.pet.name = name;
        return this;
    }

    public withCategory(category: Category): PetBuilder {

        this.pet.category = category;
        return this;
    }

    public withPhotoUrls(photoUrls: string[]): PetBuilder {

        this.pet.photoUrls = photoUrls;
        return this;
    }

    public withTags(tags: Tag[]): PetBuilder {

        this.pet.tags = tags;
        return this;
    }

    public withStatus(status: NonNullable<Pet['status']>): PetBuilder {
        this.pet.status = status;
        return this;
    }

    public build(): Pet {
        return structuredClone(this.pet);
    }

}