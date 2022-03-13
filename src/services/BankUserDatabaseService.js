import BankUser, { BANK_USER_LIST_KEY } from '../model/BankUser';

BankUser.prototype.getUserList = () => {
    const userList = JSON.parse(localStorage.getItem(BANK_USER_LIST_KEY));
    if (!userList) return {};

    return userList;
}

BankUser.prototype.updateUserList = (userList) => {
    localStorage.setItem(BANK_USER_LIST_KEY, JSON.stringify(userList));
}

BankUser.prototype.getUser = (id) => {
    const userList = getUserList();
    if (!userList) return false;

    const user = userList[id];
    return user || false;
}

BankUser.prototype.createUser = (user) => {
    if (!user) return false;
    let userList = getUserList();

    if (!userList) userList = {};
    userList[user.id] = user;

    BankUser.updateUserList(userList);

    return true;
}

BankUser.prototype.deleteUser = (id) => {
    if (!id) return false;
    const user = getUser(id);

    if (!user) return 'User not found!';

    const userList = getUserList();
    delete userList[id];

    BankUser.updateUserList(userList);

    return true;
}

BankUser.prototype.editUser = (id, newUserData) => {
    if (!newUserData) return false;
    const userList = getUserList();
    const user = userList[id];

    if (!user) return 'User not found!';
    user.firstName = newUserData.firstName;
    user.lastName = newUserData.lastName;
    user.balance = newUserData.balance;

    BankUser.updateUserList(userList);

    return user;
}