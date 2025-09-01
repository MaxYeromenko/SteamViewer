import { grtFullTimeString } from "../../pages/utils";
import type { Achievement } from "../../ts/types";
import classes from "./_Achievement.module.scss";

export default function Achievement({
    achievement,
}: {
    achievement: Achievement;
}) {
    return (
        <div className={classes.achievementContainer}>
            <div className={classes.iconName}>
                <div className={classes.iconContainer}>
                    <img
                        src={
                            achievement.achieved
                                ? achievement.icon
                                : achievement.icongray
                        }
                        className={classes.icon}
                        alt="icon"
                        loading="lazy"
                    />
                </div>
                <h3 className={classes.name}>{achievement.name}</h3>
                <span>
                    {achievement.achieved
                        ? grtFullTimeString(achievement.unlocktime)
                        : "Not achieved"}
                </span>
            </div>
            <div className={classes.textInfo}>
                <div className={classes.infoColumn}>
                    <span>{achievement.description}</span>
                </div>
            </div>
        </div>
    );
}
