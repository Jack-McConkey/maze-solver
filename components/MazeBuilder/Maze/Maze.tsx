import {Dispatch} from "react";
import MazeNode from "./MazeNode/MazeNode";
import styles from "./Maze.module.css";
import {MazeActions} from "./mazeReducer";
import {MazeInterface} from "../MazeBuilder";

interface MazeProps {
    nodeType: string;
    shortestPath: number[][];
    currentMaze: MazeInterface;
    dispatchCurrentMaze: Dispatch<MazeActions>;
}

export default function Maze({
    nodeType,
    shortestPath,
    currentMaze,
    dispatchCurrentMaze,
}: MazeProps) {
    const maze = currentMaze.layout.map((nodeArr, i) => {
        return (
            <div className={[styles["maze-row"]].join(" ")} key={i}>
                {nodeArr.map((node, j) => {
                    let delayedNode = node.includes("-") ? node.split("-") : null;
                    const id: [number, number] = [i, j];
                    let delay = 0;
                    if (delayedNode && delayedNode[0] === "shortest") delay = +delayedNode[1] * 30;
                    if (delayedNode && delayedNode[0] === "search") delay = +delayedNode[1] * 20;
                    return (
                        <MazeNode
                            key={j}
                            id={id}
                            lastNode={
                                delayedNode?.[2]
                                    ? () =>
                                          dispatchCurrentMaze({
                                              type: "shortest",
                                              path: shortestPath,
                                          })
                                    : null
                            }
                            nodeType={delayedNode ? delayedNode[0] : node}
                            delay={delay}
                            handleClick={() =>
                                dispatchCurrentMaze({
                                    type: nodeType,
                                    position: [j, i],
                                })
                            }
                        />
                    );
                })}
            </div>
        );
    });

    return (
        <div className={styles["flex-container"]}>
            <div className={styles["maze-container"]}>{maze}</div>
        </div>
    );
}
