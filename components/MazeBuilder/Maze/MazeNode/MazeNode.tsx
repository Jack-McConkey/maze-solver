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
            style={delay > 0 ? {animationDelay: `${delay}ms`} : {}}
            onPointerDown={e => {
                if (e.pointerType === "mouse") return handleClick(id);
                e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerEnter={e => {
                if (e.pointerType === "mouse" && e.buttons !== 1) return;
                if (e.pointerType === "mouse" && e.buttons === 1) return handleClick(id);
                if (e.pointerType === "touch") {
                    handleClick(id);
                }
            }}
            className={[styles.node, styles[nodeType]].join(" ")}>
            {nodeType === "start" || nodeType === "end" ? nodeType[0].toUpperCase() : ""}
        </div>
    );
}
