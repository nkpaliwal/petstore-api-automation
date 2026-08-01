export class StoreEndpoints {

    public static readonly INVENTORY = 'store/inventory';
    public static readonly ORDER = 'store/order';
    
    public static getOrderById(orderId: number): string {
        return `store/order/${orderId}`;
    }
}