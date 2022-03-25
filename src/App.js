import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import BankUserManagement from './pages/BankUserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/Sidebar';
import { useEffect, useState } from 'react';
import { bankApp } from './model/bank-app-test';
import BankTransactionHistory from './pages/BankTransactionHistory';
import RadioSelection from './components/RadioSelection';
import TransactionPage from './pages/TransactionPage';
import AuthProvider from './components/context/AuthProvider';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';
import ActivePageProvider from './components/context/ActivePageProvider';

export default function App() {
    const [bank, setBank] = useState(bankApp);

    useEffect(() => {
        setBank(bank);
    }, [bank]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <AuthProvider bank={bank}>
                    <ActivePageProvider>
                        <Main>
                            <SideBar />
                            <Routes>
                                <Route path='/' element={<Dashboard bank={bank}/>} />
                                <Route path='/users' element={<BankUserManagement bank={bank} />} />
                                <Route path='/transactions' element={<BankTransactionHistory bank={bank} />} />
                                <Route path='/transact' element={<TransactionPage bank={bank} />} />
                                <Route path='*' element={<PageNotFound />} />
                            </Routes>
                        </Main>
                    </ActivePageProvider>
                </AuthProvider>
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
