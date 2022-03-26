import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TransactionTypes } from '../model/enums/transaction-types';
import Deposit from '../components/Deposit';
import Withdraw, { userId } from '../components/Withdraw';
import Transfer from '../components/Transfer';
import { Modal } from '../components/styles/Modal.styled';
import useActivePage from '../components/hooks/useActivePage';
import { PageTitle, PageTitleContainer } from '../components/styles/Titles.styled';
import { PrimaryButton } from '../components/styles/Buttons.styled';
import ConfirmationMessage from '../components/ConfirmationMessage';
import AddUser from '../components/AddUser';
import { displayModalForDuration } from '../utils/modal-util';

const TRANSACTIONTYPESLIST = Object.values(TransactionTypes);

export default function MakeATransaction({ bank }) {
    const [showModal, setShowModal] = useState(false);
    const [transactionType, setTransactionType] = useState(TRANSACTIONTYPESLIST[2]);
    const [showAddUserConfirmation, setShowAddUserConfirmation] = useState(false);
    const [showAddUserConfirmationMessage, setShowAddUserConfirmationMessage] = useState(false);
    const [show, setShow] = useState(true);
    const activePage = useActivePage();

    useEffect(() => {
        activePage.setActive('transact');
    }, []);

    const handleTransaction = e => {
        const { value } = e.target;
        setTransactionType(value);
        //setShow(transactionType !== deposit)
        console.log(bank.users);
    };

    const handleAddUser = () => {
        setShowAddUserConfirmation(true);
    };

    const handleConfirmAddUser = (confirmed, user) => {
        if (!confirmed) return setShowAddUserConfirmation(false);
        bank.createAccount(user);
        setShowAddUserConfirmation(false);
        displayModalForDuration(setShowAddUserConfirmationMessage, 1000);
    };

    return (
        <MainContainer>
            <PageTitleContainer>
                <PageTitle>Transact</PageTitle>
            </PageTitleContainer>
            <Modal show={showModal} />

            {bank.users.length >= 1 ? (
                <InputContainer>
                    <FirstBox>
                        <BoxTitle>Make a Transaction</BoxTitle>
                        <BoxAction>
                            <BoxOptions value={transactionType} onChange={handleTransaction}>
                                {TRANSACTIONTYPESLIST.map(option => {
                                    return (
                                        <option key={option} value={option}>
                                            {option.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </BoxOptions>
                        </BoxAction>
                    </FirstBox>

                    {transactionType === TRANSACTIONTYPESLIST[2] ? (
                        <Deposit bank={bank} key='deposit' />
                    ) : transactionType === TRANSACTIONTYPESLIST[1] ? (
                        <Withdraw bank={bank} show={setShowModal} />
                    ) : bank.users.length > 1 ? (
                        <Transfer bank={bank} show={setShowModal} collapse={setShow} />
                    ) : (
                        <TransactionNotAllowedContainer>
                            <h3> You need to have at least 2 accounts to do transfer!</h3>
                            <StyledPrimaryButton onClick={handleAddUser}>Create new account</StyledPrimaryButton>
                        </TransactionNotAllowedContainer>
                    )}
                </InputContainer>
            ) : (
                <TransactionNotAllowedContainer>
                    <h3> You need to have at least 1 account to do transactions!</h3>
                    <StyledPrimaryButton onClick={handleAddUser}>Create new account</StyledPrimaryButton>
                </TransactionNotAllowedContainer>
            )}

            <Modal show={showAddUserConfirmation}>
                <AddUser
                    onConfirm={handleConfirmAddUser}
                    validator={bank.inputValidator.validator}
                    users={bank.users}
                />
            </Modal>

            <Modal show={showAddUserConfirmationMessage}>
                <ConfirmationMessage message='Successfully added user!' imgUrl='./assets/checkmark.gif' />
            </Modal>
        </MainContainer>
    );
}

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    gap: 20px;

    margin-top: 30px;

    max-width: 500px;
    background-color: #009879;
    border-radius: 20px;
`;

export const BoxContainer = styled.div``;

export const StyledPrimaryButton = styled(PrimaryButton)`
    padding: 10px 20px 10px 20px;
`;

export const TransactionNotAllowedContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    gap: 20px;
    color: white;
    text-align: center;
    padding: 20px;
`;

const FirstBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #009879;
    padding: 20px;
    margin-top: 20px;
    width: 100%;

    border-bottom: 1px solid white;
`;

export const BoxTitle = styled.h3`
    color: white;
    text-align: left;
    padding: 10px;
`;

export const BoxAction = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    width: 100%;
`;

export const BoxOptions = styled.select`
    padding: 10px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
`;

export const SubmitContainer = styled.div`
    width: 100%;
    max-width: 200px;
    border-radius: 20px;

    margin-bottom: 0;
    box-shadow: none;
    display: flex;
    justify-content: center;
`;

export const SubmitButton = styled(PrimaryButton)`
    width: 100%;
    padding: 10px 20px 10px 20px;

    margin: 10px 10px;
`;

export const Form = styled.form`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AmountInput = styled.input`
    padding: 10px;
    border-radius: 10px;
    min-width: 300px;
    outline: none;
    border-style: none;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    width: 100%;
    height: 100%;
    background-color: red;

    overflow: auto;

    background-color: ${({ theme }) => theme.colors.main.themeColor};
`;

export const TransactionSuccess = styled.div`
    width: 30%;
    height: 10%;

    position: absolute;
    top: 70%;
    left: 57%;
    transform: translateX(-50%);

    color: red;

    display: ${({ showTransactionSuccessModal }) => (showTransactionSuccessModal ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
`;
