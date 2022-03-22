import styled from 'styled-components';
import { useEffect, useState } from 'react';
import AddUser from '../components/AddUser';
import ConfirmationMessage from '../components/ConfirmationMessage';
import DataTable from '../components/DataTable';
import { Modal } from '../components/styles/Modal.styled';
import Confirmation from '../components/Confirmation';
import { displayModalForDuration } from '../utils/modal-util';
import { ButtonTitle, PageTitle, PageTitleContainer } from '../components/styles/Titles.styled';
import { FiUserPlus } from 'react-icons/fi';
import useActivePage from '../components/hooks/useActivePage';

export default function BankUserManagement({ bank }) {
    const [userList, setUserList] = useState(bank.users);
    const [chosenId, setChosenId] = useState(0);

    const [showAddUserConfirmation, setShowAddUserConfirmation] = useState(false);
    const [showAddUserConfirmationMessage, setShowAddUserConfirmationMessage] = useState(false);
    const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState(false);
    const [showDeleteUserConfirmationMessage, setShowDeleteUserConfirmationMessage] = useState(false);

    const activePage = useActivePage();


    useEffect(() => {
        activePage.setActive('users');
    }, []);

    useEffect(() => {
        setUserList(bank.users);
    }, [bank.users]);

    const handleAddUser = () => {
        setShowAddUserConfirmation(true);
    };

    const handleConfirmAddUser = (confirmed, user) => {
        if (!confirmed) return setShowAddUserConfirmation(false);
        bank.createAccount(user);
        setShowAddUserConfirmation(false);
        displayModalForDuration(setShowAddUserConfirmationMessage, 1000);
    };

    const handleEdit = user => {
        bank.updateAccount(user);
    };

    const handleDelete = id => {
        setChosenId(id);
        setShowDeleteUserConfirmation(true);
    };

    const handleConfirmDeleteUser = confirmed => {
        if (!confirmed) return setShowDeleteUserConfirmation(false);
        bank.deleteAccount(chosenId);
        setShowDeleteUserConfirmation(false);
        displayModalForDuration(setShowDeleteUserConfirmationMessage, 1000);
    };

    return (
        <Wrapper>
            <PageTitleContainer>
                <PageTitle>Manage Users</PageTitle>
                <AddUserButtonContainer>
                    <StyledFiUserPlus onClick={handleAddUser} />
                    <ButtonTitle>New Account</ButtonTitle>
                </AddUserButtonContainer>
            </PageTitleContainer>

            <DataTable
                headers={bank.userDatabase.headers}
                data={userList}
                onDelete={handleDelete}
                onEdit={handleEdit}
                inputFormatter={bank.inputFormatter.formatter}
                inputValidator={bank.inputValidator.validator}
            />

            <Modal show={showAddUserConfirmation}>
                <AddUser
                    onConfirm={handleConfirmAddUser}
                    validator={bank.inputValidator.validator}
                />
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

const AddUserButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledFiUserPlus = styled(FiUserPlus)`
    cursor: pointer;
    width: 50px;
    height: 50px;
`;
