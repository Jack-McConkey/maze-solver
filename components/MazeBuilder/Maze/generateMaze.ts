function shuffle(arr: number[][]): number[][] {
    let currentIndex = arr.length;
    let randomIndex = 0;
    while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
}

export default function generateMaze(rows: number, cols: number, start: {x: number; y: number}) {
    const maze: string[][] = [];
    for (let i = 0; i < cols; i++) {
        maze.push([]);
        for (let j = 0; j < rows; j++) {
            maze[i].push("wall");
        }
    }
    const seen: boolean[][] = [];
    const path: number[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    function dig(
        maze: string[][],
        curr: {x: number; y: number},
        seen: boolean[][],
        path: number[][]
    ) {
        if (curr.y < 0 || curr.y > maze[0].length - 1 || curr.x < 0 || curr.x > maze[0].length - 1)
            return;
        seen[curr.y][curr.x] = true;
        maze[curr.y][curr.x] = "blank";
        const canVisit: number[][] = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];
        const shuffled = shuffle(canVisit);
        while (shuffled.length !== 0) {
            const [x, y] = canVisit.pop()!;
            const nodeX = curr.x + x * 2;
            const nodeY = curr.y + y * 2;
            if (nodeX < 0 || nodeX > maze[0].length - 1 || nodeY < 0 || nodeY > maze.length - 1) {
                continue;
            }

            if (!seen[nodeY][nodeX]) {
                maze[curr.y + y][curr.x + x] = "blank";
                seen[curr.y + y][curr.x + x] = true;
                dig(maze, {x: nodeX, y: nodeY}, seen, path);
            }
        }
    }

    dig(maze, {x: 0, y: 0}, seen, path);
    maze[start.y][start.x] = "start";
    return maze;
}
