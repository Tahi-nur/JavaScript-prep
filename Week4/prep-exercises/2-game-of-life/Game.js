import Grid from './Grid.js';
import Cell from './Cell.js'; // Required to set Cell.size

const CELL_SIZE = 10;
const NUM_COLUMNS = 75;
const NUM_ROWS = 40;

export default class Game {
  constructor(canvas) {
    // Resize the canvas to accommodate the desired number of cell rows and columns
    canvas.height = NUM_ROWS * CELL_SIZE;
    canvas.width = NUM_COLUMNS * CELL_SIZE;

    // Obtain a 2D context to draw on the canvas
    this.context = canvas.getContext('2d');
    if (!this.context || !(this.context instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D drawing context from canvas.');
    }

    // Set Cell size globally for use in rendering
    Cell.size = CELL_SIZE;

    // Initialize the grid
    this.grid = new Grid(NUM_ROWS, NUM_COLUMNS, CELL_SIZE);
  }

  gameLoop() {
    this.grid.render(this.context);
    this.grid.update();

    setTimeout(() => {
      window.requestAnimationFrame(() => this.gameLoop());
    }, 200);
  }

  start() {
    window.requestAnimationFrame(() => this.gameLoop());
  }
}
