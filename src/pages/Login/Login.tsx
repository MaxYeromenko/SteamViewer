import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./_Login.module.scss";
import { useContext, useEffect } from "react";
import { UserContext } from "../../pages/utils";

export default function Login() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);

    return (
        <section className={classes.loginPage}>
            <h1>Log in with your steam account to use the functionality</h1>
            <a href="/api/auth/steam/index">
                <Button>Log in with Steam</Button>
            </a>
        </section>
    );
}
