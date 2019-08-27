import Kitten from "./js/kitten";
import words from "./js/words";
import Coin from "./js/coin";
import Flag from "./js/flag";



window.addEventListener('load', init);
window.Image
// Globals
// modes

let time = 30;
let score = 0;
let isPlaying = true;
let currentWords = [];
let activeKittens = [];
let flagPos = [];
let numMatches = 0;
let lives = 3;
let releaseKittenInterval = 1000;
let totalChars = 0;



const kittenImage = new Image();
kittenImage.src = 'https://game-seeds.s3.amazonaws.com/pirate-outline-height-130.png';
// kittenImage.src ="https://game-seeds.s3.amazonaws.com/pirate-outline-height-130.png";
// kittenImage.src = 'https://game-seeds.s3.amazonaws.com/pirate-big-sit-outline.png';
const kittenPos = [0, 400];

const coinSprite = new Image();
coinSprite.src = "https://game-seeds.s3.amazonaws.com/coin-sprite-sheet.png";

// DOM Elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wordInput = document.querySelector('#word-input');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const numMatchesDisplay = document.querySelector('#numMatches');
const livesDisplay = document.querySelector("#lives");
const message = document.querySelector('#message');
const gameOver = document.querySelector('.gameover');
const finalScore = document.querySelector('#final-score');
const wpm = document.querySelector('#wpm');
const playAgainButton = document.querySelector('#play-again-button');


// const c = document.getElementById('cheetah'); // DOM Manipulation (as opposed to canvas-- maybe come back to this)

// Dictionary
// const dictionary = currentMode;
// const mode = {
//     words: words,
//     coding: coding,
// };

// const currentMode = mode.words;


// Logic

// Initialize Game
function init() {
    // start  matching on word input
    wordInput.addEventListener('input', handleMatch);
    wordInput.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            wordInput.value = "";
        }
    })
    // onChange??
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    // setInterval(releaseMoreKittens, 2000);
    setInterval(updateScore, 400);
    setInterval(updateReleaseKittenInterval, 10000);
 
}

function releaseMoreKittens() {
    if (isPlaying) {
        const word = randomWord();
        const pos = randomPosition();
        const newKitten = new Kitten(pos, word, kittenImage, activeKittens, currentWords, ctx);
        activeKittens.push(newKitten);

    }

    // window.requestAnimationFrame(() => animate(newKitten))
    // window.requestAnimationFrame(() => animate(newKitten));

}

function updateScore() {
    if (!isGameOver())  {
        // score++;
        scoreDisplay.innerHTML = score;
    }
  
}

function updateReleaseKittenInterval() {
    this.releaseKittenInterval +=10;
}



function matchInput() {
    let value = wordInput.value;
    if (currentWords.indexOf(value) > -1) {
        let i = currentWords.indexOf(value);
       
        let wordScore = value.length * 100;
        score += wordScore;
        totalChars += (wordScore/100);
        // scoreDisplay.innerHTML += wordScore;
        numMatches++;
        return true;
    }
}

function handleMatch() {
    let value = wordInput.value;
    let i = currentWords.indexOf(value);
 
    if (matchInput() && !isGameOver()) {
        const pos = activeKittens[i].kittenPos;
        isPlaying = true;
        numMatchesDisplay.innerHTML++;
        const coin = new Coin(pos);
        coin.animateCoin();
        activeKittens[i].active = false;
        activeKittens[i].update(i);
  
        wordInput.value = "";
    }
}


// pick and show random  word 
function randomWord() {
    // Generate random array index
    const randomIndex = Math.floor(Math.random() * words.length);
    // Save random word to a variable & push it into currentWords array
    const word = words[randomIndex];
    words.splice(randomIndex, 1);
    currentWords.push(word);
    // Output a randomword
    return word;

}


function randomPosition() {
    let randomPosition = Math.floor((Math.random() * 136) + 1);
    randomPosition = 315 - randomPosition;
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

function isGameOver() {
    if (time === 0 || lives < 1) {
        isPlaying = false;
        return true;
    } else {
        return false;
    }
}
function checkStatus() {
    if (isGameOver()) {
        
        const playerStats = {
            yourScore: score,
            totalChars: totalChars,
            wpm: Math.floor((totalChars/5) / 0.5),
        };
        Object.freeze(playerStats);
        clearInterval(init);

        gameOver.style.display = "flex";

        finalScore.innerHTML = playerStats.yourScore;

        wpm.innerHTML = playerStats.wpm;
        message.innerHTML = 'Game Over!';
        playAgainButton.addEventListener('click', ()=> {
            location.reload();
        });


        // score = 0;
        // scoreDisplay.innerHTML = 0;
    }
}


function animate(activeKittens) {
    ctx.clearRect(0, 0, 1024, 450);

    for (let i = 0; i < activeKittens.length; i++) {
        const currentCat = activeKittens[i];
        if (currentCat.update()) {
            i--;
            
            const pos = currentCat.kittenPos;
            const flag = new Flag(pos);
            
            flag.drawFlag();
            debugger
           lives--;
           livesDisplay.innerHTML--;
        }
        currentCat.draw(ctx);
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
    const word = randomWord(words);
    const newKitten = new Kitten([0, 200], word, kittenImage, activeKittens, currentWords, ctx);

    activeKittens.push(newKitten);
    window.requestAnimationFrame((timestamp) => {
        if (isPlaying) {
            setInterval(releaseMoreKittens, releaseKittenInterval);
            animate(activeKittens);
        }
      


    });
}


// OLD CODE /////////


     
//      import Kitten from "./js/kitten";
//      import words from "./js/words";
    
     
//      window.addEventListener('load', init);
//      window.Image
//      // Globals
//      // modes

//      let time = 30;
//      let score = 0;
//      let isPlaying;
//      let currentWords = [];
//      let activeKittens = [];


//      const kittenImage = new Image();
// kittenImage.src ='https://game-seeds.s3.amazonaws.com/pirate-outline-height-150.png';
//     // kittenImage.src ="https://game-seeds.s3.amazonaws.com/pirate-outline-height-130.png";
//     // kittenImage.src = 'https://game-seeds.s3.amazonaws.com/pirate-big-sit-outline.png';
//      const kittenPos = [0, 400];

//      // DOM Elements
//      const canvas = document.getElementById('canvas');
//      const ctx = canvas.getContext('2d');
//      const wordInput = document.querySelector('#word-input');
//      const scoreDisplay = document.querySelector('#score');
//      const timeDisplay = document.querySelector('#time');
//      const message = document.querySelector('#message');
//      const gameOver = document.querySelector('.gameover');
//      const finalScore = document.querySelector('#final-score');
//      const wpm = document.querySelector('#wpm');


//      // const c = document.getElementById('cheetah'); // DOM Manipulation (as opposed to canvas-- maybe come back to this)

//      // Dictionary
//     // const dictionary = currentMode;
//     // const mode = {
//     //     words: words,
//     //     coding: coding,
//     // };

//     // const currentMode = mode.words;


//      // Logic

//      // Initialize Game
//      function init() {
//          // start  matching on word input
//          wordInput.addEventListener('input', handleMatch);
//          // onChange??
//          // Call countdown every second
//          setInterval(countdown, 1000);
//          // Check game status
//          setInterval(checkStatus, 50);
//          // setInterval(releaseMoreKittens, 2000);
//      }

//      function releaseMoreKittens() {
//          const word = randomWord();
//          const pos = randomPosition();
//          const newKitten = new Kitten(pos, word, kittenImage, activeKittens, currentWords, ctx);
//          activeKittens.push(newKitten);
        
//          // window.requestAnimationFrame(() => animate(newKitten))
//          // window.requestAnimationFrame(() => animate(newKitten));

//      }



//      function matchInput() {
//          let value = wordInput.value;
//          if (currentWords.indexOf(value) > -1) {
//              let i = currentWords.indexOf(value);
//              score ++;
//              scoreDisplay.innerHTML++; 
//              return true;
//          }
//      }

//      function handleMatch() {
//          let value = wordInput.value;
//          let i = currentWords.indexOf(value);
//          if (matchInput()) {
//              isPlaying = true;
//              activeKittens[i].active = false;
//              activeKittens[i].update(i);
//              wordInput.value = "";
//          }
//      }


//      // pick and show random  word 
//      function randomWord() {
//          // Generate random array index
//          const randomIndex = Math.floor(Math.random() * words.length);
//          // Save random word to a variable & push it into currentWords array
//         const word = words[randomIndex];
//         words.splice(randomIndex, 1);
//          currentWords.push(word);
//          // Output a randomword
//          return word;

//      }
 

//      function randomPosition() {
//          let randomPosition = Math.floor((Math.random() * 136) + 1);
//          randomPosition = 400-randomPosition;
//          console.log(randomPosition);
//          return [0, randomPosition];
//      }

//      // Countdown timer
//      function countdown() {
//          // Make sure time is  not run out
//          if (time > 0) {
//              // decrement time
//              time--;
//          } else if (time === 0) {
//              isPlaying = false;
//          }
//          // Show time
//          timeDisplay.innerHTML = time;
//      }

//      // Check game status
//      function checkStatus() {
//          if (!isPlaying && time === 0) {
//              const playerStats = {
//                  yourScore: score,
//                  wpm: Math.floor(score * 2),
//              };
//              Object.freeze(playerStats);
//              clearInterval(init);
            
//              gameOver.style.display = "flex";
           
//              finalScore.innerHTML = playerStats.yourScore;
         
//              wpm.innerHTML = playerStats.wpm;
//              message.innerHTML = 'Game Over!';
            

//              score = 0;
//              scoreDisplay.innerHTML=0;
//          }
//      }


//      function animate(activeKittens) {
//          ctx.clearRect(0, 0, 800, 600);
       
//          for (let i = 0; i < activeKittens.length; i++) {
//              const currentCat = activeKittens[i];
//              if (currentCat.update()) i--;
//              currentCat.draw(ctx);
//          }






//          // if (kittenPos[0] < 800 ) {
//          // c.style.transform =`translate(${kittenPos[0]}px, 0px)`
//          // document.getElementById('cheetah');
//          // DOM Manipulation (as opposed to canvas-- maybe come back to this if you comment 'c' back in above)
//          window.requestAnimationFrame((timestamp) => {
             
//              animate(activeKittens);
//          });
//          // }

//      }
//      kittenImage.onload = function () {
//          const word = randomWord(words);
//          const newKitten = new Kitten([0, 400], word, kittenImage, activeKittens, currentWords, ctx);
        
//          activeKittens.push(newKitten);
//          window.requestAnimationFrame((timestamp) => {
//              setInterval(releaseMoreKittens, 2000);
//              animate(activeKittens);
           

//          });
//      }


