import styled, { useTheme } from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi';
import { AiOutlineTransaction } from 'react-icons/ai';
import { deleteUser, editUser, getUserList } from '../services/BankUserDatabaseService';
import { useState } from 'react';
import { formatFloat, formatName } from '../services/InputFormatService';
import { MAX_BALANCE_DIGITS, MAX_NAME_CHARS } from '../model/BankUser';
import { Input } from './styles/Inputs.styled';
import DeleteUserConfirmation from './DeleteUserConfirmation';
import { validBalance, validFirstName, validLastName } from '../services/BankInputValidationService';

function UserTableItem({
    user: { id, lastName, firstName, balance },
    setUserList,
    setUserToDelete,
    setShowDeleteUserConfirmation,
}) {
    const [editable, setEditable] = useState(false);
    const [invalidFirstName, setInvalidFirstName] = useState(false);
    const [invalidLastName, setInvalidLastName] = useState(false);
    const [invalidBalance, setInvalidBalance] = useState(false);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newBalance, setNewBalance] = useState(balance);

    const handleDeleteUser = () => {
        setUserToDelete(id);
        setShowDeleteUserConfirmation(true);
    };

    const handleEditUser = () => {
        setEditable(true);
    };

    const handleConfirmEdit = () => {
        const firstNameErr = validFirstName(newFirstName);
        const lastNameErr = validLastName(newLastName);
        const balanceErr = validBalance(newBalance);
        const err = [...firstNameErr, ...lastNameErr, ...balanceErr];

        setInvalidFirstName(firstNameErr.length);
        setInvalidLastName(lastNameErr.length);
        setInvalidBalance(balanceErr.length);
        if (err.length) return;

        setEditable(false);
        editUser(id, { firstName: newFirstName, lastName: newLastName, balance: newBalance });
        setUserList(getUserList());
    };

    const handleExitEdit = () => {
        setEditable(false);
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setNewBalance(balance);
    };

    const handleFirstNameChange = e => {
        if (e.target.value.length > MAX_NAME_CHARS) return;
        const value = formatName(e.target.value);
        setNewFirstName(value);
    };

    const handleLastNameChange = e => {
        if (e.target.value.length > MAX_NAME_CHARS) return;
        const value = formatName(e.target.value);
        setNewLastName(value);
    };

    const handleBalanceChange = e => {
        if (e.target.value.length > MAX_NAME_CHARS) return;
        const value = formatFloat(e.target.value);
        setNewBalance(value);
    };

    return (
        <TableRow key={id}>
            <TableData>{id}</TableData>
            <TableData>
                <StyledInput invalid={invalidLastName} disabled={!editable} value={newLastName} onChange={handleLastNameChange} />
            </TableData>
            <TableData>
                <StyledInput invalid={invalidFirstName}  disabled={!editable} value={newFirstName} onChange={handleFirstNameChange} />
            </TableData>
            <TableData>
                <StyledInput invalid={invalidBalance}  disabled={!editable} value={newBalance} onChange={handleBalanceChange} />
            </TableData>
            <TableData>
                {editable ? (
                    <EditActionGroup handleConfirmEdit={handleConfirmEdit} handleExitEdit={handleExitEdit} />
                ) : (
                    <RegularActionGroup handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
                )}
            </TableData>
        </TableRow>
    );
}

function RegularActionGroup({ handleEditUser, handleDeleteUser }) {
    return (
        <TableActionGroup>
            <StyledFaUserEdit onClick={handleEditUser} />
            <StyledTiUserDelete onClick={handleDeleteUser} />
            <StyledAiOutlineTransaction />
        </TableActionGroup>
    );
}

function EditActionGroup({ handleConfirmEdit, handleExitEdit }) {
    return (
        <TableActionGroup>
            <StyledFiCheckSquare onClick={handleConfirmEdit} />
            <StyledFiXSquare onClick={handleExitEdit} />
        </TableActionGroup>
    );
}

function UserTable(props) {
    return (
        <TableContainer>
            <TableHead>
                <TableRow>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>Lastname</TableHeader>
                    <TableHeader>FirstName</TableHeader>
                    <TableHeader>Balance</TableHeader>
                    <TableHeader>Actions</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.userList.map(user => {
                    return (
                        <UserTableItem
                            setShowDeleteUserConfirmation={props.setShowDeleteUserConfirmation}
                            setUserToDelete={props.setUserToDelete}
                            key={user.id}
                            setUserList={props.setUserList}
                            user={user}
                        />
                    );
                })}
            </TableBody>
        </TableContainer>
    );
}

function UserData(props) {
    return (
        <UserDataContainer userList={props.userList}>
            {props.userList.length ? (
                <UserTable
                    setShowDeleteUserConfirmation={props.setShowDeleteUserConfirmation}
                    setUserToDelete={props.setUserToDelete}
                    setUserList={props.setUserList}
                    userList={props.userList}
                />
            ) : (
                <NoUserMessage>There are currently no users to display!</NoUserMessage>
            )}
        </UserDataContainer>
    );
}

export default function UserList(props) {
    const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const confirmDeleteUser = () => {
        deleteUser(userToDelete);
        props.setUserList(getUserList());
    }

    return (
        <Wrapper>
            <DeleteUserModal showDeleteUserConfirmation={showDeleteUserConfirmation}>
                <DeleteUserConfirmation
                    id={userToDelete}
                    confirmDeleteUser={confirmDeleteUser}
                    setShowDeleteUserConfirmation={setShowDeleteUserConfirmation}
                />
            </DeleteUserModal>
            <UserData
                setShowDeleteUserConfirmation={setShowDeleteUserConfirmation}
                setUserToDelete={setUserToDelete}
                userList={props.userList}
                setUserList={props.setUserList}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    max-height: 500px;
    overflow: auto;
    background-color: ${props => props.theme.colors.main.themeColor};
`;

const UserDataContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: ${({ userList }) => (!userList.length ? 'center' : 'flex-start')};
    width: 100%;
    height: 100%;
    padding: 0 10% 0 10%;
    text-transform: uppercase;
`;

const TableContainer = styled.table`
    border-collapse: collapse;
    width: 100%;
    min-width: max-content;

    background-color: ${props => props.theme.colors.tableData.oddStripeColor};
`;

const TableRow = styled.tr`
    color: white;
    :nth-child(even) {
        background-color: ${props => props.theme.colors.tableData.evenStripeColor}55;
    }
    
    border-bottom: 0.5px solid white;
`;

const TableHead = styled.thead`
    text-align: left;
`;

const TableHeader = styled.th`
    color: ${props => props.theme.colors.tableHeader.fontColor};
    background-color: ${props => props.theme.colors.tableHeader.backgroundColor};
    padding: 10px;
    position: sticky;
    top: 0;
`;

const TableData = styled.td`
    padding: 5px;
    min-width: max-content;
`;

const TableBody = styled.tbody``;

const TableActionGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
    max-width: 75px;
`;

const NoUserMessage = styled.h1`
    text-align: center;
    color: white;
`;

const StyledInput = styled(Input)`
    border-style: none;
    outline: ${({ disabled }) => (disabled ? 'none' : '1px solid white')};
    border-radius: 5px;
    background-color: ${({invalid, theme}) => invalid ? theme.colors.errorText.fontColor : 'transparent'};
    padding: 5px;
    color: white;
    font-weight: 600;

    transition: all 0.5s;
    text-transform: uppercase;
`;

const StyledFaUserEdit = styled(FaUserEdit)`
    cursor: pointer;
`;

const StyledTiUserDelete = styled(TiUserDelete)`
    cursor: pointer;
`;

const StyledAiOutlineTransaction = styled(AiOutlineTransaction)`
    cursor: pointer;
`;

const StyledFiXSquare = styled(FiXSquare)`
    cursor: pointer;
`;

const StyledFiCheckSquare = styled(FiCheckSquare)`
    cursor: pointer;
`;

const DeleteUserModal = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 500px;
    display: ${({ showDeleteUserConfirmation }) => (showDeleteUserConfirmation ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0, 0.8);
`;
