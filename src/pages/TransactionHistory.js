import { useState } from 'react';
import styled from 'styled-components';
import Confirmation from '../components/Confirmation';
import ConfirmationMessage from '../components/ConfirmationMessage';
import DataTable from '../components/DataTable';
import { Modal } from '../components/styles/Modal.styled';
import { PageTitle, PageTitleContainer } from '../components/styles/Titles.styled';

export default function TransactionHistory({ headers, transactions, remove }) {
    const [chosenId, setChosenId] = useState(0);

    const handleDelete = () => {

    }
    
    const handleConfirmDelete = () => {
        
    }


    return (
        <Wrapper>
        <PageTitleContainer>
            <PageTitle>Transaction History</PageTitle>
        </PageTitleContainer>

        <DataTable
            headers={headers}
            data={transactions}
            onDelete={handleDelete}
        />

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

const Wrapper = styled.div``;
