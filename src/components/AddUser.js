import React, { useState } from 'react';
import styled from 'styled-components';
import BankUser from '../model/bank-user';
import ErrorBox from './ErrorBox';
import { NegativeButton, PrimaryButton } from './styles/Buttons.styled';
import { Input } from './styles/Inputs.styled';

export default function AddUser({ onConfirm, validator, formatter }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [balance, setBalance] = useState('');
    const [errors, setErrors] = useState([]);


    const handleFirstNameChange = e => {
        const value = formatter.firstName(e.target.value) || firstName;
        setFirstName(value);
    };

    const handleLastNameChange = e => {
        const value = formatter.lastName(e.target.value) || lastName;
        setLastName(value);
    };

    const handleBalanceChange = e => {
        const value = formatter.balance(e.target.value) || balance;
        setBalance(value);
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        let err = [
            ...validator.firstName(firstName),
            ...validator.lastName(lastName),
            ...validator.balance(balance),
        ];
        if (err.length) return setErrors(err);
        resetInput();
        onConfirm(true, new BankUser(firstName, lastName, balance));
    };

    const handleAddUserCancel = () => {
        resetInput();
        onConfirm(false);
    };

    const resetInput = () => {
        setFirstName('');
        setLastName('');
        setBalance('');
        setErrors([]);
    };

    return (
        <Container>
            <FormTitle>Add User</FormTitle>
            <ErrorBox errors={errors} />
            <Form>
                <Label>First Name</Label>
                <StyledInput onChange={handleFirstNameChange} value={firstName} placeholder='Enter first name' />
                <Label>Last Name</Label>
                <StyledInput onChange={handleLastNameChange} value={lastName} placeholder='Enter last name' />
                <Label>Balance</Label>
                <StyledInput onChange={handleBalanceChange} value={balance} placeholder='Enter account balance' />
            </Form>
            <ButtonContainer>
                <StyledPrimaryButton onClick={handleFormSubmit}>Submit</StyledPrimaryButton>
                <StyledNegativeButton onClick={handleAddUserCancel}>Cancel</StyledNegativeButton>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;

    border: 3px solid ${props => props.theme.colors.main.themeColor};
    background-color: ${props => props.theme.colors.form.backgroundColor};
    color: ${props => props.theme.colors.form.fontColor};
    border-radius: 20px;

    padding: 2%;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const FormTitle = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
`;

const StyledInput = styled(Input)`
    padding: 8px;
    border: 1px solid ${props => props.theme.colors.main.themeColor};
    border-radius: 5px;
    min-width: 400px;
`;

const Label = styled.label`
    font-weight: 900;
    align-self: flex-start;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    padding: 10px 20px 10px 20px;
`;
const StyledNegativeButton = styled(NegativeButton)`
    padding: 10px 20px 10px 20px;
`;
