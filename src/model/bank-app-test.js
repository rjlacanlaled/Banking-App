import BankApp from './bank-app';
import LocalStorageDatabase from './local-storage-database';

const USER_DATABASE_KEY = 'bank-database-14';
const TRANSACTION_DATABASE_KEY = 'bank-transact-database-14';

const transactionHeaders = ['id', 'from', 'to', 'transactionType', 'amount', 'timestamp'];
const bankUserHeaders = ['id', 'type', 'firstName', 'lastName', 'balance'];

export const bankApp = new BankApp(
    new LocalStorageDatabase(USER_DATABASE_KEY, bankUserHeaders),
    new LocalStorageDatabase(TRANSACTION_DATABASE_KEY, transactionHeaders),
    12,
    12
);
