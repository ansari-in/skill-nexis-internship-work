import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// This hook is intentionally exported alongside the provider for shared auth access.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}