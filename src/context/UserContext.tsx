import { createContext, useState, useEffect, type ReactNode } from "react";

type User = {
    steamid: string;
    displayName: string;
    level: number;
    avatar: string;
    profileUrl: string;
    lastlogoff: number;
    realName?: string;
    onlineStatus: number;
    country?: string;
    timeCreated?: number;
    friends: Friend[];
    games: Game[];
    // badges: Badge[];
};

export type Friend = {
    steamid: string;
    displayName: string;
    avatar: string;
    profileUrl: string;
    onlineStatus: number;
};

export type Game = {
    appid: number;
    name: string;
    playtimeForever: number;
    playtimeWindowsForever: number;
    playtimeMacForever: number;
    playtimeLinuxForever: number;
    playtimeDeckForever: number;
    playtimeOffline: number;
    lastTimePlayed: number;
    playtime2Weeks: number;
    iconUrl: string;
};

// type Badge = {
//     badgeId: number;
//     level: number;
//     xp: number;
//     appId: number;
//     communityItemId: string;
//     borderColor: number;
//     completionTime: number;
//     scarcity: number;
// };

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
        // setUser();
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
