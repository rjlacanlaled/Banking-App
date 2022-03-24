import React, { useState } from 'react';
import styled from 'styled-components';
import BankAdminUser from '../model/bank-admin-user';
import BankUser from '../model/bank-user';
import { UserTypes } from '../model/enums/user-types';
import ErrorBox from './ErrorBox';
import useAlphaNumericFormat from './hooks/useAlphanumericFormat';
import useFloatFormat from './hooks/useFloatFormat';
import useNameFormat from './hooks/useNameFormat';
import useUsernameFormat from './hooks/useUsernameFormat';
import { NegativeButton, PrimaryButton } from './styles/Buttons.styled';
import { Input, Option, Select } from './styles/Inputs.styled';

export default function AddUser({ users, onConfirm, validator }) {
    const [firstName, setFirstName] = useNameFormat('');
    const [lastName, setLastName] = useNameFormat('');
    const [username, setUsername] = useUsernameFormat('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState(UserTypes.Normal);
    const [balance, setBalance] = useFloatFormat(0);
    const [errors, setErrors] = useState([]);

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log(users);
        let err = [
            ...validator.firstName(firstName),
            ...validator.lastName(lastName),
            ...validator.balance(balance),
            ...validator.username(username, users),
            ...validator.password(password),
        ];
        if (err.length) return setErrors(err);
        resetInput();
        onConfirm(
            true,
            accountType === UserTypes.Normal
                ? new BankUser(firstName, lastName, balance, username, password)
                : new BankAdminUser(firstName, lastName, username, password)
        );
    };

    const handleAddUserCancel = () => {
        resetInput();
        onConfirm(false);
    };

    const resetInput = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setBalance(0);
        setAccountType(UserTypes.Normal);
        setErrors([]);
    };

    return (
        <Container>
            <FormTitle>Add User</FormTitle>
            <ErrorBox errors={errors} />
            <Form>
                <Label>Username</Label>
                <StyledInput
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    placeholder='Enter username'
                />
                <Label>Password</Label>
                <StyledInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder='Enter password'
                    type='password'
                />
                <Label>First Name</Label>
                <StyledInput
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder='Enter first name'
                />
                <Label>Last Name</Label>
                <StyledInput
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    placeholder='Enter last name'
                />
                <Label>Account Type</Label>
                <StyledSelect onChange={e => setAccountType(e.target.value)} value={accountType}>
                    {Object.values(UserTypes).map(userType => (
                        <StyledOption key={userType} value={userType}> {userType}</StyledOption>
                    ))}
                </StyledSelect>
                {accountType === UserTypes.Normal && (
                    <>
                        <Label>Balance</Label>
                        <StyledInput
                            onChange={e => setBalance(e.target.value)}
                            value={balance}
                            placeholder='Enter account balance'
                        />
                    </>
                )}
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
    z-index: 100;

    border: 3px solid ${props => props.theme.colors.main.themeColor};
    background-color: #009879;
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
    font-size: 1.2rem;
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
    font-size: 0.8rem;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    padding: 10px 20px 10px 20px;
`;
const StyledNegativeButton = styled(NegativeButton)`
    padding: 10px 20px 10px 20px;
`;

const StyledSelect = styled(Select)`
    padding: 8px;
    border: 1px solid ${props => props.theme.colors.main.themeColor};
    border-radius: 5px;
    min-width: 400px;
`;
const StyledOption = styled(Option)``;
