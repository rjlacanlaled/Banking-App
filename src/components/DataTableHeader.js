import { TableHead, TableHeader, TableRow } from './styles/Table.styled';

export function DataTableHeader({ keys }) {
    return (
        <TableHead>
            <TableRow>
                {keys.map(key => (
                    <TableHeader key={key}>{key}</TableHeader>
                ))}
                <TableHeader>{'Actions'}</TableHeader>
            </TableRow>
        </TableHead>
    );
}
