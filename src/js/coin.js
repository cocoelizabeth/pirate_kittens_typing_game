
export default class Coin {

    constructor(kittenPos) {
       this.pos = kittenPos;
       this.animateCoin = this.animateCoin.bind(this);
       this.draw = this.draw.bind(this);
    //    this.stopAnimation = this.stopAnimation.bind(this)
    //    this.canvas = canvas;
    //    this.ctx = ctx;

       this.img = new Image();
       this.img.src = "https://game-seeds.s3.amazonaws.com/coin-sprite-sheet.png";

       const canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.loopCount = 0;
   
        this.sx = 0;
        this.sy = 0;
        this.sw = 60;
        this.sh = 60;
      
        this.dx = this.pos[0];
        this.dy = this.pos[1];
     
        this.dw = 60;
        this.dh = 60;
        this.animateCoin();
    
    }

    drawCoin() {
        this.coin = this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    } 

    draw() {
        this.sx += this.dw;
        

        if (this.sx > 420) {
            this.loopAnimation();
            
        }

        this.drawCoin();
        this.test = requestAnimationFrame(this.draw);
  
        //  ctx.font = "16px Anton, sans-serif";
        // ctx.font = "16px Jura, sans-serif";
        // ctx.font-family ="UnifrakturCook, sans-serif";
        // ctx.font-size="16px";
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

    checkLoop() {
        if (this.loopCount > 2) {
            // this.dx -= 10;
            this.dy -= 50;
          
        };
  
    }
}

// image.src = "https://game-seeds.s3.amazonaws.com/pirate-outline-height-130.png"

// drawCoin(ctx, coinSprite) {

    // const pos = { pos: this.pos };
    // Object.freeze(pos);

    // const img = coinSprite;


//     let sx = 0;
//     let sy = 0;
//     let sw = 60;
//     let sh = 60;
//     let dx = pos["pos"][0];
//     let dy = pos["pos"][1];
//     let dw = 60;
//     let dh = 60;
//     this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
// }