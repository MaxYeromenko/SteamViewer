import type { PropsWithChildren } from "react";
import classes from "./_Main.module.scss";

export default function Main({ children }: PropsWithChildren) {
    return <main className={classes.main}>{children}</main>;
}
