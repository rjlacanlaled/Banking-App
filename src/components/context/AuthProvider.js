import { createContext, useState } from 'react';
import Login from '../../pages/Login';
import usePersist from '../hooks/usePersist';

export const AuthContext = createContext();

export default function AuthProvider({ children, bank }) {
    const [user, setUser] = usePersist('userLoggedIn', null);

    const login = user => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {user ? children : <Login bank={bank} />}
        </AuthContext.Provider>
    );
}
