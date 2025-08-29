import classes from "./_Games.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import InputText from "../../components/InputText/InputText";
import Game from "../../components/Game/Game";

export default function Games() {
    const [searchString, setSearchString] = useState<string>("");
    const { user } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    if (user.games.length === 0) {
        return <div>You have no games to display!</div>;
    }

    return (
        <section className={classes.gamesPage}>
            <div className={classes.searchString}>
                <InputText
                    type="text"
                    placeholder="Enter the name of the game..."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
            <div className={classes.gameList}>
                {user.games
                    .filter((element) =>
                        element.name
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                    )
                    .map((game) => (
                        <Game key={game.appid} {...game} />
                    ))}
            </div>
        </section>
    );
}
