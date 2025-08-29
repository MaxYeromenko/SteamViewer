import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchSteamUserData } from "./lib/steam";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const steamid = req.cookies?.steam_user;

    if (!steamid) {
        res.status(200).json(null);
        return;
    }

    try {
        const updatedUser = await fetchSteamUserData(steamid);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Steam API unavailable", err);
        res.status(200).json(null);
    }
}
