import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";

const categories = [
    'id',
    'firstName',
    'lastName',
    'balance'
];

export default function UserManagement(props) {
    return (
        <Wrapper>
            <SearchBar categories={categories} />
            <UserList />
        </Wrapper>

    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;