import classes from "./_Profile.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import Friend from "../../components/Friend/Friend";
import { Link, useNavigate } from "react-router-dom";

export function getUserStatus(status: number) {
    switch (status) {
        case 0:
            return "Offline";
        case 1:
            return "Online";
        case 2:
            return "Busy";
        case 3:
            return "Away";
        case 4:
            return "Snooze";
        case 5:
            return "Looking to trade";
        case 6:
            return "Looking to play";
        default:
            return "Unknown";
    }
}

export function grtFullTimeString(timestamp: number): string {
    if (!timestamp) return "Unknown";

    const now = Date.now();
    const date = timestamp * 1000;
    const diffMs = now - date;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let result = "";

    if (years > 0) {
        result = `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
        result = `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
        result = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        result = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        result = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
        result = "Just now";
    }

    const dateString =
        new Date(date).toLocaleTimeString() +
        ", " +
        new Date(date).toLocaleDateString();

    return `${result} (${dateString})`;
}

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
                                />
                            )}
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
