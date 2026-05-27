// js/traps/SawTrap.js

export class SawTrap {
    constructor(startX, startY, patrolDistance) {
        this.x = startX;
        this.y = startY;
        this.radius = 20;
        this.startX = startX;
        this.patrolDistance = patrolDistance;
        
        this.speed = 3;
        this.rotation = 0;
        this.damage = 35; // Damage amount from your original code
    }

    update() {
        // Move back and forth
        this.x += this.speed;
        this.rotation += 0.2; // Spin the saw

        // Reverse direction if it hits the patrol limits
        if (this.x > this.startX + this.patrolDistance || this.x < this.startX) {
            this.speed *= -1;
        }
    }

    // Check circular collision against the player's rectangular hitbox
    checkCollision(player) {
        // Find the closest point to the circle within the rectangle
        let closestX = Math.max(player.x, Math.min(this.x, player.x + player.width));
        let closestY = Math.max(player.y, Math.min(this.y, player.y + player.height));

        // Calculate the distance between the circle's center and this closest point
        let distanceX = this.x - closestX;
        let distanceY = this.y - closestY;
        let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

        if (distanceSquared < (this.radius * this.radius)) {
            player.takeDamage(this.damage);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw the glowing core
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff0000';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#444';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#888';
        ctx.stroke();

        // Draw the nasty saw teeth
        ctx.fillStyle = '#ccc';
        for (let i = 0; i < 8; i++) {
            ctx.rotate((Math.PI * 2) / 8);
            ctx.beginPath();
            ctx.moveTo(this.radius - 2, -5);
            ctx.lineTo(this.radius + 8, 0);
            ctx.lineTo(this.radius - 2, 5);
            ctx.fill();
        }

        ctx.restore();
    }
}
