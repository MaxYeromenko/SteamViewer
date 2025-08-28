import classes from "./_Footer.module.scss";

export default function Footer() {
    return (
        <footer className={classes.footer}>
            &copy; {new Date().getFullYear()}, Maksym Yeromenko
        </footer>
    );
}
