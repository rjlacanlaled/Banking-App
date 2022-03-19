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
   SubmitButton,
} from "../pages/TransactionPage";

export default function Withdraw({ bank }) {
   const [userId, setUserId] = useState(bank.users[0].id);
   const [withdrawValue, setWithdrawValue] = useFloatFormat("");
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
