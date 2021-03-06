import BankAdminUser from './bank-admin-user';
import BankInputFormatter from './bank-input-formatter';
import BankTransaction from './bank-transaction';
import BankValidator from './bank-validator';
import { TransactionTypes } from './enums/transaction-types';
import { UserTypes } from './enums/user-types';

export default class BankApp {
    constructor(userDatabase, transactionDatabase, maxNameChars, maxBalanceDigits, budgetDatabase) {
        this.userDatabase = userDatabase;
        this.transactionDatabase = transactionDatabase;
        this.inputFormatter = new BankInputFormatter();
        this.inputValidator = new BankValidator(maxNameChars, maxBalanceDigits);
        this.users = userDatabase.getAll();
        this.budgets = userDatabase.getAll();
        this.transactions = transactionDatabase.getAll();

        if (this.users.find(user => user.username === 'admin')) return;
        this.createAccount(new BankAdminUser('admin', 'admin', 'admin', 'admin', 'admin'));
    }

    login = (username, password) => {
        const user = this.users.find(user => user.username === username);
        if (!user) return [-1, 'User not found!'];
        if (user.password !== password) return [-1, 'Password incorrect!'];
        console.log(user.type);
        if (user.type != UserTypes.Admin)
            return [-1, 'Account is not an admin. Regular user login is not yet supported.'];

        return [1, user];
    };

    transfer = (fromId, toId, amount) => {
        if (fromId == toId) return 'You cannot transfer to the same account!';
        if (amount < 1) return 'Transfer amount must be greater than 0!';
        const fromAccount = this.getAccount(fromId);
        const toAccount = this.getAccount(toId);

        if (!fromAccount) return 'From account does not exits!';
        if (!toAccount) return 'To account does not exist!';

        let fromBalance = parseFloat(fromAccount.balance);
        let toBalance = parseFloat(toAccount.balance);
        if (fromAccount.balance < amount) return `You do not have enough balance! Current balance: PHP ${fromBalance}`;

        toBalance += parseFloat(amount);
        fromBalance -= parseFloat(amount);

        toAccount.balance = toBalance;
        fromAccount.balance = fromBalance;

        this.updateAccount(fromAccount);
        this.updateAccount(toAccount);

        this.createTransaction(
            new BankTransaction(new Date().toString(), TransactionTypes.Transfer, amount, fromId, toId)
        );

        return true;
    };

    withdraw = (id, amount) => {
        if (amount < 1) return 'Withdraw amount must be greater than 0';
        const account = this.getAccount(id);

        if (!account) return 'Account does not exist!';

        let balance = parseFloat(account.balance);

        if (balance < amount) return 'Balance is less than the withdraw amount!';

        balance -= parseFloat(amount);
        account.balance = balance;
        this.updateAccount(account);

        this.createTransaction(
            new BankTransaction(new Date().toString(), TransactionTypes.Withdraw, amount, account.id, 'cash')
        );

        return true;
    };

    deposit = (id, amount) => {
        if (amount < 1) return 'Deposit amount must be greater than 0';
        const account = this.getAccount(id);

        if (!account) return 'Account does not exist!';

        let balance = parseFloat(account.balance);
        balance += parseFloat(amount);

        account.balance = balance;
        this.updateAccount(account);

        this.createTransaction(
            new BankTransaction(new Date().toString(), TransactionTypes.Deposit, amount, 'cash', account.id)
        );

        return true;
    };

    createAccount = user => {
        this.userDatabase.create(user);
        this.updateUsers();
    };

    createTransaction = transaction => {
        this.transactionDatabase.create(transaction);
        this.updateTransactions();
    };

    deleteTransaction = id => {
        this.transactionDatabase.remove(id);
        this.updateTransactions();
    };

    updateAccount = user => {
        this.userDatabase.update(user);
        this.updateUsers();
    };

    deleteAccount = id => {
        this.userDatabase.remove(id);
        this.updateUsers();
    };

    getAccount = id => {
        return this.userDatabase.get(id);
    };

    getAccounts = () => {
        return this.userDatabase.getAll();
    };

    updateUsers = () => {
        this.users = this.getAccounts();
    };

    updateTransactions = () => {
        this.transactions = this.transactionDatabase.getAll();
    };
}
