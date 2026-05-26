// js/main.js
import { GRID_SIZE, GRAVITY } from './constants.js';
import { gameStatus, platforms, healingOrbs, resetState } from './state.js';
import { HealingOrb } from './entities/HealingOrb.js';
import { keys } from './input.js'; // Imported input tracking just in case

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- CINEMATIC INTRO HOOK ---
function runCinematicIntro() {
    const introElement = document.getElementById('introDistance');
    const hudElement = document.getElementById('hud');

    // 1. Lock controls and hide HUD, show blinking 0m center screen
    gameStatus.controlsLocked = true;
    introElement.textContent = "0m";
    introElement.classList.remove('glide-to-corner', 'hidden');
    introElement.classList.add('blinking');
    hudElement.classList.add('hidden');

    // 2. Wait 1.5 seconds, then stop blinking and glide to the top-left corner
    setTimeout(() => {
        introElement.classList.remove('blinking');
        introElement.classList.add('glide-to-corner');
    }, 1500);

    // 3. Once it finishes sliding (0.9 seconds later), hide intro actor, turn on full HUD, unlock controls
    setTimeout(() => {
        introElement.classList.add('hidden'); 
        hudElement.classList.remove('hidden'); 
        gameStatus.controlsLocked = false; // Player can now move!
    }, 2400); 
}

function initGame() {
    resetState();
    
    // Spawn initial entities
    healingOrbs.push(new HealingOrb(200, 200));
    
    // Kick off our intro cutscene!
    runCinematicIntro();
}

function gameLoop() {
    // 1. Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Update logic
    for (let orb of healingOrbs) {
        orb.update();
    }

    // 3. Draw logic
    for (let orb of healingOrbs) {
        orb.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the engine
initGame();
gameLoop();
