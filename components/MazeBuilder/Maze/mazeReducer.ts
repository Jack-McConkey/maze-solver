import {Reducer} from "react";
import generateMaze from "./generateMaze";
import {MazeInterface} from "../MazeBuilder";

export interface MazeActions {
    type: string;
    position?: [number, number];
    size?: {cols: number; rows: number};
    path?: number[][];
}

export const mazeReducer: Reducer<MazeInterface, MazeActions> = (state, actions) => {
    const [x, y] = actions.position ?? [0, 0];
    const newMaze = {
        ...state,
        layout: state.layout.map((row, i) => {
            return [...row];
        }),
        start: {...state.start},
        end: {...state.end},
    };

    switch (actions.type) {
        case "wall": {
            if (newMaze.layout[y][x] === "wall") {
                newMaze.layout[y][x] = "blank";
                return newMaze;
            }
            newMaze.layout[y][x] = "wall";
            return newMaze;
        }
        case "start": {
            const {x: startX, y: startY} = newMaze.start;
            newMaze.start.x = x;
            newMaze.start.y = y;
            if (startX === null || startY === null) {
                newMaze.layout[y][x] = "start";
                return newMaze;
            }

            newMaze.layout[startY][startX] = "blank";
            newMaze.layout[y][x] = "start";
            return newMaze;
        }
        case "end": {
            const {x: endX, y: endY} = newMaze.end;
            newMaze.end.x = x;
            newMaze.end.y = y;
            if (endX === null || endY === null) {
                newMaze.layout[y][x] = "end";
                return newMaze;
            }
            newMaze.layout[endY][endX] = "blank";
            newMaze.layout[y][x] = "end";
            return newMaze;
        }

        case "search": {
            if (!actions.path) return state;
            for (let i = 1; i < actions.path.length - 1; i++) {
                const [y, x] = actions.path[i];
                if (i !== actions.path.length - 2) {
                    newMaze.layout[y][x] = `search-${i}`;
                    continue;
                } else {
                    const [finalY, finalX] = actions.path[i + 1];
                    if (newMaze.layout[finalY][finalX] === "end") {
                        newMaze.layout[y][x] = `search-${i}-last`;
                        break;
                    }
                    newMaze.layout[y][x] = `search-${i}`;
                    newMaze.layout[finalY][finalX] = `search-${i + 1}-last`;
                }
            }
            return newMaze;
        }
        case "shortest": {
            if (!actions.path) return state;
            for (let i = 1; i < actions.path.length - 1; i++) {
                const [y, x] = actions.path[i];
                newMaze.layout[y][x] = `shortest-${i}`;
            }
            return newMaze;
        }

        case "generateMaze": {
            const maze = generateMaze(23, 23, {x: 0, y: 0});
            newMaze.layout = maze;
            newMaze.start.x = 0;
            newMaze.start.y = 0;
            newMaze.end.x = null;
            newMaze.end.y = null;
            return newMaze;
        }

        case "clear": {
            for (let i = 0; i < newMaze.layout.length; i++) {
                for (let j = 0; j < newMaze.layout[0].length; j++) {
                    if (
                        newMaze.layout[i][j] === "wall" ||
                        newMaze.layout[i][j].includes("search") ||
                        newMaze.layout[i][j].includes("shortest")
                    )
                        newMaze.layout[i][j] = "blank";
                }
            }
            return newMaze;
        }

        default:
            return state;
    }
};

export default mazeReducer;
