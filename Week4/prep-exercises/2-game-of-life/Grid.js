import Cell from './Cell.js';

export default class Grid {
  rows = [];

  constructor(numRows, numColumns, cellSize) {
    if (!cellSize || typeof cellSize !== 'number' || cellSize <= 0) {
      throw new Error('Invalid cell size provided to Grid.');
    }

    this.numRows = numRows;
    this.numColumns = numColumns;

    // Set static size for Cell class
    Cell.size = cellSize;

    // Create the grid as a two-dimensional array (array of arrays)
    for (let y = 0; y < numRows; y++) {
      const row = [];
      for (let x = 0; x < numColumns; x++) {
        row.push(new Cell(x, y));
      }
      this.rows.push(row);
    }
  }

  isAlive(x, y) {
    // Out-of-bounds cells are considered dead
    if (x < 0 || x >= this.numColumns || y < 0 || y >= this.numRows) {
      return 0;
    }

    const cell = this.rows[y][x];
    return cell.alive ? 1 : 0;
  }

  countLivingNeighbors(cell) {
    const { x, y } = cell;
    return (
      this.isAlive(x - 1, y - 1) +
      this.isAlive(x, y - 1) +
      this.isAlive(x + 1, y - 1) +
      this.isAlive(x - 1, y) +
      this.isAlive(x + 1, y) +
      this.isAlive(x - 1, y + 1) +
      this.isAlive(x, y + 1) +
      this.isAlive(x + 1, y + 1)
    );
  }

  forEachCell(callback) {
    this.rows.forEach((row) => {
      row.forEach((cell) => callback(cell));
    });
  }

  update() {
    this.forEachCell((cell) => {
      const aliveNeighbors = this.countLivingNeighbors(cell);
      cell.liveAndLetDie(aliveNeighbors);
    });

    this.forEachCell((cell) => cell.update());
  }

  render(context) {
    this.forEachCell((cell) => cell.draw(context));
  }
}
