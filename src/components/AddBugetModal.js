import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useBudgets } from "./context/BudgetContext";
import { UserTypes } from "../model/enums/user-types";

export default function AddBudgetModal({ bank, show, setShowAddBudgetModal }) {
    const [budgetName, setBudgetName] = useState()
    const [spending, setSpending] = useState()

    const { addBudget } = useBudgets()

    const handleSubmit = (e) => {
        e.preventDefault()

        addBudget({name: budgetName, amount: parseFloat(spending)})
        resetInput()
        setShowAddBudgetModal(false)
    }

    const resetInput = () => {
        setBudgetName('')
        setSpending('')
    }


   return (
      <Wrap show={show}>
         <Form onSubmit={handleSubmit}>
            <AddBudgetHeader>
               <Title>New Budget</Title>
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
               <CloseButton onClick={() => setShowAddBudgetModal(false)}>&times;</CloseButton>
            </AddBudgetHeader>
            <AddBudgetBody>
                <label>Name</label>
                <input value={budgetName} onChange={(e) => setBudgetName(e.target.value)} type='text' required />
                <label>Amount</label>
                <input value={spending} onChange={(e) => setSpending(e.target.value)} type='number' required />
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

   background-color: red;
   border: none;
   border-radius: 20px;

   display: ${({show}) => show ? 'flex': 'none'};
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

const Form = styled.form`

`

const AddButtonFooter = styled.div`
    width: 100%;

    display: flex;
    justify-content: flex-end;

    padding: 2%;

    & > button {
        margin-right: 5%;
        padding: 1% 3%;
    }
`