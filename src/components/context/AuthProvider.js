import { createContext, useState } from 'react';
import Login from '../../pages/Login';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState();

    const login = user => {
        setUser(user);
    };

    const logout = () => {
        setUser();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {user ? children : <Login />}
        </AuthContext.Provider>
    );
}
