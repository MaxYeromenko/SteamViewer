import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as querystring from "querystring";

const BASE_URL = process.env.BASE_URL!;

export default function handler(req: VercelRequest, res: VercelResponse) {
    const returnTo = `${BASE_URL}/api/auth/steam/callback`;
    const params = querystring.stringify({
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": returnTo,
        "openid.realm": BASE_URL,
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    });

    res.writeHead(302, { Location: `https://steamcommunity.com/openid/login?${params}` });
    res.end();
}
