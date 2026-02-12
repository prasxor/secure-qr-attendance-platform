import { createContext, useState, useEffect, Children } from "react";
import http from "../api/http"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        http.get("/auth/me")
            .then(res => {
                setUser(res.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    const login = async (email, password) => {
        const res = await http.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.access_token);
        setUser({
            user_id: res.data.user_id,
            is_admin: res.data.is_admin
        });
    };

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    )
};