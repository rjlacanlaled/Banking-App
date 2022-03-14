export const validFirstName = firstName => {
    const errors = [];
    if (!firstName.length) errors.push('First name needs to be atleast 1 character.');
    return errors;
};

export const validLastName = lastName => {
    const errors = [];
    if (!lastName.length) errors.push('Last name needs to be atleast 1 character.');
    return errors;
};

export const validBalance = balance => {
    const errors = [];
    if (balance < 0) errors.push('Balance cannot be negative!');
    if (!balance.length) errors.push('Balance cannot be empty!');
    return errors;
}
