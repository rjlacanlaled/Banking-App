import styled from 'styled-components';

export const PageTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: sticky;
    top: 0;
    height: max-content;
    background-color: #009879;
    color: ${props => props.theme.colors.mainTitleDiv.fontColor};
    padding: 1% 10% 1% 10%;
    width: 100%;

`;

export const PageTitle = styled.h1`
    text-align: center;
    color: white;
    padding: 20px;
`;

export const ButtonTitle = styled.p`
    text-align: center;
`;
