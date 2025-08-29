import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import * as querystring from "querystring";
import { serialize } from "cookie";

const STEAM_API_KEY = process.env.STEAM_API_KEY!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const body = querystring.stringify(req.query as any);

    const response = await fetch("https://steamcommunity.com/openid/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body + "&openid.mode=check_authentication",
    });

    const text = await response.text();
    if (!text.includes("is_valid:true")) {
        res.status(403).send("Steam auth failed");
        return;
    }

    const claimedId = (req.query["openid.claimed_id"] as string) || "";
    const steamid = claimedId.split("/").pop();

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
            onlineStatus: f.personastate
        }));
    }

    const gamesRes = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamid}&include_appinfo=1&include_played_free_games=1`
    );
    const gamesData = await gamesRes.json();

    const games = gamesData.response.games?.map((g: any) => ({
        appid: g.appid,
        name: g.name,
        playtimeForever: g.playtime_forever,
        playtime2Weeks: g.playtime_2weeks,
        iconUrl: g.img_icon_url,
        logoUrl: g.img_logo_url,
    })) || [];

    const badgesRes = await fetch(
        `https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=${STEAM_API_KEY}&steamid=${steamid}`
    );
    const badgesData = await badgesRes.json();

    const badges = badgesData.response.badges?.map((b: any) => ({
        badgeId: b.badgeid,
        level: b.level,
        xp: b.xp,
        appId: b.appid,
        communityItemId: b.communityitemid,
        borderColor: b.border_color,
        completionTime: b.completion_time,
        scarcity: b.scarcity,
    })) || [];

    const user = {
        steamid: player.steamid,
        displayName: player.personaname,
        avatar: player.avatarfull,
        profileUrl: player.profileurl,
        lastlogoff: player.lastlogoff,
        realName: player.realName,
        onlineStatus: player.personastate,
        country: player.loccountrycode,
        timeCreated: player.timecreated,
        userLevel: badgesData.response.player_level,
        friends,
        games,
        badges,
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

    res.writeHead(302, { Location: "/" });
    res.end();
}
