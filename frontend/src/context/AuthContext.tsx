'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'ORGANIZER' | 'ADMIN' | 'STAFF';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = () => {
            try {
                const storedUser = sessionStorage.getItem('user');
                const storedToken = sessionStorage.getItem('token');

                if (storedUser && storedToken && storedUser !== 'undefined') {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Failed to restore auth session:", error);
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };
        initAuth();
    }, []);

    const login = useCallback((newToken: string, newUser: User) => {
        setIsLoading(true);
        setToken(newToken);
        setUser(newUser);
        try {
            sessionStorage.setItem('token', newToken);
            sessionStorage.setItem('user', JSON.stringify(newUser));
        } catch (e) {
            console.error("Failed to save auth session:", e);
        }
        setIsLoading(false);

        if (newUser.role === 'STUDENT') {
            router.push('/student/dashboard');
        } else if (newUser.role === 'STAFF') {
            router.push('/staff/dashboard');
        } else {
            router.push('/organizer/dashboard');
        }
    }, [router]);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        try {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        } catch (e) {
            console.error("Failed to clear auth session:", e);
        }
        router.push('/');
    }, [router]);

    const value = useMemo(() => ({ user, token, login, logout, isLoading }), [user, token, login, logout, isLoading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}