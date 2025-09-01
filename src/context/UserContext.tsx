import { useState, useEffect, type ReactNode } from "react";
import type { User } from "../ts/types";
import { UserContext } from "../pages/utils";
// import { testUser } from "./test";

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

    // useEffect(() => {
    //     setUser(testUser);
    // }, []);

    console.log(user?.achievements);

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
};
