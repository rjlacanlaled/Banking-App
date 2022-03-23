import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFloatFormat from "./hooks/useFloatFormat";
import { displayModalForDuration } from "../utils/modal-util";
import { NegativeButton } from "./styles/Buttons.styled";
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
} from "../pages/TransactionPage";

export default function Withdraw({ bank, show }) {
   const [userId, setUserId] = useState(bank.users[0].id);
   const [withdrawValue, setWithdrawValue] = useFloatFormat("");
   const [showBalance, setShowBalance] = useState(false);
   const [showTransactionSuccessModal, setShowTransactionSuccessModal] =
      useState(false);
   const [showError, setShowError] = useState("");

   const handleWithdraw = (e) => {
      e.preventDefault();

      setShowError(bank.withdraw(userId, withdrawValue));

      displayModalForDuration(setShowTransactionSuccessModal, 2000);

      setWithdrawValue("");
      return;
   };

   return (
      <Form onSubmit={handleWithdraw}>
         <TransactionSuccess
            showTransactionSuccessModal={showTransactionSuccessModal}
         >
            {showError === true ? "Transaction Success" : showError}
         </TransactionSuccess>
         <Wrapper showBalance={showBalance}>
            <DisplayUser userId={userId} bank={bank} />
            <Close
               onClick={() => {
                  show(false);
                  setShowBalance(false)
               }}
            >
               Close
            </Close>
         </Wrapper>
         <BoxContainer>
            <BoxTitle>Withdraw From</BoxTitle>
            <BoxAction>
               <BoxOptions
                  value={userId}
                  onChange={(e) => {
                     setUserId(e.target.value);
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
                  href="#"
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
            <BoxTitle>Amount</BoxTitle>
            <BoxAction>
               <AmountInput
                  value={withdrawValue}
                  onChange={(e) => {
                     setWithdrawValue(e.target.value);
                  }}
               />
            </BoxAction>
         </BoxContainer>
         <SubmitContainer>
            <SubmitButton>Submit</SubmitButton>
         </SubmitContainer>
      </Form>
   );
}

export const ViewBalance = styled.a`
   margin: 0 0 5% 3%;
`;

export const DisplayUser = ({ userId, bank }) => {
   const user = bank.getAccount(userId);

   return (
      <BalanceContainer>
         <p>Account: {user.id} - {user.firstName} {user.lastName}</p>
         <p>Current Balance: {user.balance}</p>
      </BalanceContainer>

   );
};

export const Wrapper = styled.div`
   width: 80%;
   height: 40%;
   z-index: 20;

   position: absolute;

   display: ${({ showBalance }) => ( showBalance ? "flex" : "none")};
   flex-direction: column;
   align-items: center;
   justify-content: center;

   text-align: center;
   background-color: ${({theme}) => theme.colors.main.themeColor};
   color: white;
   border: none;
   border-radius: 20px;
`;

const BalanceContainer = styled.div`
   z-index: 20;

   & > p {
      margin: 10px 0;
   }
`


export const Close = styled.div`
   padding: 3px 5px;
   border: none;
   border-radius: 5px;
   background-color: white;
   color: black;
   cursor: pointer;
   margin-bottom: 10px;

   &:hover {
      background-color: red;
      color: white;
   }
`