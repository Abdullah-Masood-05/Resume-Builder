"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "recruiter" | "candidate";

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, fullName: string, role: UserRole) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        };
        loadUser();
    }, []); const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Get users from localStorage
            const usersData = localStorage.getItem("users");
            const users = usersData ? JSON.parse(usersData) : [];

            // Find user with matching email and password
            const foundUser = users.find(
                (u: { email: string; password: string }) => u.email === email && u.password === password
            ); if (foundUser) {
                const userData: User = {
                    id: foundUser.id,
                    email: foundUser.email,
                    fullName: foundUser.fullName,
                    role: foundUser.role,
                };
                setUser(userData);
                localStorage.setItem("currentUser", JSON.stringify(userData));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const register = async (
        email: string,
        password: string,
        fullName: string,
        role: UserRole
    ): Promise<boolean> => {
        try {
            // Get existing users
            const usersData = localStorage.getItem("users");
            const users = usersData ? JSON.parse(usersData) : [];

            // Check if user already exists
            if (users.some((u: { email: string }) => u.email === email)) {
                return false;
            }
            // Create new user
            const newUser = {
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                email,
                password,
                fullName,
                role,
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Auto login after registration
            const userData: User = {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                role: newUser.role,
            };
            setUser(userData);
            localStorage.setItem("currentUser", JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
