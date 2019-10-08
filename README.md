# Pirate Kittens Typing Game

## [LIVE](https://cocoelizabeth.github.io/pirate_kittens_typing_game/)

## Background and Overview
Pirate Kittens Typing Game is an animated JavaScript Typing Game with a vibrant rainbow aesthetic. Pirate kittens will sail in from the left side of the screen while the player defends him/her treasure from the right by correctly typing the words that appear on their boats. If a kitten's word is typed correctly, the kitten turns into a coin that the player will collect.  Eventually, more and more pirate kittens will enter the screen, forcing the player to type faster and faster to keep them at bay. If a kitten reaches the shore of the island, they put down a pirate flag and the player loses a life. There are two scenarios that will cause game over:
* All lives are lost (3 kittens reach the shore)
* Time runs out

![Screenshot](https://raw.githubusercontent.com/cocoelizabeth/pirate_kittens_typing_game/master/pirate-kittens-screen-shot.png)

The kitten graphics are inspired by Lisa Frank.

![Screenshot](https://www.cardlike.com/sites/cardlike.com/files/card_art/Card-Lisa-Frank-22.jpg)

## Functionality and MVP Features
* Players will see pirate kittens sail in from the left
* Players will be able to type words stop kittens from reaching the shore and collect coins
* The game ends when 3 kittens reach the shore or time runs out
* Pirate kittens sould continuously sail in until they reach the shore 


## Technologies and Architecture
### `Vanilla JavaScript`
* Overall structure
* Game logic

### `HTML5 Canvas`
* DOM manipulation
* Rendering animations & sprites

### `Webpack` 
* Bundle various scripts into a single source

### Words API
* A words API to generate random words (future implementation)

### File Structure:
* Webpack entry file
* `index.html`: renders the canvas;
* `index.js`: entry file, main structure of the canvas and the center game logic;
* `coin.js`: handles coin animation;
* `modal.js`: renders the rules modal;
* `flag.js`: handles flag animation when kitten reaches the shore;
* `kitten.js`: handles kitten animation and reaction to user typing input; 



## Implementation Timeline:
**Weekend**
- [x] Complete Brickbreaker tutorial

**Monday**
- [x] Brainstorm initial concept
- [x] Create Repo
- [x] Finish Timeline

**Tuesday**
- [ ] Briefly research games using HTML5 canvas,  vector graphics, and paper.js
- [ ] Finalize structure
- [ ] Complete basic page skeleton and functionality
- [ ] Complete board design and rendering

**Wednesday**
- [ ] Implement typing game logic
- [ ] Implement logic to slow down kittens

**Thursday**
- [ ] Finish implementing functionality
- [ ] Finish scoreboard
- [ ] Styling and animation

**Friday**
- [ ] Finish Styling
- [ ] Start Bonus Features

## Bonus Features
* Music
* High Score Saving
* Ability to choose level of dificulty 


