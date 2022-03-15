import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NegativeButton } from './styles/Buttons.styled';
import { MdOutlineDashboard } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiLuggageDepositLine } from 'react-icons/ri';
import { AiOutlineTransaction } from 'react-icons/ai';

export default function SideBar() {
    return (
        <Container>
            <Logo src='https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/275554048_4912356165478076_1490016745173868883_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeHl2MrrXaIHZIxN82OQY7xQzFNPBHk-t4PMU08EeT63g84Sw1-8D53mUTyWrqI4Jj2A1KThHyFiQlxTzQV3RSbK&_nc_ohc=eso_EihlyCUAX_cBbO2&_nc_ht=scontent.fmnl30-1.fna&oh=03_AVJA9tVuSY9e5CyQogwRVPn2VdccZDlPlSALknU4nCt_6g&oe=62508466' />
            <PageList>
                <PageItem>
                    <MdOutlineDashboard />
                    <Link to='/'>Dashboard</Link>
                </PageItem>
                <PageItem>
                    <GrUserManager />
                    <Link to='/users'>Manage Users</Link>
                </PageItem>
                <PageItem>
                    <GiReceiveMoney />
                    <Link to='/withdraw'>Withdraw</Link>
                </PageItem>
                <PageItem>
                    <RiLuggageDepositLine />
                    <Link to='/deposit'>Deposit</Link>
                </PageItem>
                <PageItem>
                    <AiOutlineTransaction />
                    <Link to='/transactions'>Transactions</Link>
                </PageItem>
            </PageList>
            <ButtonContainer>
                <StyledNegativeButton>Log out</StyledNegativeButton>
                <ThemeToggle type='checkbox' />
            </ButtonContainer>
        </Container>

        // <SideBarContainer>
        //    <SideBarIconContainer />
        //    <SideBarDashboard>
        //       <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
        //       <Link to='/'>Dashboard</Link>
        //    </SideBarDashboard>
        //    <SideBarDeposit>
        //       <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
        //       <Link to='/deposit'>Deposit</Link>
        //    </SideBarDeposit>
        //    <SideBarWithdraw>
        //       <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
        //       <Link to='/withdraw'>Withdraw</Link>
        //    </SideBarWithdraw>
        //    <SideBarTransactions>
        //       <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
        //       <Link to='/transactions'>Transactions</Link>
        //    </SideBarTransactions>
        //    <SideBarManageUsers>
        //       <ClickIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Instagram_verifed.png" />
        //       <Link to='/users'>Manage Users</Link>
        //    </SideBarManageUsers>
        //    <LogOutWrapper>
        //       <LogOutButtonContainer />
        //       <ToggleSwitch />
        //    </LogOutWrapper>
        // </SideBarContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    padding: 20px;
`;
const Logo = styled.img`
    width: 100px;
    height: 100px;
`;
const PageList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
`;

const PageItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`;

const ThemeToggle = styled.input``;
const StyledNegativeButton = styled(NegativeButton)`
    padding: 5px 20px 5px 20px;
`;

// const Switch = styled.input`
//    opacity: 0;
//    width: 0;
//    height: 0;

//    &:checked + ${Slider}:before {
//       transform: translateX(66px);
//    }
// `;

// const Slider = styled.span`
//    position: absolute;
//    cursor: pointer;
//    top: 0;
//    left: 0;
//    right: 0;
//    bottom: 0;
//    background-color: gray;
//    border-radius: 17px;

//    &:before {
//       content: "";
//       position: absolute;
//       height: 26px;
//       width: 26px;
//       left: 4px;
//       bottom: 4px;
//       background-color: white;
//       transition: 0.8s;
//       border-radius: 50%;
//    }
// `;

// const LogOutButtonContainer = () => {
//    return <LogOutButton>Log Out</LogOutButton>;
// };

// const LogOutButton = styled.button`
//    border: 1px solid black;
//    border-radius: 7px;
//    padding: 5px 30px;
// `;
// const LogOutWrapper = styled.div`
//    margin-top: 310px;
//    display: flex;
//    flex-direction: column;
//    align-items: center;
// `;

// const SideBarIconContainer = () => {
//    return (
//       <SideBarIcon>
//          <Icon src="https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/275554048_4912356165478076_1490016745173868883_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeHl2MrrXaIHZIxN82OQY7xQzFNPBHk-t4PMU08EeT63g84Sw1-8D53mUTyWrqI4Jj2A1KThHyFiQlxTzQV3RSbK&_nc_ohc=eso_EihlyCUAX_cBbO2&_nc_ht=scontent.fmnl30-1.fna&oh=03_AVJA9tVuSY9e5CyQogwRVPn2VdccZDlPlSALknU4nCt_6g&oe=62508466"/>
//       </SideBarIcon>
//    );
// };

// const ClickIcon = styled.img`
//    height: 50%;
//    margin: 0 10px 0 20px;
// `;

// const SideBarContainer = styled.div`
//    z-index: 100;
//    width: 100%;
//    height: 100%;
//    background-color: ${theme.colors.body.backgroundColor};
//    display: flex;
//    justify-content: space-between;
//    flex-direction: column;
//    align-items: center;
//    flex: 1 15%;
//    padding: 5%;
// `;

// const SideBarIcon = styled.div`
//    width: 100%;
//    height: 20%;
//    display: flex;
//    justify-content: center;
//    align-items: center;
// `;

// const Icon = styled.img`
//    margin-top: 20px;
//    width: 150px;
//    height: 150px;
//    border-radius: 50%;
// `;

// const SideBarDashboard = styled.div`
//    width: 100%;
//    height: 6%;
//    display: flex;
//    align-items: center;
//    font-size: 1.2rem;
// `;

// const SideBarDeposit = styled.div`
//    width: 100%;
//    height: 6%;
//    display: flex;
//    align-items: center;
//    font-size: 1.2rem;
// `;

// const SideBarWithdraw = styled.div`
//    width: 100%;
//    height: 6%;
//    display: flex;
//    align-items: center;
//    font-size: 1.2rem;
// `;

// const SideBarTransactions = styled.div`
//    width: 100%;
//    height: 6%;
//    display: flex;
//    align-items: center;
//    font-size: 1.2rem;
// `;

// const SideBarManageUsers = styled.div`
//    width: 100%;
//    height: 6%;
//    display: flex;
//    align-items: center;
//    font-size: 1.2rem;
// `;

// const ToggleSwitch = () => {
//    return (
//       <ToggleLabel>
//          <Switch type="checkbox" />
//          <Slider />
//       </ToggleLabel>
//    );
// };

// const ToggleLabel = styled.label`
//    width: 100px;
//    height: 34px;
//    position: relative;
//    margin-top: 5px;
// `;
