import styled from 'styled-components';

export const PageTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.mainTitleDiv.backgroundColor};
    color: ${props => props.theme.colors.mainTitleDiv.fontColor};
    padding: 1% 10% 1% 10%;
    width: 100%;

    overflow: auto;

    border-bottom: 2px solid white;
`;

export const PageTitle = styled.h1``;
