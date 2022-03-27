import { useState, useEffect } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import styled from "styled-components";
import { theme } from "../components/styles/Theme";
import TotalBudgetBox from "../components/TotalBudgetBox";
import BudgetBox from "../components/BudgetBox";
import { useBudgets } from "../components/context/BudgetContext";
import { UserTypes } from "../model/enums/user-types";
import AddExpenseModal from "../components/AddExpenseModal";
import DataTable from "../components/DataTable";
import { Modal } from "../components/styles/Modal.styled";
import AddUser from "../components/AddUser";
import ConfirmationMessage from "../components/ConfirmationMessage";
import { displayModalForDuration } from "../utils/modal-util";
import {
   TransactionNotAllowedContainer,
   StyledPrimaryButton,
} from "./TransactionPage";
import {
   ButtonTitle,
   PageTitle,
   PageTitleContainer,
} from "../components/styles/Titles.styled";
import AddBudgetModal from "../components/AddBugetModal";

export default function BudgetApp({ bank }) {
   const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
   const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
   const [showAddUserConfirmationMessage, setShowAddUserConfirmationMessage] =
      useState(false);
   const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
   const [showAddUserConfirmation, setShowAddUserConfirmation] =
      useState(false);
   const [bId, setBid] = useState();
   const [userId, setUserId] = useState(
      bank.users.filter((user) => user.type != UserTypes.Admin)[0].id
   );
   const [accountBalance, setAccountBalance] = useState(bank.getAccount(userId).balance)

   const { budgets, expenses, deleteExpense, getBudgetExpenses } = useBudgets();

   const handleAddUser = () => {
      setShowAddUserConfirmation(true);
   };

   const handleConfirmAddUser = (confirmed, user) => {
      if (!confirmed) return setShowAddUserConfirmation(false);
      bank.createAccount(user);
      setShowAddUserConfirmation(false);
      displayModalForDuration(setShowAddUserConfirmationMessage, 1000);
   };

   console.log(
      budgets
         .map((budget) => budget.amount)
         .reduce((total, expense) => total + expense, 0)
   );

   useEffect(() => {
      setAccountBalance(bank.getAccount(userId).balance)
   }, [bank.getAccount(userId).balance])

   return (
      <Wrapper>
         <PageTitleContainer>
            <PageTitle>SomeBudget</PageTitle>
            <ButtonContainer>
               <AddBudgetButtonContainer>
                  <StyledGiReceiveMoney
                     onClick={() => {
                        setShowAddBudgetModal(true);
                     }}
                  />
                  <ButtonTitle>Add Budget</ButtonTitle>
               </AddBudgetButtonContainer>
            </ButtonContainer>
         </PageTitleContainer>
         <>
            {bank.users.filter((user) => user.type != UserTypes.Admin).length >
            0 ? (
               <Main>
                  <RightSide>
                     <SelectedUser>
                        <SelectedBox>
                           <div>
                              <h3>Select User</h3>
                              <select
                                 value={userId}
                                 onChange={(e) => setUserId(e.target.value)}
                              >
                                 {bank.users
                                    .filter(
                                       (user) => user.type !== UserTypes.Admin
                                    )
                                    .map(({ id, firstName, lastName }) => {
                                       return (
                                          <option key={id} value={id}>
                                             {id} - {firstName} {lastName}
                                          </option>
                                       );
                                    })}
                              </select>
                           </div>
                           <div>
                              <h4>Balance </h4>
                              <div>{accountBalance}</div>
                           </div>
                        </SelectedBox>
                     </SelectedUser>
                     <BudgetUser>
                        {budgets
                           .filter((budget) => budget.userId == userId)
                           .map(({ name, amount, id }) => {
                              const totalExpenses = getBudgetExpenses(
                                 id
                              ).reduce(
                                 (total, expense) => total + expense.amount,
                                 0
                              );

                              return (
                                 <BudgetBox
                                    key={id}
                                    bank={bank}
                                    totalExpenses={totalExpenses}
                                    amount={amount}
                                    name={name}
                                    setShowAddExpenseModal={
                                       setShowAddExpenseModal
                                    }
                                    setShowViewExpenseModal={
                                       setShowViewExpenseModal
                                    }
                                    setBid={setBid}
                                    bId={id}
                                 />
                              );
                           })}
                     </BudgetUser>
                  </RightSide>
                  <LeftSide>
                     <TotalBudgetBox bank={bank} userId={userId}/>
                  </LeftSide>
               </Main>
            ) : (
               <TransactionNotAllowedContainer>
                  <h3>
                     You need to have at least 1 account to use budget app!
                  </h3>
                  <StyledPrimaryButton onClick={handleAddUser}>
                     Create new account
                  </StyledPrimaryButton>
               </TransactionNotAllowedContainer>
            )}
         </>

         <Modal show={showAddUserConfirmation}>
            <AddUser
               onConfirm={handleConfirmAddUser}
               validator={bank.inputValidator.validator}
               users={bank.users}
            />
         </Modal>

         <Modal show={showAddUserConfirmationMessage}>
            <ConfirmationMessage
               message="Successfully added user!"
               imgUrl="./assets/checkmark.gif"
            />
         </Modal>

         <AddBudgetModal
            userId={userId}
            bank={bank}
            show={showAddBudgetModal}
            setShowAddBudgetModal={setShowAddBudgetModal}
         />
         <AddExpenseModal
            setBid={setBid}
            budgetId={bId}
            bank={bank}
            show={showAddExpenseModal}
            setShowAddExpenseModal={setShowAddExpenseModal}
         />
         <Modal show={showViewExpenseModal}>
            <DataTable
               headers={["id", "budgetId", "expenseName", "amount"]}
               data={expenses.filter((exp) => exp.budgetId == bId)}
               onDelete={deleteExpense}
               actions={{ hasDelete: true, hasEdit: false }}
            />
            <CloseButton
               onClick={() => {
                  setShowViewExpenseModal(false);
               }}
            >
               &times;
            </CloseButton>
         </Modal>
      </Wrapper>
   );
}

const Main = styled.div`
   height: 100%;
   width: 100%;

   display: flex;
`

const BudgetUser = styled.div`
   width: 100%;
   height: 100%;

   padding: 20px;

   display: flex;
   flex-direction: column;
   gap: 1rem;
`;

const SelectedUser = styled.div`
   width: 100%;
`;

const Wrapper = styled.div`
   width: 100vw;
   height: 100vh;

   display: flex;
   flex-direction: column;

   background-color: ${({ theme }) => theme.colors.main.themeColor};
`;

const ButtonContainer = styled.div`
   display: flex;

   gap: 10%;
`;

const AddBudgetButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const StyledGiReceiveMoney = styled(GiReceiveMoney)`
   width: 50px;
   height: 50px;

   cursor: pointer;
`;

const CloseButton = styled.button`
   outline: none;
   border: none;
   background-color: transparent;
   color: white;

   cursor: pointer;

   position: absolute;
   top: 40%;
   right: 23%;
`;

const SelectedBox = styled.div`
   width: max-content;
   background-color: ${({ theme }) =>
      theme.colors.mainTitleDiv.backgroundColor};

   margin: 1%;

   border: none;
   border-radius: 20px;

   padding: 2%;

   display: flex;
   gap: 4rem;
`;

const RightSide = styled.div`
   height: 100%;
   width: 50%;

   overflow: auto;
`;

const LeftSide = styled(RightSide)`
   background-color: transparent;

   display: flex;
   justify-content: center;
   align-items: center;
`;
