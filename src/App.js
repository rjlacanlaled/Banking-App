import styled, { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import UserManagement from './pages/UserManagement';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
=======
import Login from './pages/Login';
import SideBar from './components/Sidebar';
>>>>>>> main

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Main>
<<<<<<< HEAD
                    <Routes>
                        <Route path='/' />
                        <Route path='/login' />
=======
                    <SideBar />
                    <Routes>
                        <Route path='/' />
                        <Route path='/login' element={<Login />} />
>>>>>>> main
                        <Route path='/users' element={<UserManagement />} />
                        <Route path='/transactions' />
                    </Routes>
                </Main>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const Main = styled.div`
<<<<<<< HEAD
=======
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
>>>>>>> main
`;
