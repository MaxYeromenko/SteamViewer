import fetch from "node-fetch";

const STEAM_API_KEY = process.env.STEAM_API_KEY!;

export async function fetchSteamUserData(steamid: string) {
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

    const gamesRes = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamid}&include_appinfo=1&include_played_free_games=1`
    );
    const gamesData = await gamesRes.json();

    const games = gamesData.response.games?.map((g: any) => ({
        appid: g.appid,
        name: g.name,
        playtimeForever: g.playtime_forever,
        playtimeWindowsForever: g.playtime_windows_forever,
        playtimeMacForever: g.playtime_mac_forever,
        playtimeLinuxForever: g.playtime_linux_forever,
        playtimeDeckForever: g.playtime_deck_forever,
        playtimeOffline: g.playtime_disconnected,
        lastTimePlayed: g.rtime_last_played,
        playtime2Weeks: g.playtime_2weeks ?? 0,
        iconUrl: g.img_icon_url
            ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
            : null,
    })) || [];

    const playerLevel = await fetch(
        `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${STEAM_API_KEY}&steamid=${steamid}`
    );
    const playerLevelData = await playerLevel.json();
    const level = playerLevelData.response.player_level ?? 0;

    const inventoryRes = await fetch(
        `https://steamcommunity.com/inventory/${steamid}/730/2`
    );
    const inventoryData = await inventoryRes.json();
    console.log(inventoryData);

    const items = (inventoryData.assets || []).map((asset: any) => {
        const desc = inventoryData.descriptions?.find(
            (d: any) => d.classid === asset.classid && d.instanceid === asset.instanceid
        );

        if (!desc) return null;

        const { classid, instanceid, market_hash_name, name, type, tradable, marketable, commodity, icon_url, ...extra } = desc;

        return {
            classid: asset.classid,
            instanceid: asset.instanceid,
            marketHashName: market_hash_name ?? "",
            name: name ?? "",
            type: type ?? "",
            tradable: tradable === 1,
            marketable: marketable === 1,
            commodity: commodity === 1,
            iconUrl: icon_url ? `https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}` : null,
            marketUrl: market_hash_name
                ? `https://steamcommunity.com/market/listings/730/${encodeURIComponent(market_hash_name)}`
                : null,
            extra,
        };
    }).filter(Boolean);


    return {
        steamid: player.steamid,
        displayName: player.personaname,
        level: level,
        avatar: player.avatarfull,
        profileUrl: player.profileurl,
        lastlogoff: player.lastlogoff,
        realName: player.realname,
        onlineStatus: player.personastate,
        country: player.loccountrycode,
        timeCreated: player.timecreated,
        friends,
        games,
        items
    };
}
