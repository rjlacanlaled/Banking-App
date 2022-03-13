import styled from 'styled-components';

const sampleData = [
    {
        id: 1,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: 'balance',
    },
    {
        id: 2,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: 'balance',
    },
    {
        id: 3,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: 'balance',
    },
    {
        id: 4,
        firstName: 'rj',
        lastName: 'lacanlale',
        balance: 'balance',
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
                                <TableData>buttons-here</TableData>
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
const TableData = styled.td``;
const TableBody = styled.tbody``;
