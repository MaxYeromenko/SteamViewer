import { type Game } from "../../ts/types";
import { grtFullTimeString } from "../../pages/utils";
import Button from "../Button/Button";
import classes from "./_Game.module.scss";

export default function Game({ game }: { game: Game }) {
    const GAME_URL = "https://store.steampowered.com/app/";

    const transferIntoHours = (minutes: number) => Math.round(minutes / 60);

    return (
        <div className={classes.gameContainer}>
            <div className={classes.iconName}>
                <div className={classes.iconContainer}>
                    <img
                        className={classes.icon}
                        src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                        alt="icon"
                        loading="lazy"
                    />
                </div>
                <h3 className={classes.name}>{game.name}</h3>
            </div>
            <div className={classes.textInfo}>
                <div className={classes.infoColumn}>
                    <span>
                        Total playtime:&nbsp;
                        {transferIntoHours(game.playtimeForever)}
                    </span>
                    <span>
                        Playtime&nbsp;
                        <i className="fa-brands fa-windows" />
                        &nbsp;:&nbsp;
                        {transferIntoHours(game.playtimeWindowsForever)}
                    </span>
                    <span>
                        Playtime&nbsp;
                        <i className="fa-brands fa-apple" />
                        &nbsp;:&nbsp;
                        {transferIntoHours(game.playtimeMacForever)}
                    </span>
                    <span>
                        Playtime&nbsp;
                        <i className="fa-brands fa-linux" />
                        &nbsp;:&nbsp;
                        {transferIntoHours(game.playtimeLinuxForever)}
                    </span>
                    <span>
                        Playtime&nbsp;
                        <i className="fa-brands fa-steam-symbol" />
                        &nbsp;:&nbsp;
                        {transferIntoHours(game.playtimeDeckForever)}
                    </span>
                </div>
                <div className={classes.infoColumn}>
                    <span>
                        Playtime offline:{" "}
                        {transferIntoHours(game.playtimeOffline)}
                    </span>
                    <span>
                        Playtime in 2 weeks:{" "}
                        {transferIntoHours(game.playtime2Weeks)}
                    </span>
                    <span>
                        Last time played:{" "}
                        {grtFullTimeString(game.lastTimePlayed)}
                    </span>
                    <a
                        href={GAME_URL.concat(game.appid.toString())}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1}
                    >
                        <Button>View on Steam &#8599;</Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
