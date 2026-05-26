// js/state.js

// Objects group primitives so any module can modify their values safely
export const gameStatus = {
    gameOver: false,
    distance: 0,
    bestDistance: 0,
    
    // Procedural generation progress thresholds
    nextGapDistance: 500,
    nextElevatorDistance: 250,
    nextStaircaseDistance: 750,
    nextBossDistance: 800,
    lastPlatformX: -50,
    lastPlatformY: 0,
    nextBigGapX: 5000
};

// Global attack/damage timers
export const timers = {
    lastDamageTime: 0,
    lastHealTime: 0,
    spikeDamageTimer: 0,
    killbrickDamageTimer: 0,
    grabberDamageTimer: 0,
    laserEnemyDamageTimer: 0,
    spinnerDamageTimer: 0,
    bullDamageTimer: 0,
    puncherDamageTimer: 0,
    laserGateDamageTimer: 0,
    bossBulletDamageTimer: 0
};

// Global scroll offset tracking
export const camera = {
    x: 0,
    y: 0
};

// Array references stay completely stable across modules
export let platforms = [];
export let obstacles = []; 
export let swingingMaces = []; 
export let swingingAxes = []; 
export let fallingBlocks = []; 
export let grabbers = []; 
export let laserEnemies = []; 
export let lasers = []; 
export let hoverSpikes = []; 
export let launchPadItems = []; 
export let placedLaunchPads = []; 
export let spinners = []; 
export let crushers = []; 
export let bulls = []; 
export let zeroGZones = []; 
export let punchers = []; 
export let fallingSpikes = []; 
export let rollingBalls = []; 
export let cannons = []; 
export let cannonBalls = []; 
export let laserGates = []; 
export let healingOrbs = []; 
export let staircaseEvents = []; 
export let arrowTraps = []; 
export let trapArrows = []; 
export let medkitItems = []; 
export let bossArenas = []; 

// Resets properties cleanly without destroying external references
export function resetState() {
    gameStatus.gameOver = false;
    gameStatus.distance = 0;
    gameStatus.nextGapDistance = 500;
    gameStatus.nextElevatorDistance = 250;
    gameStatus.nextStaircaseDistance = 750;
    gameStatus.nextBossDistance = 800;
    gameStatus.lastPlatformX = -50;
    gameStatus.lastPlatformY = 0;
    gameStatus.nextBigGapX = 5000;

    timers.lastDamageTime = 0;
    timers.lastHealTime = 0;
    timers.spikeDamageTimer = 0;
    timers.killbrickDamageTimer = 0;
    timers.grabberDamageTimer = 0;
    timers.laserEnemyDamageTimer = 0;
    timers.spinnerDamageTimer = 0;
    timers.bullDamageTimer = 0;
    timers.puncherDamageTimer = 0;
    timers.laserGateDamageTimer = 0;
    timers.bossBulletDamageTimer = 0;

    camera.x = 0;
    camera.y = 0;

    // .length = 0 truncates the arrays in place safely!
    platforms.length = 0;
    obstacles.length = 0;
    swingingMaces.length = 0;
    swingingAxes.length = 0;
    fallingBlocks.length = 0;
    grabbers.length = 0;
    laserEnemies.length = 0;
    lasers.length = 0;
    hoverSpikes.length = 0;
    launchPadItems.length = 0;
    placedLaunchPads.length = 0;
    spinners.length = 0;
    crushers.length = 0;
    bulls.length = 0;
    zeroGZones.length = 0;
    punchers.length = 0;
    fallingSpikes.length = 0;
    rollingBalls.length = 0;
    cannons.length = 0;
    cannonBalls.length = 0;
    laserGates.length = 0;
    healingOrbs.length = 0;
    staircaseEvents.length = 0;
    arrowTraps.length = 0;
    trapArrows.length = 0;
    medkitItems.length = 0;
    bossArenas.length = 0;
}
