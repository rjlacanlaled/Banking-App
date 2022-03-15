import { getUserList } from "../services/BankUserDatabaseService";
import User from "./User";

export const BANK_USER_LIST_KEY = "bankUserList";
export const BANK_USER_ID_KEY = "bankUserId";

export const MAX_NAME_CHARS = 18;
export const MAX_BALANCE_DIGITS = 16;

export default class BankUser extends User {
    constructor(firstName, lastName, balance) {
        super(firstName, lastName);
        this.balance = balance;
        this.id = 0;
    }
}