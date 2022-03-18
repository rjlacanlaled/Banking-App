import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import UserManagement from './pages/UserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SideBar from './components/Sidebar';
import Cashier from './pages/Cashier';

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Main>
                    <SideBar />
                    <Routes>
                        <Route path='/' />
                        <Route path='/login' element={<Login />} />
                        <Route path='/users' element={<UserManagement />} />
                        <Route path='/withdraw' element={<Cashier />} />
                        <Route path='/transactions' />
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
