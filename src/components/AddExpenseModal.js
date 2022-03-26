import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "./context/BudgetContext";
import { UserTypes } from "../model/enums/user-types";
import { theme } from "./styles/Theme";

export default function AddExpenseModal({
   budgetId,
   bank,
   show,
   setShowAddExpenseModal,
   setBid
}) {
   const [expenseName, setExpenseName] = useState();
   const [expenseCost, setExpenseCost] = useState();

   const { addExpense } = useBudgets();

   const handleSubmit = (e) => {
      e.preventDefault();

      addExpense({
         budgetId,
         expenseName,
         amount: parseFloat(expenseCost),
      });
      resetInput();
      setShowAddExpenseModal(false);
   };

   const resetInput = () => {
      setExpenseName("");
      setExpenseCost("");
   };

   return (
      <Wrap show={show}>
         <Form onSubmit={handleSubmit}>
            <AddBudgetHeader>
               <Title>New Expense</Title>
               <CloseButton onClick={() => setShowAddExpenseModal(false)}>
                  &times;
               </CloseButton>
            </AddBudgetHeader>
            <AddBudgetBody>
               <label>Name</label>
               <input
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  type="text"
                  required
               />
               <label>Amount</label>
               <input
                  value={expenseCost}
                  onChange={(e) => setExpenseCost(e.target.value)}
                  type="number"
                  required
               />
            </AddBudgetBody>
            <AddButtonFooter>
               <button>Add</button>
            </AddButtonFooter>
         </Form>
      </Wrap>
   );
}

const Wrap = styled.div`
   width: 30%;
   height: max-content;

   position: absolute;
   top: 20%;
   left: 50%;
   transform: translateX(-30%);

   background-color: ${({theme}) => theme.colors.mainTitleDiv.backgroundColor};
   border: none;
   border-radius: 20px;

   display: ${({ show }) => (show ? "flex" : "none")};
   flex-direction: column;
`;

const AddBudgetHeader = styled.div`
   width: 100%;
   height: 20%;

   display: flex;
   justify-content: space-between;

   padding: 5% 3% 3% 3%;

   border-bottom: 1px solid black;
`;

const Title = styled.h3``;

const CloseButton = styled.div`
   cursor: pointer;
`;

const AddBudgetBody = styled.div`
   width: 100%;
   height: 80%;

   padding: 1% 3%;

   & > label {
      display: block;
   }

   & > input {
      margin-left: 5%;
      padding: 1%;
      outline: none;
   }
`;

const Form = styled.form``;

const AddButtonFooter = styled.div`
   width: 100%;

   display: flex;
   justify-content: flex-end;

   padding: 2%;

   & > button {
      margin-right: 5%;
      padding: 1% 3%;
   }
`;
