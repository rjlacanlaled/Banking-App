import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "./context/BudgetContext";

export default function BudgetBox({
   bank,
   bId,
   name,
   amount,
   setShowAddExpenseModal,
   setBid,
   setShowViewExpenseModal,
   totalExpenses,
}) {
   const budget = useBudgets();
   const [budgetId, setBudgetId] = useState(bId);
   const [percent, setPercent] = useState(0)

   const handleDelete = () => {
      budget.deleteBudget({ id: budgetId });
   };
   
   useEffect(() => {
      setPercent(getPercent(amount, totalExpenses))
   }, [totalExpenses])



   return (
      <Wrapper percent={percent}>
         <Header>
            <span>{name}</span>
            <span>
               {totalExpenses}/ {amount}
            </span>
         </Header>
         <Body>
            <div>
               <div onClick={handleDelete}>Delete</div>
               <div
                  onClick={() => {
                     setShowAddExpenseModal(true);
                     setBid(budgetId);
                  }}
               >
                  Add Expense
               </div>
               <div
                  onClick={() => {
                     setBid(budgetId);
                     setShowViewExpenseModal(true);
                  }}
               >
                  Show Expenses
               </div>
            </div>
         </Body>
      </Wrapper>
   );
}

const getPercent = (max, amount) => {
   const percent = amount / max;

   return percent;
};

const Wrapper = styled.div`
   border: 1px solid black;
   border-radius: 20px;
   width: 50%;
   height: 20%;

   padding: 3%;
   background-color: ${({percent}) => percent < 0.5 ? 'blue': percent < 0.9 ? 'orange': 'red'};

   display: flex;
   justify-content: space-between;
`;

const Header = styled.div`
   height: 100%;

   display: flex;
   justify-content: space-between;
   flex-wrap: nowrap;

   & > span:first-child {
      margin-right: 200px;
   }

   & > span:last-child {
      
   }
`;

const ProgressBar = styled.div``;

const Body = styled.div`
   height: 100%;

   display: flex;
   justify-content: center;
   align-items: center;

   & > div > div {
      cursor: pointer;
   }

   & > div > div:hover {
      color: white;
   }
`;
