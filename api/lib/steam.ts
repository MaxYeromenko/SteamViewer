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
        playtime2Weeks: g.playtime_2weeks,
        iconUrl: g.img_icon_url,
        logoUrl: g.img_logo_url,
    })) || [];

    console.log(games);

    return {
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
        games,
    };
}
