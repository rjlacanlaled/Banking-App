import styled from 'styled-components';

export default function SearchBar(props) {
    return (
        <Wrapper>
            <Key type='text' />
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
`;
const Key = styled.input``;
const Category = styled.select``;
const CategoryOption = styled.option``;
const SearchButton = styled.button``;