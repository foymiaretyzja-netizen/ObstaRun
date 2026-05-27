// js/input.js
export const keys = {
    right: false,
    left: false,
    up: false
};

// We will pass a reference to the active player directly into the listener loop
export function initInput(playerInstance) {
    window.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
        
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
            // Only trigger jump action on the initial down press!
            if (!keys.up && playerInstance) {
                playerInstance.jump();
            }
            keys.up = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.up = false;
    });
}
