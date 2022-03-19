import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Confirmation from '../components/Confirmation';
import ConfirmationMessage from '../components/ConfirmationMessage';
import DataTable from '../components/DataTable';
import { Modal } from '../components/styles/Modal.styled';
import { PageTitle, PageTitleContainer } from '../components/styles/Titles.styled';

export default function BankTransactionHistory({ bank }) {
    const [chosenId, setChosenId] = useState(0);
    const [transactions, setTransactions] = useState(bank.transactions);

    useEffect(() => {
        setTransactions(bank.transactions);
    }, [bank.transactions]);

    const handleDelete = () => {};

    const handleConfirmDelete = () => {};

    return (
        <Wrapper>
            <PageTitleContainer>
                <PageTitle>Transaction History</PageTitle>
            </PageTitleContainer>

            <DataTable headers={bank.transactionDatabase.headers} data={transactions} onDelete={handleDelete} />

            <Modal show={false}>
                <Confirmation
                    message={`Are you sure you want to delete transaction #${chosenId}?`}
                    onConfirm={handleConfirmDelete}
                />
            </Modal>

            <Modal show={false}>
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

    height: 100vh;
    width: 100vw;

    overflow: auto;

    background-color: ${({ theme }) => theme.colors.main.themeColor};
`;
