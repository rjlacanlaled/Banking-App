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

const Wrapper = styled.div``;
const Message = styled.h1``;
const AnimatedCheck = styled.img`

`;
