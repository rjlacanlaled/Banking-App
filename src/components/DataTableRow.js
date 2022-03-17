import { useState } from 'react';
import styled from 'styled-components';
import ConfirmCancelButtons from './ConfirmCancelButtons';
import EditDeleteButtons from './EditDeleteButtons';
import { Input } from './styles/Inputs.styled';
import { TableData, TableRow } from './styles/Table.styled';

export default function DataTableRow({
    id,
    keys,
    item,
    onDelete,
    onEdit,
    onInputChange,
    onConfirmInputChange,
    onError,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [values, setValues] = useState(item);

    const handleDelete = () => {
        onDelete(id);
    };

    const handleConfirmEdit = () => {
        const errors = keys
            .map(key => (key !== 'id' ? onConfirmInputChange[key](values[key]) : []))
            .reduce((merged, err) => merged.concat(err));

        if (errors.length) return onError(errors);
        onError([]);
        setIsEditing(false);
        onEdit(values);
    };

    const handleCancelEdit = () => {
        onError([]);
        setValues(item);
        setIsEditing(false);
    };

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        const validInput = onInputChange[key](value);
        console.log(validInput);
        if (validInput === undefined) return;

        const newValues = { ...values };
        newValues[key] = validInput;
        setValues(newValues);
    };

    return (
        <TableRow key={id}>
            {keys.map(key => (
                <TableData key={`${id}&&${key}data-item`}>
                    <StyledInput
                        disabled={key === 'id' ? true : !isEditing}
                        value={values[key]}
                        onChange={e => handleInputChange(e, key)}
                    />
                </TableData>
            ))}
            <TableData>
                {!isEditing ? (
                    <EditDeleteButtons id={id} onEdit={setIsEditing} onDelete={handleDelete} />
                ) : (
                    <ConfirmCancelButtons id={id} onConfirm={handleConfirmEdit} onCancel={handleCancelEdit} />
                )}
            </TableData>
        </TableRow>
    );
}

const StyledInput = styled(Input)``;
