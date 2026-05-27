// js/entities/Player.js
import { GRAVITY, TERMINAL_VELOCITY, FRICTION, BASE_ACCEL, BASE_JUMP_FORCE } from '../constants.js';
import { keys } from '../input.js';

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.vx = 0;
        this.vy = 0;
        this.grounded = false;
        this.jumpCount = 0;
        this.color = '#808080'; // Sleek slate gray core
    }

    update() {
        // Horizontal Input Handling
        if (keys.right) {
            this.vx += BASE_ACCEL;
        } else if (keys.left) {
            this.vx -= BASE_ACCEL;
        } else {
            this.vx *= FRICTION; // Natural drift reduction
        }

        // Apply Vertical Gravity
        this.vy += GRAVITY;
        if (this.vy > TERMINAL_VELOCITY) {
            this.vy = TERMINAL_VELOCITY;
        }

        // Apply velocities to coordinates
        this.x += this.vx;
        this.y += this.vy;

        // Absolute boundaries: don't let player walk backwards off the grid map
        if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }
    }

    // Handles single-instance trigger mechanics for clean double jumping
    jump() {
        if (this.grounded) {
            this.vy = BASE_JUMP_FORCE;
            this.grounded = false;
            this.jumpCount = 1;
        } else if (this.jumpCount < 2) {
            this.vy = BASE_JUMP_FORCE;
            this.jumpCount++;
        }
    }

    draw(ctx) {
        // Draw character box
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Cybernetic inner frame highlight
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
