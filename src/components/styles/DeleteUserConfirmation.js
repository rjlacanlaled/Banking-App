import React from 'react';
import styled from 'styled-components';
import { NegativeButton, PrimaryButton } from './Buttons.styled';

export default function DeleteUserConfirmation(props) {
    const handleCancelButton = () => {
        props.setShowDeleteUserConfirmation(false);
    };

    const handleDeleteButton = () => {
        props.setShowDeleteUserConfirmation(false);
        props.confirmDeleteUser();
    };

    return (
        <Wrapper>
            <Message>Are you sure you want to delete user #{props.id}?</Message>
            <ButtonGroup>
                <StyledPrimaryButton onClick={handleDeleteButton}>Confirm</StyledPrimaryButton>
                <StyledNegativeButton onClick={handleCancelButton}>Cancel</StyledNegativeButton>
            </ButtonGroup>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    padding: 2%;
    border: 3px solid ${props => props.theme.colors.main.themeColor};
    border-radius: 20px;
    background-color: white;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    padding: 10px;
    min-width: 100px;
`;
const StyledNegativeButton = styled(NegativeButton)`
    padding: 10px;
    min-width: 100px;
`;
const Message = styled.h3`
    color: black;
`;
