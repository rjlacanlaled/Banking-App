import { createUser, deleteUser, getUser, getUserList } from '../services/bank-user-database-service';

export default class BankApp {
    constructor(userDatabaseKey, transactionDatabaseKey, users = [], transactions = []) {
        this.users = users;
        this.transactions = transactions;
    }

    create = (user) => {
        if (!user) return;
        createUser(user, userDatabaseKey);
    }

    update = (id, user) => {
        if (!user) return;
    }

    delete = (id) => {
        deleteUser(id, userDatabase);
    }

    get = (id) => {
        getUser(id, userDatabaseKey);
    }

    getAll = () => {
        getUserList(userDatabaseKey);
    }

    updateUsers = () => {
        this.users = getUserList(userDatabaseKey);
    }

    updateTransactions = () => {
        // this.transactions = getUserList(userDatabaseKey);
    }
}
