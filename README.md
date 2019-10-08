# Pirate Kittens Typing Game

## Background and Overview
Pirate Kittens Typing Game is an animated JavaScript Typing Game with a vibrant rainbow aesthetic. Pirate kittens will sail in from the left side of the screen while the player defends him/her treasure from the right by correctly typing the words that appear in the water. As the words are typed correctly, waves will slow the kittens down. Eventually, more and more pirate kittens will enter the screen, forcing the player to type faster and faster to keep them at bay. The game is over when the kittens reach the treasure.

The graphics are inspired by Lisa Frank animals but will have a more pastel tone.

![Screenshot](https://www.cardlike.com/sites/cardlike.com/files/card_art/Card-Lisa-Frank-22.jpg)

## Functionality and MVP Features
* Players will see pirate kittens sail in from the left
* Players will be able to type words to create waves and slow the kittens down
* The game ends when the pirate kittens reach the player's treature
* Pirate kittens sould continuously sail in until they reach the treasure 


## Technologies and Architecture
### `Vanilla JavaScript`
* Overall structure
* Game logic

### `HTML5 Canvas`
* DOM manipulation
* Rendering animation
* `Paper.js`: a library built on top of canvas that might be able to handle the  wave effects

### `Webpack` 
* Bundle various scripts into a single source

### Words API
* A words API to generate random words

### File Structure:
* Webpack entry file
* `index.html`: renders the canvas;
* `index.js`: entry file, main structure of the canvas and the center game logic;
* `board.js`: renders the tropical ocean background;
* `waves.js`: handles the wave animation
* `player.js`: 
* `kittens.js`: recieves input from typing and handles reaction;
* `scoreboard.js`: fetches score & time and displays them on screen



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


