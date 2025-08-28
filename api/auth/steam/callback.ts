import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import * as querystring from "querystring";
import { serialize } from "cookie";

const STEAM_API_KEY = process.env.STEAM_API_KEY!;
const BASE_URL = process.env.BASE_URL!;

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

    const user = {
        steamid: player.steamid,
        displayName: player.personaname,
        avatar: player.avatarfull,
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
