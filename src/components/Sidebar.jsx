import React from "react";
import styled from "styled-components";
import { theme } from './styles/Theme'

const SideBar = () => {
   return (
      <SideBarContainer>
         <SideBarIconContainer />
         <SideBarDashboard>
            <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
            Dashboard
         </SideBarDashboard>
         <SideBarDeposit>
            <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
            Deposit
         </SideBarDeposit>
         <SideBarWithdraw>
            <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
            Withdraw
         </SideBarWithdraw>
         <SideBarTransactions>
            <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
            Transactions
         </SideBarTransactions>
         <SideBarManageUsers>
            <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
            Manage Users
         </SideBarManageUsers>
         <LogOutWrapper>
            <LogOutButtonContainer />
            <ToggleSwitch />
         </LogOutWrapper>
      </SideBarContainer>
   );
};

const LogOutButtonContainer = () => {
   return <LogOutButton>Log Out</LogOutButton>;
};

const LogOutButton = styled.button`
   border: 1px solid black;
   border-radius: 7px;
   padding: 5px 30px;
`;
const LogOutWrapper = styled.div`
   margin-top: 310px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const SideBarIconContainer = () => {
   return (
      <SideBarIcon>
         <Icon src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/275554048_4912356165478076_1490016745173868883_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeHl2MrrXaIHZIxN82OQY7xQzFNPBHk-t4PMU08EeT63g84Sw1-8D53mUTyWrqI4Jj2A1KThHyFiQlxTzQV3RSbK&_nc_ohc=eso_EihlyCUAX_cBbO2&_nc_ht=scontent.fmnl30-1.fna&oh=03_AVJA9tVuSY9e5CyQogwRVPn2VdccZDlPlSALknU4nCt_6g&oe=62508466"/>
      </SideBarIcon>
   );
};

const ClickIcon = styled.img`
   height: 50%;
   margin: 0 10px 0 20px;
`;

const SideBarContainer = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   background-color: ${theme.colors.body.backgroundColor};
   display: flex;
   justify-content: flex-start;
   flex-direction: column;
   align-items: center;
`;

const SideBarIcon = styled.div`
   width: 100%;
   height: 20%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const Icon = styled.img`
   margin-top: 20px;
   width: 150px;
   height: 150px;
   border-radius: 50%;
`;

const SideBarDashboard = styled.div`
   width: 100%;
   height: 6%;
   display: flex;
   align-items: center;
   font-size: 1.2rem;
`;

const SideBarDeposit = styled.div`
   width: 100%;
   height: 6%;
   display: flex;
   align-items: center;
   font-size: 1.2rem;
`;

const SideBarWithdraw = styled.div`
   width: 100%;
   height: 6%;
   display: flex;
   align-items: center;
   font-size: 1.2rem;
`;

const SideBarTransactions = styled.div`
   width: 100%;
   height: 6%;
   display: flex;
   align-items: center;
   font-size: 1.2rem;
`;

const SideBarManageUsers = styled.div`
   width: 100%;
   height: 6%;
   display: flex;
   align-items: center;
   font-size: 1.2rem;
`;

const ToggleSwitch = () => {
   return (
      <ToggleLabel>
         <Switch type="checkbox" />
         <Slider />
      </ToggleLabel>
   );
};

const ToggleLabel = styled.label`
   width: 100px;
   height: 34px;
   position: relative;
   margin-top: 5px;
`;

const Slider = styled.span`
   position: absolute;
   cursor: pointer;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: gray;
   border-radius: 17px;

   &:before {
      content: "";
      position: absolute;
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.8s;
      border-radius: 50%;
   }
`;

const Switch = styled.input`
   opacity: 0;
   width: 0;
   height: 0;

   &:checked + ${Slider}:before {
      transform: translateX(66px);
   }
`;

export default SideBar;
