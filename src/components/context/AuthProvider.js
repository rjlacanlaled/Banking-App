import { createContext, useState } from 'react';
import Login from '../../pages/Login';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState();

    return <AuthContext.Provider value={user}>{user ? children : <Login onAuth={setUser} />}</AuthContext.Provider>;
}
