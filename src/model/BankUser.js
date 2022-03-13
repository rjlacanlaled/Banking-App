let ID = 0;
export const BANK_USER_LIST_KEY = "bankUserList";
export default class BankUser extends User {
    constructor(firstName, lastName, birthDate, balance) {
        super(firstName, lastName, birthDate);
        this.balance = balance;
        this.id = ++ID;
    }
}