import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from './styles/Inputs.styled';
import ErrorBox from './ErrorBox';
import { DataTableContents } from './DataTableContents';

export default function DataTable({
    headers,
    data,
    onDelete,
    onEdit,
    inputFormatter,
    inputValidator,
    actions: { hasEdit, hasDelete },
}) {
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
                        hasEdit={hasEdit}
                        hasDelete={hasDelete}
                    ></DataTableContents>
                ) : (
                    <NoDataMessage>{'No data to display!'}</NoDataMessage>
                )}
            </TableContainer>
        </Wrapper>
    );
}

const NoDataMessage = styled.div`
    padding: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;

    color: ${({ theme }) => theme.colors.main.fontColor};
`;
const SearchContainer = styled.div``;
const TableContainer = styled.div`
    max-height: 500px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: 10px solid #009879;

    overflow: auto;
`;

const StyledInput = styled(Input)`
    padding: 10px;
    border-style: none;
    border-radius: 10px;
    text-align: center;
    font-weight: 900;
`;
