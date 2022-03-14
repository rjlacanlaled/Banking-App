import { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from './styles/Buttons.styled';
import { InputFloat, InputInteger, InputName, InputText } from './styles/TextBoxes.styled';

function getSearchCategoryInputComponent(category, searchKey, handleSearchKeyChange) {
    switch (category) {
        case 'id':
            return (
                <InputInteger
                    placeholder='Enter search key'
                    value={searchKey}
                    setValue={handleSearchKeyChange}
                    maxDigits={12}
                />
            );
        case 'balance':
            return (
                <InputFloat
                    placeholder='Enter search key'
                    value={searchKey}
                    setValue={handleSearchKeyChange}
                    maxDigits={12}
                />
            );
        case 'lastName':
        case 'firstName':
        default:
            return (
                <InputName
                    placeholder='Enter search key'
                    value={searchKey}
                    setValue={handleSearchKeyChange}
                    maxCharacters={12}
                />
            );
    }
}

export default function SearchBar(props) {
    const [searchKey, setSearchKey] = useState('');
    const [chosenCategory, setChosenCategory] = useState('id');

    const handleSearchKeyChange = value => {
        setSearchKey(value);
    };

    const handleCategoryChange = e => {
        setChosenCategory(e.target.value);
    };

    return (
        <Wrapper>
            {getSearchCategoryInputComponent(chosenCategory, searchKey, handleSearchKeyChange)}
            <Category name='search-category' value={chosenCategory} onChange={handleCategoryChange}>
                {props.categories.map(category => {
                    return (
                        <CategoryOption key={category} value={category}>
                            {category}
                        </CategoryOption>
                    );
                })}
            </Category>
            <SearchButton onClick={() => props.searchUser(searchKey, chosenCategory)}>Search</SearchButton>
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

const Category = styled.select``;
const CategoryOption = styled.option``;
