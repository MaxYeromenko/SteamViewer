import Button from "../../components/Button/Button";
import classes from "./_Login.module.scss";

export default function Login() {
    return (
        <section className={classes.loginPage}>
            <h1>Log in with your steam account to use the functionality</h1>
            <a href="/api/auth/steam/index">
                <Button>Log in with Steam</Button>
            </a>
        </section>
    );
}
