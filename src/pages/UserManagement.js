import styled from 'styled-components';
import UserSearchBar from '../components/UserSearchBar';
import { PrimaryButton } from '../components/styles/Buttons.styled';
import UserList from '../components/UserList';
import { useEffect, useState } from 'react';
import { createUser, deleteUser, getUserList } from '../services/BankUserDatabaseService';
import BankUser, { BANK_USER_LIST_KEY } from '../model/BankUser';

const categories = ['id', 'firstName', 'lastName', 'balance'];

export default function UserManagement(props) {
    const [userList, setUserList] = useState(getUserList);
    
    const addUserHandler = (e) => {
        //localStorage.setItem(BANK_USER_LIST_KEY, null);
        const user = new BankUser("rj", "lacanlale", "07/23/1995", 1000);
        createUser(user);
        setUserList(getUserList());
    }

    return (
        <Wrapper>
            <Header>
                <Title>Manage Users</Title>
                <AddNewUserButton onClick={addUserHandler}>+ New User</AddNewUserButton>
            </Header>
            <UserSearchBar categories={categories} />
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

const AddNewUserButton = styled(PrimaryButton)``;
