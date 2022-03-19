export default class BankValidator {
    constructor(maxNameChars, maxBalanceDigits) {
        this.maxNameChars = maxNameChars;
        this.maxBalanceDigits = maxBalanceDigits;
        this.validator = {
            firstName: this.validFirstName,
            lastName: this.validLastName,
            balance: this.validBalance
        }
    }
    
    validFirstName = firstName => {
        const errors = [];
        if (!firstName.length) errors.push('First name needs to be atleast 1 character.');
        if (firstName.length > this.maxNameChars) errors.push(`First name cannot exceed ${this.maxNameChars} characters.`);
        if (firstName.match(/[^A-Za-z\s]+/)) errors.push('First name cannot contain numbers or special characters.');
        return errors;
    };

    validLastName = lastName => {
        const errors = [];
        if (!lastName.length) errors.push('Last name needs to be atleast 1 character.');
        if (lastName.length > this.maxNameChars) errors.push(`Last name cannot exceed ${this.maxNameChars} characters.`);
        if (lastName.match(/[^A-Za-z\s]+/)) errors.push('Last name cannot contain numbers or special characters.');
        return errors;
    };

    validBalance = balance => {
        const errors = [];
        if (balance < 0) errors.push('Balance cannot be negative!');
        if (!balance.length) errors.push('Balance cannot be empty!');
        if (balance.length > this.maxBalanceDigits) errors.push(`Balance cannot exceed ${this.maxBalanceDigits} digits.`);
        return errors;
    };
}