import type { SelectHTMLAttributes } from "react";
import classes from "./_SelectSingle.module.scss";

export type InputTextProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectSingle({ ...props }: InputTextProps) {
    return <select className={classes.select} {...props} />;
}
