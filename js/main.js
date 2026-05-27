// js/main.js
import { GRID_SIZE, GRAVITY } from './constants.js';
import { gameStatus, platforms, healingOrbs, resetState } from './state.js';
import { HealingOrb } from './entities/HealingOrb.js';
import { Platform } from './entities/Platform.js'; // 1. Import your new Platform!
import { keys } from './input.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function runCinematicIntro() {
    const introElement = document.getElementById('introDistance');
    const hudElement = document.getElementById('hud');

    gameStatus.controlsLocked = true;
    introElement.textContent = "0m";
    introElement.classList.remove('glide-to-corner', 'hidden');
    introElement.classList.add('blinking');
    hudElement.classList.add('hidden');

    setTimeout(() => {
        introElement.classList.remove('blinking');
        introElement.classList.add('glide-to-corner');
    }, 1500);

    setTimeout(() => {
        introElement.classList.add('hidden'); 
        hudElement.classList.remove('hidden'); 
        gameStatus.controlsLocked = false; 
    }, 2400); 
}

function initGame() {
    resetState();
    
    // 2. Spawn a massive test platform right in the middle of the screen
    platforms.push(new Platform(
        canvas.width / 2 - 200, // X position (Centered)
        canvas.height / 2 + 100, // Y position (Lower middle)
        400, // Width
        GRID_SIZE * 2 // Height
    ));
    
    healingOrbs.push(new HealingOrb(canvas.width / 2, canvas.height / 2));
    
    runCinematicIntro();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- UPDATE PHASE ---
    for (let platform of platforms) {
        platform.update();
    }
    for (let orb of healingOrbs) {
        orb.update();
    }

    // --- DRAW PHASE ---
    // 3. Draw the platforms (passing in ctx!)
    for (let platform of platforms) {
        platform.draw(ctx);
    }
    for (let orb of healingOrbs) {
        orb.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initGame();
gameLoop();
