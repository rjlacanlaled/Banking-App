import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Input } from './styles/Inputs.styled';
import ErrorBox from './ErrorBox';

export default function DataTable({ headers, data, onDelete, onEdit, inputHandler }) {
    const [list, setList] = useState(data);
    const [keys, setKeys] = useState(headers);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState([]);

    console.log(inputHandler);

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
                <StyledInput
                    value={search}
                    placeholder='Enter Search Key'
                    onChange={handleSearchInputChange}
                ></StyledInput>
                <ErrorBox errors={errors} />
                {list.length ? (
                    <DataItems
                        keys={keys}
                        list={list}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onChange={inputHandler}
                    ></DataItems>
                ) : (
                    <NoDataMessage>{'No data to display!'}</NoDataMessage>
                )}
            </SearchContainer>
        </Wrapper>
    );
}

function DataItems({ keys, list, onEdit, onDelete, onInputChange }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {keys.map(key => (
                            <TableHeader key={key}>{key}</TableHeader>
                        ))}
                        <TableHeader>{'Actions'}</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map(item => {
                        return (
                            <DataItem
                                key={`${item['id']}-data-item`}
                                id={item['id']}
                                keys={keys}
                                item={item}
                                onInputChange={onInputChange}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function DataItem({ id, keys, item, onDelete, onEdit, onInputChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [values, setValues] = useState(item);

    const handleDelete = () => {
        onDelete(id);
    };

    const handleConfirmEdit = () => {
        // validate first
        setIsEditing(false);
        onEdit(values);
    };

    const handleCancelEdit = () => {
        setValues(item);
        setIsEditing(false);
    };

    const handleInputChange = (e, key) => {
        const newValues = { ...values };
        newValues[key] = e.target.value;
        console.log(onInputChange);
        //newValues[key] = inputHandlers[key](newValues[key]);
        setValues(newValues);
    };

    return (
        <TableRow key={id}>
            {keys.map(key => {
                return (
                    <TableData key={`${id}&&${key}data-item`}>
                        <StyledInput
                            disabled={key === 'id' ? true : !isEditing}
                            value={values[key]}
                            onChange={e => handleInputChange(e, key)}
                        />
                    </TableData>
                );
            })}
            <TableData>
                {!isEditing ? (
                    <EditDeleteButtons id={id} onEdit={setIsEditing} onDelete={handleDelete} />
                ) : (
                    <ConfirmCancelButtons id={id} onConfirm={handleConfirmEdit} onCancel={handleCancelEdit} />
                )}
            </TableData>
        </TableRow>
    );
}

function EditDeleteButtons({ id, onEdit, onDelete }) {
    return (
        <ButtonContainer>
            <StyledFiEdit onClick={() => onEdit(id)} />
            <StyledRiDeleteBin5Line onClick={() => onDelete(id)} />
        </ButtonContainer>
    );
}

function ConfirmCancelButtons({ id, onConfirm, onCancel }) {
    return (
        <ButtonContainer>
            <StyledAiOutlineCheckCircle onClick={() => onConfirm(id)} />
            <StyledMdOutlineCancel onClick={() => onCancel(id)} />
        </ButtonContainer>
    );
}

const NoDataMessage = styled.div``;

const Wrapper = styled.div``;
const SearchContainer = styled.div``;
const TableContainer = styled.div``;
const Table = styled.table``;
const TableHead = styled.thead``;
const TableBody = styled.tbody``;
const TableHeader = styled.th``;
const TableRow = styled.tr``;
const TableData = styled.td``;

const ButtonContainer = styled.div``;
const StyledFiEdit = styled(FiEdit)``;
const StyledRiDeleteBin5Line = styled(RiDeleteBin5Line)``;

const StyledMdOutlineCancel = styled(MdOutlineCancel)``;
const StyledAiOutlineCheckCircle = styled(AiOutlineCheckCircle)``;

const StyledInput = styled(Input)``;
