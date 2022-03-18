export function getLastUserId(databaseKey) {
    const userId = localStorage.getItem(databaseKey);
    return parseInt(userId) || 0;
}

export function incrementUserId(databaseKey) {
    localStorage.setItem(databaseKey.concat('id'), getLastUserId() + 1);
}

export function getUserList(databaseKey) {
    const userList = JSON.parse(localStorage.getItem(databaseKey));
    if (!userList) return [];

    return userList;
}

export function updateUserList(userList, databaseKey) {
    localStorage.setItem(databaseKey, JSON.stringify(userList));
}

export function getUser(id, databaseKey) {
    const userList = getUserList(databaseKey);
    if (!userList) return false;

    const user = userList[userList.findIndex(user => user.id == id)];
    return user || false;
}

export function createUser(user, databaseKey) {
    if (!user) return false;
    let userList = getUserList(databaseKey);

    if (!userList) userList = {};
    user.id = getLastUserId(databaseKey) + 1;
    userList.push(user);

    updateUserList(userList, databaseKey);
    incrementUserId(databaseKey);

    return true;
}

export function deleteUser(id, databaseKey) {
    if (!id) return false;
    const user = getUser(id, databaseKey);

    if (!user) return 'User not found!';

    let userList = getUserList(databaseKey);
    userList = userList.filter(userListItem => userListItem.id !== user.id);

    updateUserList(userList, databaseKey);

    return user;
}

export function editUser(updatedUser, databaseKey) {
    if (!updatedUser) return false;
    const userList = getUserList(databaseKey);
    const user = userList[userList.findIndex(list => list.id === updatedUser.id)];

    if (!user) return 'User not found!';
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.balance = updatedUser.balance;

    updateUserList(userList, databaseKey);

    return user;
}

export function findFirstName(firstName) {
    const userList = getUserList();
    if (!userList.length) return [];

    const filteredUserList = userList.filter(user => user.firstName.match(`${firstName}`));

    return filteredUserList;
}
