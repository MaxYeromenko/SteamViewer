import { Link } from "react-router-dom";
import classes from "./_Header.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className={classes.header}>
            <nav>
                <div className={classes.logoContainer}>
                    <Link to="/">SteamViewer</Link>
                </div>
                <ul>
                    {!user && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {user && (
                        <>
                            <li>
                                <Link to="/profile" className={classes.profileLink}>
                                    <img src={user.avatar} alt="avatar" />
                                    {user.displayName}
                                </Link>
                            </li>
                            <li>
                                <Link to="/games">Games</Link>
                            </li>
                            <li>
                                <Link to="/inventory">Inventory</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
