import User from "./user";

export const MAX_NAME_CHARS = 18;
export const MAX_BALANCE_DIGITS = 16;

export default class BankUser extends User {
    constructor(firstName, lastName, balance) {
        super(firstName, lastName);
        this.balance = balance;
        this.id = 0;
    }
 
}