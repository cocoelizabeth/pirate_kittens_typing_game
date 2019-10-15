export default class Coin {

    constructor(kittenPos) {
       this.pos = kittenPos;
       this.animateCoin = this.animateCoin.bind(this);
       this.draw = this.draw.bind(this);
       this.stopAnimation = false;
       this.img = new Image();
       this.img.src = "https://game-seeds.s3.amazonaws.com/coin-sprite-sheet.png";
       const canvas = document.getElementById("canvas");
       this.ctx = canvas.getContext("2d");
       this.loopCount = 0;
       this.sx = 69;
       this.sy = 60;
       this.sw = 60;
       this.sh = 60;
       this.dx = this.pos[0];
       this.dy = this.pos[1];
       this.dw = 60;
       this.dh = 60;
       this.animateCoin();
    }
    // draw coin sprite
    drawCoin() {
        this.coin = this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    } 

    draw() {
        if (this.stopAnimation) {
            return;
        }
        this.sx += this.dw;
        
        if (this.sx > 420) {
            this.loopAnimation();
        }
        this.drawCoin();
        this.test = requestAnimationFrame(this.draw);
        this.ctx.shadowColor = '#565656';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
    }

    animateCoin() {
        this.draw();
    }

    loopAnimation() {
        this.sx = 0;
        this.sy = 0;
        this.loopCount++;
        this.checkLoop();
    }
    // Stop spinning coin after it has looped 3 times
    checkLoop() {
        if (this.loopCount > 3) {
            this.stopAnimation = true;
        }
    }
}
