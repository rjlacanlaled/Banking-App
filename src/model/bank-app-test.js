import BankApp from './bank-app';
import BankInputFormatter from './bank-input-formatter';
import BankValidator from './bank-validator';
import LocalStorageDatabase from './local-storage-database';

const USER_DATABASE_KEY = 'bank-database-2';
const TRANSACTION_DATABASE_KEY = 'bank-transact-database-2';

const transactionHeaders = ['id', 'from', 'to', 'transactionType', 'amount', 'timestamp'];
const bankUserHeaders = ['id', 'firstName', 'lastName', 'balance'];

export const bankApp = new BankApp(
    new LocalStorageDatabase(USER_DATABASE_KEY, bankUserHeaders),
    new LocalStorageDatabase(TRANSACTION_DATABASE_KEY, transactionHeaders),
    12,
    12
);
