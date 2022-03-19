import React, { useState, useEffect } from "react";
import useFloatFormat from "./hooks/useFloatFormat";
import { displayModalForDuration } from "../utils/modal-util";
import {
   BoxContainer,
   BoxTitle,
   BoxAction,
   BoxOptions,
   TransactionSuccess,
   Form,
   AmountInput,
   SubmitContainer,
   SubmitButton
} from "../pages/TransactionPage";

export default function Deposit({ bank }) {
   const [userId, setUserId] = useState(bank.users[0].id);
   const [depositValue, setDepositValue] = useFloatFormat("");
   const [showTransactionSuccessModal, setShowTransactionSuccessModal] =
      useState(false);
   const [showError, setShowError] = useState("");

   const handleDeposit = (e) => {
      e.preventDefault();

      setShowError(bank.deposit(userId, depositValue));

      displayModalForDuration(setShowTransactionSuccessModal, 2000);

      setDepositValue("");
      return;
   };

   return (
      <Form onSubmit={handleDeposit}>
         <TransactionSuccess
            showTransactionSuccessModal={showTransactionSuccessModal}
         >
            {showError === true ? "Transaction Success" : showError}
         </TransactionSuccess>
         <BoxContainer>
            <BoxTitle>Deposit To</BoxTitle>
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
                           {firstName} {lastName}
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
                  value={depositValue}
                  onChange={(e) => {
                     setDepositValue(e.target.value);
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
