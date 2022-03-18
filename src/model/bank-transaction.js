
import { Transaction } from './transaction';

export default class BankTransaction extends Transaction {
    constructor(timestamp, transactionType, amount, from, to) {
        super(timestamp, transactionType);
        this.amount = amount;
        this.from = from;
        this.to = to;
        this.id = 0;
    }
}
