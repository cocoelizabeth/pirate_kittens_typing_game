export default class Flag {

    constructor(kittenPos, ctx) {
        this.pos = kittenPos;
        this.animateFlag = this.animateFlag.bind(this);
        this.draw = this.draw.bind(this);
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = "https://game-seeds.s3.amazonaws.com/1-treasure.png";
        this.sx = 69;
        this.sy = 130;
        this.sw = 0;
        this.dx = this.pos[0];
        this.dy = this.pos[1];
        this.dw = 100;
        this.dh = 100;
        this.drawFlag();
    }

    drawFlag() {
        this.flag = this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
        this.test = requestAnimationFrame(this.draw);
    }

    draw() {
        this.drawFlag();
        this.test = requestAnimationFrame(this.draw);
        this.ctx.shadowColor = '#565656';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
    }

    animateFlag() {
        this.draw();
    }

    loopAnimation() {
        this.sx = 0;
        this.sy = 0;
        this.loopCount++;
        this.checkLoop();
    }

    checkLoop() {
        if (this.loopCount > 2) {
            this.dy -= 50;
        }
    }
}