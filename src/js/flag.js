export default class Flag {

    constructor(kittenPos) {
        this.pos = kittenPos;
        this.animateFlag = this.animateFlag.bind(this);
        this.draw = this.draw.bind(this);
   
        this.img = new Image();
        this.img.src = "https://game-seeds.s3.amazonaws.com/1-treasure.png";

        const canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        // this.loopCount = 0;

        // this.sx = 69;
        // this.sy = 130;
        // this.sw = 0;
        // this.sh = 0;

        // this.dx = this.pos[0];
        // this.dy = this.pos[1];

        // this.dw = 100;
        // this.dh = 100;
        // this.draw();

    }

    drawFlag() {
        debugger
        this.flag = this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }

    draw() {
        this.ctx.drawImage(this.img, ...this.pos)
        debugger
        // this.sx += this.dw;


        // // if (this.sx > 420) {
        // //     this.loopAnimation();

        // // }

        // this.drawFlag();
        // this.test = requestAnimationFrame(this.draw);

        //  ctx.font = "16px Anton, sans-serif";
        // ctx.font = "16px Jura, sans-serif";
        // ctx.font-family ="UnifrakturCook, sans-serif";
        // ctx.font-size="16px";
        this.ctx.shadowColor = '#565656';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;

    }

    animateFlag() {
        debugger
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
            // this.dx -= 10;
            this.dy -= 50;

        };

    }
}