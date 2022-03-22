import { createContext, useEffect, useState } from 'react';

export const ActivePageContext = createContext();

export default function ActivePageProvider({ children }) {
    const [active, setActive] = useState('');

    return <ActivePageContext.Provider value={{ active, setActive }}>{children}</ActivePageContext.Provider>;
}
