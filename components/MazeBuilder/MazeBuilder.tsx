import Maze from "./Maze/Maze";
import Toolbar from "./Toolbar/Toolbar";
import {useReducer, useState} from "react";
import mazeReducer from "./Maze/mazeReducer";
import searchMaze from "./Maze/searchMaze";
import styles from "./MazeBuilder.module.css";

export interface MazeInterface {
    start: {x: number | null; y: number | null};
    end: {x: number | null; y: number | null};
    layout: string[][];
}

const initialMaze = () => {
    const newArr = [];
    for (let i = 0; i < 23; i++) {
        newArr.push(new Array(23).fill("blank"));
    }
    const maze: MazeInterface = {
        start: {x: null, y: null},
        end: {x: null, y: null},
        layout: newArr,
    };
    return maze;
};

export default function MazeBuilder() {
    const [currentMaze, dispatchCurrentMaze] = useReducer(mazeReducer, initialMaze());
    const [shortestPath, setShortestPath] = useState<number[][]>([]);
    const [currentTool, setCurrentTool] = useState("wall");
    const updateTool = (toolType: string) => {
        setCurrentTool(toolType);
    };
    const searchHandler = () => {
        if (currentMaze.start.x === null || currentMaze.start.y === null) return;
        const start = {x: currentMaze.start.x, y: currentMaze.start.y};
        const path = searchMaze(currentMaze.layout, "end", start);
        if (!path) return;
        dispatchCurrentMaze({type: "search", path: path.path});
        setShortestPath(path.shortestPath);
    };

    return (
        <main className={styles.container}>
            <Toolbar
                currentTool={currentTool}
                selectTool={updateTool}
                searchMaze={searchHandler}
                clearMaze={() => dispatchCurrentMaze({type: "clear"})}
                generateMaze={() => dispatchCurrentMaze({type: "generateMaze"})}
            />
            <Maze
                nodeType={currentTool}
                shortestPath={shortestPath}
                currentMaze={currentMaze}
                dispatchCurrentMaze={dispatchCurrentMaze}
            />
        </main>
    );
}
