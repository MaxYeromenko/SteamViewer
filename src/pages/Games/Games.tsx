import classes from "./_Games.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../pages/utils";
import InputText from "../../components/InputText/InputText";
import Game from "../../components/Game/Game";
import Button from "../../components/Button/Button";

export default function Games() {
    const [searchString, setSearchString] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const { user } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    if (user.games.length === 0) {
        return <div>You have no games to display!</div>;
    }

    const filteredGames = user.games.filter((game) =>
        game.name.toLowerCase().includes(searchString.toLowerCase())
    );

    const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentGames = filteredGames.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <section className={classes.gamesPage}>
            <div className={classes.searchString}>
                <InputText
                    type="text"
                    placeholder="Enter the name of the game..."
                    value={searchString}
                    onChange={(e) => {
                        setSearchString(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {totalPages > 1 && (
                <div className={classes.pagination}>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        <i className="fa-solid fa-arrow-left" />
                    </Button>
                    <span>
                        {currentPage} / {totalPages}
                    </span>
                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        <i className="fa-solid fa-arrow-right" />
                    </Button>
                </div>
            )}

            <div className={classes.gameList}>
                {filteredGames.length === 0 ? (
                    <span>No matches!</span>
                ) : (
                    currentGames.map((game) => (
                        <Game key={game.appid} game={game} />
                    ))
                )}
            </div>
        </section>
    );
}
