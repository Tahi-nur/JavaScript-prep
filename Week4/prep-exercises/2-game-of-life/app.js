import Game from './Game.js';

function main() {
  const canvas = document.getElementById('canvas');

  // Check if the canvas element exists and is actually a <canvas>
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Canvas element not found or is not a valid <canvas>');
  }

  // Create the game "engine"
  const game = new Game(canvas);

  // Start the game
  game.start();
}

// Start the game when the window is fully loaded
window.addEventListener('load', main);
