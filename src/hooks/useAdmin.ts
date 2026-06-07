import { useState, useEffect, useCallback } from 'react';
import type { UserData, FullUserData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3200";

export const useAdmin = (isAuthenticated: boolean) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUsers = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users`, {
                headers: { "Authorization": localStorage.getItem("token") || "" }
            });
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const delUser = async (idUser: string) => {
        try {
            const res = await fetch(`${API_URL}/user`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token") || ""
                },
                body: JSON.stringify({ id: idUser })
            });
            if (res.ok) {
                setUsers(prev => prev.filter((u) => u._id !== idUser));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const addUser = async (newUser: FullUserData) => {
        try {
            const res = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token") || ""
                },
                body: JSON.stringify(newUser)
            });
            
            if (res.ok) {
                await fetchUsers();
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
        return newUser;
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        fetchUsers,
        delUser,
        addUser
    };
};
