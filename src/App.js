import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import UserManagement from './pages/UserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SideBar from './components/Sidebar';
import { useState } from 'react';
import { bankInputFormatter } from './services/bank-input-format-service';
import { bankInputValidator } from './services/bank-input-validation-service';

const inputFormatter = bankInputFormatter;
const inputValidator = bankInputValidator;

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);

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
                            element={<UserManagement inputFormatter={inputFormatter} inputValidator={inputValidator} />}
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
