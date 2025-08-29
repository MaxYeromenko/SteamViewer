import type { Friend } from "../../context/UserContext";
import { getUserStatus } from "../../pages/Profile/Profile";
import classes from "./_Friend.module.scss";

export default function Friend({
    steamid,
    displayName,
    avatar,
    profileUrl,
    onlineStatus,
}: Friend) {
    return (
        <div className={classes.friendContainer}>
            <div className={classes.avatar}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={classes.container}>
                <span className={classes.className}>{displayName}</span>
                <span className={classes.id}>ID: {steamid}</span>
            </div>
            <div className={classes.container}>
                <span className={classes.status}>
                    Status: {getUserStatus(onlineStatus)}
                </span>
                <a
                    className={classes.profileLink}
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Profile &#8599;
                </a>
            </div>
        </div>
    );
}
