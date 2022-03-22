import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TransactionTypes } from "../model/enums/transaction-types";
import Deposit from "../components/Deposit";
import Withdraw, { userId } from "../components/Withdraw";
import Transfer from "../components/Transfer";
import { Modal } from "../components/styles/Modal.styled";
import useActivePage from "../components/hooks/useActivePage";

const TRANSACTIONTYPESLIST = Object.values(TransactionTypes);

export default function MakeATransaction({ bank }) {
   const [showModal, setShowModal] = useState(false)
   const [transactionType, setTransactionType] = useState(
      TRANSACTIONTYPESLIST[2]
   );
   const activePage = useActivePage();

   useEffect(() => {
       activePage.setActive('transact');
   }, []);

   

   const handleTransaction = (e) => {
      const { value } = e.target;
      setTransactionType(value);
      console.log(bank.users);
   };

   return (
      <MainContainer>
         <Modal show={showModal} />
         <FirstBox>
            <BoxTitle>Make a Transaction</BoxTitle>
            <BoxAction>
               <BoxOptions value={transactionType} onChange={handleTransaction}>
                  {TRANSACTIONTYPESLIST.map((option) => {
                     return (
                        <option value={option}>{option.toUpperCase()}</option>
                     );
                  })}
               </BoxOptions>
            </BoxAction>
         </FirstBox>
            {transactionType === TRANSACTIONTYPESLIST[2] ? (
               <Deposit bank={bank} />
            ) : transactionType === TRANSACTIONTYPESLIST[1] ? (
               <Withdraw bank={bank} show={setShowModal} />
            ) : (
               <Transfer bank={bank} show={setShowModal}/>
            )}
         
      </MainContainer>
   );
}

export const BoxContainer = styled.div`
   width: 40%;
   height: 90px;
   margin-bottom: 20px;
   margin-right: 20%;
   box-shadow: 0 0 10px rgb(136, 136, 136);
   background-color: rgb(0, 191, 255);
`;

const FirstBox = styled(BoxContainer)`
   margin-top: 10%;
   `

export const BoxTitle = styled.h3`
   width: 100%;
   height: 50%;
   padding: 10px 0 10px 30px;
`;

export const BoxAction = styled.div`
   width: 100%;
   height: 50%;
   display: flex;
   align-items: center;
`;

export const BoxOptions = styled.select`
   width: 50%;
   margin: 0 0 5% 20%;
   outline: none;
   padding: 2px 3px;
   border-radius: 3px;
   background-image: linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(255, 255, 255, 0.5)
   );
`;

export const SubmitContainer = styled.div`
   width: 10%;
   
   
   margin-bottom: 0;
   margin-right: 20%;
   box-shadow: none;
   display: flex;
   justify-content: center;
`;

export const SubmitButton = styled.button.attrs(({ type }) => ({
   type: "submit",
}))`
   width: 90%;
   height: 100%;
   padding: 10%;
`;

export const Form = styled.form`
   width: 100%;
   height: 100%;

   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const AmountInput = styled.input.attrs(({ type }) => ({
   type: type || "number",
}))`
   width: 50%;
   margin: 0 0 5% 20%;
   outline: none;
   padding: 2px 3px;
   border-radius: 3px;
   border: 1px solid black;
   background-image: linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(255, 255, 255, 0.5)
   );
   &::-webkit-outer-spin-button,
   &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
`;

const MainContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   height: 100vh;
   width: 100vw;
`;


export const TransactionSuccess = styled.div`
   width: 30%;
   height: 10%;

   position: absolute;
   left: 40%;
   transform: translateY(-50%);

   display: ${({ showTransactionSuccessModal }) =>
      showTransactionSuccessModal ? "flex" : "none"};
   justify-content: center;
   align-items: center;
   background-color: red;
`;
