import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import BankUserManagement from './pages/BankUserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SideBar from './components/Sidebar';
import { useEffect, useState } from 'react';
import { bankApp } from './model/bank-app-test';
import BankTransactionHistory from './pages/BankTransactionHistory';
import RadioSelection from './components/RadioSelection';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [bank, setBank] = useState(bankApp);

    useEffect(() => {
        setBank(bankApp);
    }, [bankApp]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Main>
                    <SideBar />
                    <Routes>
                        <Route path='/' element={<RadioSelection />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/users' element={<BankUserManagement bank={bank} />} />
                        <Route
                            path='/transactions'
                            element={
                                <BankTransactionHistory bank={bank}/>
                            }
                        />
                        <Route path='/withdraw' />
                    </Routes>
                </Main>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const Main = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;
