import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from './styles/Inputs.styled';
import ErrorBox from './ErrorBox';
import { DataTableContents } from './DataTableContents';

export default function DataTable({ headers, data, onDelete, onEdit, inputFormatter, inputValidator }) {
    const [list, setList] = useState(data);
    const [keys, setKeys] = useState(headers);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setList(data);
        setKeys(headers);
        filterList();
    }, [headers, data, search]);

    const handleSearchInputChange = e => {
        const { value } = e.target;
        setSearch(value);
    };

    const filterList = () => {
        if (!search.length) return setList(data);
        setList(
            data.filter(item => {
                for (const key of keys) {
                    if (item[key].toString().match(search)) return true;
                }
                return false;
            })
        );
    };

    return (
        <Wrapper>
            <SearchContainer>
                <StyledInput value={search} placeholder='Enter Search Key' onChange={handleSearchInputChange} />
            </SearchContainer>
            <ErrorBox errors={errors} />
            <TableContainer>
                {list.length ? (
                    <DataTableContents
                        keys={keys}
                        list={list}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onInputChange={inputFormatter}
                        onConfirmInputChange={inputValidator}
                        onError={setErrors}
                    ></DataTableContents>
                ) : (
                    <NoDataMessage>{'No data to display!'}</NoDataMessage>
                )}
            </TableContainer>
        </Wrapper>
    );
}

const NoDataMessage = styled.div``;

const Wrapper = styled.div``;
const SearchContainer = styled.div``;
const TableContainer = styled.div``;

const StyledInput = styled(Input)``;