import { useState, useEffect } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import styled from "styled-components";
import { theme } from "../components/styles/Theme";
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
   const [userId, setUserId] = useState(bank.users[0].id);

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

   console.log(bank.users.length);

   return (
      <Wrapper>
         <PageTitleContainer>
            <PageTitle>SomeBudget</PageTitle>
            <ButtonContainer>
               <AddBudgetButtonContainer>
                  <StyledGiReceiveMoney
                     onClick={() => {
                        setShowAddBudgetModal(true);
                        console.log(showAddBudgetModal);
                     }}
                  />
                  <ButtonTitle>Add Budget</ButtonTitle>
               </AddBudgetButtonContainer>
            </ButtonContainer>
         </PageTitleContainer>
         <>
            {bank.users.length > 0 ? (
               <>
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
                           <div>{bank.getAccount(userId).balance}</div>
                        </div>
                     </SelectedBox>
                  </SelectedUser>
                  <BudgetUser>
                     {budgets
                        .filter((budget) => budget.userId == userId)
                        .map(({ name, amount, id }) => {
                           const totalExpenses = getBudgetExpenses(id).reduce(
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
                                 setShowAddExpenseModal={setShowAddExpenseModal}
                                 setShowViewExpenseModal={
                                    setShowViewExpenseModal
                                 }
                                 setBid={setBid}
                                 bId={id}
                              />
                           );
                        })}
                  </BudgetUser>
               </>
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

const BudgetUser = styled.div`
   width: 100%;
   height: 100%;

   padding: 20px;

   overflow: auto;

   display: flex;
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
   background-color: ${({theme}) => theme.colors.mainTitleDiv.backgroundColor};

   margin: 1%;

   border: none;
   border-radius: 20px;

   padding: 2%;

   display: flex;
   gap: 4rem;
`