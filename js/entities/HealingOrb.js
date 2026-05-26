export class HealingOrb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.radius = 10;
        this.color = '#00FF00';
        this.bobOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.y = this.baseY + Math.sin(Date.now() * 0.003 + this.bobOffset) * 5;
    }

    // Notice we pass ctx here now!
    draw(ctx) {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}
