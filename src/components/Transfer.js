import React, { useState, useEffect } from 'react';
import useFloatFormat from './hooks/useFloatFormat';
import { displayModalForDuration } from '../utils/modal-util';
import { Wrapper, Close, DisplayUser, ViewBalance } from './Withdraw';
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

export default function Transfer({ bank, show, collapse }) {
    const [transferFromId, setTransferFromId] = useState(bank.users[0].id);
    const [availableUsers, setAvailableUsers] = useState(bank.users.filter(user => user.id != transferFromId));
    const [transferToId, setTransferToId] = useState(availableUsers[0].id);
    const [transferValue, setTransferValue] = useFloatFormat('');
    const [showTransactionSuccessModal, setShowTransactionSuccessModal] = useState(false);
    const [showError, setShowError] = useState('');
    const [showBalance, setShowBalance] = useState(false);

    const handleWithdraw = e => {
        e.preventDefault();

        setShowError(bank.transfer(transferFromId, transferToId, transferValue));

        displayModalForDuration(setShowTransactionSuccessModal, 2000);

        console.log(bank.users);

        setTransferValue('');
        return;
    };

    useEffect(() => {
        setTransferToId(availableUsers[0].id);
    }, [availableUsers]);

    useEffect(() => {
      collapse(false);
      return () => collapse(true);
    }, [])

    return (
        <Form onSubmit={handleWithdraw}>
            <Wrapper showBalance={showBalance}>
                <DisplayUser userId={transferFromId} bank={bank} />
                <Close
                    onClick={() => {
                        show(false);
                        setShowBalance(false);
                    }}
                >
                    Close
                </Close>
            </Wrapper>
            <BoxContainer>
                <BoxTitle>Transfer From</BoxTitle>
                <BoxAction>
                    <BoxOptions
                        value={transferFromId}
                        onChange={e => {
                            setTransferFromId(e.target.value);
                            setAvailableUsers(bank.users.filter(cell => cell.id != e.target.value));
                            console.log(availableUsers);
                            console.log(e.target.value);
                            console.log(availableUsers);
                            console.log(transferToId);
                        }}
                    >
                        {bank.users.map(({ id, firstName, lastName }) => {
                            return (
                                <option value={id}>
                                    {id} - {firstName} {lastName}
                                </option>
                            );
                        })}
                    </BoxOptions>
                    <ViewBalance
                        href='#'
                        onClick={() => {
                            show(true);
                            setShowBalance(true);
                        }}
                    >
                        View Balance
                    </ViewBalance>
                </BoxAction>
            </BoxContainer>
            <BoxContainer>
                <BoxTitle>Transfer To</BoxTitle>
                <BoxAction>
                    <BoxOptions
                        value={transferToId}
                        onChange={e => {
                            setTransferToId(e.target.value);
                        }}
                    >
                        {availableUsers.map(({ id, firstName, lastName }) => {
                            return (
                                <option value={id}>
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
                        value={transferValue}
                        onChange={e => {
                            setTransferValue(e.target.value);
                        }}
                    />
                </BoxAction>
            </BoxContainer>
            <SubmitContainer>
                <SubmitButton>Submit</SubmitButton>
            </SubmitContainer>
            <TransactionSuccess showTransactionSuccessModal={showTransactionSuccessModal}>
                {showError === true ? 'Transaction Success' : showError}
            </TransactionSuccess>
        </Form>
    );
}
