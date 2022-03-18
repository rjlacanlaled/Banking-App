import { createUser, deleteUser, editUser, getUser, getUserList } from '../services/bank-user-database-service';

export default class BankApp {
    constructor(userDatabaseKey, transactionDatabaseKey) {
        this.userDatabaseKey = userDatabaseKey;
        this.transactionDatabaseKey = transactionDatabaseKey;
        this.users = getUserList(userDatabaseKey);
       // this.transactions = ;
    }

    create = (user) => {
        return createUser(user, userDatabaseKey);
    }

    update = (id, user) => {
        return editUser(user, userDatabaseKey);
    }

    delete = (id) => {
        return deleteUser(id, userDatabase);
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
