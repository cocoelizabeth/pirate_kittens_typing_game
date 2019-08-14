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
            debugger
            this.activeKittens.splice(i, 1);
        }
        if (this.kittenPos[0] > 799) {
            let i = this.activeKittens.indexOf(this);
            this.activeKittens.splice(i, 1);
            this.currentWords.splice(i, 1);

        }
        return this;
    }

    fly() {
        this.kittenPos[0] += 5
        this.kittenPos[1] -= 5
    }

    draw(ctx) {
        // debugger
        ctx.drawImage(this.kittenImage, ...this.kittenPos);
        ctx.font = "16px Arial";
        ctx.fillStyle = "aquamarine";
        ctx.fillText(this.word, (this.kittenPos[0] + 30), (this.kittenPos[1] + 165));
    }
}

export default Kitten;