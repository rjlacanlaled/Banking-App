import styled from 'styled-components';
import { PrimaryButton } from '../components/styles/Buttons.styled';
import { useEffect, useState } from 'react';
import { createUser, deleteUser, editUser, findUser, getUserList } from '../services/bank-user-database-service';
import BankUser, { BANK_USER_KEYS, BANK_USER_LIST_KEY } from '../model/BankUser';
import AddUser from '../components/AddUser';
import ConfirmationMessage from '../components/ConfirmationMessage';
import DataTable from '../components/DataTable';
import { Modal } from '../components/styles/Modal.styled';
import Confirmation from '../components/Confirmation';
import { displayModalForDuration } from '../utils/modal-util';
import { bankInputFormatter } from '../services/bank-input-format-service';

export default function UserManagement(props) {
    const [userList, setUserList] = useState(getUserList());
    const [chosenId, setChosenId] = useState(0);

    const [showAddUserConfirmation, setShowAddUserConfirmation] = useState(false);
    const [showAddUserConfirmationMessage, setShowAddUserConfirmationMessage] = useState(false);
    const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState(false);
    const [showDeleteUserConfirmationMessage, setShowDeleteUserConfirmationMessage] = useState(false);

    const handleAddUser = e => {
        setShowAddUserConfirmation(true);
    };

    const handleConfirmAddUser = confirmed => {
        if (!confirmed) return setShowAddUserConfirmation(false);
        setShowAddUserConfirmation(false);
        displayModalForDuration(setShowAddUserConfirmationMessage, 1500);
        setUserList(getUserList());
    };

    const handleEdit = user => {
        editUser(user);
        setUserList(getUserList());
    };

    const handleDelete = id => {
        setChosenId(id);
        setShowDeleteUserConfirmation(true);
    };

    const handleConfirmDeleteUser = confirmed => {
        if (!confirmed) return setShowDeleteUserConfirmation(false);
        deleteUser(chosenId);
        setUserList(getUserList());
        setShowDeleteUserConfirmation(false);
        displayModalForDuration(setShowDeleteUserConfirmationMessage, 1500);
    };

    return (
        <Wrapper>
            <Header>
                <Title>Manage Users</Title>
                <AddNewUserButton onClick={handleAddUser}>+ New User</AddNewUserButton>
            </Header>

            {userList.length && (
                <DataTable headers={BANK_USER_KEYS} data={userList} 
                onDelete={handleDelete} 
                onEdit={handleEdit}
                inputHandler={(input) => bankInputFormatter(input)} />
            )}

            <Modal show={showAddUserConfirmation}>
                <AddUser onConfirm={handleConfirmAddUser} />
            </Modal>

            <Modal show={showAddUserConfirmationMessage}>
                <ConfirmationMessage message='Successfully added user!' imgUrl='./assets/checkmark.gif' />
            </Modal>

            <Modal show={showDeleteUserConfirmation}>
                <Confirmation
                    message={`Are you sure you want to delete user #${chosenId}?`}
                    onConfirm={handleConfirmDeleteUser}
                />
            </Modal>

            <Modal show={showDeleteUserConfirmationMessage}>
                <ConfirmationMessage message='Successfully deleted user!' imgUrl='./assets/checkmark.gif' />
            </Modal>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    height: 100vh;
    width: 100vw;

    overflow: auto;

    background-color: ${({ theme }) => theme.colors.main.themeColor};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.mainTitleDiv.backgroundColor};
    color: ${props => props.theme.colors.mainTitleDiv.fontColor};
    padding: 1% 10% 1% 10%;
    width: 100%;

    overflow: auto;

    border-bottom: 2px solid white;
`;

const Title = styled.h1``;

const AddNewUserButton = styled(PrimaryButton)`
    padding: 10px;
`;
