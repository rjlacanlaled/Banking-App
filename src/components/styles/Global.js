import { createGlobalStyle } from 'styled-components';
import { theme } from './Theme';

const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-decoration: none;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: ${theme.colors.body.backgroundColor};
        color: ${theme.colors.body.fontColor}
    }

    body > li {
        list-style: none;
    }
`;

export default GlobalStyles;
