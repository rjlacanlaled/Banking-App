import { MAX_BALANCE_DIGITS, MAX_NAME_CHARS } from '../model/BankUser';
import { formatFloat, formatName } from '../utils/input-format-util';

export const bankInputFormatter = {
    firstName: bankNameFormatter,
    lastName: bankNameFormatter,
    balance: bankBalanceFormatter,
};


function bankNameFormatter(name) {
    if (name.length > MAX_NAME_CHARS) return;
    return formatName(name);
}

function bankBalanceFormatter(balance) {
    if (balance.toString().length > MAX_BALANCE_DIGITS) return;
    return formatFloat(balance);
}
