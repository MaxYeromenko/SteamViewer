import classes from "./_Home.module.scss";
import { useContext } from "react";
import { UserContext } from "../../pages/utils";
import type {
    Achievement as AchievementType,
    Game as GameType,
    Item,
} from "../../ts/types";
import Game from "../../components/Game/Game";
import InventoryItem from "../../components/InventoryItem/InventoryItem";
import Achievement from "../../components/Achievement/Achievement";

export default function Home() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    const recentGames: GameType[] = [...user.games]
        .sort((a, b) => (b.lastTimePlayed || 0) - (a.lastTimePlayed || 0))
        .slice(0, 5);

    function shuffleArray<T>(array: T[]): T[] {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const allItems: Item[] = Object.entries(user.inventories)
        .filter(([appid]) => Number(appid) !== 753)
        .flatMap(([_, items]) => items as Item[]);

    const recentItems: Item[] = shuffleArray(allItems).slice(0, 10);

    const allAchievements: AchievementType[] = Object.values(
        user.allAchievements
    ).flat() as AchievementType[];

    const popularAchievements: AchievementType[] = shuffleArray(
        allAchievements
    ).slice(0, 20);

    return (
        <section className={classes.homePage}>
            <h1>General information</h1>
            <div className={classes.section}>
                <h3>Recently played games</h3>
                {recentGames.length === 0 ? (
                    <span>No data!</span>
                ) : (
                    recentGames.map((game) => (
                        <Game key={game.appid} game={game} />
                    ))
                )}
            </div>
            <div className={classes.section}>
                <h3>Random inventory items</h3>
                {recentItems.length === 0 ? (
                    <span>No data!</span>
                ) : (
                    recentItems.map((item) => (
                        <InventoryItem
                            key={item.assetid}
                            inventoryItem={item}
                        />
                    ))
                )}
            </div>
            <div className={classes.section}>
                <h3>Random achievements</h3>
                {popularAchievements.length === 0 ? (
                    <span>No data!</span>
                ) : (
                    popularAchievements.map((ach) => (
                        <Achievement key={ach.apiname} achievement={ach} />
                    ))
                )}
            </div>
        </section>
    );
}
