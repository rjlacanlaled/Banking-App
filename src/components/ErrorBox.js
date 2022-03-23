import styled from 'styled-components';

export default function ErrorBox({ errors }) {
    return (
        <Wrapper hasError={errors.length > 0}>
            {errors.map(error => {
                return <ErrorMessage key={error}>{error}</ErrorMessage>;
            })}
        </Wrapper>
    );
}

const ErrorMessage = styled.li`
    color: #721c23;
    list-style-type: square;
    list-style-position: inside;
`;

const Wrapper = styled.ul`
    display: ${({ hasError }) => (hasError ? 'block' : 'none')};
    padding: 10px;
    margin: 10px 0 10px 0;
    border: 1px solid #721c23;
    border-radius: 5px;
    background-color: #f8d7d9;
`;
