import styled from 'styled-components';
import UserSearchBar from '../components/UserSearchBar';
import { PrimaryButton } from '../components/styles/Buttons.styled';
import UserList from '../components/UserList';
import { useEffect, useState } from 'react';
import { createUser, deleteUser, findUser, getUserList } from '../services/BankUserDatabaseService';
import BankUser, { BANK_USER_LIST_KEY } from '../model/BankUser';
import AddUser from '../components/AddUser';

const categories = ['id', 'firstName', 'lastName', 'balance'];

export default function UserManagement(props) {
    const [userList, setUserList] = useState(getUserList);
    const [showAddUser, setShowAddUser] = useState(false);

    const handleAddUser = e => {
        setShowAddUser(true);
    };

    const handleUserSearch = (key, category) => {
        if (key === '') return setUserList(getUserList());

        const filteredUserList = findUser(key, category);
        setUserList(filteredUserList);
    };

    return (
        <Wrapper>
            <AddUserModal showAddUser={showAddUser}>
                <AddUser setShowAddUser={setShowAddUser} />
            </AddUserModal>

            <Header>
                <Title>Manage Users</Title>
                <AddNewUserButton onClick={handleAddUser}>+ New User</AddNewUserButton>
            </Header>
            <UserSearchBar categories={categories} searchUser={handleUserSearch} />
            <UserList setUserList={setUserList} userList={userList} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    height: 100vh;
    width: 100vw;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.mainTitleDiv.backgroundColor};
    color: ${props => props.theme.colors.mainTitleDiv.fontColor};
`;

const Title = styled.h1``;

const AddNewUserButton = styled(PrimaryButton)`
    padding: 5px;
`;

const AddUserModal = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${({showAddUser}) => showAddUser ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background-color: rgb(0,0,0, 0.8);
`;
