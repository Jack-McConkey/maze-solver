## Maze Solver

I built this app as a portfolio project, I wanted to practice some BFS and DFS so that was my inspiration for making this. This app allows the user to manually create a maze by adding walls or generate a maze via the generate button. Once the user is happy with the maze they can activate the search, the search will go from the start point until it finds the end point or until it cannot go any further, this process uses BFS and is visualized using animations. Once the end point has been found another animation will start which shows the shortest path from start to end.

## Main Technologies / Packages

-   React
-   Typescript
-   Next JS

## Hightlights

This project was just a small one but it really improved my understanding of recursion and in general it was just fun to make.

## Challenges

The main challenge in this project was the maze generation, I went with DFS recursive backtracking as my approach for the maze generation and tried following the pseudo code steps from Wikipedia.

Unfortunately, I initially misunderstood the steps, I was looking at the adjacent cells and setting them to seen / removing the wall. After a little bit of frustration, I realized that I actually needed to be looking 2 cells over and "breaking" the wall down between the current and target cell if it was not visited. Once I corrected this small mistake the rest was straight forward and fun to implement.
