import type { Game } from "../../context/UserContext";
import classes from "./_Game.module.scss";

export default function Game({
    appid,
    name,
    playtimeForever,
    playtime2Weeks,
}: Game) {
    return (
        <div className={classes.gameContainer}>
            <div className={classes.icon}>
                <img
                    src={`https://cdn.akamai.steamstatic.com/steam/apps/${appid}/capsule_184x69.jpg`}
                    alt="icon"
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span>{name}</span>
                <span>Playtime forever: {playtimeForever}</span>
                <span>Playtime 2 weeks: {playtime2Weeks}</span>
            </div>
        </div>
    );
}
