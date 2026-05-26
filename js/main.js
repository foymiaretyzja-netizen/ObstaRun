import { GRID_SIZE, GRAVITY } from './constants.js';
import { platforms, healingOrbs, resetState } from './state.js';
import { HealingOrb } from './entities/HealingOrb.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Example setup
function initGame() {
    resetState();
    // Spawn initial entities
    healingOrbs.push(new HealingOrb(200, 200));
}

function gameLoop() {
    // 1. Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update logic
    for (let orb of healingOrbs) {
        orb.update();
    }

    // 3. Draw logic (passing ctx to the draw function)
    for (let orb of healingOrbs) {
        orb.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

// Keep canvas full screen if window resizes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start
initGame();
gameLoop();
