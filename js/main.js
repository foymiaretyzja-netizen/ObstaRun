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

let player; // Set up local player container

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

// Basic AABB Platform Landing Collision Pipeline
function checkPlatformCollisions() {
    player.grounded = false;

    for (let platform of platforms) {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            
            // Check if player is falling downwards onto the top lip of the platform block
            if (player.vy > 0 && (player.y + player.height - player.vy) <= platform.y + 6) {
                player.y = platform.y - player.height;
                player.vy = 0;
                player.grounded = true;
                player.jumpCount = 0; // Reset double jumps
            }
        }
    }
}

function initGame() {
    resetState();
    
    // Instantiate Player near left margin, sitting over standard baseline height
    player = new Player(100, window.innerHeight * 0.5);
    
    // Bind Keyboard Listeners straight to the player object
    initInput(player);
    
    // Pre-build world geometry stretching out past your viewport width on startup
    generateTerrain(canvas.width + 1000);
    
    runCinematicIntro();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- UPDATE PHASE ---
    if (!gameStatus.controlsLocked) {
        player.update();
        checkPlatformCollisions();

        // Lock camera horizontally to focus centered on player's position
        camera.x = player.x - 200;
        if (camera.x < 0) camera.x = 0;

        // Process procedural pipeline coordinates relative to camera view line
        generateTerrain(camera.x + canvas.width + 1500);
        cleanUpTerrain(camera.x);

        // Keep distance score updated as you run right
        gameStatus.distance = Math.floor(player.x / 15);
        document.getElementById('currentDistance').textContent = `${gameStatus.distance}m`;
        
        // Lava Death Boundary Check
        if (player.y > window.innerHeight) {
            initGame(); // Reset game on falling in lava
            return;
        }
    }

    for (let orb of healingOrbs) orb.update();
    for (let platform of platforms) platform.update();

    // --- DRAW PHASE ---
    ctx.save();
    ctx.translate(-camera.x, -camera.y); // Translate world coordinates automatically!

    // Render components inside the camera perspective window
    for (let platform of platforms) platform.draw(ctx);
    for (let orb of healingOrbs) orb.draw(ctx);
    player.draw(ctx);

    ctx.restore();

    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initGame();
gameLoop();
