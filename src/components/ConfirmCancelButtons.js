import styled from 'styled-components';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function ConfirmCancelButtons({ id, onConfirm, onCancel }) {
    return (
        <ButtonContainer>
            <StyledAiOutlineCheckCircle onClick={() => onConfirm(id)} />
            <StyledMdOutlineCancel onClick={() => onCancel(id)} />
        </ButtonContainer>
    );
}

const StyledMdOutlineCancel = styled(MdOutlineCancel)``;
const StyledAiOutlineCheckCircle = styled(AiOutlineCheckCircle)``;
const ButtonContainer = styled.div``;
