import { createContext, useState, useEffect, type ReactNode } from "react";

type User = {
    steamid: string;
    displayName: string;
    avatar: string;
};

export const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch("/api/user", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
