import { useState } from 'react';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
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

        if (validInput === undefined) return;

        const newValues = { ...values };
        newValues[key] = validInput;
        setValues(newValues);
    };

    return (
        <StyledTableRow key={id}>
            {keys.map(key => (
                <TableData key={`${id}&&${key}data-item`}>
                    <StyledInput
                        disabled={key === 'id' ? true : !isEditing}
                        value={values[key]}
                        isEditing={isEditing}
                        onChange={e => handleInputChange(e, key)}
                    />
                </TableData>
            ))}
            <TableData>
                {!isEditing ? (
                    <ButtonContainer>
                        <StyledFiEdit onClick={() => setIsEditing(true)} />
                        <StyledRiDeleteBin5Line onClick={handleDelete} />
                    </ButtonContainer>
                ) : (
                    <ButtonContainer>
                        <StyledAiOutlineCheckCircle onClick={() => handleConfirmEdit(id)} />
                        <StyledMdOutlineCancel onClick={handleCancelEdit} />
                    </ButtonContainer>
                )}
            </TableData>
        </StyledTableRow>
    );
}

const StyledTableRow = styled(TableRow)`
`;

const StyledInput = styled(Input)`
    background-color: transparent;
    border-style: none;
    

    padding: 5px;

    text-align: center;
    text-transform: uppercase;
    color: black;
    opacity: ${({ isEditing }) => (isEditing ? 1 : 0.6)};

    font-weight: 600;
`;
const ButtonContainer = styled.div``;
const StyledFiEdit = styled(FiEdit)`
    cursor: pointer;
`;
const StyledRiDeleteBin5Line = styled(RiDeleteBin5Line)`
    cursor: pointer;
`;

const StyledMdOutlineCancel = styled(MdOutlineCancel)`
    cursor: pointer;
`;
const StyledAiOutlineCheckCircle = styled(AiOutlineCheckCircle)`
    cursor: pointer;
`;
