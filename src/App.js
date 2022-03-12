import { ThemeProvider } from 'styled-components';
import theme from './components/styles/Theme';
import './App.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className='App'></div>
        </ThemeProvider>
    );
}

export default App;
