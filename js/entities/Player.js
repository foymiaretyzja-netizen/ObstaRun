// js/entities/Player.js
import { GRAVITY, TERMINAL_VELOCITY, FRICTION, BASE_ACCEL, BASE_JUMP_FORCE, MAX_SPEED } from '../constants.js';
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
        this.color = '#808080';
    }

    update() {
        // Horizontal Input Handling (No more "else" block!)
        if (keys.right) {
            this.vx += BASE_ACCEL;
        } 
        if (keys.left) {
            this.vx -= BASE_ACCEL;
        }

        // 1. Apply Friction EVERY frame to prevent infinite acceleration
        this.vx *= FRICTION;

        // 2. Hard clamp maximum running speed
        if (this.vx > MAX_SPEED) this.vx = MAX_SPEED;
        if (this.vx < -MAX_SPEED) this.vx = -MAX_SPEED;

        // Apply Vertical Gravity
        this.vy += GRAVITY;
        if (this.vy > TERMINAL_VELOCITY) {
            this.vy = TERMINAL_VELOCITY;
        }

        // Apply velocities to coordinates
        this.x += this.vx;
        this.y += this.vy;

        // Absolute boundaries: don't let player walk backwards off the infinite grid
        if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }
    }

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
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
