import { Link } from "react-router-dom";
import classes from "./_Header.module.scss";

export default function Header() {
    return (
        <header className={classes.header}>
            <nav>
                <div className={classes.logoContainer}>
                    <Link to="/">SteamViewer</Link>
                </div>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/games">Games</Link>
                    </li>
                    <li>
                        <Link to="/inventory">Inventory</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
