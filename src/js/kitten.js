class Kitten {
    constructor(kittenPos, word, kittenImage, ctx, lives, activeKittens = [], currentWords = []) {
        this.kittenPos = kittenPos;
        this.word = word;
        this.ctx = ctx;
        this.lives = lives;
        this.kittenImage = kittenImage;
        this.activeKittens = activeKittens;
        this.currentWords = currentWords;
        this.active = true;
    }

    update(i) {
        // move the kitten to the right
        this.kittenPos[0] += 1.5;
        // remove kitten & their respective word from active kittens & words list 
        // if they reach the shore or the player correctly types their word
        if (this.kittenPos[0] > 800 || this.active === false) {
            let i = this.activeKittens.indexOf(this);
            this.activeKittens.splice(i, 1);
            this.currentWords.splice(i, 1);
    
            return true;
        }
        return false;
    }

    fly() {
        this.kittenPos[0] -= 5;
        this.kittenPos[1] -= 5;
    }

    draw(ctx) {
        ctx.drawImage(this.kittenImage, ...this.kittenPos);
        ctx.font = "13px Poppins, sans-serif";
        ctx.fillStyle = "white";
        ctx.shadowColor = '#565656';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(this.word, (this.kittenPos[0] + 20), (this.kittenPos[1] + 119));
    }
}

export default Kitten;