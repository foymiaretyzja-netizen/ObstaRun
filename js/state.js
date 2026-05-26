export let gameOver = false;
export let distance = 0;

export let platforms = [];
export let healingOrbs = [];
export let bossArenas = [];
export let cannons = [];
// ... other arrays

// You can also add a reset function here to clear them
export function resetState() {
    gameOver = false;
    distance = 0;
    platforms = [];
    healingOrbs = [];
    bossArenas = [];
    cannons = [];
}
