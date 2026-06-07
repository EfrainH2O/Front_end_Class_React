import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3200";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    const logInApi = async ({ username, password }: { username: string; password: string }) => {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        return data;
    };

    return {
        isAuthenticated,
        login,
        logout,
        logInApi
    };
};
