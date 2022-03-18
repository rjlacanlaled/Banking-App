import styled from 'styled-components';
import { PrimaryButton } from '../components/styles/Buttons.styled';
import { useEffect, useState } from 'react';
import { BANK_USER_KEYS } from '../model/bank-user';
import AddUser from '../components/AddUser';
import ConfirmationMessage from '../components/ConfirmationMessage';
import DataTable from '../components/DataTable';
import { Modal } from '../components/styles/Modal.styled';
import Confirmation from '../components/Confirmation';
import { displayModalForDuration } from '../utils/modal-util';

export default function UserManagement({ users, create, update, remove, formatter, validator }) {
    const [userList, setUserList] = useState(users);
    const [chosenId, setChosenId] = useState(0);

    const [showAddUserConfirmation, setShowAddUserConfirmation] = useState(false);
    const [showAddUserConfirmationMessage, setShowAddUserConfirmationMessage] = useState(false);
    const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState(false);
    const [showDeleteUserConfirmationMessage, setShowDeleteUserConfirmationMessage] = useState(false);

    useEffect(() => {
        setUserList(users);
    }, [users]);


    const handleAddUser = () => {
        setShowAddUserConfirmation(true);
    };

    const handleConfirmAddUser = (confirmed, user) => {
        if (!confirmed) return setShowAddUserConfirmation(false);
        create(user);
        setShowAddUserConfirmation(false);
        displayModalForDuration(setShowAddUserConfirmationMessage, 1500);
    };

    const handleEdit = user => {
        update(user);
    };

    const handleDelete = id => {
        setChosenId(id);
        setShowDeleteUserConfirmation(true);
    };

    const handleConfirmDeleteUser = confirmed => {
        if (!confirmed) return setShowDeleteUserConfirmation(false);
        remove(chosenId);
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
                <DataTable
                    headers={BANK_USER_KEYS}
                    data={userList}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    inputFormatter={formatter}
                    inputValidator={validator}
                />
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
