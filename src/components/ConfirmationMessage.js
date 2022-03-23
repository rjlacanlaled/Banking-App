import React from 'react';
import styled from 'styled-components';

export default function ConfirmationMessage({ message, imgUrl }) {
    return (
        <Wrapper>
            <Message>{message}</Message>
            <Image src={imgUrl} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2%;
    border: 3px solid ${({ theme }) => theme.colors.main.themeColor};
    border-radius: 20px;
    background-color: white;
`;
const Message = styled.h1``;
const Image = styled.img`
    max-width: 100px;
    max-height: 100px;
`;
