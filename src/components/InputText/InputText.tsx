import type { InputHTMLAttributes } from "react";
import classes from "./_InputText.module.scss";

export type InputTextProps = InputHTMLAttributes<HTMLInputElement>;

export default function InputText({ ...props }: InputTextProps) {
    return <input className={classes.input} {...props} />;
}
