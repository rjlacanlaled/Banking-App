import React from "react";
import styled from "styled-components";
import { theme } from "./styles/Theme";

export default function Dashboard() {
   return (
      <MainContainer>
         <FirstRow>
            <h1>Dashboard</h1>
         </FirstRow>
         <SecondRow>
            <RecentTransactions />
            <DashboardDisplayBox></DashboardDisplayBox>
            <DashboardDisplayBox></DashboardDisplayBox>
         </SecondRow>
         <ThirdRow></ThirdRow>
      </MainContainer>
   );
}

const MainContainer = styled.section`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   background-color: ${theme.colors.main.themeColor};
`;

const FirstRow = styled.div`
   width: 100%;
   height: 20%;
   display: flex;
   align-items: flex-end;

   & > h1 {
      margin: 0 0 10px 20px;
   }
`;

const SecondRow = styled.div`
   width: 100%;
   height: 40%;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
`;

const ThirdRow = styled(SecondRow)`
`;

const DashboardDisplayBox = styled.div`
   width: 30%;
   height: 85%;
   border: none;
   border-radius: 10%;
   padding: 1% 2% 4% 2%;
   background-color: ${theme.colors.body.backgroundColor};
`;

const RecentTransactions = () => {
   return (
      <DashboardDisplayBox>
         <h3>Recent Transactions</h3>
         <RecentTransactionsDisplay></RecentTransactionsDisplay>
      </DashboardDisplayBox>
   );
};

const RecentTransactionsDisplay = styled.div`
    width: 100%;
    height: 100%;
`
