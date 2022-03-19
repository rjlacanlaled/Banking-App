import React, { useState } from "react";
import styled from "styled-components";
import Deposit from "./Deposit";
import { TransactionTypes } from "../model/enums/transaction-types";
import LocalStorageDatabase from "../model/local-storage-database";

const TRANSACTIONTYPESLIST = Object.values(TransactionTypes)
const USERLIST = LocalStorageDatabase.getAll()

export default function MakeATransaction() {
   const [action, setAction] = useState(TransactionTypes.Deposit);

   const handleTransaction = e => {
       const { value } = e.target
       setAction(value)
       
   }

   return (
      <MainContainer>
         <BoxContainer>
            <BoxTitle>Make a Transaction</BoxTitle>
            <BoxAction>
               <BoxOptions value={action} onChange={handleTransaction}>
                  {TRANSACTIONTYPESLIST.map((option) => {
                     return <option value={option}>{option.toUpperCase()}</option>;
                  })}
               </BoxOptions>
            </BoxAction>
         </BoxContainer>
 
      </MainContainer>
   );
}

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
