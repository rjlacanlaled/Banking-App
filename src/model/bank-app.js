import {
    createBankTransaction,
    getBankTransactions,
    updateBankTransactions,
} from '../services/bank-transaction-database-service';
import { createUser, deleteUser, editUser, getUser, getUserList } from '../services/bank-user-database-service';
import BankTransaction from './bank-transaction';

export default class BankApp {
    constructor(userDatabaseKey, transactionDatabaseKey, inputFormatter, inputValidator) {
        this.userDatabaseKey = userDatabaseKey;
        this.transactionDatabaseKey = transactionDatabaseKey;
        this.inputFormatter = inputFormatter;
        this.inputValidator = inputValidator;
        this.users = getUserList(userDatabaseKey);
        this.transactions = getBankTransactions(transactionDatabaseKey);
    }

    transfer = (fromId, toId, amount) => {
        if (amount < 1) return 'Transfer amount must be greater than 0!';
        const fromAccount = this.getAccount(fromId);
        const toAccount = this.getAccount(toId);

        if (!fromAccount) return 'From account does not exits!';
        if (!toAccount) return 'To account does not exist!';

        let fromBalance = parseFloat(fromAccount.balance);
        let toBalance = parseFloat(toAccount.balance);
        if (fromAccount.balance < amount) return `You do not have enough balance! Current balance: PHP ${fromBalance}`;

        toBalance += amount;
        fromBalance -= amount;

        toAccount.balance = toBalance;
        fromAccount.balance = fromBalance;

        this.updateAccount(fromAccount);
        this.updateAccount(toAccount);

        this.createTransaction(
            new BankTransaction(
                new Date().toString(),
                TransactionTypes.Transfer,
                amount,
                fromId,
                toId
            )
        );

        return true;
    }

    withdraw = (id, amount) => {
        if (amount < 1) return 'Withdraw amount must be greater than 0';
        const account = this.getAccount(id);

        if (!account) return 'Account does not exist!';

    }

    deposit = (id, amount) => {
        if (amount < 1) return 'Deposit amount must be greater than 0';
    }

    createAccount = user => {
        createUser(user, this.userDatabaseKey);
        this.updateUsers();
    };

    createTransaction = transaction => {
        createBankTransaction(transaction, this.transactionDatabaseKey);
        this.updateTransactions();
    };

    updateAccount = user => {
        editUser(user, this.userDatabaseKey);
        this.updateUsers();
    };

    deleteAccount = id => {
        deleteUser(id, this.userDatabaseKey);
        this.updateUsers();
    };

    getAccount = id => {
        getUser(id, this.userDatabaseKey);
    };

    getAllAccountsAccoun = () => {
        getUserList(this.userDatabaseKey);
    };

    updateUsers = () => {
        this.users = getUserList(this.userDatabaseKey);
    };

    updateTransactions = () => {
        this.transactions = updateBankTransactions(this.transactionDatabaseKey);
    };
}
