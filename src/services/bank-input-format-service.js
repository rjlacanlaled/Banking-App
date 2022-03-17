import { formatFloat, formatName } from '../utils/input-format-util';

export const bankInputFormatter = {
    firstName: name => formatName(name),
    lastName: name => formatName(name),
    balance: balance => formatFloat(balance),
};
