export default class BankValidator {
    constructor() {
        this.validator = {
            firstName: this.validFirstName,
            lastName: this.validLastName,
            balance: this.validBalance
        }
    }
    
    validFirstName = firstName => {
        const errors = [];
        if (!firstName.length) errors.push('First name needs to be atleast 1 character.');
        return errors;
    };

    validLastName = lastName => {
        const errors = [];
        if (!lastName.length) errors.push('Last name needs to be atleast 1 character.');
        return errors;
    };

    validBalance = balance => {
        const errors = [];
        if (balance < 0) errors.push('Balance cannot be negative!');
        if (!balance.length) errors.push('Balance cannot be empty!');
        return errors;
    };
}