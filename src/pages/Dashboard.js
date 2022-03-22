import { useEffect } from 'react';
import styled from 'styled-components';
import useActivePage from '../components/hooks/useActivePage';

export default function Dashboard() {

    const activePage = useActivePage();

    useEffect(() => {
        activePage.setActive('dashboard');
    }, []);

    return <Wrapper></Wrapper>;
}

const Wrapper = styled.div``;
