import Kitten from "./js/kitten";
import words from "./js/words";
import Coin from "./js/coin";
import Flag from "./js/flag";






// window.Image
// Globals
// modes

let time = 30;
let score = 0;
let isPlaying = false;
let currentWords = [];
let activeKittens = [];
let flagPos = [];
let numMatches = 0;
let lives = 3;
let releaseKittenInterval = 2000;
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
const gameStart = document.querySelector('.game-start');
const flag1 = document.querySelector('#flag1');
const flag2 = document.querySelector('#flag2');
const flag3 = document.querySelector('#flag3');



// const c = document.getElementById('cheetah'); // DOM Manipulation (as opposed to canvas-- maybe come back to this)

// Dictionary
// const dictionary = currentMode;
// const mode = {
//     words: words,
//     coding: coding,
// };

// const currentMode = mode.words;


// Logic

// window.addEventListener('load', init);
window.addEventListener('load', startGame);


function startGame() {
    
    // gameStart.style.display = "flex";



   
            window.addEventListener('keyup', function (e) {
                if (e.keyCode === 32) {
                    e.preventDefault();
                    if (isPlaying === false) {
                        gameStart.style.display = "none";
                        isPlaying = true;
                        wordInput.value = "";
                        init();
                    }
                }
            });
        
     
    

}

function init() {
    drawKitten();
    // start  matching on word input
    // isPlaying = true;
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
    setInterval(updateReleaseKittenInterval, 500);

function drawKitten () {
        
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

 
}

function releaseMoreKittens() {
    
    if (isPlaying) {
        const word = randomWord();
        const pos = randomPosition();
        const newKitten = new Kitten(pos, word, kittenImage, activeKittens, currentWords, ctx);
        activeKittens.push(newKitten);

    }

}

function updateScore() {
    
    if (!isGameOver())  {
        // score++;
        scoreDisplay.innerHTML = score;
    }
  
}

function updateReleaseKittenInterval() {
    
    this.releaseKittenInterval -=200;
    
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
        // isPlaying = true;
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
    // console.log(randomPosition);
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
        // isPlaying = false;
        return true;
    } else {
        return false;
    }
}
function checkStatus() {
    if (isGameOver() && isPlaying) {
        
        isPlaying = false;
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

   
        document.addEventListener('keyup', function(e){
            if (e.keyCode === 32) {
                window.location.reload();
            }
        });


        // score = 0;
        // scoreDisplay.innerHTML = 0;
    }
}

// updateFlag(lives, pos, left, top) {

// }

function animate(activeKittens) {
    ctx.clearRect(0, 0, 1024, 450);
    
    for (let i = 0; i < activeKittens.length; i++) {
        const currentCat = activeKittens[i];
        
        if (currentCat.update()) {
            i--;
           
            livesDisplay.innerHTML--;
            const pos = currentCat.kittenPos;
            const left = pos[0] + 130;
            const top = pos[1];


            if (lives === 3) {
                flag1.style.left = `${left}` + "px";
                flag1.style.top = `${top + "px"}`;
                flag1.style.display = "inline";
            } else if (lives === 2) {
                flag2.style.left = `${left}` + "px";
                flag2.style.top = `${top + "px"}`;
                flag2.style.display = "inline";
            } else if (lives===1) {
                flag3.style.left = `${left}` + "px";
                flag3.style.top = `${top + "px"}`;
                flag3.style.display = "inline";
            }
            
            lives--;
            // const flag = new Flag(pos, ctx);
            // flag.draw();
            // debugger
            // const coin = new Coin(pos);
            // coin.animateCoin();
           
            // flag.style.display="inline";
            // flag.style.cy = `${pos[1] - 138}`;
            // flag.style.cx =`${pos[0] - 130}`;
            
           
            
          
           
            // flag.style.left=`${left}`+"px";
            // flag.style.top =`${top + "px"}`;
            // flag.style.display = "inline";
            
     

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
// kittenImage.onload = function () {
//     debugger
//     const word = randomWord(words);
//     const newKitten = new Kitten([0, 200], word, kittenImage, activeKittens, currentWords, ctx);

//     activeKittens.push(newKitten);
//     window.requestAnimationFrame((timestamp) => {
//         debugger
//         if (isPlaying) {
//             setInterval(releaseMoreKittens, releaseKittenInterval);
//             animate(activeKittens);
//         }
      


//     });
// }


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


