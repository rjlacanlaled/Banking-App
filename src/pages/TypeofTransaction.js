import React, { useState } from "react";
import styled from "styled-components";
import {
   getUserList,
   updateUserList,
   getUser,
} from "../services/BankUserDatabaseService";
import {
   addDeposit,
   deductWithdaw,
   transferFunds
} from "../services/BankTransactionFunctions";

export function TransactionTypes() {
   const types = ["Deposit", "Withdraw", "Transfer"];
   const [action, setAction] = useState("Deposit");

   const handleTransaction = (e) => {
      const { value } = e.target;
      setAction(value);
      console.log(value);
   };

   return (
      <MainContainer>
         <BoxContainer>
            <BoxTitle>Make a Transaction</BoxTitle>
            <BoxAction>
               <BoxOptions value={action} onChange={handleTransaction}>
                  {types.map((option) => {
                     return <option value={option}>{option}</option>;
                  })}
               </BoxOptions>
            </BoxAction>
         </BoxContainer>
         <OptionsPart toShow={action}>
            {action === types[0] ? (
               <Deposit />
            ) : action === types[1] ? (
               <Withdraw />
            ) : (
               <Transfer />
            )}
         </OptionsPart>
      </MainContainer>
   );
}

function Deposit() {
   const [userId, setUserId] = useState(getUserList()[0].id);
   const [depositValue, setDepositValue] = useState("");

   const handleDeposit = (e) => {
      e.preventDefault();

      addDeposit(userId, depositValue);
      setDepositValue("");
      return;
   };

   return (
      <Form onSubmit={handleDeposit}>
         <BoxContainer>
            <BoxTitle>Deposit To</BoxTitle>
            <BoxAction>
               <BoxOptions
                  value={userId}
                  onChange={(e) => {
                     setUserId(e.target.value);
                  }}
               >
                  {getUserList().map(({ id, firstName, lastName }) => {
                     return (
                        <option value={id}>
                           {firstName} {lastName}
                        </option>
                     );
                  })}
               </BoxOptions>
            </BoxAction>
         </BoxContainer>
         <BoxContainer>
            <BoxTitle>Amount</BoxTitle>
            <BoxAction>
               <AmountInput
                  value={depositValue}
                  onChange={(e) => {
                     setDepositValue(e.target.value);
                     console.log(e.target.value);
                  }}
               />
            </BoxAction>
         </BoxContainer>
         <SubmitContainer>
            <SubmitButton>Submit</SubmitButton>
         </SubmitContainer>
      </Form>
   );
}

function Withdraw() {
   const [userId, setUserId] = useState(getUserList()[0].id);
   const [withdrawValue, setWithdrawValue] = useState("");
   const [toShowModal, setToShowModal] = useState(false);
   const [toShowErrorModal, setToShowErrorModal] = useState(false);

   const handleWithdraw = (e) => {
      e.preventDefault();

      const userList = getUserList();
      const user = userList[userList.findIndex((list) => list.id == userId)];

      if (withdrawValue > user.balance) return setToShowErrorModal(true);

      deductWithdaw(userId, withdrawValue);

      setWithdrawValue(0);
      return;
   };

   const closeModal = (e) => {
      setToShowModal(false);
      setWithdrawValue(0);
   };

   return (
      <Form onSubmit={handleWithdraw}>
         <ErrorModal
            showError={toShowErrorModal}
            setToShowErrorModal={setToShowErrorModal}
            setWithdrawValue={setWithdrawValue}
         />
         <BalanceModal
            showModal={toShowModal}
            userId={userId}
            closeModal={closeModal}
         />
         <BoxContainer>
            <BoxTitle>Withdraw From</BoxTitle>
            <BoxAction>
               <BoxOptions
                  value={userId}
                  onChange={(e) => {
                     setUserId(e.target.value);
                  }}
               >
                  {getUserList().map(({ id, firstName, lastName }) => {
                     return (
                        <option value={id}>
                           {firstName} {lastName}
                        </option>
                     );
                  })}
               </BoxOptions>
               <ViewBalance
                  href="#"
                  onClick={() => {
                     setToShowModal(true);
                  }}
               >
                  View Balance
               </ViewBalance>
            </BoxAction>
         </BoxContainer>
         <BoxContainer>
            <BoxTitle>Amount</BoxTitle>
            <BoxAction>
               <AmountInput
                  value={withdrawValue}
                  onChange={(e) => {
                     setWithdrawValue(e.target.value);
                     console.log(e.target.value);
                  }}
               />
            </BoxAction>
         </BoxContainer>
         <SubmitContainer>
            <SubmitButton>Submit</SubmitButton>
         </SubmitContainer>
      </Form>
   );
}

const DisplayUser = ({ userId }) => {
   const userList = getUserList();
   const user = userList[userList.findIndex((list) => list.id == userId)];

   return (
      <div>
         <p>
            {user.firstName} {user.lastName}
         </p>
         <p>{user.balance}</p>
      </div>
   );
};

const BalanceModal = ({ showModal, userId, closeModal }) => {
   return (
      <ViewBalanceModal showModal={showModal}>
         <DisplayUser userId={userId} />
         <button onClick={closeModal}>Close</button>
      </ViewBalanceModal>
   );
};

const ErrorModal = ({ showError, setToShowErrorModal }) => {
   setTimeout(() => {
      setToShowErrorModal(false);
   }, 3000);

   return (
      <ViewErrorModal showError={showError}>
         <h3>Insufficient balance in account</h3>
      </ViewErrorModal>
   );
};

function Transfer() {
   const [transferFromId, setTransferFromId] = useState(getUserList()[0].id);
   const [transferToId, setTransferToId] = useState(getUserList()[1].id);
   const [transferValue, setTransferValue] = useState(0);
   const [availableUsers, setAvailableUsers] = useState(
      getUserList().filter((user) => user.id != transferFromId)
   );

   const handleTransferFrom = (e) => {
      const { value } = e.target;
      setTransferFromId(value);

      const userList = getUserList();
      setAvailableUsers(userList.filter((user) => user.id != value));
      return;
   };

   const handleTransferTo = (e) => {
      const { value } = e.target;
      setTransferToId(value);
      return;
   };

   const handleTransfer = (e) => {
      e.preventDefault();

      const userList = getUserList();
      const giver = userList[userList.findIndex(list => list.id == transferFromId)]

      if (transferValue > giver.balance) return alert("Not enough balance");
      transferFunds(transferFromId, transferToId, transferValue)
      setTransferValue(0);

      return console.log(getUserList());
   };

   return (
      <Form onSubmit={handleTransfer}>
         <BoxContainer>
            <BoxTitle>Transfer From</BoxTitle>
            <BoxAction>
               <BoxOptions value={transferFromId} onChange={handleTransferFrom}>
                  {getUserList().map(({ id, firstName, lastName }) => {
                     return (
                        <option value={id}>
                           {firstName} {lastName}
                        </option>
                     );
                  })}
               </BoxOptions>
            </BoxAction>
         </BoxContainer>
         <BoxContainer>
            <BoxTitle>Transfer To</BoxTitle>
            <BoxAction>
               <BoxOptions value={transferToId} onChange={handleTransferTo}>
                  {availableUsers.map(({ id, firstName, lastName }) => {
                     return (
                        <option value={id}>
                           {firstName} {lastName}
                        </option>
                     );
                  })}
               </BoxOptions>
            </BoxAction>
         </BoxContainer>
         <BoxContainer>
            <BoxTitle>Amount</BoxTitle>
            <BoxAction>
               <AmountInput
                  value={transferValue}
                  onChange={(e) => {
                     setTransferValue(e.target.value);
                  }}
               />
            </BoxAction>
         </BoxContainer>
         <SubmitContainer>
            <SubmitButton>Submit</SubmitButton>
         </SubmitContainer>
      </Form>
   );
}

const OptionsPart = styled.div`
   display: ${({ toShow }) => (toShow != "" ? "block" : "none")};
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

const BoxContainer = styled.div`
   width: 100%;
   height: 90px;

   margin-bottom: 20px;
   box-shadow: 0 0 10px rgb(136, 136, 136);
   background-color: red;
`;

const BoxTitle = styled.h3`
   width: 100%;
   height: 50%;
   padding: 10px 0 10px 30px;
`;

const BoxAction = styled.div`
   width: 100%;
   height: 50%;

   display: flex;
   align-items: center;
`;

const BoxOptions = styled.select`
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

const Form = styled.form``;

const AmountInput = styled.input.attrs(({ type }) => ({
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

const ViewBalance = styled.a`
   margin: 0 0 5% 3%;
`;

const SubmitContainer = styled(BoxContainer)`
   margin-bottom: 0;
   box-shadow: none;
   background-color: transparent;
   display: flex;
   justify-content: center;
`;

const SubmitButton = styled.button.attrs(({ type }) => ({ type: "submit" }))`
   width: 20%;
   height: fit-content;

   padding: 1%;
`;

const ViewBalanceModal = styled.div`
   position: absolute;
   left: 50%;
   top: 20%;
   transform: translateX(-50%);

   width: 50%;
   height: 30%;
   z-index: 20;

   display: ${({ showModal }) => (showModal ? "flex" : "none")};
   flex-direction: column;
   align-items: center;
   justify-content: center;
   text-align: center;

   background-color: green;
`;

const ViewErrorModal = styled(ViewBalanceModal)`
   display: ${({ showError }) => (showError ? "flex" : "none")};
`;
