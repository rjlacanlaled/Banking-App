import User from './user';
import { UserTypes } from './enums/user-types';

export default class BankUser extends User {
    constructor(firstName, lastName, balance, username = 'user', password = 'user') {
        super(firstName, lastName);
        this.balance = balance;
        this.id = 0;
        this.type = UserTypes.Normal;
        this.username = username;
        this.password = password;
    }
}