import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import styled from 'styled-components';

export default function EditDeleteButtons({ id, onEdit, onDelete }) {
    return (
        <ButtonContainer>
            <StyledFiEdit onClick={() => onEdit(id)} />
            <StyledRiDeleteBin5Line onClick={() => onDelete(id)} />
        </ButtonContainer>
    );
}

const StyledFiEdit = styled(FiEdit)``;
const StyledRiDeleteBin5Line = styled(RiDeleteBin5Line)``;
const ButtonContainer = styled.div``;