import { useEffect, useState } from 'react';
import { AiOutlineBank } from 'react-icons/ai';
import styled from 'styled-components';
import Confirmation from '../components/Confirmation';
import ConfirmationMessage from '../components/ConfirmationMessage';
import DataTable from '../components/DataTable';
import useActivePage from '../components/hooks/useActivePage';
import { Modal } from '../components/styles/Modal.styled';
import { ButtonTitle, PageTitle, PageTitleContainer } from '../components/styles/Titles.styled';
import { displayModalForDuration } from '../utils/modal-util';
import Fade from 'react-reveal/Fade';

export default function BankTransactionHistory({ bank }) {
    const [chosenId, setChosenId] = useState(0);
    const [transactions, setTransactions] = useState(bank.transactions);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteConfirmationMessage, setShowDeleteConfirmationMessage] = useState(false);

    const activePage = useActivePage();

    useEffect(() => {
        activePage.setActive('transaction-history');
    }, []);

    useEffect(() => {
        setTransactions(bank.transactions);
    }, [bank.transactions]);

    const handleDelete = id => {
        setChosenId(id);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        bank.deleteTransaction(chosenId);
        setShowDeleteConfirmation(false);
        displayModalForDuration(setShowDeleteConfirmationMessage, 1000);
    };

    return (
        <Wrapper>
            <PageTitleContainer>
                <PageTitle>Transaction History</PageTitle>
                <TransactButtonContainer>
                    <StyledAiOutlineBank />
                    <ButtonTitle>New Transaction</ButtonTitle>
                </TransactButtonContainer>
            </PageTitleContainer>

            <Fade left>
                <DataTable
                    headers={bank.transactionDatabase.headers}
                    data={transactions}
                    onDelete={handleDelete}
                    actions={{ hasEdit: false, hasDelete: true }}
                />
            </Fade>

            <Modal show={showDeleteConfirmation}>
                <Confirmation
                    message={`Are you sure you want to delete transaction #${chosenId}?`}
                    onConfirm={handleConfirmDelete}
                />
            </Modal>

            <Modal show={showDeleteConfirmationMessage}>
                <ConfirmationMessage message='Successfully deleted transaction!' imgUrl='./assets/checkmark.gif' />
            </Modal>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 10px;

    height: 100%;
    width: 100%;

    overflow: auto;

    background-color: ${({ theme }) => theme.colors.main.themeColor};
`;

const TransactButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
        color: #183046;
    }
`;

const StyledAiOutlineBank = styled(AiOutlineBank)`
    cursor: pointer;
    width: 50px;
    height: 50px;
    color: #183046;
`;
