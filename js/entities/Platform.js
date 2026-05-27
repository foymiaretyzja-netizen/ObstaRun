// js/entities/Platform.js

export class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        // Colors for the remake's aesthetic
        this.baseColor = '#222222'; 
        this.topHighlight = '#ff6a00'; 
        this.borderColor = '#000000';
    }

    // Every entity needs an update function (even if it does nothing right now)
    // so the game loop doesn't crash if it tries to call it!
    update() {
        // Static platforms don't need to update physics, but moving platforms later will!
    }

    draw(ctx) {
        // Draw main body
        ctx.fillStyle = this.baseColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw sleek black outline
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Draw a glowing lava reflection on the top edge
        ctx.fillStyle = this.topHighlight;
        ctx.fillRect(this.x, this.y, this.width, 4);
    }
}
