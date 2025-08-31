export type User = {
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
    inventories: Record<string, any>;
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

export type Item = {
    classid: string;
    instanceid: string;
    marketHashName: string;
    name: string;
    type: string;
    tradable: boolean;
    marketable: boolean;
    commodity: boolean;
    iconUrl: string;
    marketUrl: string;
    extra?: Record<string, any>;
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