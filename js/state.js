// js/state.js

export const gameStatus = {
    controlsLocked: true,
    distance: 0,
    lastPlatformX: -50, // Critical landmark tracker
    lastPlatformY: 0
};

export const camera = {
    x: 0,
    y: 0
};

export const platforms = [];
export const healingOrbs = [];

export function resetState() {
    gameStatus.controlsLocked = true;
    gameStatus.distance = 0;
    gameStatus.lastPlatformX = -50;
    gameStatus.lastPlatformY = window.innerHeight * 0.75;
    
    camera.x = 0;
    camera.y = 0;
    
    platforms.length = 0;
    healingOrbs.length = 0;
}
