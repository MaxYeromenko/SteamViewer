import classes from "./_Profile.module.scss";
import { useContext } from "react";
import { UserContext } from "../../pages/utils";
import Button from "../../components/Button/Button";
import Friend from "../../components/Friend/Friend";
import { Link, useNavigate } from "react-router-dom";
import { getUserStatus, grtFullTimeString } from "../utils";

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }
    const userStatus = getUserStatus(user.onlineStatus);

    return (
        <section className={classes.profilePage}>
            <div className={classes.profileHeader}>
                <img
                    className={classes.avatar}
                    src={user.avatar}
                    alt="avatar"
                />
                <div className={classes.profileInfo}>
                    <div className={classes.textInfo}>
                        <h1>
                            {user.displayName}&nbsp;
                            {user.country && (
                                <img
                                    className={classes.flag}
                                    src={`https://community.akamai.steamstatic.com/public/images/countryflags/${user.country.toLowerCase()}.gif`}
                                    alt="flag"
                                    title={user.country}
                                    loading="lazy"
                                />
                            )}
                            &nbsp;
                            {user.level && <span>({user.level} level)</span>}
                        </h1>
                        {user.realName && (
                            <span>Real name: ${user.realName}</span>
                        )}
                        <span>Status: {userStatus}</span>
                        <span>ID: {user.steamid}</span>
                    </div>
                    <div className={classes.textInfo}>
                        <span>
                            Last log off: {grtFullTimeString(user.lastlogoff)}
                        </span>
                        {user.timeCreated && (
                            <span>
                                Registered:{" "}
                                {grtFullTimeString(user.timeCreated)}
                            </span>
                        )}
                    </div>
                </div>
                <div className={classes.profileInfo}>
                    <a
                        href={user.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1}
                    >
                        <Button>View on Steam &#8599;</Button>
                    </a>
                    <Button
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        Log out
                    </Button>
                </div>
            </div>
            <hr />
            <h2>
                <Link to="/friends">Friends ({user.friends.length})</Link>
            </h2>
            <div className={classes.friendsSection}>
                {user.friends.slice(0, 8).map((friend) => (
                    <Friend key={friend.steamid} {...friend} />
                ))}
            </div>
        </section>
    );
}
