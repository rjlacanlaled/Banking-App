import { formatFloat, formatName } from "../utils/input-format-util";

export const MAX_NAME_CHARS = 18;
export const MAX_BALANCE_DIGITS = 16;

export default class BankInputFormatter {
    constructor() {
        this.formatter = {
            firstName: this.nameFormatter,
            lastName: this.nameFormatter,
            balance: this.balanceFormatter
        }
    }

    nameFormatter = name => {
        if (name.length > MAX_NAME_CHARS) return;
        return formatName(name);
    };

    balanceFormatter = balance => {
        if (balance.toString().length > MAX_BALANCE_DIGITS) return;
        return formatFloat(balance);
    };
}