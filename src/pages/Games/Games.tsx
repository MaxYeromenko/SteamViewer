import classes from "./_Games.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../pages/utils";
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

    function checkResultsNumber() {
        const games = user!.games.filter((element) =>
            element.name.toLowerCase().includes(searchString.toLowerCase())
        );

        if (games.length === 0) {
            return <span>No matches!</span>;
        } else return games.map((game) => <Game key={game.appid} {...game} />);
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
            <div className={classes.gameList}>{checkResultsNumber()}</div>
        </section>
    );
}
