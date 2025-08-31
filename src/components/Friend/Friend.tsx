import { getUserStatus } from "../../pages/Profile/Profile";
import classes from "./_Friend.module.scss";
import { type Friend } from "../../ts/types";

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
                    <span>Profile</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
            </div>
        </div>
    );
}
