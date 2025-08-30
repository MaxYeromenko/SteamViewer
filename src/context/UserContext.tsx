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
        //             steamid: "76561199501817133",
        //             displayName: "Valapple",
        //             avatar: "https://avatars.steamstatic.com/6a6b34636c03b91b3094b5749f9d005858ca6b28_full.jpg",
        //             profileUrl:
        //                 "https://steamcommunity.com/profiles/76561199501817133/",
        //             onlineStatus: 1,
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
        //     games: [
        //         {
        //             appid: 400,
        //             name: "Portal",
        //             playtimeForever: 112,
        //             playtime2Weeks: 0,
        //             iconUrl: "cfa928ab4119dd137e50d728e8fe703e4e970aff",
        //         },
        //         {
        //             appid: 12360,
        //             name: "FlatOut: Ultimate Carnage Collector's Edition",
        //             playtimeForever: 3238,
        //             playtime2Weeks: 0,
        //             iconUrl: "18e8998d43630ecf4bd26c252f10930d6b524e72",
        //         },
        //         {
        //             appid: 20900,
        //             name: "The Witcher: Enhanced Edition",
        //             playtimeForever: 61,
        //             playtime2Weeks: 0,
        //             iconUrl: "746d1cd48fb2e57d579b05b6e9eccba95859e549",
        //         },
        //         {
        //             appid: 620,
        //             name: "Portal 2",
        //             playtimeForever: 686,
        //             playtime2Weeks: 0,
        //             iconUrl: "2e478fc6874d06ae5baf0d147f6f21203291aa02",
        //         },
        //         {
        //             appid: 105600,
        //             name: "Terraria",
        //             playtimeForever: 11417,
        //             playtime2Weeks: 3,
        //             iconUrl: "858961e95fbf869f136e1770d586e0caefd4cfac",
        //         },
        //         {
        //             appid: 20920,
        //             name: "The Witcher 2: Assassins of Kings Enhanced Edition",
        //             playtimeForever: 1556,
        //             playtime2Weeks: 0,
        //             iconUrl: "62dd5c627664df1bcabc47727c7dcd7ccab353e9",
        //         },
        //         {
        //             appid: 48000,
        //             name: "LIMBO",
        //             playtimeForever: 132,
        //             playtime2Weeks: 0,
        //             iconUrl: "463f57855017564301b17050fba73804b3bd86d6",
        //         },
        //         {
        //             appid: 212500,
        //             name: "The Lord of the Rings Online™",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "6dbff8345f6b3e5f092a834985c8f851859bfbf2",
        //         },
        //         {
        //             appid: 304430,
        //             name: "INSIDE",
        //             playtimeForever: 233,
        //             playtime2Weeks: 0,
        //             iconUrl: "047e00c80d6aca008ce5eaaf54df4d98c822ee19",
        //         },
        //         {
        //             appid: 730,
        //             name: "Counter-Strike 2",
        //             playtimeForever: 82263,
        //             playtime2Weeks: 1689,
        //             iconUrl: "8dbc71957312bbd3baea65848b545be9eae2a355",
        //         },
        //         {
        //             appid: 370660,
        //             name: "Opaline",
        //             playtimeForever: 105,
        //             playtime2Weeks: 0,
        //             iconUrl: "c0474cd1d0ce9b2d615862687caa53aabac4673a",
        //         },
        //         {
        //             appid: 404790,
        //             name: "Godot Engine",
        //             playtimeForever: 1390,
        //             playtime2Weeks: 0,
        //             iconUrl: "057ae868c1d0975b941d73f58d1dc17c8a15a090",
        //         },
        //         {
        //             appid: 424840,
        //             name: "Little Nightmares",
        //             playtimeForever: 288,
        //             playtime2Weeks: 0,
        //             iconUrl: "1904c041f963b5e2cb22b56c370444517cc4e288",
        //         },
        //         {
        //             appid: 489620,
        //             name: "Mini Thief Demo",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "005b09dc1f3d4ee772ab20880ba9d304cca041fd",
        //         },
        //         {
        //             appid: 292030,
        //             name: "The Witcher 3: Wild Hunt",
        //             playtimeForever: 11357,
        //             playtime2Weeks: 0,
        //             iconUrl: "78d0ff98b67851f24539cdf2402cf147679134f4",
        //         },
        //         {
        //             appid: 533300,
        //             name: "Zup!",
        //             playtimeForever: 117,
        //             playtime2Weeks: 0,
        //             iconUrl: "0d27b0e8358fb1de01df4be4f957548b196c7bba",
        //         },
        //         {
        //             appid: 552990,
        //             name: "World of Warships",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "023b6bb5bcf82f9222d70cd38fdb18a899bd67e8",
        //         },
        //         {
        //             appid: 444200,
        //             name: "World of Tanks Blitz",
        //             playtimeForever: 28547,
        //             playtime2Weeks: 0,
        //             iconUrl: "6ce02840322f500c93a2f0304bc916fb44422631",
        //         },
        //         {
        //             appid: 563560,
        //             name: "Alien Swarm: Reactive Drop",
        //             playtimeForever: 145,
        //             playtime2Weeks: 0,
        //             iconUrl: "3f30d5d196532aa1d79dbf133f067a38769178dc",
        //         },
        //         {
        //             appid: 588430,
        //             name: "Fallout Shelter",
        //             playtimeForever: 2478,
        //             playtime2Weeks: 374,
        //             iconUrl: "bb39b682fefd9a95486911cd991d8cdc5d7b57c9",
        //         },
        //         {
        //             appid: 601360,
        //             name: "Portal: Revolution",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "7afb1feec3db22a42a34ac59657a510647ff4b77",
        //         },
        //         {
        //             appid: 617670,
        //             name: "Zup! S",
        //             playtimeForever: 253,
        //             playtime2Weeks: 0,
        //             iconUrl: "64d8bf5ec2621eeace7f898afa9f56d6eb5aff4a",
        //         },
        //         {
        //             appid: 739630,
        //             name: "Phasmophobia",
        //             playtimeForever: 18874,
        //             playtime2Weeks: 46,
        //             iconUrl: "125673b382059f666ec81477173380a76e1df0be",
        //         },
        //         {
        //             appid: 860510,
        //             name: "Little Nightmares II",
        //             playtimeForever: 442,
        //             playtime2Weeks: 0,
        //             iconUrl: "8875efb23a0fc1f079f227508d981f2cba82d735",
        //         },
        //         {
        //             appid: 939400,
        //             name: "LoveChoice",
        //             playtimeForever: 2,
        //             playtime2Weeks: 0,
        //             iconUrl: "0b599cb9c44b0824ecdda766f59199315a932089",
        //         },
        //         {
        //             appid: 489520,
        //             name: "Minion Masters",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "ad87d123224d786a413a6021ddaf9257e26c0a28",
        //         },
        //         {
        //             appid: 761890,
        //             name: "Albion Online",
        //             playtimeForever: 42914,
        //             playtime2Weeks: 0,
        //             iconUrl: "c58d1e42e59a9c6cc57c8da69d944b37ba45a0e2",
        //         },
        //         {
        //             appid: 1069740,
        //             name: "Seen",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "8da40e9bfb62086931281abf32e294ea91253099",
        //         },
        //         {
        //             appid: 379430,
        //             name: "Kingdom Come: Deliverance",
        //             playtimeForever: 415,
        //             playtime2Weeks: 0,
        //             iconUrl: "915ec515c36645855abed0476b5b0891d8a4e47a",
        //         },
        //         {
        //             appid: 1215090,
        //             name: "My Friend is a Raven",
        //             playtimeForever: 21,
        //             playtime2Weeks: 0,
        //             iconUrl: "0288a37af66667dd0dd7866d759826bc2aec3b6e",
        //         },
        //         {
        //             appid: 1281930,
        //             name: "tModLoader",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "e8a125078a31b8475994e8ce4d8d6fdd6becc131",
        //         },
        //         {
        //             appid: 1151340,
        //             name: "Fallout 76",
        //             playtimeForever: 118,
        //             playtime2Weeks: 0,
        //             iconUrl: "81185120c1c1a4b26442828b25bbb58aec8d734c",
        //         },
        //         {
        //             appid: 1836200,
        //             name: "Fallout 76 Public Test Server",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "e153521098b536cc1ca5a79e03031533c44a6b05",
        //         },
        //         {
        //             appid: 1419170,
        //             name: "My Singing Monsters",
        //             playtimeForever: 24,
        //             playtime2Weeks: 0,
        //             iconUrl: "698d97ab021448d894c00eebc646323a8587ec96",
        //         },
        //         {
        //             appid: 1407200,
        //             name: "World of Tanks",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "fdedc7d172706ea39d2d2b389cd461cb4cbe7315",
        //         },
        //         {
        //             appid: 1443440,
        //             name: "Little Nightmares II Demo",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "8ef25028ecace8fcbb7dc7b5e8adfd49e8931e7f",
        //         },
        //         {
        //             appid: 1504980,
        //             name: "It Takes Two Friend's Pass",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "6b15f6d81c4fc52056f4928b363b7fac591a945b",
        //         },
        //         {
        //             appid: 582660,
        //             name: "Black Desert",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "bf5ccace0a692720984827bf042143d0d4b28a42",
        //         },
        //         {
        //             appid: 578080,
        //             name: "PUBG: BATTLEGROUNDS",
        //             playtimeForever: 25376,
        //             playtime2Weeks: 0,
        //             iconUrl: "609f27278aa70697c13bf99f32c5a0248c381f9d",
        //         },
        //         {
        //             appid: 1955960,
        //             name: "HAWKED",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "7a9df41684f397d3d5f31ff8c4fce8010a7f6054",
        //         },
        //         {
        //             appid: 2139460,
        //             name: "Once Human",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "e1c29227c162232120c15edcf282df61ee35f091",
        //         },
        //         {
        //             appid: 1222670,
        //             name: "The Sims™ 4",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "ca6bc8b2411bce4a2cd325ab75f0204bc3a4ad98",
        //         },
        //         {
        //             appid: 660160,
        //             name: "Field of Glory II",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "69e42fb6bde64f155cd5efc2f5c5a4642c18e9a4",
        //         },
        //         {
        //             appid: 1180660,
        //             name: "Tell Me Why",
        //             playtimeForever: 505,
        //             playtime2Weeks: 0,
        //             iconUrl: "6eb40e6f71226ce5bea75601a1ec0f9d6f647dd1",
        //         },
        //         {
        //             appid: 383270,
        //             name: "Hue",
        //             playtimeForever: 442,
        //             playtime2Weeks: 0,
        //             iconUrl: "48682a5e83cf7f011a15b68f460a972635742d06",
        //         },
        //         {
        //             appid: 249050,
        //             name: "Dungeon of the ENDLESS™",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "19f66db5192b05b71068dd243729c3d8b0d71f65",
        //         },
        //         {
        //             appid: 344740,
        //             name: "CRYPTARK",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "c56bc2236cbcee87cab5c3d99e97be9f24d8cf50",
        //         },
        //         {
        //             appid: 2684660,
        //             name: "The Witcher 3 REDkit",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "c9c2c65a51b168c8387c72d641d892569587f65d",
        //         },
        //         {
        //             appid: 70,
        //             name: "Half-Life",
        //             playtimeForever: 66,
        //             playtime2Weeks: 0,
        //             iconUrl: "95be6d131fc61f145797317ca437c9765f24b41c",
        //         },
        //         {
        //             appid: 1035510,
        //             name: "Ultimate Zombie Defense",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "19ea5aca745585e84592011e0856661304167466",
        //         },
        //         {
        //             appid: 24010,
        //             name: "Train Simulator Classic 2024",
        //             playtimeForever: 2,
        //             playtime2Weeks: 0,
        //             iconUrl: "689780210e97172c35c21d85b03a1b30a91bbbe5",
        //         },
        //         {
        //             appid: 383180,
        //             name: "Dead Island Riptide Definitive Edition",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "68ea0c6d8ed1d089687da6318a62a7c3e3b5741b",
        //         },
        //         {
        //             appid: 235900,
        //             name: "RPG Maker XP",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "d4fae8dbf49b2d8fda0aa9d74323529e41d200a2",
        //         },
        //         {
        //             appid: 1176710,
        //             name: "Space Crew: Legendary Edition",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "c1c0a0c7c7dae3525bc6a4bb07bc0bd69bc62ab0",
        //         },
        //         {
        //             appid: 282800,
        //             name: "100% Orange Juice",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "baaf4be38deeb8a631567ee6c651ca23b65c834a",
        //         },
        //         {
        //             appid: 1507190,
        //             name: "Machinika Museum",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "f4bb2176803e4b08c0da1032ea59d9a995ccff5b",
        //         },
        //         {
        //             appid: 2962300,
        //             name: "Royal Quest Online",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "c2df557759a85afae63f35337bf64d1d592b1c98",
        //         },
        //         {
        //             appid: 289130,
        //             name: "ENDLESS™ Legend",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "02277be6b9b09671b857948006316057974d7036",
        //         },
        //         {
        //             appid: 489630,
        //             name: "Warhammer 40,000: Gladius - Relics of War",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "ba6ea4fbeec62073763e103450e8aa7c5373d010",
        //         },
        //         {
        //             appid: 1426210,
        //             name: "It Takes Two",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "6b15f6d81c4fc52056f4928b363b7fac591a945b",
        //         },
        //         {
        //             appid: 442070,
        //             name: "Drawful 2",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "a2aab99a9ec657f817aff247593b3310cae44288",
        //         },
        //         {
        //             appid: 2828500,
        //             name: "The Jackbox Megapicker",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "0866a1d27e96a96c7d013c41eb6fa2ec6a935a7d",
        //         },
        //         {
        //             appid: 1422450,
        //             name: "Deadlock",
        //             playtimeForever: 518,
        //             playtime2Weeks: 0,
        //             iconUrl: "f6da1420a173324d49bcd470fa3eee781ad0fa5e",
        //         },
        //         {
        //             appid: 373600,
        //             name: "Weapon of Choice",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "16928dc115d57b622669c96a4d666a47f3023e7a",
        //         },
        //         {
        //             appid: 569610,
        //             name: "Distant Space",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "1cfe852a7e1054108d50d2a3b28219411b776bc4",
        //         },
        //         {
        //             appid: 3352550,
        //             name: "Like a Dragon: Pirate Yakuza in Hawaii Demo",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "36457865acaa83643207ffad25422f62538b8cbf",
        //         },
        //         {
        //             appid: 220,
        //             name: "Half-Life 2",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "fcfb366051782b8ebf2aa297f3b746395858cb62",
        //         },
        //         {
        //             appid: 320,
        //             name: "Half-Life 2: Deathmatch",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "795e85364189511f4990861b578084deef086cb1",
        //         },
        //         {
        //             appid: 360,
        //             name: "Half-Life Deathmatch: Source",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "40b8a62efff5a9ab356e5c56f5c8b0532c8e1aa3",
        //         },
        //         {
        //             appid: 29900,
        //             name: "Dark Sector",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "e1eede77996260a65a37d3610634ed88a0b6a6db",
        //         },
        //         {
        //             appid: 418670,
        //             name: "Pankapu",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "646b618afcddf400428cb3e77034be3eb1bbbf80",
        //         },
        //         {
        //             appid: 729460,
        //             name: "Distant Space 2",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "0c9c34d2e426d9086b95c7034a12981220a541ee",
        //         },
        //         {
        //             appid: 481870,
        //             name: "Mini Thief",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "80df03476ae26bb8b20df00e5de0acc1fbb1792a",
        //         },
        //         {
        //             appid: 1703140,
        //             name: "Isle of Jura",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "56e2dd9001f5ec270f01115af28f47d8cd9bcbb1",
        //         },
        //         {
        //             appid: 2796010,
        //             name: "Party Club",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "a80c96dde162ef5ed25704384b6e312b6b6cddf9",
        //         },
        //         {
        //             appid: 813540,
        //             name: "Scheming Through The Zombie Apocalypse: The Beginning",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "3138e1c654922fd57f59f91e6579a975aabc4ecc",
        //         },
        //         {
        //             appid: 302190,
        //             name: "Amerzone: The Explorer’s Legacy (1999)",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "d6ff9aa52c570e15342b487a6048539bdb182074",
        //         },
        //         {
        //             appid: 753660,
        //             name: "AtmaSphere",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "0f3559c8e03858f975a1d2ab7dfb7a06a60d06de",
        //         },
        //         {
        //             appid: 252410,
        //             name: "SteamWorld Dig",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "7757c90bbf65e312ea4871106250077e78007bc6",
        //         },
        //         {
        //             appid: 1608450,
        //             name: "Hellslave",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "733a62d2f790189f9cecb01bebf8e014a231a86e",
        //         },
        //         {
        //             appid: 624690,
        //             name: "NEXT JUMP: Shmup Tactics",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "c31aa58c0d3f7ccfbf99bfd81918e4767641be82",
        //         },
        //         {
        //             appid: 1356040,
        //             name: "Ampersat",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "82967694d0c9a66be7e0675550b68c74f1c34ffa",
        //         },
        //         {
        //             appid: 1990740,
        //             name: "Barro GT",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "5bcb2a24d4a2bba21d4ce58a6c236efcd5a9492c",
        //         },
        //         {
        //             appid: 2955840,
        //             name: "Kitchen Wars",
        //             playtimeForever: 0,
        //             playtime2Weeks: 0,
        //             iconUrl: "93c637e395897e6a681db87bd6ada2371772e4eb",
        //         },
        //         {
        //             appid: 570,
        //             name: "Dota 2",
        //             playtimeForever: 573,
        //             playtime2Weeks: 0,
        //             iconUrl: "0bbb630d63262dd66d2fdd0f7d37e8661a410075",
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
