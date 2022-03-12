import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/styles/Theme';
import GlobalStyles from './components/styles/Global';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles>
                <div className='App'></div>
            </GlobalStyles>
        </ThemeProvider>
    );
}

export default App;
