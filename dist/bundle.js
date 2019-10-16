/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _kitten = __webpack_require__(/*! ./js/kitten */ "./src/js/kitten.js");

var _kitten2 = _interopRequireDefault(_kitten);

var _words = __webpack_require__(/*! ./js/words */ "./src/js/words.js");

var _words2 = _interopRequireDefault(_words);

var _coin = __webpack_require__(/*! ./js/coin */ "./src/js/coin.js");

var _coin2 = _interopRequireDefault(_coin);

var _flag = __webpack_require__(/*! ./js/flag */ "./src/js/flag.js");

var _flag2 = _interopRequireDefault(_flag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Globals
var startTime = 45;
var time = 45;
var score = 0;
var isPlaying = false;
var currentWords = [];
var activeKittens = [];
var flagPos = [];
var numMatches = 0;
var lives = 3;
var releaseKittenInterval = 2000;
var totalChars = 0;

// Images
var kittenImage = new Image();
kittenImage.src = 'https://game-seeds.s3.amazonaws.com/pirate-outline-height-130.png';
var kittenPos = [0, 400];
var coinSprite = new Image();
coinSprite.src = "https://game-seeds.s3.amazonaws.com/coin-sprite-sheet.png";

// DOM Elements
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var wordInput = document.querySelector('#word-input');
var scoreDisplay = document.querySelector('#score');
var timeDisplay = document.querySelector('#time');
var numMatchesDisplay = document.querySelector('#numMatches');
var livesDisplay = document.querySelector("#lives");
var message = document.querySelector('#message');
var gameOver = document.querySelector('.gameover');
var finalScore = document.querySelector('#final-score');
var wpm = document.querySelector('#wpm');
var playAgainButton = document.querySelector('#play-again-button');
var gameStart = document.querySelector('.game-start');
var flag1 = document.querySelector('#flag1');
var flag2 = document.querySelector('#flag2');
var flag3 = document.querySelector('#flag3');

// Dictionary
// const dictionary = currentMode;
// const mode = {
//     words: words,
//     coding: coding,
// };

// const currentMode = mode.words;


// MODAL
var modal = document.getElementById("modal");
var btn = document.getElementById("btn");
var span = document.getElementsByClassName("close")[0];

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
    wordInput.addEventListener('keypress', function (e) {
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

function drawKitten() {
    // Generate random word for each kitten
    var word = randomWord(_words2.default);
    // Create new Kitten object
    var newKitten = new _kitten2.default([0, 200], word, kittenImage, ctx, null, activeKittens, currentWords);
    activeKittens.push(newKitten);
    window.requestAnimationFrame(function (timestamp) {
        if (isPlaying) {
            setInterval(releaseMoreKittens, releaseKittenInterval);
            animate(activeKittens);
        }
    });
}

function releaseMoreKittens() {
    if (isPlaying) {
        var word = randomWord();
        var pos = randomPosition();
        var newKitten = new _kitten2.default(pos, word, kittenImage, activeKittens, currentWords, ctx);
        activeKittens.push(newKitten);
    }
}

function updateScore() {
    if (!isGameOver()) {
        scoreDisplay.innerHTML = score;
    }
}

function updateReleaseKittenInterval() {
    this.releaseKittenInterval -= 200;
}

function matchInput() {
    var value = wordInput.value;
    if (currentWords.indexOf(value) > -1) {
        var i = currentWords.indexOf(value);
        var wordScore = value.length * 100;
        score += wordScore;
        totalChars += wordScore / 100;
        numMatches++;
        return true;
    }
}

function handleMatch() {
    var value = wordInput.value;
    var i = currentWords.indexOf(value);
    if (matchInput() && !isGameOver()) {
        var pos = activeKittens[i].kittenPos;
        numMatchesDisplay.innerHTML++;
        var coin = new _coin2.default(pos);
        coin.animateCoin();
        activeKittens[i].active = false;
        activeKittens[i].update(i);
        wordInput.value = "";
    }
}

// pick and show random  word 
function randomWord() {
    // Generate random array index
    var randomIndex = Math.floor(Math.random() * _words2.default.length);
    // Save random word to a variable & push it into currentWords array
    var word = _words2.default[randomIndex];
    _words2.default.splice(randomIndex, 1);
    currentWords.push(word);
    // Output a randomword
    return word;
}

function randomPosition() {
    var randomPosition = Math.floor(Math.random() * 136 + 1);
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
        var playerStats = {
            yourScore: score,
            totalChars: totalChars,
            min: time / 60,
            wpm: Math.floor(totalChars / 5 / ((startTime - time) / 60))
        };

        Object.freeze(playerStats);
        // Stop calling game logic
        clearInterval(init);
        // Display game over screen and player stats
        gameOver.style.display = "flex";
        finalScore.innerHTML = playerStats.yourScore;
        wpm.innerHTML = playerStats.wpm;
        // Reload game when player clicks button or presses space bar
        playAgainButton.addEventListener('click', function () {
            location.reload();
        });
        document.addEventListener('keyup', function (e) {
            if (e.keyCode === 32) {
                window.location.reload();
            }
        });
    }
}

// Animate the generated kittens 
function animate(activeKittens) {
    ctx.clearRect(0, 0, 1024, 450);

    for (var i = 0; i < activeKittens.length; i++) {
        var currentCat = activeKittens[i];

        if (currentCat.update()) {
            i--;
            // Lose life and render flag if kitten reaches shore
            livesDisplay.innerHTML--;
            var pos = currentCat.kittenPos;

            var rect = canvas.getBoundingClientRect();
            var left = rect.right - 160;
            var top = rect.top + pos[1];
            if (lives === 3) {
                flag1.style.left = "" + left + "px";
                flag1.style.top = "" + (top + "px");
                flag1.style.display = "inline";
            } else if (lives === 2) {
                flag2.style.left = "" + left + "px";
                flag2.style.top = "" + (top + "px");
                flag2.style.display = "inline";
            } else if (lives === 1) {
                flag3.style.left = "" + left + "px";
                flag3.style.top = "" + (top + "px");
                flag3.style.display = "inline";
            }
            lives--;

            if (lives === 0) {
                flag1.style.display = "none";
                flag2.style.display = "none";
                flag3.style.display = "none";
            }
        }
        currentCat.draw(ctx);
    }

    window.requestAnimationFrame(function (timestamp) {
        animate(activeKittens);
    });
}

/***/ }),

/***/ "./src/js/coin.js":
/*!************************!*\
  !*** ./src/js/coin.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coin = function () {
    function Coin(kittenPos) {
        _classCallCheck(this, Coin);

        this.pos = kittenPos;
        this.animateCoin = this.animateCoin.bind(this);
        this.draw = this.draw.bind(this);
        this.stopAnimation = false;
        this.img = new Image();
        this.img.src = "https://game-seeds.s3.amazonaws.com/coin-sprite-sheet.png";
        var canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.loopCount = 0;
        this.sx = 69;
        this.sy = 60;
        this.sw = 60;
        this.sh = 60;
        this.dx = this.pos[0];
        this.dy = this.pos[1];
        this.dw = 60;
        this.dh = 60;
        this.animateCoin();
    }
    // draw coin sprite


    _createClass(Coin, [{
        key: "drawCoin",
        value: function drawCoin() {
            this.coin = this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
        }
    }, {
        key: "draw",
        value: function draw() {
            if (this.stopAnimation) {
                return;
            }
            this.sx += this.dw;

            if (this.sx > 420) {
                this.loopAnimation();
            }
            this.drawCoin();
            this.test = requestAnimationFrame(this.draw);
            this.ctx.shadowColor = '#565656';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
        }
    }, {
        key: "animateCoin",
        value: function animateCoin() {
            this.draw();
        }
    }, {
        key: "loopAnimation",
        value: function loopAnimation() {
            this.sx = 0;
            this.sy = 0;
            this.loopCount++;
            this.checkLoop();
        }
        // Stop spinning coin after it has looped 3 times

    }, {
        key: "checkLoop",
        value: function checkLoop() {
            if (this.loopCount > 3) {
                this.stopAnimation = true;
            }
        }
    }]);

    return Coin;
}();

exports.default = Coin;

/***/ }),

/***/ "./src/js/flag.js":
/*!************************!*\
  !*** ./src/js/flag.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flag = function () {
    function Flag(kittenPos, ctx) {
        _classCallCheck(this, Flag);

        this.pos = kittenPos;
        this.animateFlag = this.animateFlag.bind(this);
        this.draw = this.draw.bind(this);
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = "https://game-seeds.s3.amazonaws.com/1-treasure.png";
        this.sx = 69;
        this.sy = 130;
        this.sw = 0;
        this.dx = this.pos[0];
        this.dy = this.pos[1];
        this.dw = 100;
        this.dh = 100;
        this.drawFlag();
    }

    _createClass(Flag, [{
        key: "drawFlag",
        value: function drawFlag() {
            this.flag = this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
            this.test = requestAnimationFrame(this.draw);
        }
    }, {
        key: "draw",
        value: function draw() {
            this.drawFlag();
            this.test = requestAnimationFrame(this.draw);
            this.ctx.shadowColor = '#565656';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = 2;
            this.ctx.shadowOffsetY = 2;
        }
    }, {
        key: "animateFlag",
        value: function animateFlag() {
            this.draw();
        }
    }, {
        key: "loopAnimation",
        value: function loopAnimation() {
            this.sx = 0;
            this.sy = 0;
            this.loopCount++;
            this.checkLoop();
        }
    }, {
        key: "checkLoop",
        value: function checkLoop() {
            if (this.loopCount > 2) {
                this.dy -= 50;
            }
        }
    }]);

    return Flag;
}();

exports.default = Flag;

/***/ }),

/***/ "./src/js/kitten.js":
/*!**************************!*\
  !*** ./src/js/kitten.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kitten = function () {
    function Kitten(kittenPos, word, kittenImage, ctx, lives) {
        var activeKittens = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
        var currentWords = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];

        _classCallCheck(this, Kitten);

        this.kittenPos = kittenPos;
        this.word = word;
        this.ctx = ctx;
        this.lives = lives;
        this.kittenImage = kittenImage;
        this.activeKittens = activeKittens;
        this.currentWords = currentWords;
        this.active = true;
    }

    _createClass(Kitten, [{
        key: "update",
        value: function update(i) {
            // move the kitten to the right
            this.kittenPos[0] += 1.5;
            // remove kitten & their respective word from active kittens & words list 
            // if they reach the shore or the player correctly types their word
            if (this.kittenPos[0] > 800 || this.active === false) {
                var _i = this.activeKittens.indexOf(this);
                this.activeKittens.splice(_i, 1);
                this.currentWords.splice(_i, 1);

                return true;
            }
            return false;
        }
    }, {
        key: "fly",
        value: function fly() {
            this.kittenPos[0] -= 5;
            this.kittenPos[1] -= 5;
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            ctx.drawImage.apply(ctx, [this.kittenImage].concat(_toConsumableArray(this.kittenPos)));
            ctx.font = "13px Poppins, sans-serif";
            ctx.fillStyle = "white";
            ctx.shadowColor = '#565656';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillText(this.word, this.kittenPos[0] + 20, this.kittenPos[1] + 119);
        }
    }]);

    return Kitten;
}();

exports.default = Kitten;

/***/ }),

/***/ "./src/js/words.js":
/*!*************************!*\
  !*** ./src/js/words.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var words = ['bubblegum', 'river', 'popcorn', 'revolver', 'magic', 'potato', 'blockhead', 'loophole', 'ambidextrous', 'fish', 'nineteen', 'clover', 'beeswax', 'cereal', 'chameleon', 'lightbulb', 'gibberish', 'serpent', 'gamble', 'bunny', 'doorman', 'amateur', 'jigsaw', 'cultish', 'bamboo', 'bumblebee', 'pumpkin', 'harmonica', 'haircut', 'jellyfish', 'quarrelsome', 'fax machine', 'fairies', 'rhyme', 'embarrassing', 'pajamas', 'duffel bag', 'overpriced', 'ketchup', 'koala', 'panther', 'flower', 'squishmallow', 'synesthesia', 'tempestuous', 'falafel', 'pedestrian', 'dennis rodman', 'basketball', 'rainforest', 'meow', 'dentures', 'helen keller', 'persian', 'kitten', 'pirate', 'eggnog', 'facetious', 'lettuce', 'mate', 'pancake', 'fork', 'soup', 'wine', 'wolverine', 'lovebird', 'shoe lace', 'drawer', 'peanuts', 'fake flowers', 'chocolate', 'credit card', 'sofa', 'sarong', 'tracksuit', 'juicy jacket', 'poncho', 'tankini', 'sunroof', 'sundress', 'bambi', 'cocoa', 'butter', 'carousel', 'stargazing', 'honey', 'marinade', 'fossils', 'somersault', 'trampoline', 'libra', 'aquarius', 'rainbow', 'gemini', 'scorpio', 'capricorn', 'book fair', 'hopskotch', 'sugar', 'blacklight', 'sugarfree', 'pluto', 'froth', 'tulips', 'sandy', 'bunkbed', 'chinatown', 'tortilla', 'parking lot', 'baby blue', 'racoon', 'valet', 'princess', 'peach', 'televisions', 'christmas', 'goth', 'cameo', 'forgot', 'angel', 'cacti', 'fire hydrant', 'shadow', 'dry cleaning', 'fingertips', 'cocoon', 'soccer', 'cassette', 'matador', 'jungle', 'tiger', 'darling', 'wink', 'smiles', 'monsoon', 'cowboy', 'shark', 'safari', 'moroccan', 'lemonade', 'limeade', 'mockingbird', 'luna', 'suave', 'madame', 'jet ski', 'speedo', 'matzo ball', 'lollipop', 'spanish', 'french', 'pebble', 'name tag'];

exports.default = words;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2luLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9mbGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dvcmRzLmpzIl0sIm5hbWVzIjpbInN0YXJ0VGltZSIsInRpbWUiLCJzY29yZSIsImlzUGxheWluZyIsImN1cnJlbnRXb3JkcyIsImFjdGl2ZUtpdHRlbnMiLCJmbGFnUG9zIiwibnVtTWF0Y2hlcyIsImxpdmVzIiwicmVsZWFzZUtpdHRlbkludGVydmFsIiwidG90YWxDaGFycyIsImtpdHRlbkltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5Qb3MiLCJjb2luU3ByaXRlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJ3b3JkSW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwic2NvcmVEaXNwbGF5IiwidGltZURpc3BsYXkiLCJudW1NYXRjaGVzRGlzcGxheSIsImxpdmVzRGlzcGxheSIsIm1lc3NhZ2UiLCJnYW1lT3ZlciIsImZpbmFsU2NvcmUiLCJ3cG0iLCJwbGF5QWdhaW5CdXR0b24iLCJnYW1lU3RhcnQiLCJmbGFnMSIsImZsYWcyIiwiZmxhZzMiLCJtb2RhbCIsImJ0biIsInNwYW4iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsIndpbmRvdyIsImUiLCJ0YXJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRHYW1lIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJpbml0IiwiZHJhd0tpdHRlbiIsImZvY3VzIiwiaGFuZGxlTWF0Y2giLCJzZXRJbnRlcnZhbCIsImNvdW50ZG93biIsImNoZWNrU3RhdHVzIiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVSZWxlYXNlS2l0dGVuSW50ZXJ2YWwiLCJ3b3JkIiwicmFuZG9tV29yZCIsIndvcmRzIiwibmV3S2l0dGVuIiwiS2l0dGVuIiwicHVzaCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRpbWVzdGFtcCIsInJlbGVhc2VNb3JlS2l0dGVucyIsImFuaW1hdGUiLCJwb3MiLCJyYW5kb21Qb3NpdGlvbiIsImlzR2FtZU92ZXIiLCJpbm5lckhUTUwiLCJtYXRjaElucHV0IiwiaW5kZXhPZiIsImkiLCJ3b3JkU2NvcmUiLCJsZW5ndGgiLCJjb2luIiwiQ29pbiIsImFuaW1hdGVDb2luIiwiYWN0aXZlIiwidXBkYXRlIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzcGxpY2UiLCJwbGF5ZXJTdGF0cyIsInlvdXJTY29yZSIsIm1pbiIsIk9iamVjdCIsImZyZWV6ZSIsImNsZWFySW50ZXJ2YWwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNsZWFyUmVjdCIsImN1cnJlbnRDYXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiZHJhdyIsImJpbmQiLCJzdG9wQW5pbWF0aW9uIiwiaW1nIiwibG9vcENvdW50Iiwic3giLCJzeSIsInN3Iiwic2giLCJkeCIsImR5IiwiZHciLCJkaCIsImRyYXdJbWFnZSIsImxvb3BBbmltYXRpb24iLCJkcmF3Q29pbiIsInRlc3QiLCJzaGFkb3dDb2xvciIsInNoYWRvd0JsdXIiLCJzaGFkb3dPZmZzZXRYIiwic2hhZG93T2Zmc2V0WSIsImNoZWNrTG9vcCIsIkZsYWciLCJhbmltYXRlRmxhZyIsImRyYXdGbGFnIiwiZmxhZyIsImZvbnQiLCJmaWxsU3R5bGUiLCJmaWxsVGV4dCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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QXZDVSxFQXdDVixPQXhDVSxFQXlDVixTQXpDVSxFQTBDVixRQTFDVSxFQTJDVixjQTNDVSxFQTRDVixhQTVDVSxFQTZDVixhQTdDVSxFQThDVixTQTlDVSxFQStDVixZQS9DVSxFQWdEVixlQWhEVSxFQWlEVixZQWpEVSxFQWtEVixZQWxEVSxFQW1EVixNQW5EVSxFQW9EVixVQXBEVSxFQXFEVixjQXJEVSxFQXNEVixTQXREVSxFQXVEVixRQXZEVSxFQXdEVixRQXhEVSxFQXlEVixRQXpEVSxFQTBEVixXQTFEVSxFQTJEVixTQTNEVSxFQTREVixNQTVEVSxFQTZEVixTQTdEVSxFQThEVixNQTlEVSxFQStEVixNQS9EVSxFQWdFVixNQWhFVSxFQWlFVixXQWpFVSxFQWtFVixVQWxFVSxFQW1FVixXQW5FVSxFQW9FVixRQXBFVSxFQXFFVixTQXJFVSxFQXNFVixjQXRFVSxFQXVFVixXQXZFVSxFQXdFVixhQXhFVSxFQXlFVixNQXpFVSxFQTBFVixRQTFFVSxFQTJFVixXQTNFVSxFQTRFVixjQTVFVSxFQTZFVixRQTdFVSxFQThFVixTQTlFVSxFQStFVixTQS9FVSxFQWdGVixVQWhGVSxFQWlGVixPQWpGVSxFQWtGVixPQWxGVSxFQW1GVixRQW5GVSxFQW9GVixVQXBGVSxFQXFGVixZQXJGVSxFQXNGVixPQXRGVSxFQXVGVixVQXZGVSxFQXdGVixTQXhGVSxFQXlGVixZQXpGVSxFQTBGVixZQTFGVSxFQTJGVixPQTNGVSxFQTRGVixVQTVGVSxFQTZGVixTQTdGVSxFQThGVixRQTlGVSxFQStGVixTQS9GVSxFQWdHVixXQWhHVSxFQWlHVixXQWpHVSxFQWtHVixXQWxHVSxFQW1HVixPQW5HVSxFQW9HVixZQXBHVSxFQXFHVixXQXJHVSxFQXNHVixPQXRHVSxFQXVHVixPQXZHVSxFQXdHVixRQXhHVSxFQXlHVixPQXpHVSxFQTBHVixTQTFHVSxFQTJHVixXQTNHVSxFQTRHVixVQTVHVSxFQTZHVixhQTdHVSxFQThHVixXQTlHVSxFQStHVixRQS9HVSxFQWdIVixPQWhIVSxFQWlIVixVQWpIVSxFQWtIVixPQWxIVSxFQW1IVixhQW5IVSxFQW9IVixXQXBIVSxFQXFIVixNQXJIVSxFQXNIVixPQXRIVSxFQXVIVixRQXZIVSxFQXdIVixPQXhIVSxFQXlIVixPQXpIVSxFQTBIVixjQTFIVSxFQTJIVixRQTNIVSxFQTRIVixjQTVIVSxFQTZIVixZQTdIVSxFQThIVixRQTlIVSxFQStIVixRQS9IVSxFQWdJVixVQWhJVSxFQWlJVixTQWpJVSxFQWtJVixRQWxJVSxFQW1JVixPQW5JVSxFQW9JVixTQXBJVSxFQXFJVixNQXJJVSxFQXNJVixRQXRJVSxFQXVJVixTQXZJVSxFQXdJVixRQXhJVSxFQXlJVixPQXpJVSxFQTBJVixRQTFJVSxFQTJJVixVQTNJVSxFQTRJVixVQTVJVSxFQTZJVixTQTdJVSxFQThJVixhQTlJVSxFQStJVixNQS9JVSxFQWdKVixPQWhKVSxFQWlKVixRQWpKVSxFQWtKVixTQWxKVSxFQW1KVixRQW5KVSxFQW9KVixZQXBKVSxFQXFKVixVQXJKVSxFQXNKVixTQXRKVSxFQXVKVixRQXZKVSxFQXdKVixRQXhKVSxFQXlKVixVQXpKVSxDQUFkOztrQkE0SmVBLEsiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgS2l0dGVuIGZyb20gXCIuL2pzL2tpdHRlblwiO1xuaW1wb3J0IHdvcmRzIGZyb20gXCIuL2pzL3dvcmRzXCI7XG5pbXBvcnQgQ29pbiBmcm9tIFwiLi9qcy9jb2luXCI7XG5pbXBvcnQgRmxhZyBmcm9tIFwiLi9qcy9mbGFnXCI7XG5cbi8vIEdsb2JhbHNcbmxldCBzdGFydFRpbWUgPSA0NTtcbmxldCB0aW1lID0gNDU7XG5sZXQgc2NvcmUgPSAwO1xubGV0IGlzUGxheWluZyA9IGZhbHNlO1xubGV0IGN1cnJlbnRXb3JkcyA9IFtdO1xubGV0IGFjdGl2ZUtpdHRlbnMgPSBbXTtcbmxldCBmbGFnUG9zID0gW107XG5sZXQgbnVtTWF0Y2hlcyA9IDA7XG5sZXQgbGl2ZXMgPSAzO1xubGV0IHJlbGVhc2VLaXR0ZW5JbnRlcnZhbCA9IDIwMDA7XG5sZXQgdG90YWxDaGFycyA9IDA7XG5cbi8vIEltYWdlc1xuY29uc3Qga2l0dGVuSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbmtpdHRlbkltYWdlLnNyYyA9ICdodHRwczovL2dhbWUtc2VlZHMuczMuYW1hem9uYXdzLmNvbS9waXJhdGUtb3V0bGluZS1oZWlnaHQtMTMwLnBuZyc7XG5jb25zdCBraXR0ZW5Qb3MgPSBbMCwgNDAwXTtcbmNvbnN0IGNvaW5TcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbmNvaW5TcHJpdGUuc3JjID0gXCJodHRwczovL2dhbWUtc2VlZHMuczMuYW1hem9uYXdzLmNvbS9jb2luLXNwcml0ZS1zaGVldC5wbmdcIjtcblxuLy8gRE9NIEVsZW1lbnRzXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IHdvcmRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JkLWlucHV0Jyk7XG5jb25zdCBzY29yZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKTtcbmNvbnN0IHRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWUnKTtcbmNvbnN0IG51bU1hdGNoZXNEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI251bU1hdGNoZXMnKTtcbmNvbnN0IGxpdmVzRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGl2ZXNcIik7XG5jb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcbmNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVvdmVyJyk7XG5jb25zdCBmaW5hbFNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmFsLXNjb3JlJyk7XG5jb25zdCB3cG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BtJyk7XG5jb25zdCBwbGF5QWdhaW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1hZ2Fpbi1idXR0b24nKTtcbmNvbnN0IGdhbWVTdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXN0YXJ0Jyk7XG5jb25zdCBmbGFnMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmbGFnMScpO1xuY29uc3QgZmxhZzIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmxhZzInKTtcbmNvbnN0IGZsYWczID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZsYWczJyk7XG5cbi8vIERpY3Rpb25hcnlcbi8vIGNvbnN0IGRpY3Rpb25hcnkgPSBjdXJyZW50TW9kZTtcbi8vIGNvbnN0IG1vZGUgPSB7XG4vLyAgICAgd29yZHM6IHdvcmRzLFxuLy8gICAgIGNvZGluZzogY29kaW5nLFxuLy8gfTtcblxuLy8gY29uc3QgY3VycmVudE1vZGUgPSBtb2RlLndvcmRzO1xuXG5cblxuLy8gTU9EQUxcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbmNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuXCIpO1xuY29uc3Qgc3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKVswXTtcblxuYnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xufTtcblxuc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsKSB7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG59O1xuXG4vLyBHQU1FIExPR0lDXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc3RhcnRHYW1lKTtcblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgICAvLyBTdGFydCBnYW1lIHdoZW4gcGxheWVyIHByZXNzZXMgc3BhY2UgYmFyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChpc1BsYXlpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZ2FtZVN0YXJ0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBpc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgZHJhd0tpdHRlbigpO1xuICAgIC8vIFN0YXJ0ICBtYXRjaGluZyBvbiB3b3JkIGlucHV0XG4gICAgd29yZElucHV0LmZvY3VzKCk7XG4gICAgd29yZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlTWF0Y2gpO1xuICAgIC8vIENsZWFyIGlucHV0IHdoZW4gcGxheWVyIHByZXNzZXMgZW50ZXJcbiAgICB3b3JkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB3b3JkSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2FsbCBjb3VudGRvd24gZXZlcnkgc2Vjb25kXG4gICAgc2V0SW50ZXJ2YWwoY291bnRkb3duLCAxMDAwKTtcbiAgICAvLyBDaGVjayBnYW1lIHN0YXR1c1xuICAgIHNldEludGVydmFsKGNoZWNrU3RhdHVzLCA1MCk7XG4gICAgLy8gQ2hlY2svdXBkYXRlIHNjb3JlIGV2ZXJ5IC40IHNlY29uZHNcbiAgICBzZXRJbnRlcnZhbCh1cGRhdGVTY29yZSwgNDAwKTtcbiAgICAvLyBHcmFkdWFsbHkgaW5jcmVhc2UgdGhlIHNwZWVkIHRoYXQga2l0dGVucyBhcmUgcmVsZWFzZWRcbiAgICBzZXRJbnRlcnZhbCh1cGRhdGVSZWxlYXNlS2l0dGVuSW50ZXJ2YWwsIDUwMCk7XG4gICAgLy8gc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCAyMDAwKTtcbn1cblxuZnVuY3Rpb24gZHJhd0tpdHRlbiAoKSB7XG4gICAgLy8gR2VuZXJhdGUgcmFuZG9tIHdvcmQgZm9yIGVhY2gga2l0dGVuXG4gICAgY29uc3Qgd29yZCA9IHJhbmRvbVdvcmQod29yZHMpO1xuICAgIC8vIENyZWF0ZSBuZXcgS2l0dGVuIG9iamVjdFxuICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4oWzAsIDIwMF0sIHdvcmQsIGtpdHRlbkltYWdlLCBjdHgsIG51bGwsIGFjdGl2ZUtpdHRlbnMsIGN1cnJlbnRXb3Jkcyk7XG4gICAgYWN0aXZlS2l0dGVucy5wdXNoKG5ld0tpdHRlbik7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgIGlmIChpc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHNldEludGVydmFsKHJlbGVhc2VNb3JlS2l0dGVucywgcmVsZWFzZUtpdHRlbkludGVydmFsKTtcbiAgICAgICAgICAgIGFuaW1hdGUoYWN0aXZlS2l0dGVucyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVsZWFzZU1vcmVLaXR0ZW5zKCkgeyAgXG4gICAgaWYgKGlzUGxheWluZykge1xuICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tV29yZCgpO1xuICAgICAgICBjb25zdCBwb3MgPSByYW5kb21Qb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBuZXdLaXR0ZW4gPSBuZXcgS2l0dGVuKHBvcywgd29yZCwga2l0dGVuSW1hZ2UsIGFjdGl2ZUtpdHRlbnMsIGN1cnJlbnRXb3JkcywgY3R4KTtcbiAgICAgICAgYWN0aXZlS2l0dGVucy5wdXNoKG5ld0tpdHRlbik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTY29yZSgpIHsgIFxuICAgIGlmICghaXNHYW1lT3ZlcigpKSAge1xuICAgICAgICBzY29yZURpc3BsYXkuaW5uZXJIVE1MID0gc2NvcmU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVSZWxlYXNlS2l0dGVuSW50ZXJ2YWwoKSB7IFxuICAgIHRoaXMucmVsZWFzZUtpdHRlbkludGVydmFsIC09MjAwO1xufVxuXG5mdW5jdGlvbiBtYXRjaElucHV0KCkge1xuICAgIGxldCB2YWx1ZSA9IHdvcmRJbnB1dC52YWx1ZTtcbiAgICBpZiAoY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGxldCB3b3JkU2NvcmUgPSB2YWx1ZS5sZW5ndGggKiAxMDA7XG4gICAgICAgIHNjb3JlICs9IHdvcmRTY29yZTtcbiAgICAgICAgdG90YWxDaGFycyArPSAod29yZFNjb3JlLzEwMCk7XG4gICAgICAgIG51bU1hdGNoZXMrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNYXRjaCgpIHtcbiAgICBsZXQgdmFsdWUgPSB3b3JkSW5wdXQudmFsdWU7XG4gICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKG1hdGNoSW5wdXQoKSAmJiAhaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGFjdGl2ZUtpdHRlbnNbaV0ua2l0dGVuUG9zO1xuICAgICAgICBudW1NYXRjaGVzRGlzcGxheS5pbm5lckhUTUwrKztcbiAgICAgICAgY29uc3QgY29pbiA9IG5ldyBDb2luKHBvcyk7XG4gICAgICAgIGNvaW4uYW5pbWF0ZUNvaW4oKTtcbiAgICAgICAgYWN0aXZlS2l0dGVuc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgYWN0aXZlS2l0dGVuc1tpXS51cGRhdGUoaSk7XG4gICAgICAgIHdvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgfVxufVxuXG4vLyBwaWNrIGFuZCBzaG93IHJhbmRvbSAgd29yZCBcbmZ1bmN0aW9uIHJhbmRvbVdvcmQoKSB7XG4gICAgLy8gR2VuZXJhdGUgcmFuZG9tIGFycmF5IGluZGV4XG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3Jkcy5sZW5ndGgpO1xuICAgIC8vIFNhdmUgcmFuZG9tIHdvcmQgdG8gYSB2YXJpYWJsZSAmIHB1c2ggaXQgaW50byBjdXJyZW50V29yZHMgYXJyYXlcbiAgICBjb25zdCB3b3JkID0gd29yZHNbcmFuZG9tSW5kZXhdO1xuICAgIHdvcmRzLnNwbGljZShyYW5kb21JbmRleCwgMSk7XG4gICAgY3VycmVudFdvcmRzLnB1c2god29yZCk7XG4gICAgLy8gT3V0cHV0IGEgcmFuZG9td29yZFxuICAgIHJldHVybiB3b3JkO1xufVxuXG5cbmZ1bmN0aW9uIHJhbmRvbVBvc2l0aW9uKCkgeyBcbiAgICBsZXQgcmFuZG9tUG9zaXRpb24gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTM2KSArIDEpO1xuICAgIHJhbmRvbVBvc2l0aW9uID0gMzE1IC0gcmFuZG9tUG9zaXRpb247XG4gICAgcmV0dXJuIFswLCByYW5kb21Qb3NpdGlvbl07XG59XG5cblxuLy8gQ291bnRkb3duIHRpbWVyXG5mdW5jdGlvbiBjb3VudGRvd24oKSB7XG4gICAgLy8gTWFrZSBzdXJlIHRpbWUgaGFzIG5vdCBydW4gb3V0XG4gICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgIC8vIGRlY3JlbWVudCB0aW1lXG4gICAgICAgIHRpbWUtLTtcbiAgICB9IGVsc2UgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIFNob3cgdGltZVxuICAgIHRpbWVEaXNwbGF5LmlubmVySFRNTCA9IHRpbWU7XG59XG5cbi8vIENoZWNrIGlmIGdhbWUgaXMgb3ZlciBcbmZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gICAgaWYgKHRpbWUgPT09IDAgfHwgbGl2ZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8vIENoZWNrIGdhbWUgc3RhdHVzXG5mdW5jdGlvbiBjaGVja1N0YXR1cygpIHtcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdQaXJhdGUgS2l0dGVucyc7XG4gICAgLy8gTG9naWMgZm9yIGNoYW5naW5nIHN0YXR1cyB3aGVuIGdhbWUgaXMgb3ZlclxuICAgIGlmIChpc0dhbWVPdmVyKCkgJiYgaXNQbGF5aW5nKSB7ICAgXG4gICAgICAgIGlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAvLyBTdG9yZSBwbGF5ZXIgc3RhdHMgdG8gZGlzcGxheSBvbiBnYW1lIG92ZXIgc2NyZWVuXG4gICAgICAgIGNvbnN0IHBsYXllclN0YXRzID0ge1xuICAgICAgICAgICAgeW91clNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgIHRvdGFsQ2hhcnM6IHRvdGFsQ2hhcnMsXG4gICAgICAgICAgICBtaW46IHRpbWUvNjAsXG4gICAgICAgICAgICB3cG06IE1hdGguZmxvb3IoKHRvdGFsQ2hhcnMvNSkgLyAoKHN0YXJ0VGltZS10aW1lKS82MCkpLFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShwbGF5ZXJTdGF0cyk7XG4gICAgICAgIC8vIFN0b3AgY2FsbGluZyBnYW1lIGxvZ2ljXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW5pdCk7XG4gICAgICAgIC8vIERpc3BsYXkgZ2FtZSBvdmVyIHNjcmVlbiBhbmQgcGxheWVyIHN0YXRzXG4gICAgICAgIGdhbWVPdmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZmluYWxTY29yZS5pbm5lckhUTUwgPSBwbGF5ZXJTdGF0cy55b3VyU2NvcmU7XG4gICAgICAgIHdwbS5pbm5lckhUTUwgPSBwbGF5ZXJTdGF0cy53cG07XG4gICAgICAgIC8vIFJlbG9hZCBnYW1lIHdoZW4gcGxheWVyIGNsaWNrcyBidXR0b24gb3IgcHJlc3NlcyBzcGFjZSBiYXJcbiAgICAgICAgcGxheUFnYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBBbmltYXRlIHRoZSBnZW5lcmF0ZWQga2l0dGVucyBcbmZ1bmN0aW9uIGFuaW1hdGUoYWN0aXZlS2l0dGVucykge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMTAyNCwgNDUwKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZUtpdHRlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudENhdCA9IGFjdGl2ZUtpdHRlbnNbaV07XG4gICAgICAgIFxuICAgICAgICBpZiAoY3VycmVudENhdC51cGRhdGUoKSkge1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAvLyBMb3NlIGxpZmUgYW5kIHJlbmRlciBmbGFnIGlmIGtpdHRlbiByZWFjaGVzIHNob3JlXG4gICAgICAgICAgICBsaXZlc0Rpc3BsYXkuaW5uZXJIVE1MLS07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBjdXJyZW50Q2F0LmtpdHRlblBvcztcbiAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gcmVjdC5yaWdodCAtIDE2MDtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IHJlY3QudG9wICtwb3NbMV07XG4gICAgICAgICAgICBpZiAobGl2ZXMgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBmbGFnMS5zdHlsZS5sZWZ0ID0gYCR7bGVmdH1gICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGZsYWcxLnN0eWxlLnRvcCA9IGAke3RvcCArIFwicHhcIn1gO1xuICAgICAgICAgICAgICAgIGZsYWcxLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXZlcyA9PT0gMikge1xuICAgICAgICAgICAgICAgIGZsYWcyLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fWAgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZmxhZzIuc3R5bGUudG9wID0gYCR7dG9wICsgXCJweFwifWA7XG4gICAgICAgICAgICAgICAgZmxhZzIuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpdmVzPT09MSkge1xuICAgICAgICAgICAgICAgIGZsYWczLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fWAgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZmxhZzMuc3R5bGUudG9wID0gYCR7dG9wICsgXCJweFwifWA7XG4gICAgICAgICAgICAgICAgZmxhZzMuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgbGl2ZXMtLTtcblxuICAgICAgICAgICAgaWYgKGxpdmVzPT09MCkge1xuICAgICAgICAgICAgICAgIGZsYWcxLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XG4gICAgICAgICAgICAgICAgZmxhZzIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIGZsYWczLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50Q2F0LmRyYXcoY3R4KTtcbiAgICB9XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKTtcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvaW4ge1xuXG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zKSB7XG4gICAgICAgdGhpcy5wb3MgPSBraXR0ZW5Qb3M7XG4gICAgICAgdGhpcy5hbmltYXRlQ29pbiA9IHRoaXMuYW5pbWF0ZUNvaW4uYmluZCh0aGlzKTtcbiAgICAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcbiAgICAgICB0aGlzLnN0b3BBbmltYXRpb24gPSBmYWxzZTtcbiAgICAgICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgIHRoaXMuaW1nLnNyYyA9IFwiaHR0cHM6Ly9nYW1lLXNlZWRzLnMzLmFtYXpvbmF3cy5jb20vY29pbi1zcHJpdGUtc2hlZXQucG5nXCI7XG4gICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgIHRoaXMubG9vcENvdW50ID0gMDtcbiAgICAgICB0aGlzLnN4ID0gNjk7XG4gICAgICAgdGhpcy5zeSA9IDYwO1xuICAgICAgIHRoaXMuc3cgPSA2MDtcbiAgICAgICB0aGlzLnNoID0gNjA7XG4gICAgICAgdGhpcy5keCA9IHRoaXMucG9zWzBdO1xuICAgICAgIHRoaXMuZHkgPSB0aGlzLnBvc1sxXTtcbiAgICAgICB0aGlzLmR3ID0gNjA7XG4gICAgICAgdGhpcy5kaCA9IDYwO1xuICAgICAgIHRoaXMuYW5pbWF0ZUNvaW4oKTtcbiAgICB9XG4gICAgLy8gZHJhdyBjb2luIHNwcml0ZVxuICAgIGRyYXdDb2luKCkge1xuICAgICAgICB0aGlzLmNvaW4gPSB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMuc3gsIHRoaXMuc3ksIHRoaXMuc3csIHRoaXMuc2gsIHRoaXMuZHgsIHRoaXMuZHksIHRoaXMuZHcsIHRoaXMuZGgpO1xuICAgIH0gXG5cbiAgICBkcmF3KCkge1xuICAgICAgICBpZiAodGhpcy5zdG9wQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeCArPSB0aGlzLmR3O1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3ggPiA0MjApIHtcbiAgICAgICAgICAgIHRoaXMubG9vcEFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd0NvaW4oKTtcbiAgICAgICAgdGhpcy50ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdyk7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd0NvbG9yID0gJyM1NjU2NTYnO1xuICAgICAgICB0aGlzLmN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFggPSAyO1xuICAgICAgICB0aGlzLmN0eC5zaGFkb3dPZmZzZXRZID0gMjtcbiAgICB9XG5cbiAgICBhbmltYXRlQ29pbigpIHtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuXG4gICAgbG9vcEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5zeCA9IDA7XG4gICAgICAgIHRoaXMuc3kgPSAwO1xuICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xuICAgICAgICB0aGlzLmNoZWNrTG9vcCgpO1xuICAgIH1cbiAgICAvLyBTdG9wIHNwaW5uaW5nIGNvaW4gYWZ0ZXIgaXQgaGFzIGxvb3BlZCAzIHRpbWVzXG4gICAgY2hlY2tMb29wKCkge1xuICAgICAgICBpZiAodGhpcy5sb29wQ291bnQgPiAzKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxhZyB7XG5cbiAgICBjb25zdHJ1Y3RvcihraXR0ZW5Qb3MsIGN0eCkge1xuICAgICAgICB0aGlzLnBvcyA9IGtpdHRlblBvcztcbiAgICAgICAgdGhpcy5hbmltYXRlRmxhZyA9IHRoaXMuYW5pbWF0ZUZsYWcuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5kcmF3ID0gdGhpcy5kcmF3LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltZy5zcmMgPSBcImh0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tLzEtdHJlYXN1cmUucG5nXCI7XG4gICAgICAgIHRoaXMuc3ggPSA2OTtcbiAgICAgICAgdGhpcy5zeSA9IDEzMDtcbiAgICAgICAgdGhpcy5zdyA9IDA7XG4gICAgICAgIHRoaXMuZHggPSB0aGlzLnBvc1swXTtcbiAgICAgICAgdGhpcy5keSA9IHRoaXMucG9zWzFdO1xuICAgICAgICB0aGlzLmR3ID0gMTAwO1xuICAgICAgICB0aGlzLmRoID0gMTAwO1xuICAgICAgICB0aGlzLmRyYXdGbGFnKCk7XG4gICAgfVxuXG4gICAgZHJhd0ZsYWcoKSB7XG4gICAgICAgIHRoaXMuZmxhZyA9IHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgdGhpcy5zeCwgdGhpcy5zeSwgdGhpcy5zdywgdGhpcy5zaCwgdGhpcy5keCwgdGhpcy5keSwgdGhpcy5kdywgdGhpcy5kaCk7XG4gICAgICAgIHRoaXMudGVzdCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRyYXcpO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuZHJhd0ZsYWcoKTtcbiAgICAgICAgdGhpcy50ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdyk7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd0NvbG9yID0gJyM1NjU2NTYnO1xuICAgICAgICB0aGlzLmN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFggPSAyO1xuICAgICAgICB0aGlzLmN0eC5zaGFkb3dPZmZzZXRZID0gMjtcbiAgICB9XG5cbiAgICBhbmltYXRlRmxhZygpIHtcbiAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgfVxuXG4gICAgbG9vcEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5zeCA9IDA7XG4gICAgICAgIHRoaXMuc3kgPSAwO1xuICAgICAgICB0aGlzLmxvb3BDb3VudCsrO1xuICAgICAgICB0aGlzLmNoZWNrTG9vcCgpO1xuICAgIH1cblxuICAgIGNoZWNrTG9vcCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcENvdW50ID4gMikge1xuICAgICAgICAgICAgdGhpcy5keSAtPSA1MDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJjbGFzcyBLaXR0ZW4ge1xuICAgIGNvbnN0cnVjdG9yKGtpdHRlblBvcywgd29yZCwga2l0dGVuSW1hZ2UsIGN0eCwgbGl2ZXMsIGFjdGl2ZUtpdHRlbnMgPSBbXSwgY3VycmVudFdvcmRzID0gW10pIHtcbiAgICAgICAgdGhpcy5raXR0ZW5Qb3MgPSBraXR0ZW5Qb3M7XG4gICAgICAgIHRoaXMud29yZCA9IHdvcmQ7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmxpdmVzID0gbGl2ZXM7XG4gICAgICAgIHRoaXMua2l0dGVuSW1hZ2UgPSBraXR0ZW5JbWFnZTtcbiAgICAgICAgdGhpcy5hY3RpdmVLaXR0ZW5zID0gYWN0aXZlS2l0dGVucztcbiAgICAgICAgdGhpcy5jdXJyZW50V29yZHMgPSBjdXJyZW50V29yZHM7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoaSkge1xuICAgICAgICAvLyBtb3ZlIHRoZSBraXR0ZW4gdG8gdGhlIHJpZ2h0XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDEuNTtcbiAgICAgICAgLy8gcmVtb3ZlIGtpdHRlbiAmIHRoZWlyIHJlc3BlY3RpdmUgd29yZCBmcm9tIGFjdGl2ZSBraXR0ZW5zICYgd29yZHMgbGlzdCBcbiAgICAgICAgLy8gaWYgdGhleSByZWFjaCB0aGUgc2hvcmUgb3IgdGhlIHBsYXllciBjb3JyZWN0bHkgdHlwZXMgdGhlaXIgd29yZFxuICAgICAgICBpZiAodGhpcy5raXR0ZW5Qb3NbMF0gPiA4MDAgfHwgdGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuYWN0aXZlS2l0dGVucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVLaXR0ZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdvcmRzLnNwbGljZShpLCAxKTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmbHkoKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdIC09IDU7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzFdIC09IDU7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmtpdHRlbkltYWdlLCAuLi50aGlzLmtpdHRlblBvcyk7XG4gICAgICAgIGN0eC5mb250ID0gXCIxM3B4IFBvcHBpbnMsIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyM1NjU2NTYnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgICBjdHguc2hhZG93T2Zmc2V0WCA9IDI7XG4gICAgICAgIGN0eC5zaGFkb3dPZmZzZXRZID0gMjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMud29yZCwgKHRoaXMua2l0dGVuUG9zWzBdICsgMjApLCAodGhpcy5raXR0ZW5Qb3NbMV0gKyAxMTkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtpdHRlbjsiLCJjb25zdCB3b3JkcyA9IFtcbiAgICAnYnViYmxlZ3VtJyxcbiAgICAncml2ZXInLFxuICAgICdwb3Bjb3JuJyxcbiAgICAncmV2b2x2ZXInLFxuICAgICdtYWdpYycsXG4gICAgJ3BvdGF0bycsXG4gICAgJ2Jsb2NraGVhZCcsXG4gICAgJ2xvb3Bob2xlJyxcbiAgICAnYW1iaWRleHRyb3VzJyxcbiAgICAnZmlzaCcsXG4gICAgJ25pbmV0ZWVuJyxcbiAgICAnY2xvdmVyJyxcbiAgICAnYmVlc3dheCcsXG4gICAgJ2NlcmVhbCcsXG4gICAgJ2NoYW1lbGVvbicsXG4gICAgJ2xpZ2h0YnVsYicsXG4gICAgJ2dpYmJlcmlzaCcsXG4gICAgJ3NlcnBlbnQnLFxuICAgICdnYW1ibGUnLFxuICAgICdidW5ueScsXG4gICAgJ2Rvb3JtYW4nLFxuICAgICdhbWF0ZXVyJyxcbiAgICAnamlnc2F3JyxcbiAgICAnY3VsdGlzaCcsXG4gICAgJ2JhbWJvbycsXG4gICAgJ2J1bWJsZWJlZScsXG4gICAgJ3B1bXBraW4nLFxuICAgICdoYXJtb25pY2EnLFxuICAgICdoYWlyY3V0JyxcbiAgICAnamVsbHlmaXNoJyxcbiAgICAncXVhcnJlbHNvbWUnLFxuICAgICdmYXggbWFjaGluZScsXG4gICAgJ2ZhaXJpZXMnLFxuICAgICdyaHltZScsXG4gICAgJ2VtYmFycmFzc2luZycsXG4gICAgJ3BhamFtYXMnLFxuICAgICdkdWZmZWwgYmFnJyxcbiAgICAnb3ZlcnByaWNlZCcsXG4gICAgJ2tldGNodXAnLFxuICAgICdrb2FsYScsXG4gICAgJ3BhbnRoZXInLFxuICAgICdmbG93ZXInLFxuICAgICdzcXVpc2htYWxsb3cnLFxuICAgICdzeW5lc3RoZXNpYScsXG4gICAgJ3RlbXBlc3R1b3VzJyxcbiAgICAnZmFsYWZlbCcsXG4gICAgJ3BlZGVzdHJpYW4nLFxuICAgICdkZW5uaXMgcm9kbWFuJyxcbiAgICAnYmFza2V0YmFsbCcsXG4gICAgJ3JhaW5mb3Jlc3QnLFxuICAgICdtZW93JyxcbiAgICAnZGVudHVyZXMnLFxuICAgICdoZWxlbiBrZWxsZXInLFxuICAgICdwZXJzaWFuJyxcbiAgICAna2l0dGVuJyxcbiAgICAncGlyYXRlJyxcbiAgICAnZWdnbm9nJyxcbiAgICAnZmFjZXRpb3VzJyxcbiAgICAnbGV0dHVjZScsXG4gICAgJ21hdGUnLFxuICAgICdwYW5jYWtlJyxcbiAgICAnZm9yaycsXG4gICAgJ3NvdXAnLFxuICAgICd3aW5lJyxcbiAgICAnd29sdmVyaW5lJyxcbiAgICAnbG92ZWJpcmQnLFxuICAgICdzaG9lIGxhY2UnLFxuICAgICdkcmF3ZXInLFxuICAgICdwZWFudXRzJyxcbiAgICAnZmFrZSBmbG93ZXJzJyxcbiAgICAnY2hvY29sYXRlJyxcbiAgICAnY3JlZGl0IGNhcmQnLFxuICAgICdzb2ZhJyxcbiAgICAnc2Fyb25nJyxcbiAgICAndHJhY2tzdWl0JyxcbiAgICAnanVpY3kgamFja2V0JyxcbiAgICAncG9uY2hvJyxcbiAgICAndGFua2luaScsXG4gICAgJ3N1bnJvb2YnLFxuICAgICdzdW5kcmVzcycsXG4gICAgJ2JhbWJpJyxcbiAgICAnY29jb2EnLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJvdXNlbCcsXG4gICAgJ3N0YXJnYXppbmcnLFxuICAgICdob25leScsXG4gICAgJ21hcmluYWRlJyxcbiAgICAnZm9zc2lscycsXG4gICAgJ3NvbWVyc2F1bHQnLFxuICAgICd0cmFtcG9saW5lJyxcbiAgICAnbGlicmEnLFxuICAgICdhcXVhcml1cycsXG4gICAgJ3JhaW5ib3cnLFxuICAgICdnZW1pbmknLFxuICAgICdzY29ycGlvJyxcbiAgICAnY2Fwcmljb3JuJyxcbiAgICAnYm9vayBmYWlyJyxcbiAgICAnaG9wc2tvdGNoJyxcbiAgICAnc3VnYXInLFxuICAgICdibGFja2xpZ2h0JyxcbiAgICAnc3VnYXJmcmVlJyxcbiAgICAncGx1dG8nLFxuICAgICdmcm90aCcsXG4gICAgJ3R1bGlwcycsXG4gICAgJ3NhbmR5JyxcbiAgICAnYnVua2JlZCcsXG4gICAgJ2NoaW5hdG93bicsXG4gICAgJ3RvcnRpbGxhJyxcbiAgICAncGFya2luZyBsb3QnLFxuICAgICdiYWJ5IGJsdWUnLFxuICAgICdyYWNvb24nLFxuICAgICd2YWxldCcsXG4gICAgJ3ByaW5jZXNzJyxcbiAgICAncGVhY2gnLFxuICAgICd0ZWxldmlzaW9ucycsXG4gICAgJ2NocmlzdG1hcycsXG4gICAgJ2dvdGgnLFxuICAgICdjYW1lbycsXG4gICAgJ2ZvcmdvdCcsXG4gICAgJ2FuZ2VsJyxcbiAgICAnY2FjdGknLFxuICAgICdmaXJlIGh5ZHJhbnQnLFxuICAgICdzaGFkb3cnLFxuICAgICdkcnkgY2xlYW5pbmcnLFxuICAgICdmaW5nZXJ0aXBzJyxcbiAgICAnY29jb29uJyxcbiAgICAnc29jY2VyJyxcbiAgICAnY2Fzc2V0dGUnLFxuICAgICdtYXRhZG9yJyxcbiAgICAnanVuZ2xlJyxcbiAgICAndGlnZXInLFxuICAgICdkYXJsaW5nJyxcbiAgICAnd2luaycsXG4gICAgJ3NtaWxlcycsXG4gICAgJ21vbnNvb24nLFxuICAgICdjb3dib3knLFxuICAgICdzaGFyaycsXG4gICAgJ3NhZmFyaScsXG4gICAgJ21vcm9jY2FuJyxcbiAgICAnbGVtb25hZGUnLFxuICAgICdsaW1lYWRlJyxcbiAgICAnbW9ja2luZ2JpcmQnLFxuICAgICdsdW5hJyxcbiAgICAnc3VhdmUnLFxuICAgICdtYWRhbWUnLFxuICAgICdqZXQgc2tpJyxcbiAgICAnc3BlZWRvJyxcbiAgICAnbWF0em8gYmFsbCcsXG4gICAgJ2xvbGxpcG9wJyxcbiAgICAnc3BhbmlzaCcsXG4gICAgJ2ZyZW5jaCcsXG4gICAgJ3BlYmJsZScsXG4gICAgJ25hbWUgdGFnJ1xuXTtcblxuZXhwb3J0IGRlZmF1bHQgd29yZHM7Il0sInNvdXJjZVJvb3QiOiIifQ==