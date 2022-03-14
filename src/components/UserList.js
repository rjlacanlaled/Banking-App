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

function UserTableItem({ user: { id, lastName, firstName, balance }, setUserList }) {
    const [editable, setEditable] = useState(false);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newBalance, setNewBalance] = useState(balance);

    const handleDeleteUser = () => {
        // show confirmation dialog

        // handle delete user in a different function
        deleteUser(id);
        setUserList(getUserList());
    };

    const handleEditUser = () => {
        setEditable(true);
    };

    const handleConfirmEdit = () => {
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
                <Input disabled={!editable} value={newLastName} onChange={handleLastNameChange}></Input>
            </TableData>
            <TableData>
                <Input disabled={!editable} value={newFirstName} onChange={handleFirstNameChange}></Input>
            </TableData>
            <TableData>
                <Input disabled={!editable} value={newBalance} onChange={handleBalanceChange}></Input>
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
                    return <UserTableItem key={user.id} setUserList={props.setUserList} user={user} />;
                })}
            </TableBody>
        </TableContainer>
    );
}

function UserData(props) {
    return (
        <UserDataContainer userList={props.userList}>
            {props.userList.length ? (
                <UserTable setUserList={props.setUserList} userList={props.userList} />
            ) : (
                <NoUserMessage>There are currently no users to display!</NoUserMessage>
            )}
        </UserDataContainer>
    );
}

export default function UserList(props) {
    return (
        <Wrapper>
            <UserData userList={props.userList} setUserList={props.setUserList} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const UserDataContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: ${({ userList }) => (!userList.length ? 'center' : 'flex-start')};
    width: 100%;
    height: 100%;
`;

const TableContainer = styled.table`
    border-collapse: collapse;
    text-align: center;
    width: 100%;
`;

const TableRow = styled.tr`
    :nth-child(even) {
        background-color: ${props => props.theme.colors.tableHeader.backgroundColor};
        color: ${props => props.theme.colors.tableHeader.fontColor};
    }
`;

const TableHead = styled.thead`
    color: ${props => props.theme.colors.tableHeader.fontColor};
    background-color: ${props => props.theme.colors.tableHeader.backgroundColor};
`;

const TableHeader = styled.th``;

const TableData = styled.td`
    min-width: max-content;
`;

const TableBody = styled.tbody``;

const TableActionGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;
`;

const NoUserMessage = styled.h1`
    text-align: center;
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
