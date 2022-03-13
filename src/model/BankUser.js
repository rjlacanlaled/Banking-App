import { getUserList } from "../services/BankUserDatabaseService";
import User from "./User";

export const BANK_USER_LIST_KEY = "bankUserList";
export const BANK_USER_ID_KEY = "bankUserId";

const currentList = JSON.parse(localStorage.getItem(BANK_USER_LIST_KEY));

export default class BankUser extends User {
    constructor(firstName, lastName, birthDate, balance) {
        super(firstName, lastName, birthDate);
        this.balance = balance;
        this.id = 0;
    }
}