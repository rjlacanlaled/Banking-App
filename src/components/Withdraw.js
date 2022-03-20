import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFloatFormat from "./hooks/useFloatFormat";
import { displayModalForDuration } from "../utils/modal-util";
import { Modal } from "./styles/Modal.styled";
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
   const [showModal, setShowModal] = useState(false);

   const handleWithdraw = (e) => {
      e.preventDefault();

      setShowError(bank.withdraw(userId, withdrawValue));

      displayModalForDuration(setShowTransactionSuccessModal, 2000);

      setWithdrawValue("");
      return;
   };

   return (
      <Form onSubmit={handleWithdraw}>
         <Modal show={showModal}>
            <ViewBalanceModal>
               <DisplayUser userId={userId} bank={bank} />
               <BoxBtn
                  onClick={() => {
                     setShowModal(false);
                  }}
               >
                  Close
               </BoxBtn>
            </ViewBalanceModal>
         </Modal>
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
            <ViewBalance
               href="#"
               onClick={() => {
                  setShowModal(true);
               }}
            >
               View Balance
            </ViewBalance>
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

const ViewBalance = styled.a`
   margin: 0 0 5% 3%;
`;

const DisplayUser = ({ userId, bank }) => {
   const user = bank.getAccount(userId);
   console.log(user);

   return true;
};

const BoxBtn = styled.button`
   padding: 2px 8px;
`;

const ViewBalanceModal = styled.div`
   width: 50%;
   height: 30%;
   z-index: 20;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   text-align: center;
   background-color: rgb(0,0,128);
   color: white;
   border: none;
   border-radius: 20px;`