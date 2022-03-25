import React, { useState } from "react";
import styled from "styled-components";
import { useBudgets } from "./context/BudgetContext";

export default function BudgetBox({ sop, name, amount }) {
    const budget = useBudgets()
    const [budgetId, setBudgetId] = useState(sop)

    
    const handleDelete = () => {

        budget.deleteBudget({id: budgetId})
    }

   return (
      <Wrapper>
         <Header>
            <span>{name}</span>
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
