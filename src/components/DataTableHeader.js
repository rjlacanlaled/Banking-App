import styled from 'styled-components';
import { TableHead, TableHeader, TableRow } from './styles/Table.styled';

export function DataTableHeader({ keys }) {
    return (
        <StyledTableHead>
            <StyledTableRow>
                {keys.map(key => (
                    <StyledTableHeader key={key}>{key}</StyledTableHeader>
                ))}
                <StyledTableHeader>{'Actions'}</StyledTableHeader>
            </StyledTableRow>
        </StyledTableHead>
    );
}

const StyledTableHead = styled(TableHead)`
    position: sticky;
    top: 0px;

    border: 1px solid white;
    text-transform: uppercase;
    background-color: #009879;
    border-radius: 20px;
    opacity: 1;
    z-index: 10;
    padding: 5px;
`;

const StyledTableRow = styled(TableRow)`

`;

const StyledTableHeader = styled(TableHeader)`
    padding: 20px;
`;
