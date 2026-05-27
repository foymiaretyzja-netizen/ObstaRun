// js/utils/terrain.js
import { GRID_SIZE } from '../constants.js';
import { gameStatus, platforms, healingOrbs } from '../state.js';
import { Platform } from '../entities/Platform.js';
import { HealingOrb } from '../entities/HealingOrb.js';

export function generateTerrain(targetX) {
    // Safety check: force-initialize if state landmarks are missing
    if (gameStatus.lastPlatformX === undefined || gameStatus.lastPlatformX === -50) {
        gameStatus.lastPlatformY = window.innerHeight * 0.75;
        gameStatus.lastPlatformX = -50;
        
        // Spawn starting safety platform under the player
        platforms.push(new Platform(-50, gameStatus.lastPlatformY, GRID_SIZE * 15, GRID_SIZE));
        gameStatus.lastPlatformX = -50 + (GRID_SIZE * 15);
    }

    // Generate terrain segments moving forward
    while (gameStatus.lastPlatformX < targetX) {
        const width = (Math.floor(Math.random() * 6) + 4) * GRID_SIZE; 
        const gap = (Math.floor(Math.random() * 3) + 2) * GRID_SIZE;   
        
        const nextX = gameStatus.lastPlatformX + gap;
        const heightStep = (Math.floor(Math.random() * 3) - 1) * (GRID_SIZE * 2);
        let nextY = gameStatus.lastPlatformY + heightStep;
        
        const ceilingLimit = window.innerHeight * 0.35;
        const floorLimit = window.innerHeight * 0.82;
        if (nextY < ceilingLimit) nextY = ceilingLimit;
        if (nextY > floorLimit) nextY = floorLimit;
        
        platforms.push(new Platform(nextX, nextY, width, GRID_SIZE));
        
        if (Math.random() < 0.35) {
            const orbX = nextX + (width / 2);
            const orbY = nextY - (GRID_SIZE * 3);
            healingOrbs.push(new HealingOrb(orbX, orbY));
        }
        
        gameStatus.lastPlatformX = nextX + width;
        gameStatus.lastPlatformY = nextY;
    }
}

export function cleanUpTerrain(cameraX) {
    const safetyBuffer = 600; 
    for (let i = platforms.length - 1; i >= 0; i--) {
        if (platforms[i].x + platforms[i].width < cameraX - safetyBuffer) {
            platforms.splice(i, 1);
        }
    }
    for (let i = healingOrbs.length - 1; i >= 0; i--) {
        if (healingOrbs[i].x < cameraX - safetyBuffer) {
            healingOrbs.splice(i, 1);
        }
    }
}
