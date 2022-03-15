import styled from 'styled-components';
import { theme } from './Theme';

export const PrimaryButton = styled.button`
    color: ${theme.colors.primaryButton.fontColor};
    background-color: ${theme.colors.primaryButton.backgroundColor};
    border: 1px solid ${theme.colors.primaryButton.borderColor};
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        color: ${theme.colors.primaryButtonHover.fontColor};
        background-color: ${theme.colors.primaryButtonHover.backgroundColor};
        border: 1px solid ${theme.colors.primaryButtonHover.borderColor};
    }
`;

export const NegativeButton = styled.button`
    color: ${theme.colors.negativeButton.fontColor};
    background-color: ${theme.colors.negativeButton.backgroundColor};
    border: 1px solid ${theme.colors.negativeButton.borderColor};
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        color: ${theme.colors.negativeButtonHover.fontColor};
        background-color: ${theme.colors.negativeButtonHover.backgroundColor};
        border: 1px solid ${theme.colors.negativeButtonHover.borderColor};
    }
`;