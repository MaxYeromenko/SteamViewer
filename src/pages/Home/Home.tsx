import classes from "./_Home.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../pages/utils";
import type { Achievement, Game, Item } from "../../ts/types";

export default function Home() {
    const { user } = useContext(UserContext);
    const [recentGames] = useState<Game[]>([]);
    const [recentItems] = useState<Item[]>([]);
    const [recentAchievements] = useState<Achievement[]>([]);

    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    return (
        <section className={classes.homePage}>
            <h2>Последние события</h2>

            <div className={classes.section}>
                <h3>Недавно играл</h3>
                {recentGames.length === 0 ? (
                    <span>Нет данных</span>
                ) : (
                    <ul>
                        {recentGames.map((game) => (
                            <li key={game.appid}>
                                {game.name} —{" "}
                                {Math.round(game.playtimeForever / 60)} ч.
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={classes.section}>
                <h3>Новые предметы</h3>
                {recentItems.length === 0 ? (
                    <span>Нет данных</span>
                ) : (
                    <ul>
                        {recentItems.map((item) => (
                            <li key={item.assetid}>{item.marketHashName}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={classes.section}>
                <h3>Достижения</h3>
                {recentAchievements.length === 0 ? (
                    <span>Нет данных</span>
                ) : (
                    <ul>
                        {recentAchievements.map((ach) => (
                            <li key={ach.apiname}>{ach.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
