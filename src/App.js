import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import UserManagement from './pages/UserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SideBar from './components/Sidebar';
import { useState } from 'react';
import { bankApp } from './model/bank-app-main';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [bank, setBank] = useState(bankApp);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Main>
                    <SideBar />
                    <Routes>
                        <Route path='/' />
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/users'
                            element={
                                <UserManagement
                                    users={bank.users}
                                    create={bank.createAccount}
                                    update={bank.updateAccount}
                                    remove={bank.deleteAccount}
                                    validator={bank.inputValidator}
                                    formatter={bank.inputFormatter}
                                />
                            }
                        />
                        <Route path='/transactions' />
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
