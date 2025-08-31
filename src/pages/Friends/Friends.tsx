import { useContext, useState } from "react";
import classes from "./_Friends.module.scss";
import { UserContext } from "../../pages/utils";
import Friend from "../../components/Friend/Friend";
import InputText from "../../components/InputText/InputText";

export default function Friends() {
    const [searchString, setSearchString] = useState<string>("");
    const { user } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    if (user.friends.length === 0) {
        return <div>You have no friends to display!</div>;
    }

    function checkResultsNumber() {
        const friends = user!.friends.filter((element) =>
            element.displayName
                .toLowerCase()
                .includes(searchString.toLowerCase())
        );

        if (friends.length === 0) {
            return <span>No matches!</span>;
        } else
            return friends.map((friend) => (
                <Friend key={friend.steamid} {...friend} />
            ));
    }

    return (
        <section className={classes.friendsPage}>
            <div className={classes.searchString}>
                <InputText
                    type="text"
                    placeholder="Enter your friend's name..."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
            <div className={classes.friendList}>{checkResultsNumber()}</div>
        </section>
    );
}
