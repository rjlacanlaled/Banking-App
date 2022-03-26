import User from './User';
import { UserTypes } from './enums/user-types';

export default class BankUser extends User {
    constructor(firstName, lastName, balance, username = 'user', password = 'user') {
        super(firstName, lastName);
        this.balance = balance;
        this.budget = 0;
        this.id = 0;
        this.type = UserTypes.Normal;
        this.username = username;
        this.password = password;
    }
}