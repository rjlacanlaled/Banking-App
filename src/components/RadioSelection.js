import { useState } from 'react';
import styled from 'styled-components';
import { Label } from './styles/Labels';

export default function RadioSelection() {

    const [active, setActive] = useState(1);

    const handleSelectChange = e =>  {
        setActive(e.target.value);
        console.log(e.target.value);
    }

    return (
        <RadioGroup onChange={handleSelectChange}>
            <Wrapper>
                <StyledLabel id={1} active={active}>Name</StyledLabel>
                <Selection type='radio' name={'name'} value={1} />
            </Wrapper>
            <Wrapper>
                <StyledLabel id={2} active={active}>Name</StyledLabel>
                <Selection type='radio' name={'name'} value={2}/>
            </Wrapper>
            <Wrapper>
                <StyledLabel id={3} active={active}>Name</StyledLabel>
                <Selection type='radio' name={'name'} value={3}/>
            </Wrapper>
            <Wrapper>
                <StyledLabel id={4} active={active}>Name</StyledLabel>
                <Selection type='radio' name={'name'} value={4}/>
            </Wrapper>
        </RadioGroup>
    );
}

const RadioGroup = styled.fieldset``;

const Wrapper = styled.div`
    position: relative;
    min-height: 100px;
    min-width: 150px;
`;

const StyledLabel = styled(Label)`
    position: absolute;
    background-color: ${({active, id}) => id == active ? 'red' : 'blue'};
    width: 100%;
    height: 100%;
`;
const Selection = styled.input`
    display: block;
    position: absolute;
    z-index: 100;
    opacity: 0;
    width: 100%;
    height: 100%;
`;
