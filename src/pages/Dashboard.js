import { useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiAdminLine } from 'react-icons/ri';
import styled from 'styled-components';
import DashboardBox from '../components/DashboardBox';
import useActivePage from '../components/hooks/useActivePage';
import useAuth from '../components/hooks/useAuth';
import { PageTitle, PageTitleContainer } from '../components/styles/Titles.styled';
import { UserTypes } from '../model/enums/user-types';
import { BsPiggyBank } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';

export default function Dashboard({ bank }) {
    const activePage = useActivePage();
    const auth = useAuth();

    useEffect(() => {
        activePage.setActive('dashboard');
    }, []);

    return (
        <Wrapper>
            <PageTitleContainer>
                <PageTitle>Dashboard</PageTitle>
                <AccountTypeContainer>
                    {auth.user.type === UserTypes.Admin ? <StyledRiAdminLine /> : <StyledAiOutlineUser />}
                    <AccountType>{auth.user.type}</AccountType>
                </AccountTypeContainer>
            </PageTitleContainer>
            <PageTitle>Good day, {auth.user.firstName + ' ' + auth.user.lastName}!</PageTitle>

            <DashboardBoxes>
                <Zoom>
                    <DashboardBox
                        icon={<StyledAiOutlineUser />}
                        title='Total Users'
                        description={bank.users.length ? bank.users.length : 0}
                    />
                    <DashboardBox
                        icon={<StyledBsPiggyBank />}
                        title='Total Deposit'
                        description={
                            'PHP ' +
                            (bank.users.length
                                ? bank.users
                                      .map(user => parseFloat(user.balance))
                                      .reduce((total, balance) => (total += balance))
                                : 0)
                        }
                    />
                    <DashboardBox
                        icon={<StyledGiMoneyStack />}
                        title='Average Deposits'
                        description={
                            'PHP ' +
                            (bank.users.length
                                ? bank.users
                                      .map(user => parseFloat(user.balance))
                                      .reduce((total, balance) => (total += balance)) / bank.users.length
                                : 0)
                        }
                    />
                </Zoom>
            </DashboardBoxes>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    height: 100vh;
    width: 100vw;

    overflow: auto;

    background-color: ${({ theme }) => theme.colors.main.themeColor};
`;

const DashboardBoxes = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-shrink: 0;
    width: 100%;
    gap: 20px;

    margin-left: 50px;
`;

const AccountTypeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AccountType = styled.p`
    color: white;
`;

const StyledRiAdminLine = styled(RiAdminLine)`
    width: 50px;
    height: 50px;
`;

const StyledAiOutlineUser = styled(AiOutlineUser)`
    width: 50px;
    height: 50px;
`;

const StyledBsPiggyBank = styled(BsPiggyBank)`
    width: 50px;
    height: 50px;
`;

const StyledGiMoneyStack = styled(GiMoneyStack)`
    width: 50px;
    height: 50px;
`;
