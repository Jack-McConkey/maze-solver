const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

export default function searchMaze(maze: string[][], end: string, start: {x: number; y: number}) {
    const path: number[][] = [];
    const shortestPath: number[][] = [];
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }
    if (start.x === null || start.y === null) return;
    // DFS({x: start.x, y: start.y}, seen, maze, path, shortestPath);
    const prev = BFS({x: start.x, y: start.y}, seen, maze, path);
    if (prev) {
        let {x, y} = prev.end;
        shortestPath.push([prev.end.y, prev.end.x]);
        while (prev.prev[y][x]) {
            const curr = prev.prev[y][x];
            x = curr.x;
            y = curr.y;
            shortestPath.push([y, x]);
        }
        shortestPath.reverse();
    }
    return {path: path, shortestPath: shortestPath};
}

function BFS(start: {x: number; y: number}, seen: boolean[][], maze: string[][], path: number[][]) {
    const queue = [{x: start.x, y: start.y}];
    const prev = [];
    for (let i = 0; i < maze.length; i++) {
        prev.push(new Array(maze[0].length).fill(null));
    }

    while (queue.length) {
        const coords = queue.shift();
        if (!coords) return;
        path.push([coords.y, coords.x]);
        seen[coords.y][coords.x] = true;
        if (maze[coords.y][coords.x] === "end")
            return {prev: prev, end: {x: coords.x, y: coords.y}};
        for (let i = 0; i < dir.length; i++) {
            let [x, y] = dir[i];
            x += coords.x;
            y += coords.y;
            if (
                y < 0 ||
                y > maze.length - 1 ||
                x < 0 ||
                x > maze[0].length - 1 ||
                maze[y][x] === "wall" ||
                seen[y][x] === true
            )
                continue;
            seen[y][x] = true;
            queue.push({x: x, y: y});
            prev[y][x] = {x: coords.x, y: coords.y};
        }
    }
}

function DFS(
    curr: {x: number; y: number},
    seen: boolean[][],
    maze: string[][],
    path: number[][],
    shortestPath: number[][]
) {
    if (curr.x < 0 || curr.x > maze[0].length - 1 || curr.y < 0 || curr.y > maze.length - 1)
        return false;
    if (seen[curr.y][curr.x]) return false;
    if (maze[curr.y][curr.x] === "wall") return false;
    if (maze[curr.y][curr.x] === "end") return true;
    seen[curr.y][curr.x] = true;
    path.push([curr.y, curr.x]);
    shortestPath.push([curr.y, curr.x]);
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (DFS({x: curr.x + x, y: curr.y + y}, seen, maze, path, shortestPath)) {
            return true;
        }
    }
    shortestPath.pop();
}
