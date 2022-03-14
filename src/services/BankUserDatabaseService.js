import { BANK_USER_ID_KEY, BANK_USER_LIST_KEY } from '../model/BankUser';

export function getLastUserId() {
    const userId = localStorage.getItem(BANK_USER_ID_KEY);
    return parseInt(userId) || 0;
}

export function incrementUserId() {
    localStorage.setItem(BANK_USER_ID_KEY, getLastUserId() + 1);
}

export function getUserList() {
    const userList = JSON.parse(localStorage.getItem(BANK_USER_LIST_KEY));
    if (!userList) return [];

    return userList;
}

export function updateUserList(userList) {
    localStorage.setItem(BANK_USER_LIST_KEY, JSON.stringify(userList));
}

export function getUser(id) {
    const userList = getUserList();
    if (!userList) return false;

    const user = userList[userList.findIndex(user => user.id === id)];
    return user || false;
}

export function createUser(user) {
    console.log(user);
    if (!user) return false;
    let userList = getUserList();

    if (!userList) userList = {};
    user.id = getLastUserId() + 1;
    userList.push(user);

    updateUserList(userList);
    incrementUserId();

    return true;
}

export function deleteUser(id) {
    if (!id) return false;
    const user = getUser(id);

    if (!user) return 'User not found!';

    let userList = getUserList();
    userList = userList.filter(userListItem => userListItem.id !== user.id);

    updateUserList(userList);

    return user;
}

export function editUser(id, newUserData) {
    if (!newUserData) return false;
    const userList = getUserList();
    const user = userList[userList.findIndex(list => list.id === id)];

    if (!user) return 'User not found!';
    user.firstName = newUserData.firstName;
    user.lastName = newUserData.lastName;
    user.balance = newUserData.balance;

    alert(newUserData.lastName, newUserData.firstName);

    alert('updated user!');

    updateUserList(userList);

    return user;
}

export function findFirstName(firstName) {
    const userList = getUserList();
    if (!userList.length) return [];

    const filteredUserList = userList.filter(user => user.firstName.match(`${firstName}`));

    return filteredUserList;
}

export function findLastName(lastName) {
    const userList = getUserList();
    if (!userList.length) return [];

    const filteredUserList = userList.filter(user => user.lastName.match(`${lastName}`));

    return filteredUserList;
}

export function findBalance(balance) {
    const userList = getUserList();
    if (!userList.length) return [];

    const filteredUserList = userList.filter(user => user.balance >= balance);

    return filteredUserList;
}

export function findUser(key, category) {
    switch (category) {
        case 'id':
            return getUser(key);
        case 'balance':
            return findBalance(key);
        case 'lastName':
            return findLastName(key);
        case 'firstName':
            return findFirstName(key);
        default:
            return [];
    }
}
