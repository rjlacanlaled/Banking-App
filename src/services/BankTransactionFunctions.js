import {
   getUserList,
   updateUserList,
} from "../services/BankUserDatabaseService";

export const addDeposit = (userId, depositValue) => {
   const userList = getUserList();
   const user = userList[userList.findIndex((list) => list.id == userId)];
   const stored = parseFloat(user.balance);
   const deposit = parseFloat(depositValue);

   user.balance = stored + deposit;

   updateUserList(userList);
   return;
};

export const deductWithdaw = (userId, withdrawValue) => {
   const userList = getUserList();
   const user = userList[userList.findIndex((list) => list.id == userId)];
   const stored = parseFloat(user.balance);
   const withdraw = parseFloat(withdrawValue);

   user.balance = stored - withdraw;

   updateUserList(userList);
   return;
};

export const transferFunds = (transferFromId, transferToId, transferValue) => {

    const userList = getUserList();
    const giver = userList[userList.findIndex(list => list.id == transferFromId)]
    const taker = userList[userList.findIndex(list => list.id == transferToId)]
    const giverBalance = parseFloat(giver.balance);
    const takerBalance = parseFloat(taker.balance);
    const transfer = parseFloat(transferValue);

    if (transfer > giverBalance) return alert("Not enough balance");

    giver.balance = giverBalance - transfer;
    taker.balance = takerBalance + transfer;

    updateUserList(userList);
}