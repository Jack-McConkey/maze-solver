import styles from "./Button.module.css";

export default function Button({
    handleClick,
    btnText,
    btnStyle,
}: {
    handleClick: () => void;
    btnText: string;
    btnStyle: string;
}) {
    return (
        <button className={[styles.btn, styles[btnStyle]].join(" ")} onClick={handleClick}>
            {btnText}
        </button>
    );
}
