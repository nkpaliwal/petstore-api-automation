export class UserEndpoints {

    public static readonly USER = 'user';
    public static readonly LOGIN = 'user/login';
    public static readonly LOGOUT = 'user/logout';

    public static getUserByUsername(username: string): string {
        return `user/${username}`;
    }
}