export class PetEndpoints {

    public static readonly PET = 'pet';

    public static getPetById(petId: number | string): string {
        return `pet/${petId}`;
    }

    public static findPetsByStatus(status: string): string {
        return `${this.PET}/findByStatus?status=${status}`;

    }
}