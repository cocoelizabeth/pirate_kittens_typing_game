import Kitten from "./js/kitten";
import words from "./js/words";
import Coin from "./js/coin";
import Flag from "./js/flag";

// Globals
let startTime = 45;
let time = 45;
let score = 0;
let isPlaying = false;
let currentWords = [];
let activeKittens = [];
let flagPos = [];
let numMatches = 0;
let lives = 3;
let releaseKittenInterval = 2000;
let totalChars = 0;

// Images
const kittenImage = new Image();
kittenImage.src = 'https://game-seeds.s3.amazonaws.com/pirate-outline-height-130.png';
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

// Dictionary
// const dictionary = currentMode;
// const mode = {
//     words: words,
//     coding: coding,
// };

// const currentMode = mode.words;



// MODAL
const modal = document.getElementById("modal");
const btn = document.getElementById("btn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "flex";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

// GAME LOGIC

window.addEventListener('load', startGame);

function startGame() {
     // Start game when player presses space bar
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
    // Start  matching on word input
    wordInput.focus();
    wordInput.addEventListener('input', handleMatch);
    // Clear input when player presses enter
    wordInput.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            wordInput.value = "";
        }
    });
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    // Check/update score every .4 seconds
    setInterval(updateScore, 400);
    // Gradually increase the speed that kittens are released
    setInterval(updateReleaseKittenInterval, 500);
    // setInterval(releaseMoreKittens, 2000);
}

function drawKitten () {
    // Generate random word for each kitten
    const word = randomWord(words);
    // Create new Kitten object
    const newKitten = new Kitten([0, 200], word, kittenImage, ctx, null, activeKittens, currentWords);
    activeKittens.push(newKitten);
    window.requestAnimationFrame((timestamp) => {
        if (isPlaying) {
            setInterval(releaseMoreKittens, releaseKittenInterval);
            animate(activeKittens);
        }
    });
}

function releaseMoreKittens() {  
    if (isPlaying) {
        const word = randomWord();
        const pos = randomPosition();
        const newKitten = new Kitten(pos, word, kittenImage, ctx, lives, activeKittens, currentWords);
        activeKittens.push(newKitten);
    }
}

function updateScore() {  
    if (!isGameOver())  {
        scoreDisplay.innerHTML = score;
    }
}

function updateReleaseKittenInterval() { 
    this.releaseKittenInterval -=400;
}

function matchInput() {
    let value = wordInput.value;
    if (currentWords.indexOf(value) > -1) {
        let i = currentWords.indexOf(value);
        let wordScore = value.length * 100;
        score += wordScore;
        totalChars += (wordScore/100);
        numMatches++;
        return true;
    }
}

function handleMatch() {
    let value = wordInput.value;
    let i = currentWords.indexOf(value);
    if (matchInput() && !isGameOver()) {
        const pos = activeKittens[i].kittenPos;
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
    return [0, randomPosition];
}


// Countdown timer
function countdown() {
    // Make sure time has not run out
    if (time > 0) {
        // decrement time
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check if game is over 
function isGameOver() {
    if (time === 0 || lives < 1) {
        return true;
    } else {
        return false;
    }
}

// Check game status
function checkStatus() {
    message.innerHTML = 'Pirate Kittens';
    // Logic for changing status when game is over
    if (isGameOver() && isPlaying) {   
        isPlaying = false;
        // Store player stats to display on game over screen
        const playerStats = {
            yourScore: score,
            totalChars: totalChars,
            min: time/60,
            wpm: Math.floor((totalChars/5) / ((startTime-time)/60)),
        };
        
        Object.freeze(playerStats);
        // Stop calling game logic
        clearInterval(init);
        // Display game over screen and player stats
        gameOver.style.display = "flex";
        gameOver.style.zindex="1000";
        finalScore.innerHTML = playerStats.yourScore;
        wpm.innerHTML = playerStats.wpm;
        // Reload game when player clicks button or presses space bar
        playAgainButton.addEventListener('click', ()=> {
            location.reload();
        });
        document.addEventListener('keyup', function(e){
            if (e.keyCode === 32) {
                window.location.reload();
            }
        });
    }
}

// Animate the generated kittens 
function animate(activeKittens) {
    ctx.clearRect(0, 0, 1024, 450);
    
    for (let i = 0; i < activeKittens.length; i++) {
        const currentCat = activeKittens[i];
        
        if (currentCat.update()) {
            i--;
           // Lose life and render flag if kitten reaches shore
            livesDisplay.innerHTML--;
            const pos = currentCat.kittenPos;
          
            const rect = canvas.getBoundingClientRect();
            const left = rect.right - 160;
            const top = rect.top +pos[1];
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

            if (lives===0) {
                flag1.style.display="none";
                flag2.style.display = "none";
                flag3.style.display = "none";
            }
        }
        currentCat.draw(ctx);
    }

    window.requestAnimationFrame((timestamp) => {
        animate(activeKittens);
    });
}
