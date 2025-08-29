import { createContext, useState, useEffect, type ReactNode } from "react";

type User = {
    steamid: string;
    displayName: string;
    avatar: string;
    profileUrl: string;
    lastlogoff: number;
    realName?: string;
    onlineStatus: number;
    country?: string;
    timeCreated?: number;
    userLevel?: number;
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

type Game = {
    appid: string;
    name: string;
    playtimeForever: number;
    playtime2Weeks: number;
    iconUrl: string;
    logoUrl: string;
};

type Badge = {
    badgeId: number;
    level: number;
    xp: number;
    appId: number;
    communityItemId: string;
    borderColor: number;
    completionTime: number;
    scarcity: number;
};

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
        // setUser({
        //     steamid: "76561199447872275",
        //     displayName: "Babaka",
        //     avatar: "https://avatars.steamstatic.com/669ba94a7cc1ebc74fadbf447bfaca007cf4b636_full.jpg",
        //     profileUrl:
        //         "https://steamcommunity.com/profiles/76561199447872275/",
        //     lastlogoff: 1756486003,
        //     onlineStatus: 1,
        //     country: "UA",
        //     timeCreated: 1671903195,
        //     friends: [
        //         {
        //             steamid: "76561198374376541",
        //             displayName: "RubyRoseUwU",
        //             avatar: "https://avatars.steamstatic.com/78488061cca73d071ad4bcc1a086ef9b65f8f050_full.jpg",
        //             profileUrl:
        //                 "https://steamcommunity.com/profiles/76561198374376541/",
        //             onlineStatus: 0,
        //         },
        //         {
        //             steamid: "76561199501817133",
        //             displayName: "Valapple",
        //             avatar: "https://avatars.steamstatic.com/6a6b34636c03b91b3094b5749f9d005858ca6b28_full.jpg",
        //             profileUrl:
        //                 "https://steamcommunity.com/profiles/76561199501817133/",
        //             onlineStatus: 1,
        //         },
        //         {
        //             steamid: "76561199763743352",
        //             displayName: "БрайанФимозер",
        //             avatar: "https://avatars.steamstatic.com/9a39889c7f72500c239dd0098f883f868133f440_full.jpg",
        //             profileUrl:
        //                 "https://steamcommunity.com/profiles/76561199763743352/",
        //             onlineStatus: 0,
        //         },
        //         {
        //             steamid: "76561198015895061",
        //             displayName: '"UAB" ĮMONĖ lol3000',
        //             avatar: "https://avatars.steamstatic.com/9d59a333a61e7758c1fc02aa68d29e7af468bc5a_full.jpg",
        //             profileUrl: "https://steamcommunity.com/id/hhfgff/",
        //             onlineStatus: 0,
        //         },
        //         {
        //             steamid: "76561199224183545",
        //             displayName: "Purple",
        //             avatar: "https://avatars.steamstatic.com/9a74194adfb1439a267e2868f291d9d59f9f1e55_full.jpg",
        //             profileUrl:
        //                 "https://steamcommunity.com/profiles/76561199224183545/",
        //             onlineStatus: 0,
        //         },
        //         {
        //             steamid: "76561199207624129",
        //             displayName: "ヴァルバラ",
        //             avatar: "https://avatars.steamstatic.com/8fd07256b6cfb1da3540875d9283350a3dc9ae2f_full.jpg",
        //             profileUrl:
        //                 "https://steamcommunity.com/profiles/76561199207624129/",
        //             onlineStatus: 0,
        //         },
        //     ],
        // });
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
