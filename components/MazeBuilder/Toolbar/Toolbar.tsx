import styles from "./Toolbar.module.css";
import Button from "../Button/Button";

interface ToolbarProps {
    selectTool: (toolType: string) => void;
    currentTool: string;
    searchMaze: () => void;
    generateMaze: () => void;
    clearMaze: () => void;
}

export default function Toolbar({
    selectTool,
    currentTool,
    searchMaze,
    generateMaze,
    clearMaze,
}: ToolbarProps) {
    return (
        <div className={styles.container}>
            <div className={styles["secondary-container"]}>
                <Button
                    btnText="Wall"
                    handleClick={() => selectTool("wall")}
                    btnStyle={currentTool === "wall" ? "selected" : "accent"}
                />
                <Button
                    btnText="Start"
                    handleClick={() => selectTool("start")}
                    btnStyle={currentTool === "start" ? "selected" : "accent"}
                />
                <Button
                    btnText="End"
                    handleClick={() => selectTool("end")}
                    btnStyle={currentTool === "end" ? "selected" : "accent"}
                />
            </div>
            <div className={styles["secondary-container"]}>
                <Button btnText="Generate Maze" handleClick={generateMaze} btnStyle={"generate"} />
                <Button btnText="Search Maze" handleClick={searchMaze} btnStyle={"search"} />
                <Button btnText="Clear Maze" handleClick={clearMaze} btnStyle={"clear"} />
            </div>
        </div>
    );
}
