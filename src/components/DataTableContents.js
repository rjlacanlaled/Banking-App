import { DataTableHeader } from './DataTableHeader';
import DataTableRow from './DataTableRow';
import { Table, TableBody } from './styles/Table.styled';

export function DataTableContents({
    keys,
    list,
    onEdit,
    onDelete,
    onInputChange,
    onConfirmInputChange,
    onError,
    hasEdit,
    hasDelete,
}) {
    return (
        <Table>
            <DataTableHeader keys={keys} />
            <TableBody>
                {list.map(item => {
                    return (
                        <DataTableRow
                            key={`${item['id']}-data-item`}
                            id={item['id']}
                            keys={keys}
                            item={item}
                            onInputChange={onInputChange}
                            onConfirmInputChange={onConfirmInputChange}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onError={onError}
                            hasEdit={hasEdit}
                            hasDelete={hasDelete}
                        />
                    );
                })}
            </TableBody>
        </Table>
    );
}
