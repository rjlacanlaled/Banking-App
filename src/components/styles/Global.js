import { createGlobalStyle } from 'styled-components';
import { theme } from './Theme';

const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-decoration: none;

        font-family: 'Roboto', sans-serif;
    }

    body {
        background-color: ${theme.colors.body.backgroundColor};
        color: ${theme.colors.body.fontColor}
    }

    body > li {
        list-style: none;
    }
`;

export default GlobalStyles;
