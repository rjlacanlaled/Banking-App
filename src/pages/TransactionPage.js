import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TransactionTypes } from "../model/enums/transaction-types";
import Deposit from '../components/Deposit'
import Withdraw from "../components/Withdraw";
import Transfer from "../components/Transfer";

const TRANSACTIONTYPESLIST = Object.values(TransactionTypes);

export default function MakeATransaction({ bank }) {
   const [transactionType, setTransactionType] = useState(
      TRANSACTIONTYPESLIST[2]
   );

   const handleTransaction = (e) => {
      const { value } = e.target;
      setTransactionType(value);
      console.log(bank.users);
   };

   return (
      <MainContainer>
         <BoxContainer>
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
         </BoxContainer>
         <OptionsPart toShow={transactionType}>
            {transactionType === TRANSACTIONTYPESLIST[2] ? (
               <Deposit bank={bank} />
            ) : transactionType === TRANSACTIONTYPESLIST[1] ? (
               <Withdraw bank={bank} />
            ) : (
               <Transfer bank={bank} />
            )}
         </OptionsPart>
      </MainContainer>
   );
}


export const SubmitContainer = styled.div`
   margin-bottom: 0;
   box-shadow: none;
   background-color: transparent;
   display: flex;
   justify-content: center;
`;

export const SubmitButton = styled.button.attrs(({ type }) => ({ type: "submit" }))`
   width: 20%;
   height: fit-content;
   padding: 1%;
`;

export const Form = styled.form``;

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
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 50%;
   height: auto;
   padding: 0.5% 0.5% 0 0.5%;
`;

const OptionsPart = styled.div`
   display: ${({ toShow }) => (toShow != "" ? "block" : "none")};
`;

export const BoxContainer = styled.div`
   width: 100%;
   height: 90px;
   margin-bottom: 20px;
   box-shadow: 0 0 10px rgb(136, 136, 136);
   background-color: rgb(0, 191, 255);
`;

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

export const TransactionSuccess = styled.div`
   width: 50%;
   height: 30%;

   position: absolute;
   left: 25%;
   transform: translateY(-50%);

   display: ${({ showTransactionSuccessModal }) =>
      showTransactionSuccessModal ? "flex" : "none"};
   justify-content: center;
   align-items: center;
   background-color: red;
`;
