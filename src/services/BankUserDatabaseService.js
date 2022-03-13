import { BANK_USER_LIST_KEY } from '../model/BankUser';

export function getUserList() {
    const userList = JSON.parse(localStorage.getItem(BANK_USER_LIST_KEY));
    if (!userList) return {};

    return userList;
}

export function updateUserList(userList) {
    localStorage.setItem(BANK_USER_LIST_KEY, JSON.stringify(userList));
}

export function getUser(id) {
    const userList = getUserList();
    if (!userList) return false;

    const user = userList[id];
    return user || false;
}

export function createUser(user) {
    if (!user) return false;
    let userList = getUserList();

    if (!userList) userList = {};
    userList[user.id] = user;

    updateUserList(userList);

    return true;
}

export function deleteUser(id) {
    if (!id) return false;
    const user = getUser(id);

    if (!user) return 'User not found!';

    const userList = getUserList();
    delete userList[id];

    updateUserList(userList);

    return true;
}

export function editUser(id, newUserData) {
    if (!newUserData) return false;
    const userList = getUserList();
    const user = userList[id];

    if (!user) return 'User not found!';
    user.firstName = newUserData.firstName;
    user.lastName = newUserData.lastName;
    user.balance = newUserData.balance;

    updateUserList(userList);

    return user;
}