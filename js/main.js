// js/main.js
import { GRID_SIZE } from './constants.js';
import { gameStatus, camera, platforms, healingOrbs, resetState } from './state.js';
import { Player } from './entities/Player.js';
import { initInput } from './input.js';
import { generateTerrain, cleanUpTerrain } from './utils/terrain.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = null; 

function runCinematicIntro() {
    const introElement = document.getElementById('introDistance');
    const hudElement = document.getElementById('hud');

    if (!introElement || !hudElement) return;

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

function checkPlatformCollisions() {
    if (!player) return;
    player.grounded = false;

    for (let platform of platforms) {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            
            if (player.vy > 0 && (player.y + player.height - player.vy) <= platform.y + 6) {
                player.y = platform.y - player.height;
                player.vy = 0;
                player.grounded = true;
                player.jumpCount = 0; 
            }
        }
    }
}

function initGame() {
    // 1. Fire the cinematic animation setup instantly so it never gets stuck!
    runCinematicIntro();

    // 2. Safely process setup configurations
    try {
        resetState();
        player = new Player(100, window.innerHeight * 0.5);
        initInput(player);
        generateTerrain(canvas.width + 1000);
    } catch (error) {
        console.error("Initialization Error catch:", error);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- UPDATE PHASE ---
    if (!gameStatus.controlsLocked && player) {
        player.update();
        checkPlatformCollisions();

        camera.x = player.x - 200;
        if (camera.x < 0) camera.x = 0;

        generateTerrain(camera.x + canvas.width + 1500);
        cleanUpTerrain(camera.x);

        gameStatus.distance = Math.floor(player.x / 15);
        document.getElementById('currentDistance').textContent = `${gameStatus.distance}m`;
        
        if (player.y > window.innerHeight) {
            initGame(); 
            return;
        }
    }

    for (let orb of healingOrbs) if (orb.update) orb.update();
    for (let platform of platforms) if (platform.update) platform.update();

    // --- DRAW PHASE ---
    ctx.save();
    ctx.translate(-camera.x, -camera.y); 

    for (let platform of platforms) platform.draw(ctx);
    for (let orb of healingOrbs) orb.draw(ctx);
    if (player) player.draw(ctx); 

    ctx.restore();

    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initGame();
gameLoop();
