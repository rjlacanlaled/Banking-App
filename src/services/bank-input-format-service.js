import { MAX_BALANCE_DIGITS, MAX_NAME_CHARS } from '../model/bank-user';
import { formatFloat, formatName } from '../utils/input-format-util';

export function bankNameFormatter(name) {
    if (name.length > MAX_NAME_CHARS) return;
    return formatName(name);
}

export function bankBalanceFormatter(balance) {
    if (balance.toString().length > MAX_BALANCE_DIGITS) return;
    return formatFloat(balance);
}
