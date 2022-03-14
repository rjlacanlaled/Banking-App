import { useState } from 'react';
import styled from 'styled-components';
import { MAX_BALANCE_DIGITS, MAX_NAME_CHARS } from '../model/BankUser';
import { formatFloat, formatInteger, formatName } from '../services/InputFormatService';
import { PrimaryButton } from './styles/Buttons.styled';
import { Input } from './styles/Inputs.styled';

export default function SearchBar(props) {
    const [searchKey, setSearchKey] = useState('');
    const [chosenCategory, setChosenCategory] = useState('id');

    const handleSearchKeyChange = e => {

        let value;
        switch (chosenCategory) {
            case 'id':
                if (e.target.value > MAX_BALANCE_DIGITS) return;
                value = formatInteger(e.target.value);
                break;
            case 'balance':
                if (e.target.value > MAX_BALANCE_DIGITS) return;
                value = formatFloat(e.target.value);
                break;
            default:
                if (e.target.value > MAX_NAME_CHARS) return;
                value = formatName(e.target.value);
        }

        setSearchKey(value);
    };

    const handleCategoryChange = e => {
        setChosenCategory(e.target.value);
    };

    return (
        <Wrapper>
            <Input value={searchKey} onChange={handleSearchKeyChange} />
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
    justify-content: flex-start;
    gap: 5px;
`;

const SearchButton = styled(PrimaryButton)`
    padding: 10px 20px 10px 20px;
`;

const Category = styled.select``;
const CategoryOption = styled.option``;

