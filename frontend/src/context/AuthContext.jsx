import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();
    const { showToast } = useToast();

    const [token, setToken] = useState(
        localStorage.getItem("access_token")
    );

    const isAuthenticated = !!token;


    /* ================= LOGIN ================= */

    const login = (newToken) => {

        localStorage.setItem(
            "access_token",
            newToken
        );

        setToken(newToken);

        navigate("/dashboard");
    };


    /* ================= LOGOUT ================= */

    const logout = (showMessage = true) => {

        localStorage.removeItem(
            "access_token"
        );

        setToken(null);

        if (showMessage) {

            showToast(
                "Logged out successfully",
                "success"
            );

        }

        navigate("/login");
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}