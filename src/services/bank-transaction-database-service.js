export const getBankTransactions = databaseKey => {
    const transactions = JSON.parse(localStorage.getItem(databaseKey));
    if (!transactions) return [];

    return transactions;
};

export const updateBankTransactions = (transactions, databaseKey) => {
    localStorage.setItem(databaseKey, JSON.stringify(transactions));
};

export const createBankTransaction = (transaction, databaseKey) => {
    if (!transaction) return;
    let transactions = getBankTransactions(databaseKey);

    transaction.id = getLastTransactionId(databaseKey) + 1;
    transactions.push(transaction);

    updateBankTransactions(transactions, databaseKey);
    incrementTransactionId(databaseKey);

    return true;
};

function incrementTransactionId(databaseKey) {
    localStorage.setItem(databaseKey.concat('id'), getLastTransactionId() + 1);
}

function getLastTransactionId(databaseKey) {
    const userId = localStorage.getItem(databaseKey.concat('id'));
    return parseInt(userId) || 0;
}
