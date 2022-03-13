import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className='App'></div>
        </ThemeProvider>
    );
}
