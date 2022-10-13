import styles from "./MazeNode.module.css";

interface MazeNodeProps {
    id: [number, number];
    nodeType: string;
    handleClick: (id: [number, number]) => void;
    delay: number;
    lastNode: (() => void) | null;
}

export default function MazeNode({id, nodeType, handleClick, delay, lastNode}: MazeNodeProps) {
    return (
        <div
            onAnimationStart={() => {
                if (!lastNode) return;
                lastNode();
            }}
            style={{animationDelay: `${delay}ms`}}
            draggable={"false"}
            onMouseDown={e => {
                handleClick(id);
            }}
            onMouseEnter={e => {
                if (e.buttons === 1) handleClick(id);
            }}
            className={[styles.node, styles[nodeType]].join(" ")}>
            {nodeType === "start" || nodeType === "end" ? nodeType[0].toUpperCase() : ""}
        </div>
    );
}
