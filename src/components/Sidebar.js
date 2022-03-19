import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NegativeButton } from './styles/Buttons.styled';
import { MdOutlineDashboard } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import { RiLuggageDepositLine } from 'react-icons/ri';
import { AiOutlineTransaction } from 'react-icons/ai';
import useAuth from './hooks/useAuth';

export default function SideBar({ logout }) {
    const auth = useAuth();

    return (
        <Container>
            <Logo src='https://scontent.fmnl30-1.fna.fbcdn.net/v/t1.15752-9/275554048_4912356165478076_1490016745173868883_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeHl2MrrXaIHZIxN82OQY7xQzFNPBHk-t4PMU08EeT63g84Sw1-8D53mUTyWrqI4Jj2A1KThHyFiQlxTzQV3RSbK&_nc_ohc=eso_EihlyCUAX_cBbO2&_nc_ht=scontent.fmnl30-1.fna&oh=03_AVJA9tVuSY9e5CyQogwRVPn2VdccZDlPlSALknU4nCt_6g&oe=62508466' />
            <PageList>
                <PageItem>
                    <MdOutlineDashboard />
                    <Link to='/'>Dashboard</Link>
                </PageItem>
                <PageItem>
                    <RiLuggageDepositLine />
                    <Link to='/transact'>Transact</Link>
                </PageItem>
                <PageItem>
                    <GrUserManager />
                    <Link to='/users'>Manage Users</Link>
                </PageItem>
                <PageItem>
                    <AiOutlineTransaction />
                    <Link to='/transactions'>Transaction History</Link>
                </PageItem>
            </PageList>
            <ButtonContainer>
                <StyledNegativeButton onClick={auth.logout}>Log out</StyledNegativeButton>
                <ToggleSwitch type='checkbox' />
            </ButtonContainer>
        </Container>
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
        content: '';
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

const ToggleSwitch = () => {
    return (
        <ToggleLabel>
            <Switch type='checkbox' />
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
