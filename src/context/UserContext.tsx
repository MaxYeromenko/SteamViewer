import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../ts/types";

export const UserContext = createContext<{
    user: User | null;
    logout: () => void;
}>({
    user: null,
    logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch("/api/user", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    const logout = () => {
        document.cookie = "steam_user=; Max-Age=0; path=/;";
        setUser(null);
    };

    console.log(user);

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
};
