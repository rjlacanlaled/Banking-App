import React from 'react'
import styled from 'styled-components'

export default function AddUserConfirmation() {
  return (
    <Wrapper>
        <Message>Successfully added user!</Message> 
        <AnimatedCheck src='./assets/checkmark.gif'/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2%;
    border: 3px solid ${props => props.theme.colors.main.themeColor};
    border-radius: 20px;
    background-color: white;
`;
const Message = styled.h1``;
const AnimatedCheck = styled.img`
    max-width: 400px;
    max-height: 400px;
`;
