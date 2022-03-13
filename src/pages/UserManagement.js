import styled from "styled-components";
import UserSearchBar from "../components/UserSearchBar";
import { PrimaryButton } from "../components/styles/Buttons.styled";
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
            <Header>
                <Title>Manage Users</Title>
                <AddNewUserButton>+ New User</AddNewUserButton>
            </Header>
            <UserSearchBar categories={categories} />
            <UserList />
        </Wrapper>

    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.mainTitleDiv.backgroundColor};
    color: ${props => props.theme.colors.mainTitleDiv.fontColor}
`;

const Title = styled.h1`

`;

const AddNewUserButton = styled(PrimaryButton)`

`;