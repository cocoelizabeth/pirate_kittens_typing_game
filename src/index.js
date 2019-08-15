     import Kitten from "./js/kitten";
     
     window.addEventListener('load', init);
     // Globals

     let time = 30;
     let score = 0;
     let isPlaying;
     let currentWords = [];
     let activeKittens = [];


     // Images
     const backgroundImage = new Image();
     backgroundImage.src = 'https://game-seeds.s3.amazonaws.com/background+with+palms.jpg'

     const kittenImage = new Image();
     kittenImage.src = 'https://game-seeds.s3.amazonaws.com/2-pirates-copy.png';
     const kittenPos = [0, 400];

     // DOM Elements
     const canvas = document.getElementById('canvas');
     const ctx = canvas.getContext('2d');
     const wordInput = document.querySelector('#word-input');
     const scoreDisplay = document.querySelector('#score');
     const timeDisplay = document.querySelector('#time');
     const message = document.querySelector('#message');


     // const c = document.getElementById('cheetah'); // DOM Manipulation (as opposed to canvas-- maybe come back to this)

     // Dictionary
     const words = [
         'bubblegum',
         'river',
         'popcorn',
         'revolver',
         'magic',
         'potato',
         'blockhead',
         'loophole',
         'ambidextrous',
         'fish',
         'nineteen',
         'clover',
         'beeswax',
         'cereal',
         'chameleon',
         'lightbulb',
         'gibberish',
         'serpent',
         'gamble',
         'bunny',
         'doorman',
         'amateur',
         'jigsaw',
         'cultish',
         'bamboo',
         'bumblebee',
         'pumpkin',
         'harmonica',
         'haircut',
         'jellyfish',
         'quarrelsome',
         'fax machine',
         'fairies',
         'rhyme',
         'embarrassing',
         'pajamas',
         'duffel bag',
         'overpriced',
         'ketchup',
         'koala',
         'panther',
         'flower',
         'squishmallow',
         'synesthesia',
         'tempestuous',
         'falafel',
         'pedestrian',
         'dennis rodman',
         'basketball',
         'rainforest',
         'meow',
         'dentures',
         'helen keller',
     ];

     // Logic

     // Initialize Game
     function init() {
         // start  matching on word input
         wordInput.addEventListener('input', handleMatch);
         // onChange??
         // Call countdown every second
         setInterval(countdown, 1000);
         // Check game status
         setInterval(checkStatus, 50);
         // setInterval(releaseMoreKittens, 2000);
     }

     function releaseMoreKittens() {
         const word = randomWord();
         const pos = randomPosition();
         const newKitten = new Kitten(pos, word, kittenImage, activeKittens, currentWords);
         activeKittens.push(newKitten);
         // window.requestAnimationFrame(() => animate(newKitten))
         // window.requestAnimationFrame(() => animate(newKitten));

     }

     // Match input - OLD WORKING CODE
     // function matchInput() {
     //     let value = wordInput.value;
     //     if(currentWords.indexOf(value) > -1) {
     //             i = currentWords.indexOf(value);
     //             scoreDisplay.innerHTML++;
     //             currentWords.splice(i, 1);
     //             wordInput.value="";
     //     }
     // }

     // NEW:
     function matchInput() {
         let value = wordInput.value;
         if (currentWords.indexOf(value) > -1) {
             let i = currentWords.indexOf(value);
             score ++;
             scoreDisplay.innerHTML++; 
             currentWords.splice(i, 1);
             
             return true;
         }
     }

     function handleMatch() {
         let value = wordInput.value;
         let i = currentWords.indexOf(value);
         if (matchInput()) {
             isPlaying = true;
             activeKittens[i].active = false;
             activeKittens[i].update(i);
            // activeKittens[i].fly();
             wordInput.value = "";
         }
     }


     // pick and show random  word 
     function randomWord() {
         // Generate random array index
         const randomIndex = Math.floor(Math.random() * words.length);
         // Save random word to a variable & push it into currentWords array
        const word = words[randomIndex];
         currentWords.push(word);
         // Output a randomword
         return word;

     }

     function randomPosition() {
         let randomPosition = Math.floor((Math.random() * 136) + 1);
         randomPosition = 400-randomPosition;
         console.log(randomPosition);
         return [0, randomPosition];
     }

     // Countdown timer
     function countdown() {
         // Make sure time is  not run out
         if (time > 0) {
             // decrement time
             time--;
         } else if (time === 0) {
             isPlaying = false;
         }
         // Show time
         timeDisplay.innerHTML = time;
     }

     // Check game status
     function checkStatus() {
         if (!isPlaying && time === 0) {
             message.innerHTML = 'Game Over!';
         }
     }


     function animate(activeKittens) {
         ctx.clearRect(0, 0, 800, 600);
         const background = new Background(backgroundImage);
         background.draw();
         for (let i = 0; i < activeKittens.length; i++) {
             activeKittens[i].update().draw(ctx);
         }






         // if (kittenPos[0] < 800 ) {
         // c.style.transform =`translate(${kittenPos[0]}px, 0px)`
         // document.getElementById('cheetah');
         // DOM Manipulation (as opposed to canvas-- maybe come back to this if you comment 'c' back in above)
         window.requestAnimationFrame((timestamp) => {
             
             animate(activeKittens);
         });
         // }

     }
     kittenImage.onload = function () {
        //  const background = new Background(backgroundImage);
         const word = randomWord(words);
         const newKitten = new Kitten([0, 400], word, kittenImage, activeKittens, currentWords);
        
         // new
         activeKittens.push(newKitten);
         window.requestAnimationFrame((timestamp) => {
             setInterval(releaseMoreKittens, 2000);
             animate(activeKittens);

         });
     }

     // Classes
    //  class Kitten {
    //      constructor(kittenPos, word, kittenImage) {
    //          this.kittenPos = kittenPos;
    //          this.word = word;
    //          this.kittenImage = kittenImage;

    //      }

    //      update() {

    //          this.kittenPos[0]++
    //          if (this.word === "") {
    //              this.fly();
    //              activeKittens.splice(i,1);
    //          }
    //          if (this.kittenPos[0] > 799) {
    //              i = activeKittens.indexOf(this);
    //              activeKittens.splice(i,1);
    //              currentWords.splice(i,1);
                 
    //          }
    //          return this;
    //      }

    //      fly() {
    //          this.kittenPos[0] += 5
    //          this.kittenPos[1] -= 5
    //      }

    //      // ultimately take in ctx for draw
    //      draw() {
    //          // debugger
    //          ctx.drawImage(this.kittenImage, ...this.kittenPos);
    //          ctx.font = "16px Arial";
    //          ctx.fillStyle = "aquamarine";
    //          ctx.fillText(this.word, (this.kittenPos[0] + 30), (this.kittenPos[1] + 165));
    //      }
    //  }


     class Background {
         constructor(backgroundImage) {
             this.backgroundImage = backgroundImage;
         }

         draw() {
             ctx.drawImage(this.backgroundImage, 0, 0);
         }

     }
