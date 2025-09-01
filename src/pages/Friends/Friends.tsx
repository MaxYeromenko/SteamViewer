import { useContext, useState } from "react";
import classes from "./_Friends.module.scss";
import { UserContext } from "../../pages/utils";
import Friend from "../../components/Friend/Friend";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";

export default function Friends() {
    const [searchString, setSearchString] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 15;

    const { user } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    if (user.friends.length === 0) {
        return <div>You have no friends to display!</div>;
    }

    const filteredFriends = user.friends.filter((element) =>
        element.displayName
            .toLowerCase()
            .includes(searchString.toLowerCase().trim())
    );

    const totalPages = Math.ceil(filteredFriends.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFriends = filteredFriends.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <section className={classes.friendsPage}>
            <div className={classes.searchString}>
                <InputText
                    type="text"
                    placeholder="Enter your friend's name..."
                    value={searchString}
                    onChange={(e) => {
                        setSearchString(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {filteredFriends.length > itemsPerPage && (
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

            <div className={classes.friendList}>
                {filteredFriends.length === 0 ? (
                    <span>No matches!</span>
                ) : (
                    currentFriends.map((friend) => (
                        <Friend key={friend.steamid} {...friend} />
                    ))
                )}
            </div>
        </section>
    );
}
