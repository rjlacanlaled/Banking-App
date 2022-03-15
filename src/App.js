import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import UserManagement from './pages/UserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Main>
                    <Routes>
                        <Route path='/' />
                        <Route path='/login' />
                        <Route path='/users' element={<UserManagement />} />
                        <Route path='/transactions' />
                    </Routes>
                </Main>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const Main = styled.div`
`;
