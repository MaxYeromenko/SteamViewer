import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const cookie = req.cookies?.steam_user;

    if (!cookie) {
        res.status(200).json(null);
        return;
    }

    try {
        const user = JSON.parse(cookie);
        res.status(200).json(user);
    } catch {
        res.status(200).json(null);
    }
}
