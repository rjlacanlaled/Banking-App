import styled from 'styled-components';

export default function TransactionHistory({ transactions, remove }) {
    const [chosenId, setChosenId] = useState(0);

    const handleDelete = () => {

    }

    return (
        <Wrapper>
        <PageTitleContainer>
            <PageTitle>Transaction History</PageTitle>
        </PageTitleContainer>

        <DataTable
            headers={BANK_USER_KEYS}
            data={transactions}
            onDelete={handleDelete}
        />

        <Modal show={showDeleteUserConfirmation}>
            <Confirmation
                message={`Are you sure you want to delete transaction #${chosenId}?`}
                onConfirm={handleConfirmDeleteUser}
            />
        </Modal>

        <Modal show={showDeleteUserConfirmationMessage}>
            <ConfirmationMessage message='Successfully deleted transaction!' imgUrl='./assets/checkmark.gif' />
        </Modal>
    </Wrapper>
    );
}

const Wrapper = styled.div``;
