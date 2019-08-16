class Kitten {
    constructor(kittenPos, word, kittenImage, activeKittens=[], currentWords=[]) {
        this.kittenPos = kittenPos;
        this.word = word;
        this.kittenImage = kittenImage;
        this.activeKittens = activeKittens;
        this.currentWords = currentWords;
        this.active = true;
    }

    update(i) {

        this.kittenPos[0]++
        if (this.active === false) {
            this.fly();
            // this.activeKittens.splice(i, 1);
            
        }
        if (this.kittenPos[0] > 800) {
            let i = this.activeKittens.indexOf(this);
            this.activeKittens.splice(i, 1);
            this.currentWords.splice(i, 1);
            return true;
        }
        return false;
    }

    fly() {
        this.kittenPos[0] += 5;
        this.kittenPos[1] -= 5;
    }

    draw(ctx) {
        // debugger
        ctx.drawImage(this.kittenImage, ...this.kittenPos);
        ctx.font = "16px Poppins, sans-serif";
        //  ctx.font = "16px Anton, sans-serif";
        // ctx.font = "16px Jura, sans-serif";
        // ctx.font-family ="UnifrakturCook, sans-serif";
        // ctx.font-size="16px";
        ctx.fillStyle = "white";
        ctx.fillText(this.word, (this.kittenPos[0] + 30), (this.kittenPos[1] + 166));
    }
}

export default Kitten;