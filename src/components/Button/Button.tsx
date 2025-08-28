import type { PropsWithChildren } from "react";
import classes from "./_Button.module.scss";

export default function Button({ children }: PropsWithChildren) {
    return <button className={classes.button}>{children}</button>;
}
