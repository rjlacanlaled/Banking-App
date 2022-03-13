import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { AiOutlineTransaction } from 'react-icons/ai';
import { deleteUser, editUser, getUserList } from '../services/BankUserDatabaseService';
import BankUser from '../model/BankUser';

function UserTable(props) {

    const handleDeleteUser = (id) => {
        deleteUser(id);
        props.setUserList(getUserList());
    }

    const handleEditUser = (id) => {
        editUser(id, new BankUser("new", "lastname", "zzz", "5000"));
        props.setUserList(getUserList());
    }

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
                {props.userList.map(({ id, firstName, lastName, balance }) => {
                    return (
                        <TableRow key={id}>
                            <TableData>{id}</TableData>
                            <TableData>{lastName}</TableData>
                            <TableData>{firstName}</TableData>
                            <TableData>{balance}</TableData>
                            <TableData>
                                <TableActionGroup>
                                    <StyledFaUserEdit onClick={() => handleEditUser(id)} />
                                    <StyledTiUserDelete onClick={() => handleDeleteUser(id)} />
                                    <StyledAiOutlineTransaction />
                                </TableActionGroup>
                            </TableData>
                        </TableRow>
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
            <UserData userList={props.userList} setUserList={props.setUserList}/>
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
    align-items: ${({userList}) => !userList.length ? 'center' : 'flex-start'};
    width: 100%;
    height: 100%;
`;

const TableContainer = styled.table`
    border-collapse: collapse;
    text-align: center;
    width: 100%;
`;

const TableRow = styled.tr`
    border: 1px solid black;
    opacity: 0.8;

    :nth-child(even) {
        background-color: ${(props) => props.theme.colors.tableHeader.backgroundColor};
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
