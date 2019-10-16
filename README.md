![Logo](src/assets/img/logo.jpg)

# [Live Link](https://cocoelizabeth.github.io/pirate_kittens_typing_game/)

# Background and Overview
Pirate Kittens Typing Game is an animated JavaScript Typing Game with a vibrant rainbow aesthetic. Pirate kittens will sail in from the left side of the screen while the player defends his/her island from the right by correctly typing the words that appear on their boats. If a kitten's word is typed correctly, the kitten turns into a an animated coin that the player will collect.  Eventually, more and more pirate kittens will enter the screen, forcing the player to type faster and faster to keep them at bay. If a kitten reaches the shore of the island, they put down a pirate flag and the player loses a life. There are two scenarios that will cause game over:
* All lives are lost (3 kittens reach the shore)
* Time runs out

![Screenshot](https://raw.githubusercontent.com/cocoelizabeth/pirate_kittens_typing_game/master/pirate-kittens-screen-shot.png)


# Functionality and Features

## Keyboard Controls

* Start game when player presses `spacebar` based on keyup event when `!isPlaying`
* Clear word input when player presses `enter` when `isPlaying`
* Matching user input to `Words` dictionary object in order for  the player to stop the kittens from reaching the shore and to collect coins

```javascript
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
    // Start matching on word input
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
}
```

## Random Generation & Animation
### Random Words & Positions
* Each newly generated kitten is assigned a random word from the `Words` dictionary object that is animated on its ship
* Each newly generated kitten is assigned a random position on the y-axis to begin sailing in from (this sometimes adds to the difficulty of the game when kittens overlap and the player must type the word of the kitten in the foreground to reveal the word below it)
### Animation
* Players will see each pirate kitten continuously sail in from the left until they type the kitten's word correctly or the kitten reaches the shore
* When a player correctly types the word an SVG coin sprite is animated based on the coordinates of the kitten, and the player collects coins and points in the scorebar

![gif](src/assets/img/pirate-kittens-shorter.gif)

## Game Play Loop
* Implemented loop that continues game play until time runs out or all lives are lost
(*This occurs in the `drawKitten` function that is called above in the `init` function*)

## Other Features
* Keep track of players score
* Speed up kittens by gradually decreasing the time interval between generating new kittens
* Calculate word score based on word length
* Calculate final score and words per minute to display on game over screen
* Subtract lives when kittens reach shore and end when player runs out of lives
* Countdown timer that ends game when it reaches 0


# Technologies and Architecture
### `Vanilla JavaScript`
* Overall structure
* Game logic

### `HTML5 Canvas`
* DOM manipulation
* Rendering animations & sprites

### `Webpack` 
* Bundle various scripts into a single source

### `Custom Graphics`
* Custom vector graphics designed in Adobe Illustrator and Photoshop

## File Structure:
* Webpack entry file
* `index.html`: renders the canvas;
* `index.js`: entry file, main structure of the canvas and the center game logic and the rules modal;
* `coin.js`: handles coin animation;
* `flag.js`: handles flag animation when kitten reaches the shore;
* `kitten.js`: handles kitten animation and reaction to player typing input; 





