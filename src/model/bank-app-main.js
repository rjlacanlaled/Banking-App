import { bankBalanceFormatter, bankNameFormatter } from '../services/bank-input-format-service';
import { validBalance, validFirstName, validLastName } from '../services/bank-input-validation-service';
import BankApp from './bank-app';
import LocalStorageDatabase from './local-storage-database';

const USER_DATABASE_KEY = 'bankUserList';
const TRANSACTION_DATABASE_KEY = 'bankTransactionlist';

const bankInputFormatter = {
    firstName: bankNameFormatter,
    lastName: bankNameFormatter,
    balance: bankBalanceFormatter,
};

const bankInputValidator = {
    firstName: validFirstName,
    lastName: validLastName,
    balance: validBalance,
};

export const bankApp = new BankApp(
    new LocalStorageDatabase(USER_DATABASE_KEY),
    new LocalStorageDatabase(TRANSACTION_DATABASE_KEY),
    bankInputFormatter,
    bankInputValidator
);
