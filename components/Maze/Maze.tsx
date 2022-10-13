import {useReducer, useState} from "react";
import MazeNode from "./MazeNode/MazeNode";
import styles from "./Maze.module.css";
import mazeReducer from "./mazeReducer";
import searchMaze from "./searchMaze";

export interface MazeInterface {
    start: {x: number | null; y: number | null};
    end: {x: number | null; y: number | null};
    layout: string[][];
}

const initialMaze = () => {
    const newArr = [];
    for (let i = 0; i < 25; i++) {
        newArr.push(new Array(25).fill("blank"));
    }
    const maze: MazeInterface = {
        start: {x: null, y: null},
        end: {x: null, y: null},
        layout: newArr,
    };
    return maze;
};

export default function Maze({nodeType, actionType}: {nodeType: string; actionType: string}) {
    const [currentMaze, dispatchCurrentMaze] = useReducer(mazeReducer, initialMaze());
    const [shortestPath, setShortestPath] = useState<number[][]>([]);
    const clickHandler = () => {
        if (currentMaze.start.x === null || currentMaze.start.y === null) return;
        const start = {x: currentMaze.start.x, y: currentMaze.start.y};
        const path = searchMaze(currentMaze.layout, "end", start);
        if (!path) return;
        dispatchCurrentMaze({action: "add", type: "search", path: path.path});
        setShortestPath(path.shortestPath);
    };

    return (
        <div className={styles["flex-container"]}>
            <div className={styles["maze-btns-container"]}>
                <button
                    className={styles["maze-btn"]}
                    onClick={() => dispatchCurrentMaze({action: "add", type: "generateMaze"})}>
                    Generate Maze
                </button>
                <button className={styles["maze-btn"]} onClick={clickHandler}>
                    Search
                </button>
                <button
                    className={styles["maze-btn"]}
                    onClick={() => dispatchCurrentMaze({action: "clear", type: "clear"})}>
                    Clear
                </button>
            </div>
            <div draggable={"false"} className={styles["maze-container"]}>
                {currentMaze.layout.map((nodeArr, i) => {
                    return (
                        <div draggable={"false"} className={[styles["maze-row"]].join(" ")} key={i}>
                            {nodeArr.map((node, j) => {
                                let delayedNode = node.includes("-") ? node.split("-") : null;
                                const id: [number, number] = [i, j];
                                return (
                                    <MazeNode
                                        key={j}
                                        id={id}
                                        lastNode={
                                            delayedNode?.[2]
                                                ? () =>
                                                      dispatchCurrentMaze({
                                                          action: "add",
                                                          type: "shortest",
                                                          path: shortestPath,
                                                      })
                                                : null
                                        }
                                        nodeType={delayedNode ? delayedNode[0] : node}
                                        delay={delayedNode ? +delayedNode[1] * 20 : 0}
                                        handleClick={() =>
                                            dispatchCurrentMaze({
                                                type: nodeType,
                                                action: actionType,
                                                position: [j, i],
                                            })
                                        }
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
