import React from "react";
import styled from "styled-components";
import { theme } from "./styles/Theme";
import { getUser, getUserList } from "../services/BankUserDatabaseService";


export default function SendReceiveMoney() {
   return (
      <Wrapper>
         <OptionsContainer>
            <TransferFundsContainer>
               <TransferFundsTitle>
                  <h3>Transfer Funds</h3>
               </TransferFundsTitle>
               <TransferFundsOptions>
                  <li>Make a Transfer</li>
                  <li>Add and Manage Favorites</li>
               </TransferFundsOptions>
            </TransferFundsContainer>
            <PayBillsContainer>
               <PayBillsTitle>
                  <h3>Pay Bills</h3>
               </PayBillsTitle>
            </PayBillsContainer>
            <ReloadMobileContainer>
               <ReloadMobileTitle>
                  <h3>Reload Mobile Phone</h3>
               </ReloadMobileTitle>
            </ReloadMobileContainer>
         </OptionsContainer>
         <MainContainer>
            <MakeATransferContainer>
               <Step1Icon />
               <Step1>
                  <StepTitle>
                     <h3>Make a Transfer</h3>
                  </StepTitle>
                  <StepAction>
                     <UserSelection>
                        {getUserList().map(({ firstName, lastName }) => {
                           return (
                              <Option>{firstName} {lastName}</Option>
                           )
                        })}
                     </UserSelection>
                  </StepAction>
               </Step1>
            </MakeATransferContainer>
            <TransferToContainer>
               <Step2Icon />
               <Step2>
                  <StepTitle>
                     <h3>Transfer To</h3>
                  </StepTitle>
                  <StepAction>
                     <UserSelection>
                        <option value={Step2Options[0].value}>
                           {Step2Options[0].label}
                        </option>
                        <option value={Step2Options[1].value}>
                           {Step2Options[1].label}
                        </option>
                     </UserSelection>
                  </StepAction>
               </Step2>
            </TransferToContainer>
            <TransferFromContainer>
               <Step3Icon />
               <Step3>
                  <StepTitle>
                     <h3>Transfer From</h3>
                  </StepTitle>
                  <StepAction>
                     <UserSelection>
                        <option value={Step2Options[0].value}>
                           {Step2Options[0].label}
                        </option>
                        <option value={Step2Options[1].value}>
                           {Step2Options[1].label}
                        </option>
                     </UserSelection>
                     <ViewBalance>View Balance</ViewBalance>
                  </StepAction>
               </Step3>
            </TransferFromContainer>
            <AmountContainer>
               <Step4Icon />
               <Step4>
                  <StepTitle>
                     <h3>Amount</h3>
                  </StepTitle>
                  <StepAction>
                     <AmountInput type="number" />
                  </StepAction>
               </Step4>
            </AmountContainer>
            <RemarksContainer>
               <Step5Icon />
               <Step5>
                  <StepTitle>
                     <h3>Remarks/Purpose of Transfer</h3>
                  </StepTitle>
                  <StepAction>
                     <AmountInput type="text" />
                  </StepAction>
               </Step5>
            </RemarksContainer>
            <SubmitContainer>
               <SubmitButton>Submit</SubmitButton>
            </SubmitContainer>
         </MainContainer>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   width: 100%;
   height: 100vh;
   background-color: cyan;
`;
const OptionsContainer = styled.div`
   width: 20%;
   height: auto;
   position: absolute;
   top: 10%;
   right: 5%;
   background-color: white;
   display: flex;
   flex-direction: column;
   border: 1px solid black;
`;
const TransferFundsContainer = styled.div`
   width: 100%;
   height: fit-content;
`;

const TransferFundsTitle = styled.div`
   width: 100%;
   background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(255, 255, 255, 0.8)
   );
   padding: 10px 10px;
`;

const Option = styled.option``;

const PayBillsContainer = styled(TransferFundsContainer)``;

const PayBillsTitle = styled(TransferFundsTitle)``;

const ReloadMobileContainer = styled(TransferFundsContainer)``;

const ReloadMobileTitle = styled(TransferFundsTitle)``;

const TransferFundsOptions = styled.ul`
   & > li {
      padding: 5px 20px;
      cursor: pointer;
   }
`;

const MainContainer = styled.div`
   position: absolute;
   top: 10%;
   left: 20%;
   width: 50%;
   height: auto;
   padding: 0.5% 0.5% 0 0.5%;
`;

const MakeATransferContainer = styled.div`
   width: 100%;
   height: 90px;
   background-color: white;
   display: flex;
   margin-bottom: 10px;
   box-shadow: 0 0 10px rgb(136, 136, 136);
`;

const Step1Icon = styled.div`
   height: 100%;
   width: 20%;
`;

const Step1 = styled.div`
   height: 100%;
   width: 80%;
`;

const StepTitle = styled.div`
   width: 100%;
   height: 50%;
   display: flex;
   align-items: flex-end;
   padding: 5px;
`;

const StepAction = styled.div`
   width: 100%;
   height: 50%;
`;
const UserSelection = styled.select`
   outline: none;
   width: 30%;
   margin: 0 0 0 20px;
   padding: 2px 3px;
   border-radius: 3px;
   background-image: linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(255, 255, 255, 0.5)
   );
`;

const Step1Options = [
   { label: "To local bank", value: 1 },
   { label: "To other bank", value: 2 },
];

const Step2Options = [
   { label: "Choose One", value: 0 },
   { label: "Add Account", value: 1 },
];

const TransferToContainer = styled(MakeATransferContainer)``;
const Step2Icon = styled(Step1Icon)``;
const Step2 = styled(Step1)``;

const TransferFromContainer = styled(MakeATransferContainer)``;
const Step3Icon = styled(Step1Icon)``;
const Step3 = styled(Step1)``;
const ViewBalance = styled.span`
   margin-left: 10px;
   font-size: 12px;
`;

const AmountContainer = styled(MakeATransferContainer)``;
const Step4Icon = styled(Step1Icon)``;
const Step4 = styled(Step1)``;

const AmountInput = styled.input`
   margin-left: 20px;
   outline: none;
   padding: 2px 3px;
   border: 1px solid black;
   border-radius: 3px;

   &::-webkit-outer-spin-button,
   &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
`;

const RemarksContainer = styled(MakeATransferContainer)``;
const Step5Icon = styled(Step1Icon)``;
const Step5 = styled(Step1)``;

const SubmitContainer = styled.div`
   width: 100%;
   height: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const SubmitButton = styled.button`
   padding: 5px 20px;
   border: 1px solid black;
   border-radius: 5px;
   font-size: 15px;
   cursor: pointer;
`;
