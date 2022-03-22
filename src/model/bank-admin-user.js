import { UserTypes } from './enums/user-types';
import User from './user';

export default class BankAdminUser extends User {
    constructor(firstName, lastName, username, password) {
        super(firstName, lastName);
        this.username = username;
        this.password = password;
        this.type = UserTypes.Admin;
    }
}
