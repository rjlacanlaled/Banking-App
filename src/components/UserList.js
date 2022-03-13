import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { AiOutlineTransaction } from 'react-icons/ai';

const sampleData = [
    {
        id: 1,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: '1000.1',
    },
    {
        id: 2,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: '112321',
    },
    {
        id: 3,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: '2312',
    },
    {
        id: 4,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: '155',
    },
];

export default function UserList(props) {
    return (
        <Wrapper>
            <UserTable>
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
                    {sampleData.map(({ id, firstName, lastName, balance }) => {
                        return (
                            <TableRow key={id}>
                                <TableData>{id}</TableData>
                                <TableData>{lastName}</TableData>
                                <TableData>{firstName}</TableData>
                                <TableData>{balance}</TableData>
                                <TableData>
                                    <TableActionGroup>
                                        <StyledFaUserEdit />
                                        <StyledTiUserDelete />
                                        <StyledAiOutlineTransaction />
                                    </TableActionGroup>
                                </TableData>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </UserTable>
        </Wrapper>
    );
}


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const UserTable = styled.table`
    border-collapse: collapse;
    text-align: center;
    width: 100%;
`;

const TableRow = styled.tr`
    border: 1px solid black;
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

const StyledFaUserEdit = styled(FaUserEdit)`
    cursor: pointer;
`;

const StyledTiUserDelete = styled(TiUserDelete)`
    cursor: pointer;
`;

const StyledAiOutlineTransaction = styled(AiOutlineTransaction)`
    cursor: pointer;
`;
