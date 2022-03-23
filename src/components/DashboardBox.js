import styled from 'styled-components';

export default function DashboardBox({ icon, title, description }) {
    return (
        <Wrapper>
            {icon}
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    width: 300px;
    height: 300px;

    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: #009879;
    border-radius: 20px;

    padding: 30px;

    color: white;
`;
const Title = styled.h3`
    font-size: 1.5rem;
`;
const Description = styled.h2`
    font-size: 2rem;
`;
