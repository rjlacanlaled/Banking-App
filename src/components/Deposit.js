import React, { useState, useEffect } from 'react';
import useFloatFormat from './hooks/useFloatFormat';
import { displayModalForDuration } from '../utils/modal-util';
import {
    BoxContainer,
    BoxTitle,
    BoxAction,
    BoxOptions,
    TransactionSuccess,
    Form,
    AmountInput,
    SubmitContainer,
    SubmitButton,
} from '../pages/TransactionPage';
import styled from 'styled-components';

export default function Deposit({ bank }) {
    const [userId, setUserId] = useState(bank.users[0].id);
    const [depositValue, setDepositValue] = useFloatFormat('');
    const [showTransactionSuccessModal, setShowTransactionSuccessModal] = useState(false);
    const [showError, setShowError] = useState('');

    const handleDeposit = e => {
        e.preventDefault();

        setShowError(bank.deposit(userId, depositValue));

        displayModalForDuration(setShowTransactionSuccessModal, 2000);

        setDepositValue('');
        return;
    };

    return (
        <Container>
            <Form onSubmit={handleDeposit}>
                <TransactionSuccessDeposit showTransactionSuccessModal={showTransactionSuccessModal}>
                    {showError === true ? 'Transaction Success' : showError}
                </TransactionSuccessDeposit>
                <BoxContainer>
                    <BoxTitle>Deposit To</BoxTitle>
                    <BoxAction>
                        <BoxOptions
                            value={userId}
                            onChange={e => {
                                setUserId(e.target.value);
                            }}
                        >
                            {bank.users.map(({ id, firstName, lastName }) => {
                                return (
                                    <option key={id} value={id}>
                                        {id} - {firstName} {lastName}
                                    </option>
                                );
                            })}
                        </BoxOptions>
                    </BoxAction>
                </BoxContainer>
                <BoxContainer>
                    <BoxTitle>Amount</BoxTitle>
                    <BoxAction>
                        <AmountInput
                            value={depositValue}
                            onChange={e => {
                                setDepositValue(e.target.value);
                            }}
                        />
                    </BoxAction>
                </BoxContainer>
                <SubmitContainer>
                    <SubmitButton>Submit</SubmitButton>
                </SubmitContainer>
            </Form>
        </Container>
    );
}

const Container = styled.div`
   display: flex;
   background-color: transparent;
   width: 100%;
`;