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
   const [percent, setPercent] = useState(0);

   const handleDelete = () => {
      budget.deleteBudget({ id: budgetId });
   };

   useEffect(() => {
      setPercent(getPercent(amount, totalExpenses));
   }, [totalExpenses]);

   return (
      <Wrapper percent={percent}>
         <Header>
            <span>{name}</span>
            <span>
               {totalExpenses} <span>/ {amount} </span>
            </span>
         </Header>
         <ProgressBar percent={percent}>
            <div>
               <div></div>
            </div>
         </ProgressBar>
         <Body>
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
   width: 100%;
   height: 20%;

   padding: 3%;
   background-image: linear-gradient(
      360deg,
      blue,
      rgb(30, 144, 255),
      rgb(0, 191, 255)
   );

   display: flex;
   flex-direction: column;
   justify-content: space-between;
`;

const Header = styled.div`
   width: 100%;
   height: 30%;

   display: flex;
   justify-content: space-between;
   flex-wrap: nowrap;

   & > span:first-child {
      margin-right: 200px;

      font-weight: bolder;
      font-size: larger;
   }

   & > span:last-child {

      font-weight: bold;
      font-size: large;
   }

   & > span:last-child > span {

      font-weight: 300;
      font-size: small;
   }
`;

const ProgressBar = styled.div`
   width: 100%;
   height: 50%;

   display: flex;
   justify-content: center;
   align-items: center;

   & > div {
      width: 500px;
      height: 20px;

      background-color: rgb(234, 242, 246);

      border: none;
      border-radius: 10px;
   }

   & > div > div {
      width: ${({ percent }) => (percent > 1 ? `100%` : `${percent * 100}%`)};
      height: 100%;

      background-color: ${({ percent }) =>
         percent < 0.5
            ? `rgb(0,0,205)`
            : percent < 0.8
            ? `rgb(255,140,0)`
            : "red"};
      border: none;
      border-radius: 10px;
   }
`;

const Body = styled.div`
   height: 20%;
   width: 100%;

   display: flex;
   justify-content: space-evenly;
   align-items: center;

   & > div {
      cursor: pointer;
   }

   & > div:hover {
      color: white;
   }
`;
