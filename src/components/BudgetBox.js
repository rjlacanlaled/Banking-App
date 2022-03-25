import React, { useState } from "react";
import styled from "styled-components";
import { useBudgets } from "./context/BudgetContext";
import { UserTypes } from "../model/enums/user-types";

export default function BudgetBox({ bank, sop, name, amount }) {
   const budget = useBudgets();
   const [budgetId, setBudgetId] = useState(sop);

   const handleDelete = () => {
      budget.deleteBudget({ id: budgetId });
   };

   return (
      <Wrapper>
         <Header>
            <span>{name}</span>
            <select>
               {bank.users
                  .filter((user) => user.type !== UserTypes.Admin)
                  .map(({ id, firstName, lastName }) => {
                     return (
                        <option key={id} userId={id}>
                           {id} - {firstName} {lastName}
                        </option>
                     );
                  })}
            </select>

            <div onClick={handleDelete}>Delete</div>
         </Header>

         <Body>
            <span>{amount}</span>
         </Body>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   border: 1px solid black;
   border-radius: 20px;

   padding: 3%;
   background-color: white;
`;

const Header = styled.div`
   width: 100%;
   height: 20%;

   display: flex;
   justify-content: space-between;

   & > div {
      cursor: pointer;
   }

   & > div:hover {
      color: red;
   }
`;

const Body = styled.div`
   width: 100%;
   height: 80%;

   display: flex;
   justify-content: center;
   align-items: center;
`;
