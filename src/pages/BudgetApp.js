import { useState } from "react";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import styled from "styled-components";
import BudgetBox from "../components/BudgetBox";
import { useBudgets } from "../components/context/BudgetContext";
import {
   ButtonTitle,
   PageTitle,
   PageTitleContainer,
} from "../components/styles/Titles.styled";
import AddBudgetModal from "../components/AddBugetModal";

export default function BudgetApp() {
   const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
   const { budgets } = useBudgets()

   return (
      <Wrapper>
         <PageTitleContainer>
            <PageTitle>SomeBudget</PageTitle>
            <ButtonContainer>
               <AddBudgetButtonContainer>
                  <StyledGiReceiveMoney
                     onClick={() => {
                        setShowAddBudgetModal(true);
                        console.log(showAddBudgetModal);
                     }}
                  />
                  <ButtonTitle>Add Budget</ButtonTitle>
               </AddBudgetButtonContainer>
               <AddExpenseButtonContainer>
                  <StyledGiPayMoney />
                  <ButtonTitle>Add Expense</ButtonTitle>
               </AddExpenseButtonContainer>
            </ButtonContainer>
         </PageTitleContainer>
         <BudgetBoxes>
            {budgets.map(budget => {

               console.log(budget)
         
               return (
                  <BudgetBox key={budget.id} sop={budget.id} name={budget.name} amount={budget.amount} />
               )
            })}
         </BudgetBoxes>
         <AddBudgetModal
            show={showAddBudgetModal}
            setShowAddBudgetModal={setShowAddBudgetModal}
         />
      </Wrapper>
   );
}

const Wrapper = styled.div`
   width: 100vw;
   height: 100vh;

   display: flex;
   flex-direction: column;
`;

const ButtonContainer = styled.div`
   display: flex;

   gap: 10%;
`;

const AddBudgetButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;
const AddExpenseButtonContainer = styled(AddBudgetButtonContainer)``;

const StyledGiPayMoney = styled(GiPayMoney)`
   width: 50px;
   height: 50px;

   cursor: pointer;
`;

const StyledGiReceiveMoney = styled(GiReceiveMoney)`
   width: 50px;
   height: 50px;

   cursor: pointer;
`;

const BudgetBoxes = styled.div`
   width: 50%;
   height: 100%;

   padding: 50px 20px;

   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
   align-items: flex-start;

   overflow: auto;
`