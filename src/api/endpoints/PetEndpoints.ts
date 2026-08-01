export class PetEndpoints {

    public static readonly PET = '/pet';

    public static getPetById(petId: number): string {

        return `/pet/${petId}`;

    }

}