import { createContext, useState, useEffect, type ReactNode } from "react";

type User = {
    steamid: string;
    displayName: string;
    avatar: string;
    profileUrl: string;
    realName: string;
    onlineStatus: number;
    country: string;
    timeCreated: string;
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
        // setUser({
        //     steamid: "76561199447872275",
        //     displayName: "Babaka",
        //     avatar: "https://avatars.steamstatic.com/669ba94a7cc1ebc74fadbf447bfaca007cf4b636_full.jpg",
        //     profileUrl: string,
        //     realName: string,
        //     onlineStatus: number,
        //     country: string,
        //     timeCreated: string,
        // });
    }, []);

    console.log(user);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
