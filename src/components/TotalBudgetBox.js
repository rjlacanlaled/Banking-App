import styled from "styled-components";
import { useBudgets } from "./context/BudgetContext";
import { useState, useEffect } from "react";
import { PrimaryButton } from "./styles/Buttons.styled";
import { displayModalForDuration } from "../utils/modal-util";

export default function TotalBudgetBox({ bank, userId }) {
    const [showTransactionMessage, setShowTransactionMessage] = useState(false)
   const [newBalance, setNewBalance] = useState(
      bank.getAccount(userId).balance
   );
   const [err, setErr] = useState();
   const { budgets } = useBudgets();
   const totalBudget = budgets.filter(pip => pip.userId == userId)
      .map((budget) => budget.amount)
      .reduce((total, money) => total + money, 0);

   const handleDeduct = () => {
      const account = bank.getAccount(userId);
      let balance = parseFloat(account.balance);

      if (totalBudget > balance) return setErr("Insufficient Account Balance");

      balance -= parseFloat(totalBudget);

      account.balance = balance;

      bank.updateAccount(account);

      console.log(account);
      setErr("Transaction Successful");

      displayModalForDuration(setShowTransactionMessage, 2000)

      return
   };

   useEffect(() => {
      setNewBalance(bank.getAccount(userId).balance);
   }, [bank.getAccount(userId).balance]);

   return (
      <Wrapper>
         <TotalBudgetTitle>
            <h2>Budget to Deduct</h2>
         </TotalBudgetTitle>
         <Body>
            <UserInfo>
               <span>Account:</span>
               <span>
                  {bank.getAccount(userId).firstName}{" "}
                  {bank.getAccount(userId).lastName}
               </span>
            </UserInfo>
            <TotalToDeduct>
               <span>Total Budget: </span>
               <span>{totalBudget}</span>
            </TotalToDeduct>
         </Body>
         <DeductButton>
            <StyledPrimaryButton onClick={handleDeduct}>
               Deduct
            </StyledPrimaryButton>
         </DeductButton>
         <TransactionMessage show={showTransactionMessage}>{err}</TransactionMessage>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   width: 100%;
   height: 50%;

   margin: 5%;

   border: none;
   border-radius: 20px;

   background-image: linear-gradient(180deg, rgb(144,238,144), rgb(152,251,152), white);

   display: flex;
   flex-direction: column;
`;

const TotalBudgetTitle = styled.div`
   width: 100%;
   height: 20%;

   display: flex;
   justify-content: flex-start;
   align-items: center;

   padding: 2% 5%;
`;

const Body = styled.div`
   width: 100%;
   height: 80%;

   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   gap: 0.5rem;
`;

const UserInfo = styled.div`
   width: 100%;
   height: fit-content;

   display: flex;
   justify-content: space-between;
   align-items: flex-end;

   padding: 0 3%;

   & > span:last-child {
      font-weight: bold;
   }
`;

const TotalToDeduct = styled(UserInfo)``;

const DeductButton = styled.div`
   width: 100%;

   padding: 3%;

   display: flex;
   justify-content: flex-end;
   align-items: center;
`;

const TransactionMessage = styled.div`
   position: absolute;
   bottom: 18%;
   right: 15%;

   display: ${({show}) => show? 'block': 'none'};

   color: white;
   text-align: center;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
   padding: 1% 3%;
`;
