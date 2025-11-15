# BFS Maze Runner 🎯

A visual maze solver that uses Breadth-First Search (BFS) algorithm to find the shortest path through randomly generated mazes.

## What is this?

Ever wondered how pathfinding algorithms work? This interactive visualization shows you exactly how BFS explores a maze step-by-step to find the shortest route from start to finish.

## Features

- **Random Maze Generation** - Creates unique mazes using recursive backtracking
- **BFS Visualization** - Watch the algorithm explore the maze in real-time
- **Shortest Path Guarantee** - BFS always finds the shortest possible path
- **Adjustable Size** - Generate mazes from 10x10 to 30x30 cells
- **Clean UI** - Minimalist black, white, and yellow design

## How to Use

1. Open `index.html` in your browser
2. Click **Generate Maze** to create a new random maze
3. Click **Solve with BFS** to watch the algorithm find the path
4. Use the size slider to adjust maze complexity
5. Click **Reset** to clear the solution and try again

## What You'll See

- **Black** = Walls (can't pass through)
- **White** = Open paths
- **Gray** = Cells explored by the algorithm
- **Yellow** = The shortest path from start to finish

## How BFS Works

BFS (Breadth-First Search) explores the maze level by level, like ripples in water:

1. Start at the beginning
2. Check all neighbors one step away
3. Then check all neighbors two steps away
4. Continue until reaching the end

This guarantees finding the shortest path because it explores all shorter paths before longer ones.

## Tech Stack

- Pure JavaScript (no frameworks)
- HTML5 Canvas for rendering
- CSS3 for styling

## Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/bfs-maze-runner.git

# Navigate to the directory
cd bfs-maze-runner

# Open in browser (or use any local server)
open index.html
```

Or use a simple HTTP server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## License

MIT - Feel free to use this for learning or your own projects!

---

Made with ☕ and curiosity about algorithms
