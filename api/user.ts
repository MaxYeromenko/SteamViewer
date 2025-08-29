import type { VercelRequest, VercelResponse } from "@vercel/node";
import { serialize } from "cookie";
import { fetchSteamUserData } from "./lib/steam";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const cookie = req.cookies?.steam_user;

    if (!cookie) {
        res.status(200).json(null);
        return;
    }

    let user: any;
    try {
        user = JSON.parse(cookie);
    } catch {
        res.status(200).json(null);
        return;
    }

    try {
        const steamid = user.steamid;
        const updatedUser = await fetchSteamUserData(steamid);

        res.setHeader(
            "Set-Cookie",
            serialize("steam_user", JSON.stringify(updatedUser), {
                httpOnly: false,
                secure: true,
                sameSite: "lax",
                path: "/",
            })
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        console.warn("Steam API unavailable, using cached data");
        res.status(200).json(user);
    }
}
