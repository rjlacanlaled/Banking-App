import styled from 'styled-components';
import { PrimaryButton } from './styles/Buttons.styled';

export default function SearchBar(props) {
    return (
        <Wrapper>
            <Key type='text' placeholder='Enter search key'/>
            <Category name="search-category">
                {props.categories.map(category => {
                    return <CategoryOption key={category} value={category}>{category}</CategoryOption>
                })}
            </Category>
            <SearchButton>Search</SearchButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`;

const SearchButton = styled(PrimaryButton)`
    padding: 10px 20px 10px 20px;

`;

const Key = styled.input`
`;
const Category = styled.select``;
const CategoryOption = styled.option``;