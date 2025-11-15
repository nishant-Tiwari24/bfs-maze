class MazeRunner {
    constructor(size) {
        this.size = size;
        this.cellSize = 20;
        this.canvas = document.getElementById('mazeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.size * this.cellSize;
        this.canvas.height = this.size * this.cellSize;
        
        this.maze = [];
        this.start = { x: 0, y: 0 };
        this.end = { x: size - 1, y: size - 1 };
        this.visited = [];
        this.path = [];
        
        this.colors = {
            wall: '#000000',
            path: '#ffffff',
            start: '#ffff00',
            end: '#ffff00',
            visited: '#cccccc',
            solution: '#ffff00'
        };
    }

    generateMaze() {
        // Initialize maze with walls
        this.maze = Array(this.size).fill().map(() => Array(this.size).fill(1));
        
        // Recursive backtracking maze generation
        const stack = [];
        const startX = 0;
        const startY = 0;
        this.maze[startY][startX] = 0;
        stack.push([startX, startY]);
        
        const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];
        
        while (stack.length > 0) {
            const [x, y] = stack[stack.length - 1];
            const neighbors = [];
            
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size && this.maze[ny][nx] === 1) {
                    neighbors.push([nx, ny, x + dx / 2, y + dy / 2]);
                }
            }
            
            if (neighbors.length > 0) {
                const [nx, ny, wx, wy] = neighbors[Math.floor(Math.random() * neighbors.length)];
                this.maze[ny][nx] = 0;
                this.maze[wy][wx] = 0;
                stack.push([nx, ny]);
            } else {
                stack.pop();
            }
        }
        
        // Ensure start and end are open
        this.maze[this.start.y][this.start.x] = 0;
        this.maze[this.end.y][this.end.x] = 0;
        
        this.visited = [];
        this.path = [];
        this.draw();
    }

    async solveBFS() {
        const queue = [[this.start.x, this.start.y, []]];
        const visited = new Set();
        visited.add(`${this.start.x},${this.start.y}`);
        
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        let stepsCount = 0;
        
        while (queue.length > 0) {
            const [x, y, path] = queue.shift();
            const currentPath = [...path, [x, y]];
            
            this.visited.push([x, y]);
            stepsCount++;
            document.getElementById('stepsCount').textContent = stepsCount;
            
            if (x === this.end.x && y === this.end.y) {
                this.path = currentPath;
                document.getElementById('pathLength').textContent = this.path.length;
                this.draw();
                await this.sleep(500);
                return true;
            }
            
            this.draw();
            await this.sleep(10);
            
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                const key = `${nx},${ny}`;
                
                if (nx >= 0 && nx < this.size && 
                    ny >= 0 && ny < this.size && 
                    this.maze[ny][nx] === 0 && 
                    !visited.has(key)) {
                    visited.add(key);
                    queue.push([nx, ny, currentPath]);
                }
            }
        }
        
        return false;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw maze
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.maze[y][x] === 1) {
                    this.ctx.fillStyle = this.colors.wall;
                } else {
                    this.ctx.fillStyle = this.colors.path;
                }
                this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
        
        // Draw visited cells
        for (const [x, y] of this.visited) {
            this.ctx.fillStyle = this.colors.visited;
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            this.ctx.globalAlpha = 1.0;
        }
        
        // Draw start
        this.ctx.fillStyle = this.colors.start;
        this.ctx.fillRect(this.start.x * this.cellSize, this.start.y * this.cellSize, this.cellSize, this.cellSize);
        
        // Draw end
        this.ctx.fillStyle = this.colors.end;
        this.ctx.fillRect(this.end.x * this.cellSize, this.end.y * this.cellSize, this.cellSize, this.cellSize);
        
        // Draw solution path (on top of everything)
        if (this.path.length > 0) {
            // Draw path cells with bright yellow fill
            for (const [x, y] of this.path) {
                this.ctx.fillStyle = this.colors.solution;
                this.ctx.fillRect(x * this.cellSize + 3, y * this.cellSize + 3, this.cellSize - 6, this.cellSize - 6);
            }
        }
        
        // Draw grid
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.size; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.cellSize);
            this.ctx.stroke();
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset() {
        this.visited = [];
        this.path = [];
        document.getElementById('stepsCount').textContent = '0';
        document.getElementById('pathLength').textContent = '0';
        this.draw();
    }
}

// Initialize
let mazeRunner = new MazeRunner(20);
mazeRunner.generateMaze();

// Event listeners
document.getElementById('generateBtn').addEventListener('click', () => {
    const size = parseInt(document.getElementById('sizeSlider').value);
    mazeRunner = new MazeRunner(size);
    mazeRunner.generateMaze();
});

document.getElementById('solveBtn').addEventListener('click', () => {
    mazeRunner.reset();
    mazeRunner.solveBFS();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    mazeRunner.reset();
});

document.getElementById('sizeSlider').addEventListener('input', (e) => {
    document.getElementById('sizeValue').textContent = e.target.value;
});
