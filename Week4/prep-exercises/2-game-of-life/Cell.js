/**
 * @typedef {Object} GridCell
 * @property {number} x
 * @property {number} y
 * @property {boolean} alive
 * @property {boolean} [nextAlive]
 */

export default class Cell {
  static size = 10; // Default size if not overridden

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = Math.random() > 0.5;
    this.nextAlive = false;
    this.lifeTime = this.alive ? 1 : 0; // ✅ Track how long the cell has been alive
  }

  draw(context) {
    if (!Cell.size) {
      throw new Error('Cell.size is not defined.');
    }

    // Draw cell background
    context.fillStyle = '#303030';
    context.fillRect(
      this.x * Cell.size,
      this.y * Cell.size,
      Cell.size,
      Cell.size
    );

    if (this.alive) {
      // Set opacity based on lifeTime
      let opacity = 0.25;
      if (this.lifeTime === 2) opacity = 0.5;
      else if (this.lifeTime === 3) opacity = 0.75;
      else if (this.lifeTime >= 4) opacity = 1;

      // Draw inner part for living cell with rgba color
      context.fillStyle = `rgba(24, 215, 236, ${opacity})`;
      context.fillRect(
        this.x * Cell.size + 1,
        this.y * Cell.size + 1,
        Cell.size - 2,
        Cell.size - 2
      );
    }
  }

  liveAndLetDie(aliveNeighbors) {
    if (this.alive) {
      if (aliveNeighbors === 2 || aliveNeighbors === 3) {
        this.nextAlive = true;
        this.lifeTime += 1; // ✅ Survives, increment lifeTime
      } else {
        this.nextAlive = false;
        this.lifeTime = 0; // ✅ Dies, reset lifeTime
      }
    } else {
      if (aliveNeighbors === 3) {
        this.nextAlive = true;
        this.lifeTime = 1; // ✅ Reborn, start at 1
      } else {
        this.nextAlive = false;
        // ✅ Remains dead, no change to lifeTime needed (assumed 0)
      }
    }
  }

  update() {
    this.alive = this.nextAlive;
  }
}
