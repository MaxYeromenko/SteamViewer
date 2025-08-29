import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import { serialize } from "cookie";

const STEAM_API_KEY = process.env.STEAM_API_KEY!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const cookie = req.cookies?.steam_user;

    if (!cookie) {
        res.status(200).json(null);
        return;
    }

    let user: {
        steamid: any;
        displayName?: any;
        avatar?: any;
        profileUrl?: any;
        lastlogoff?: any;
        realName?: any;
        onlineStatus?: any;
        country?: any;
        timeCreated?: any;
        friends?: any[];
    };

    try {
        user = JSON.parse(cookie);
    } catch {
        res.status(200).json(null);
        return;
    }

    try {
        const steamid = user.steamid;

        const playerRes = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamid}`
        );
        const playerData = await playerRes.json();
        const player = playerData.response.players[0];

        const friendsRes = await fetch(
            `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${STEAM_API_KEY}&steamid=${steamid}&relationship=friend`
        );
        const friendsData = await friendsRes.json();

        let friends: any[] = [];
        if (friendsData.friendslist?.friends?.length) {
            const friendIds = friendsData.friendslist.friends.map((f: any) => f.steamid).join(",");
            const friendSummariesRes = await fetch(
                `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${friendIds}`
            );
            const friendSummariesData = await friendSummariesRes.json();
            friends = friendSummariesData.response.players.map((f: any) => ({
                steamid: f.steamid,
                displayName: f.personaname,
                avatar: f.avatarfull,
                profileUrl: f.profileurl,
                onlineStatus: f.personastate,
            }));
        }

        user = {
            steamid: player.steamid,
            displayName: player.personaname,
            avatar: player.avatarfull,
            profileUrl: player.profileurl,
            lastlogoff: player.lastlogoff,
            realName: player.realname,
            onlineStatus: player.personastate,
            country: player.loccountrycode,
            timeCreated: player.timecreated,
            friends,
        };

        res.setHeader(
            "Set-Cookie",
            serialize("steam_user", JSON.stringify(user), {
                httpOnly: false,
                secure: true,
                sameSite: "lax",
                path: "/",
            })
        );
    } catch (err) {
        console.warn("Steam API unavailable, using cached data");
    }

    res.status(200).json(user);
}
