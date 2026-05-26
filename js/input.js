// js/input.js

export const keys = {
    right: false,
    left: false,
    up: false,
    down: false
};

// Listeners automatically update the keys object
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA')  keys.left = true;
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = true;
    if (e.code === 'ArrowDown' || e.code === 'KeyS')  keys.down = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA')  keys.left = false;
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = false;
    if (e.code === 'ArrowDown' || e.code === 'KeyS')  keys.down = false;
});
