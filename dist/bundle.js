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
                debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb2luLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9mbGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dvcmRzLmpzIl0sIm5hbWVzIjpbInN0YXJ0VGltZSIsInRpbWUiLCJzY29yZSIsImlzUGxheWluZyIsImN1cnJlbnRXb3JkcyIsImFjdGl2ZUtpdHRlbnMiLCJmbGFnUG9zIiwibnVtTWF0Y2hlcyIsImxpdmVzIiwicmVsZWFzZUtpdHRlbkludGVydmFsIiwidG90YWxDaGFycyIsImtpdHRlbkltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5Qb3MiLCJjb2luU3ByaXRlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJ3b3JkSW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwic2NvcmVEaXNwbGF5IiwidGltZURpc3BsYXkiLCJudW1NYXRjaGVzRGlzcGxheSIsImxpdmVzRGlzcGxheSIsIm1lc3NhZ2UiLCJnYW1lT3ZlciIsImZpbmFsU2NvcmUiLCJ3cG0iLCJwbGF5QWdhaW5CdXR0b24iLCJnYW1lU3RhcnQiLCJmbGFnMSIsImZsYWcyIiwiZmxhZzMiLCJtb2RhbCIsImJ0biIsInNwYW4iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib25jbGljayIsInN0eWxlIiwiZGlzcGxheSIsIndpbmRvdyIsImUiLCJ0YXJnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRHYW1lIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJpbml0IiwiZHJhd0tpdHRlbiIsImZvY3VzIiwiaGFuZGxlTWF0Y2giLCJzZXRJbnRlcnZhbCIsImNvdW50ZG93biIsImNoZWNrU3RhdHVzIiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVSZWxlYXNlS2l0dGVuSW50ZXJ2YWwiLCJ3b3JkIiwicmFuZG9tV29yZCIsIndvcmRzIiwibmV3S2l0dGVuIiwiS2l0dGVuIiwicHVzaCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRpbWVzdGFtcCIsInJlbGVhc2VNb3JlS2l0dGVucyIsImFuaW1hdGUiLCJwb3MiLCJyYW5kb21Qb3NpdGlvbiIsImlzR2FtZU92ZXIiLCJpbm5lckhUTUwiLCJtYXRjaElucHV0IiwiaW5kZXhPZiIsImkiLCJ3b3JkU2NvcmUiLCJsZW5ndGgiLCJjb2luIiwiQ29pbiIsImFuaW1hdGVDb2luIiwiYWN0aXZlIiwidXBkYXRlIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzcGxpY2UiLCJwbGF5ZXJTdGF0cyIsInlvdXJTY29yZSIsIm1pbiIsIk9iamVjdCIsImZyZWV6ZSIsImNsZWFySW50ZXJ2YWwiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNsZWFyUmVjdCIsImN1cnJlbnRDYXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiZHJhdyIsImJpbmQiLCJzdG9wQW5pbWF0aW9uIiwiaW1nIiwibG9vcENvdW50Iiwic3giLCJzeSIsInN3Iiwic2giLCJkeCIsImR5IiwiZHciLCJkaCIsImRyYXdJbWFnZSIsImxvb3BBbmltYXRpb24iLCJkcmF3Q29pbiIsInRlc3QiLCJzaGFkb3dDb2xvciIsInNoYWRvd0JsdXIiLCJzaGFkb3dPZmZzZXRYIiwic2hhZG93T2Zmc2V0WSIsImNoZWNrTG9vcCIsIkZsYWciLCJhbmltYXRlRmxhZyIsImRyYXdGbGFnIiwiZmxhZyIsImZvbnQiLCJmaWxsU3R5bGUiLCJmaWxsVGV4dCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7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dUNWLFNBdkNVLEVBd0NWLE9BeENVLEVBeUNWLFNBekNVLEVBMENWLFFBMUNVLEVBMkNWLGNBM0NVLEVBNENWLGFBNUNVLEVBNkNWLGFBN0NVLEVBOENWLFNBOUNVLEVBK0NWLFlBL0NVLEVBZ0RWLGVBaERVLEVBaURWLFlBakRVLEVBa0RWLFlBbERVLEVBbURWLE1BbkRVLEVBb0RWLFVBcERVLEVBcURWLGNBckRVLEVBc0RWLFNBdERVLEVBdURWLFFBdkRVLEVBd0RWLFFBeERVLEVBeURWLFFBekRVLEVBMERWLFdBMURVLEVBMkRWLFNBM0RVLEVBNERWLE1BNURVLEVBNkRWLFNBN0RVLEVBOERWLE1BOURVLEVBK0RWLE1BL0RVLEVBZ0VWLE1BaEVVLEVBaUVWLFdBakVVLEVBa0VWLFVBbEVVLEVBbUVWLFdBbkVVLEVBb0VWLFFBcEVVLEVBcUVWLFNBckVVLEVBc0VWLGNBdEVVLEVBdUVWLFdBdkVVLEVBd0VWLGFBeEVVLEVBeUVWLE1BekVVLEVBMEVWLFFBMUVVLEVBMkVWLFdBM0VVLEVBNEVWLGNBNUVVLEVBNkVWLFFBN0VVLEVBOEVWLFNBOUVVLEVBK0VWLFNBL0VVLEVBZ0ZWLFVBaEZVLEVBaUZWLE9BakZVLEVBa0ZWLE9BbEZVLEVBbUZWLFFBbkZVLEVBb0ZWLFVBcEZVLEVBcUZWLFlBckZVLEVBc0ZWLE9BdEZVLEVBdUZWLFVBdkZVLEVBd0ZWLFNBeEZVLEVBeUZWLFlBekZVLEVBMEZWLFlBMUZVLEVBMkZWLE9BM0ZVLEVBNEZWLFVBNUZVLEVBNkZWLFNBN0ZVLEVBOEZWLFFBOUZVLEVBK0ZWLFNBL0ZVLEVBZ0dWLFdBaEdVLEVBaUdWLFdBakdVLEVBa0dWLFdBbEdVLEVBbUdWLE9BbkdVLEVBb0dWLFlBcEdVLEVBcUdWLFdBckdVLEVBc0dWLE9BdEdVLEVBdUdWLE9BdkdVLEVBd0dWLFFBeEdVLEVBeUdWLE9BekdVLEVBMEdWLFNBMUdVLEVBMkdWLFdBM0dVLEVBNEdWLFVBNUdVLEVBNkdWLGFBN0dVLEVBOEdWLFdBOUdVLEVBK0dWLFFBL0dVLEVBZ0hWLE9BaEhVLEVBaUhWLFVBakhVLEVBa0hWLE9BbEhVLEVBbUhWLGFBbkhVLEVBb0hWLFdBcEhVLEVBcUhWLE1BckhVLEVBc0hWLE9BdEhVLEVBdUhWLFFBdkhVLEVBd0hWLE9BeEhVLEVBeUhWLE9BekhVLEVBMEhWLGNBMUhVLEVBMkhWLFFBM0hVLEVBNEhWLGNBNUhVLEVBNkhWLFlBN0hVLEVBOEhWLFFBOUhVLEVBK0hWLFFBL0hVLEVBZ0lWLFVBaElVLEVBaUlWLFNBaklVLEVBa0lWLFFBbElVLEVBbUlWLE9BbklVLEVBb0lWLFNBcElVLEVBcUlWLE1BcklVLEVBc0lWLFFBdElVLEVBdUlWLFNBdklVLEVBd0lWLFFBeElVLEVBeUlWLE9BeklVLEVBMElWLFFBMUlVLEVBMklWLFVBM0lVLEVBNElWLFVBNUlVLEVBNklWLFNBN0lVLEVBOElWLGFBOUlVLEVBK0lWLE1BL0lVLEVBZ0pWLE9BaEpVLEVBaUpWLFFBakpVLEVBa0pWLFNBbEpVLEVBbUpWLFFBbkpVLEVBb0pWLFlBcEpVLEVBcUpWLFVBckpVLEVBc0pWLFNBdEpVLEVBdUpWLFFBdkpVLEVBd0pWLFFBeEpVLEVBeUpWLFVBekpVLENBQWQ7O2tCQTRKZUEsSyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBLaXR0ZW4gZnJvbSBcIi4vanMva2l0dGVuXCI7XG5pbXBvcnQgd29yZHMgZnJvbSBcIi4vanMvd29yZHNcIjtcbmltcG9ydCBDb2luIGZyb20gXCIuL2pzL2NvaW5cIjtcbmltcG9ydCBGbGFnIGZyb20gXCIuL2pzL2ZsYWdcIjtcblxuLy8gR2xvYmFsc1xubGV0IHN0YXJ0VGltZSA9IDQ1O1xubGV0IHRpbWUgPSA0NTtcbmxldCBzY29yZSA9IDA7XG5sZXQgaXNQbGF5aW5nID0gZmFsc2U7XG5sZXQgY3VycmVudFdvcmRzID0gW107XG5sZXQgYWN0aXZlS2l0dGVucyA9IFtdO1xubGV0IGZsYWdQb3MgPSBbXTtcbmxldCBudW1NYXRjaGVzID0gMDtcbmxldCBsaXZlcyA9IDM7XG5sZXQgcmVsZWFzZUtpdHRlbkludGVydmFsID0gMjAwMDtcbmxldCB0b3RhbENoYXJzID0gMDtcblxuLy8gSW1hZ2VzXG5jb25zdCBraXR0ZW5JbWFnZSA9IG5ldyBJbWFnZSgpO1xua2l0dGVuSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tL3BpcmF0ZS1vdXRsaW5lLWhlaWdodC0xMzAucG5nJztcbmNvbnN0IGtpdHRlblBvcyA9IFswLCA0MDBdO1xuY29uc3QgY29pblNwcml0ZSA9IG5ldyBJbWFnZSgpO1xuY29pblNwcml0ZS5zcmMgPSBcImh0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tL2NvaW4tc3ByaXRlLXNoZWV0LnBuZ1wiO1xuXG4vLyBET00gRWxlbWVudHNcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3Qgd29yZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dvcmQtaW5wdXQnKTtcbmNvbnN0IHNjb3JlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xuY29uc3QgdGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZScpO1xuY29uc3QgbnVtTWF0Y2hlc0Rpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbnVtTWF0Y2hlcycpO1xuY29uc3QgbGl2ZXNEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXZlc1wiKTtcbmNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZW92ZXInKTtcbmNvbnN0IGZpbmFsU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluYWwtc2NvcmUnKTtcbmNvbnN0IHdwbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cG0nKTtcbmNvbnN0IHBsYXlBZ2FpbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluLWJ1dHRvbicpO1xuY29uc3QgZ2FtZVN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtc3RhcnQnKTtcbmNvbnN0IGZsYWcxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZsYWcxJyk7XG5jb25zdCBmbGFnMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmbGFnMicpO1xuY29uc3QgZmxhZzMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmxhZzMnKTtcblxuLy8gRGljdGlvbmFyeVxuLy8gY29uc3QgZGljdGlvbmFyeSA9IGN1cnJlbnRNb2RlO1xuLy8gY29uc3QgbW9kZSA9IHtcbi8vICAgICB3b3Jkczogd29yZHMsXG4vLyAgICAgY29kaW5nOiBjb2RpbmcsXG4vLyB9O1xuXG4vLyBjb25zdCBjdXJyZW50TW9kZSA9IG1vZGUud29yZHM7XG5cblxuXG4vLyBNT0RBTFxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpO1xuY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5cIik7XG5jb25zdCBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpWzBdO1xuXG5idG4ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG59O1xuXG5zcGFuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWwpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbn07XG5cbi8vIEdBTUUgTE9HSUNcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzdGFydEdhbWUpO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgIC8vIFN0YXJ0IGdhbWUgd2hlbiBwbGF5ZXIgcHJlc3NlcyBzcGFjZSBiYXJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGlzUGxheWluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBnYW1lU3RhcnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIGlzUGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd29yZElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBkcmF3S2l0dGVuKCk7XG4gICAgLy8gU3RhcnQgIG1hdGNoaW5nIG9uIHdvcmQgaW5wdXRcbiAgICB3b3JkSW5wdXQuZm9jdXMoKTtcbiAgICB3b3JkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVNYXRjaCk7XG4gICAgLy8gQ2xlYXIgaW5wdXQgd2hlbiBwbGF5ZXIgcHJlc3NlcyBlbnRlclxuICAgIHdvcmRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHdvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBDYWxsIGNvdW50ZG93biBldmVyeSBzZWNvbmRcbiAgICBzZXRJbnRlcnZhbChjb3VudGRvd24sIDEwMDApO1xuICAgIC8vIENoZWNrIGdhbWUgc3RhdHVzXG4gICAgc2V0SW50ZXJ2YWwoY2hlY2tTdGF0dXMsIDUwKTtcbiAgICAvLyBDaGVjay91cGRhdGUgc2NvcmUgZXZlcnkgLjQgc2Vjb25kc1xuICAgIHNldEludGVydmFsKHVwZGF0ZVNjb3JlLCA0MDApO1xuICAgIC8vIEdyYWR1YWxseSBpbmNyZWFzZSB0aGUgc3BlZWQgdGhhdCBraXR0ZW5zIGFyZSByZWxlYXNlZFxuICAgIHNldEludGVydmFsKHVwZGF0ZVJlbGVhc2VLaXR0ZW5JbnRlcnZhbCwgNTAwKTtcbiAgICAvLyBzZXRJbnRlcnZhbChyZWxlYXNlTW9yZUtpdHRlbnMsIDIwMDApO1xufVxuXG5mdW5jdGlvbiBkcmF3S2l0dGVuICgpIHtcbiAgICAvLyBHZW5lcmF0ZSByYW5kb20gd29yZCBmb3IgZWFjaCBraXR0ZW5cbiAgICBjb25zdCB3b3JkID0gcmFuZG9tV29yZCh3b3Jkcyk7XG4gICAgLy8gQ3JlYXRlIG5ldyBLaXR0ZW4gb2JqZWN0XG4gICAgY29uc3QgbmV3S2l0dGVuID0gbmV3IEtpdHRlbihbMCwgMjAwXSwgd29yZCwga2l0dGVuSW1hZ2UsIGN0eCwgbnVsbCwgYWN0aXZlS2l0dGVucywgY3VycmVudFdvcmRzKTtcbiAgICBhY3RpdmVLaXR0ZW5zLnB1c2gobmV3S2l0dGVuKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgaWYgKGlzUGxheWluZykge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCByZWxlYXNlS2l0dGVuSW50ZXJ2YWwpO1xuICAgICAgICAgICAgYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZWxlYXNlTW9yZUtpdHRlbnMoKSB7ICBcbiAgICBpZiAoaXNQbGF5aW5nKSB7XG4gICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKCk7XG4gICAgICAgIGNvbnN0IHBvcyA9IHJhbmRvbVBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4ocG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucywgY3VycmVudFdvcmRzLCBjdHgpO1xuICAgICAgICBhY3RpdmVLaXR0ZW5zLnB1c2gobmV3S2l0dGVuKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlKCkgeyAgXG4gICAgaWYgKCFpc0dhbWVPdmVyKCkpICB7XG4gICAgICAgIHNjb3JlRGlzcGxheS5pbm5lckhUTUwgPSBzY29yZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVJlbGVhc2VLaXR0ZW5JbnRlcnZhbCgpIHsgXG4gICAgdGhpcy5yZWxlYXNlS2l0dGVuSW50ZXJ2YWwgLT0yMDA7XG59XG5cbmZ1bmN0aW9uIG1hdGNoSW5wdXQoKSB7XG4gICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgIGlmIChjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICBsZXQgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgbGV0IHdvcmRTY29yZSA9IHZhbHVlLmxlbmd0aCAqIDEwMDtcbiAgICAgICAgc2NvcmUgKz0gd29yZFNjb3JlO1xuICAgICAgICB0b3RhbENoYXJzICs9ICh3b3JkU2NvcmUvMTAwKTtcbiAgICAgICAgbnVtTWF0Y2hlcysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1hdGNoKCkge1xuICAgIGxldCB2YWx1ZSA9IHdvcmRJbnB1dC52YWx1ZTtcbiAgICBsZXQgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAobWF0Y2hJbnB1dCgpICYmICFpc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgY29uc3QgcG9zID0gYWN0aXZlS2l0dGVuc1tpXS5raXR0ZW5Qb3M7XG4gICAgICAgIG51bU1hdGNoZXNEaXNwbGF5LmlubmVySFRNTCsrO1xuICAgICAgICBjb25zdCBjb2luID0gbmV3IENvaW4ocG9zKTtcbiAgICAgICAgY29pbi5hbmltYXRlQ29pbigpO1xuICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLnVwZGF0ZShpKTtcbiAgICAgICAgd29yZElucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9XG59XG5cbi8vIHBpY2sgYW5kIHNob3cgcmFuZG9tICB3b3JkIFxuZnVuY3Rpb24gcmFuZG9tV29yZCgpIHtcbiAgICAvLyBHZW5lcmF0ZSByYW5kb20gYXJyYXkgaW5kZXhcbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRzLmxlbmd0aCk7XG4gICAgLy8gU2F2ZSByYW5kb20gd29yZCB0byBhIHZhcmlhYmxlICYgcHVzaCBpdCBpbnRvIGN1cnJlbnRXb3JkcyBhcnJheVxuICAgIGNvbnN0IHdvcmQgPSB3b3Jkc1tyYW5kb21JbmRleF07XG4gICAgd29yZHMuc3BsaWNlKHJhbmRvbUluZGV4LCAxKTtcbiAgICBjdXJyZW50V29yZHMucHVzaCh3b3JkKTtcbiAgICAvLyBPdXRwdXQgYSByYW5kb213b3JkXG4gICAgcmV0dXJuIHdvcmQ7XG59XG5cblxuZnVuY3Rpb24gcmFuZG9tUG9zaXRpb24oKSB7IFxuICAgIGxldCByYW5kb21Qb3NpdGlvbiA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMzYpICsgMSk7XG4gICAgcmFuZG9tUG9zaXRpb24gPSAzMTUgLSByYW5kb21Qb3NpdGlvbjtcbiAgICByZXR1cm4gWzAsIHJhbmRvbVBvc2l0aW9uXTtcbn1cblxuXG4vLyBDb3VudGRvd24gdGltZXJcbmZ1bmN0aW9uIGNvdW50ZG93bigpIHtcbiAgICAvLyBNYWtlIHN1cmUgdGltZSBoYXMgbm90IHJ1biBvdXRcbiAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgLy8gZGVjcmVtZW50IHRpbWVcbiAgICAgICAgdGltZS0tO1xuICAgIH0gZWxzZSBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gU2hvdyB0aW1lXG4gICAgdGltZURpc3BsYXkuaW5uZXJIVE1MID0gdGltZTtcbn1cblxuLy8gQ2hlY2sgaWYgZ2FtZSBpcyBvdmVyIFxuZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICBpZiAodGltZSA9PT0gMCB8fCBsaXZlcyA8IDEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLy8gQ2hlY2sgZ2FtZSBzdGF0dXNcbmZ1bmN0aW9uIGNoZWNrU3RhdHVzKCkge1xuICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gJ1BpcmF0ZSBLaXR0ZW5zJztcbiAgICAvLyBMb2dpYyBmb3IgY2hhbmdpbmcgc3RhdHVzIHdoZW4gZ2FtZSBpcyBvdmVyXG4gICAgaWYgKGlzR2FtZU92ZXIoKSAmJiBpc1BsYXlpbmcpIHsgICBcbiAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIC8vIFN0b3JlIHBsYXllciBzdGF0cyB0byBkaXNwbGF5IG9uIGdhbWUgb3ZlciBzY3JlZW5cbiAgICAgICAgY29uc3QgcGxheWVyU3RhdHMgPSB7XG4gICAgICAgICAgICB5b3VyU2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAgdG90YWxDaGFyczogdG90YWxDaGFycyxcbiAgICAgICAgICAgIG1pbjogdGltZS82MCxcbiAgICAgICAgICAgIHdwbTogTWF0aC5mbG9vcigodG90YWxDaGFycy81KSAvICgoc3RhcnRUaW1lLXRpbWUpLzYwKSksXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBPYmplY3QuZnJlZXplKHBsYXllclN0YXRzKTtcbiAgICAgICAgLy8gU3RvcCBjYWxsaW5nIGdhbWUgbG9naWNcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbml0KTtcbiAgICAgICAgLy8gRGlzcGxheSBnYW1lIG92ZXIgc2NyZWVuIGFuZCBwbGF5ZXIgc3RhdHNcbiAgICAgICAgZ2FtZU92ZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBmaW5hbFNjb3JlLmlubmVySFRNTCA9IHBsYXllclN0YXRzLnlvdXJTY29yZTtcbiAgICAgICAgd3BtLmlubmVySFRNTCA9IHBsYXllclN0YXRzLndwbTtcbiAgICAgICAgLy8gUmVsb2FkIGdhbWUgd2hlbiBwbGF5ZXIgY2xpY2tzIGJ1dHRvbiBvciBwcmVzc2VzIHNwYWNlIGJhclxuICAgICAgICBwbGF5QWdhaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIEFuaW1hdGUgdGhlIGdlbmVyYXRlZCBraXR0ZW5zIFxuZnVuY3Rpb24gYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCAxMDI0LCA0NTApO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlS2l0dGVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50Q2F0ID0gYWN0aXZlS2l0dGVuc1tpXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjdXJyZW50Q2F0LnVwZGF0ZSgpKSB7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgICAgIC8vIExvc2UgbGlmZSBhbmQgcmVuZGVyIGZsYWcgaWYga2l0dGVuIHJlYWNoZXMgc2hvcmVcbiAgICAgICAgICAgIGxpdmVzRGlzcGxheS5pbm5lckhUTUwtLTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGN1cnJlbnRDYXQua2l0dGVuUG9zO1xuICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSByZWN0LnJpZ2h0IC0gMTYwO1xuICAgICAgICAgICAgY29uc3QgdG9wID0gcmVjdC50b3AgK3Bvc1sxXTtcbiAgICAgICAgICAgIGlmIChsaXZlcyA9PT0gMykge1xuICAgICAgICAgICAgICAgIGZsYWcxLnN0eWxlLmxlZnQgPSBgJHtsZWZ0fWAgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZmxhZzEuc3R5bGUudG9wID0gYCR7dG9wICsgXCJweFwifWA7XG4gICAgICAgICAgICAgICAgZmxhZzEuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpdmVzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgZmxhZzIuc3R5bGUubGVmdCA9IGAke2xlZnR9YCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBmbGFnMi5zdHlsZS50b3AgPSBgJHt0b3AgKyBcInB4XCJ9YDtcbiAgICAgICAgICAgICAgICBmbGFnMi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGl2ZXM9PT0xKSB7XG4gICAgICAgICAgICAgICAgZmxhZzMuc3R5bGUubGVmdCA9IGAke2xlZnR9YCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBmbGFnMy5zdHlsZS50b3AgPSBgJHt0b3AgKyBcInB4XCJ9YDtcbiAgICAgICAgICAgICAgICBmbGFnMy5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBsaXZlcy0tO1xuXG4gICAgICAgICAgICBpZiAobGl2ZXM9PT0wKSB7XG4gICAgICAgICAgICAgICAgZmxhZzEuc3R5bGUuZGlzcGxheT1cIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBmbGFnMi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgZmxhZzMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRDYXQuZHJhdyhjdHgpO1xuICAgIH1cblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4ge1xuICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29pbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihraXR0ZW5Qb3MpIHtcbiAgICAgICB0aGlzLnBvcyA9IGtpdHRlblBvcztcbiAgICAgICB0aGlzLmFuaW1hdGVDb2luID0gdGhpcy5hbmltYXRlQ29pbi5iaW5kKHRoaXMpO1xuICAgICAgIHRoaXMuZHJhdyA9IHRoaXMuZHJhdy5iaW5kKHRoaXMpO1xuICAgICAgIHRoaXMuc3RvcEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgdGhpcy5pbWcuc3JjID0gXCJodHRwczovL2dhbWUtc2VlZHMuczMuYW1hem9uYXdzLmNvbS9jb2luLXNwcml0ZS1zaGVldC5wbmdcIjtcbiAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgdGhpcy5sb29wQ291bnQgPSAwO1xuICAgICAgIHRoaXMuc3ggPSA2OTtcbiAgICAgICB0aGlzLnN5ID0gNjA7XG4gICAgICAgdGhpcy5zdyA9IDYwO1xuICAgICAgIHRoaXMuc2ggPSA2MDtcbiAgICAgICB0aGlzLmR4ID0gdGhpcy5wb3NbMF07XG4gICAgICAgdGhpcy5keSA9IHRoaXMucG9zWzFdO1xuICAgICAgIHRoaXMuZHcgPSA2MDtcbiAgICAgICB0aGlzLmRoID0gNjA7XG4gICAgICAgdGhpcy5hbmltYXRlQ29pbigpO1xuICAgIH1cbiAgICAvLyBkcmF3IGNvaW4gc3ByaXRlXG4gICAgZHJhd0NvaW4oKSB7XG4gICAgICAgIHRoaXMuY29pbiA9IHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgdGhpcy5zeCwgdGhpcy5zeSwgdGhpcy5zdywgdGhpcy5zaCwgdGhpcy5keCwgdGhpcy5keSwgdGhpcy5kdywgdGhpcy5kaCk7XG4gICAgfSBcblxuICAgIGRyYXcoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0b3BBbmltYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN4ICs9IHRoaXMuZHc7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zeCA+IDQyMCkge1xuICAgICAgICAgICAgdGhpcy5sb29wQW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3Q29pbigpO1xuICAgICAgICB0aGlzLnRlc3QgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kcmF3KTtcbiAgICAgICAgdGhpcy5jdHguc2hhZG93Q29sb3IgPSAnIzU2NTY1Nic7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd0JsdXIgPSAxMDtcbiAgICAgICAgdGhpcy5jdHguc2hhZG93T2Zmc2V0WCA9IDI7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFkgPSAyO1xuICAgIH1cblxuICAgIGFuaW1hdGVDb2luKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG5cbiAgICBsb29wQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnN4ID0gMDtcbiAgICAgICAgdGhpcy5zeSA9IDA7XG4gICAgICAgIHRoaXMubG9vcENvdW50Kys7XG4gICAgICAgIHRoaXMuY2hlY2tMb29wKCk7XG4gICAgfVxuICAgIC8vIFN0b3Agc3Bpbm5pbmcgY29pbiBhZnRlciBpdCBoYXMgbG9vcGVkIDMgdGltZXNcbiAgICBjaGVja0xvb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvb3BDb3VudCA+IDMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFnIHtcblxuICAgIGNvbnN0cnVjdG9yKGtpdHRlblBvcywgY3R4KSB7XG4gICAgICAgIHRoaXMucG9zID0ga2l0dGVuUG9zO1xuICAgICAgICB0aGlzLmFuaW1hdGVGbGFnID0gdGhpcy5hbmltYXRlRmxhZy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IFwiaHR0cHM6Ly9nYW1lLXNlZWRzLnMzLmFtYXpvbmF3cy5jb20vMS10cmVhc3VyZS5wbmdcIjtcbiAgICAgICAgdGhpcy5zeCA9IDY5O1xuICAgICAgICB0aGlzLnN5ID0gMTMwO1xuICAgICAgICB0aGlzLnN3ID0gMDtcbiAgICAgICAgdGhpcy5keCA9IHRoaXMucG9zWzBdO1xuICAgICAgICB0aGlzLmR5ID0gdGhpcy5wb3NbMV07XG4gICAgICAgIHRoaXMuZHcgPSAxMDA7XG4gICAgICAgIHRoaXMuZGggPSAxMDA7XG4gICAgICAgIHRoaXMuZHJhd0ZsYWcoKTtcbiAgICB9XG5cbiAgICBkcmF3RmxhZygpIHtcbiAgICAgICAgdGhpcy5mbGFnID0gdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLnN4LCB0aGlzLnN5LCB0aGlzLnN3LCB0aGlzLnNoLCB0aGlzLmR4LCB0aGlzLmR5LCB0aGlzLmR3LCB0aGlzLmRoKTtcbiAgICAgICAgdGhpcy50ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZHJhdyk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5kcmF3RmxhZygpO1xuICAgICAgICB0aGlzLnRlc3QgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kcmF3KTtcbiAgICAgICAgdGhpcy5jdHguc2hhZG93Q29sb3IgPSAnIzU2NTY1Nic7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd0JsdXIgPSAxMDtcbiAgICAgICAgdGhpcy5jdHguc2hhZG93T2Zmc2V0WCA9IDI7XG4gICAgICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFkgPSAyO1xuICAgIH1cblxuICAgIGFuaW1hdGVGbGFnKCkge1xuICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICB9XG5cbiAgICBsb29wQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnN4ID0gMDtcbiAgICAgICAgdGhpcy5zeSA9IDA7XG4gICAgICAgIHRoaXMubG9vcENvdW50Kys7XG4gICAgICAgIHRoaXMuY2hlY2tMb29wKCk7XG4gICAgfVxuXG4gICAgY2hlY2tMb29wKCkge1xuICAgICAgICBpZiAodGhpcy5sb29wQ291bnQgPiAyKSB7XG4gICAgICAgICAgICB0aGlzLmR5IC09IDUwO1xuICAgICAgICB9XG4gICAgfVxufSIsImNsYXNzIEtpdHRlbiB7XG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgY3R4LCBsaXZlcywgYWN0aXZlS2l0dGVucyA9IFtdLCBjdXJyZW50V29yZHMgPSBbXSkge1xuICAgICAgICB0aGlzLmtpdHRlblBvcyA9IGtpdHRlblBvcztcbiAgICAgICAgdGhpcy53b3JkID0gd29yZDtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBsaXZlcztcbiAgICAgICAgdGhpcy5raXR0ZW5JbWFnZSA9IGtpdHRlbkltYWdlO1xuICAgICAgICB0aGlzLmFjdGl2ZUtpdHRlbnMgPSBhY3RpdmVLaXR0ZW5zO1xuICAgICAgICB0aGlzLmN1cnJlbnRXb3JkcyA9IGN1cnJlbnRXb3JkcztcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZShpKSB7XG4gICAgICAgIC8vIG1vdmUgdGhlIGtpdHRlbiB0byB0aGUgcmlnaHRcbiAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMF0gKz0gMS41O1xuICAgICAgICAvLyByZW1vdmUga2l0dGVuICYgdGhlaXIgcmVzcGVjdGl2ZSB3b3JkIGZyb20gYWN0aXZlIGtpdHRlbnMgJiB3b3JkcyBsaXN0IFxuICAgICAgICAvLyBpZiB0aGV5IHJlYWNoIHRoZSBzaG9yZSBvciB0aGUgcGxheWVyIGNvcnJlY3RseSB0eXBlcyB0aGVpciB3b3JkXG4gICAgICAgIGlmICh0aGlzLmtpdHRlblBvc1swXSA+IDgwMCB8fCB0aGlzLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuYWN0aXZlS2l0dGVucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVLaXR0ZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdvcmRzLnNwbGljZShpLCAxKTtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmbHkoKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdIC09IDU7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzFdIC09IDU7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmtpdHRlbkltYWdlLCAuLi50aGlzLmtpdHRlblBvcyk7XG4gICAgICAgIGN0eC5mb250ID0gXCIxM3B4IFBvcHBpbnMsIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyM1NjU2NTYnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgICBjdHguc2hhZG93T2Zmc2V0WCA9IDI7XG4gICAgICAgIGN0eC5zaGFkb3dPZmZzZXRZID0gMjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMud29yZCwgKHRoaXMua2l0dGVuUG9zWzBdICsgMjApLCAodGhpcy5raXR0ZW5Qb3NbMV0gKyAxMTkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtpdHRlbjsiLCJjb25zdCB3b3JkcyA9IFtcbiAgICAnYnViYmxlZ3VtJyxcbiAgICAncml2ZXInLFxuICAgICdwb3Bjb3JuJyxcbiAgICAncmV2b2x2ZXInLFxuICAgICdtYWdpYycsXG4gICAgJ3BvdGF0bycsXG4gICAgJ2Jsb2NraGVhZCcsXG4gICAgJ2xvb3Bob2xlJyxcbiAgICAnYW1iaWRleHRyb3VzJyxcbiAgICAnZmlzaCcsXG4gICAgJ25pbmV0ZWVuJyxcbiAgICAnY2xvdmVyJyxcbiAgICAnYmVlc3dheCcsXG4gICAgJ2NlcmVhbCcsXG4gICAgJ2NoYW1lbGVvbicsXG4gICAgJ2xpZ2h0YnVsYicsXG4gICAgJ2dpYmJlcmlzaCcsXG4gICAgJ3NlcnBlbnQnLFxuICAgICdnYW1ibGUnLFxuICAgICdidW5ueScsXG4gICAgJ2Rvb3JtYW4nLFxuICAgICdhbWF0ZXVyJyxcbiAgICAnamlnc2F3JyxcbiAgICAnY3VsdGlzaCcsXG4gICAgJ2JhbWJvbycsXG4gICAgJ2J1bWJsZWJlZScsXG4gICAgJ3B1bXBraW4nLFxuICAgICdoYXJtb25pY2EnLFxuICAgICdoYWlyY3V0JyxcbiAgICAnamVsbHlmaXNoJyxcbiAgICAncXVhcnJlbHNvbWUnLFxuICAgICdmYXggbWFjaGluZScsXG4gICAgJ2ZhaXJpZXMnLFxuICAgICdyaHltZScsXG4gICAgJ2VtYmFycmFzc2luZycsXG4gICAgJ3BhamFtYXMnLFxuICAgICdkdWZmZWwgYmFnJyxcbiAgICAnb3ZlcnByaWNlZCcsXG4gICAgJ2tldGNodXAnLFxuICAgICdrb2FsYScsXG4gICAgJ3BhbnRoZXInLFxuICAgICdmbG93ZXInLFxuICAgICdzcXVpc2htYWxsb3cnLFxuICAgICdzeW5lc3RoZXNpYScsXG4gICAgJ3RlbXBlc3R1b3VzJyxcbiAgICAnZmFsYWZlbCcsXG4gICAgJ3BlZGVzdHJpYW4nLFxuICAgICdkZW5uaXMgcm9kbWFuJyxcbiAgICAnYmFza2V0YmFsbCcsXG4gICAgJ3JhaW5mb3Jlc3QnLFxuICAgICdtZW93JyxcbiAgICAnZGVudHVyZXMnLFxuICAgICdoZWxlbiBrZWxsZXInLFxuICAgICdwZXJzaWFuJyxcbiAgICAna2l0dGVuJyxcbiAgICAncGlyYXRlJyxcbiAgICAnZWdnbm9nJyxcbiAgICAnZmFjZXRpb3VzJyxcbiAgICAnbGV0dHVjZScsXG4gICAgJ21hdGUnLFxuICAgICdwYW5jYWtlJyxcbiAgICAnZm9yaycsXG4gICAgJ3NvdXAnLFxuICAgICd3aW5lJyxcbiAgICAnd29sdmVyaW5lJyxcbiAgICAnbG92ZWJpcmQnLFxuICAgICdzaG9lIGxhY2UnLFxuICAgICdkcmF3ZXInLFxuICAgICdwZWFudXRzJyxcbiAgICAnZmFrZSBmbG93ZXJzJyxcbiAgICAnY2hvY29sYXRlJyxcbiAgICAnY3JlZGl0IGNhcmQnLFxuICAgICdzb2ZhJyxcbiAgICAnc2Fyb25nJyxcbiAgICAndHJhY2tzdWl0JyxcbiAgICAnanVpY3kgamFja2V0JyxcbiAgICAncG9uY2hvJyxcbiAgICAndGFua2luaScsXG4gICAgJ3N1bnJvb2YnLFxuICAgICdzdW5kcmVzcycsXG4gICAgJ2JhbWJpJyxcbiAgICAnY29jb2EnLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJvdXNlbCcsXG4gICAgJ3N0YXJnYXppbmcnLFxuICAgICdob25leScsXG4gICAgJ21hcmluYWRlJyxcbiAgICAnZm9zc2lscycsXG4gICAgJ3NvbWVyc2F1bHQnLFxuICAgICd0cmFtcG9saW5lJyxcbiAgICAnbGlicmEnLFxuICAgICdhcXVhcml1cycsXG4gICAgJ3JhaW5ib3cnLFxuICAgICdnZW1pbmknLFxuICAgICdzY29ycGlvJyxcbiAgICAnY2Fwcmljb3JuJyxcbiAgICAnYm9vayBmYWlyJyxcbiAgICAnaG9wc2tvdGNoJyxcbiAgICAnc3VnYXInLFxuICAgICdibGFja2xpZ2h0JyxcbiAgICAnc3VnYXJmcmVlJyxcbiAgICAncGx1dG8nLFxuICAgICdmcm90aCcsXG4gICAgJ3R1bGlwcycsXG4gICAgJ3NhbmR5JyxcbiAgICAnYnVua2JlZCcsXG4gICAgJ2NoaW5hdG93bicsXG4gICAgJ3RvcnRpbGxhJyxcbiAgICAncGFya2luZyBsb3QnLFxuICAgICdiYWJ5IGJsdWUnLFxuICAgICdyYWNvb24nLFxuICAgICd2YWxldCcsXG4gICAgJ3ByaW5jZXNzJyxcbiAgICAncGVhY2gnLFxuICAgICd0ZWxldmlzaW9ucycsXG4gICAgJ2NocmlzdG1hcycsXG4gICAgJ2dvdGgnLFxuICAgICdjYW1lbycsXG4gICAgJ2ZvcmdvdCcsXG4gICAgJ2FuZ2VsJyxcbiAgICAnY2FjdGknLFxuICAgICdmaXJlIGh5ZHJhbnQnLFxuICAgICdzaGFkb3cnLFxuICAgICdkcnkgY2xlYW5pbmcnLFxuICAgICdmaW5nZXJ0aXBzJyxcbiAgICAnY29jb29uJyxcbiAgICAnc29jY2VyJyxcbiAgICAnY2Fzc2V0dGUnLFxuICAgICdtYXRhZG9yJyxcbiAgICAnanVuZ2xlJyxcbiAgICAndGlnZXInLFxuICAgICdkYXJsaW5nJyxcbiAgICAnd2luaycsXG4gICAgJ3NtaWxlcycsXG4gICAgJ21vbnNvb24nLFxuICAgICdjb3dib3knLFxuICAgICdzaGFyaycsXG4gICAgJ3NhZmFyaScsXG4gICAgJ21vcm9jY2FuJyxcbiAgICAnbGVtb25hZGUnLFxuICAgICdsaW1lYWRlJyxcbiAgICAnbW9ja2luZ2JpcmQnLFxuICAgICdsdW5hJyxcbiAgICAnc3VhdmUnLFxuICAgICdtYWRhbWUnLFxuICAgICdqZXQgc2tpJyxcbiAgICAnc3BlZWRvJyxcbiAgICAnbWF0em8gYmFsbCcsXG4gICAgJ2xvbGxpcG9wJyxcbiAgICAnc3BhbmlzaCcsXG4gICAgJ2ZyZW5jaCcsXG4gICAgJ3BlYmJsZScsXG4gICAgJ25hbWUgdGFnJ1xuXTtcblxuZXhwb3J0IGRlZmF1bHQgd29yZHM7Il0sInNvdXJjZVJvb3QiOiIifQ==