import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';
import SideBar from './components/Sidebar';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className='App'>
                <SideBar />
            </div>
        </ThemeProvider>
    );
}
