import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import UserManagement from './pages/UserManagement';
import AddUser from './components/AddUser';
import AddUserConfirmation from './components/AddUserConfirmation';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className='App'>
              {/* <UserManagement /> */}
              <AddUserConfirmation />
            </div>
        </ThemeProvider>
    );
}
