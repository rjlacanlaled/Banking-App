import BankApp from './bank-app';
import BankInputFormatter from './bank-input-formatter';
import BankValidator from './bank-validator';
import LocalStorageDatabase from './local-storage-database';

const USER_DATABASE_KEY = 'bank-database-2';
const TRANSACTION_DATABASE_KEY = 'bank-transact-database-2';

export const bankApp = new BankApp(
    new LocalStorageDatabase(USER_DATABASE_KEY),
    new LocalStorageDatabase(TRANSACTION_DATABASE_KEY)
);
