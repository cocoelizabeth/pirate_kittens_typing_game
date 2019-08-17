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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', init);
// Globals
// modes

var time = 30;
var score = 0;
var isPlaying = void 0;
var currentWords = [];
var activeKittens = [];

var kittenImage = new Image();
kittenImage.src = 'https://game-seeds.s3.amazonaws.com/2-pirates-copy.png';
var kittenPos = [0, 400];

// DOM Elements
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var wordInput = document.querySelector('#word-input');
var scoreDisplay = document.querySelector('#score');
var timeDisplay = document.querySelector('#time');
var message = document.querySelector('#message');
var gameOver = document.querySelector('.gameover');
var finalScore = document.querySelector('#final-score');
var wpm = document.querySelector('#wpm');

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
    // onChange??
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    // setInterval(releaseMoreKittens, 2000);
}

function releaseMoreKittens() {
    var word = randomWord();
    var pos = randomPosition();
    var newKitten = new _kitten2.default(pos, word, kittenImage, activeKittens, currentWords, ctx);
    activeKittens.push(newKitten);
    // window.requestAnimationFrame(() => animate(newKitten))
    // window.requestAnimationFrame(() => animate(newKitten));
}

function matchInput() {
    var value = wordInput.value;
    if (currentWords.indexOf(value) > -1) {
        var i = currentWords.indexOf(value);
        score++;
        scoreDisplay.innerHTML++;
        return true;
    }
}

function handleMatch() {
    var value = wordInput.value;
    var i = currentWords.indexOf(value);
    if (matchInput()) {
        isPlaying = true;
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
    currentWords.push(word);
    // Output a randomword
    return word;
}

function randomPosition() {
    var randomPosition = Math.floor(Math.random() * 136 + 1);
    randomPosition = 400 - randomPosition;
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
        var playerStats = {
            yourScore: score,
            wpm: Math.floor(score * 2)
        };
        Object.freeze(playerStats);
        clearInterval(init);

        gameOver.style.display = "flex";
        debugger;
        finalScore.innerHTML = playerStats.yourScore;
        debugger;
        wpm.innerHTML = playerStats.wpm;
        message.innerHTML = 'Game Over!';

        score = 0;
        scoreDisplay.innerHTML = 0;
    }
}

function animate(activeKittens) {
    ctx.clearRect(0, 0, 800, 600);

    for (var i = 0; i < activeKittens.length; i++) {
        var currentCat = activeKittens[i];
        if (currentCat.update()) i--;
        currentCat.draw(ctx);
    }

    // if (kittenPos[0] < 800 ) {
    // c.style.transform =`translate(${kittenPos[0]}px, 0px)`
    // document.getElementById('cheetah');
    // DOM Manipulation (as opposed to canvas-- maybe come back to this if you comment 'c' back in above)
    window.requestAnimationFrame(function (timestamp) {

        animate(activeKittens);
    });
    // }
}
kittenImage.onload = function () {
    var word = randomWord(_words2.default);
    var newKitten = new _kitten2.default([0, 400], word, kittenImage, activeKittens, currentWords, ctx);

    activeKittens.push(newKitten);
    window.requestAnimationFrame(function (timestamp) {
        setInterval(releaseMoreKittens, 2000);
        animate(activeKittens);
    });
};

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
    function Kitten(kittenPos, word, kittenImage) {
        var activeKittens = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        var currentWords = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

        _classCallCheck(this, Kitten);

        this.kittenPos = kittenPos;
        this.word = word;
        this.kittenImage = kittenImage;
        this.activeKittens = activeKittens;
        this.currentWords = currentWords;
        this.active = true;
    }

    _createClass(Kitten, [{
        key: "update",
        value: function update(i) {

            this.kittenPos[0]++;
            if (this.active === false) {
                this.fly();
                // this.activeKittens.splice(i, 1);
            }
            if (this.kittenPos[0] > 800) {
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
            this.kittenPos[0] += 5;
            this.kittenPos[1] -= 5;
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            // debugger
            ctx.drawImage.apply(ctx, [this.kittenImage].concat(_toConsumableArray(this.kittenPos)));
            ctx.font = "16px Poppins, sans-serif";
            //  ctx.font = "16px Anton, sans-serif";
            // ctx.font = "16px Jura, sans-serif";
            // ctx.font-family ="UnifrakturCook, sans-serif";
            // ctx.font-size="16px";
            ctx.fillStyle = "white";
            ctx.fillText(this.word, this.kittenPos[0] + 30, this.kittenPos[1] + 166);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dvcmRzLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwidGltZSIsInNjb3JlIiwiaXNQbGF5aW5nIiwiY3VycmVudFdvcmRzIiwiYWN0aXZlS2l0dGVucyIsImtpdHRlbkltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5Qb3MiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndvcmRJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJzY29yZURpc3BsYXkiLCJ0aW1lRGlzcGxheSIsIm1lc3NhZ2UiLCJnYW1lT3ZlciIsImZpbmFsU2NvcmUiLCJ3cG0iLCJoYW5kbGVNYXRjaCIsInNldEludGVydmFsIiwiY291bnRkb3duIiwiY2hlY2tTdGF0dXMiLCJyZWxlYXNlTW9yZUtpdHRlbnMiLCJ3b3JkIiwicmFuZG9tV29yZCIsInBvcyIsInJhbmRvbVBvc2l0aW9uIiwibmV3S2l0dGVuIiwiS2l0dGVuIiwicHVzaCIsIm1hdGNoSW5wdXQiLCJ2YWx1ZSIsImluZGV4T2YiLCJpIiwiaW5uZXJIVE1MIiwiYWN0aXZlIiwidXBkYXRlIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ3b3JkcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJTdGF0cyIsInlvdXJTY29yZSIsIk9iamVjdCIsImZyZWV6ZSIsImNsZWFySW50ZXJ2YWwiLCJzdHlsZSIsImRpc3BsYXkiLCJhbmltYXRlIiwiY2xlYXJSZWN0IiwiY3VycmVudENhdCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lc3RhbXAiLCJvbmxvYWQiLCJmbHkiLCJzcGxp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VixXQTlCVSxFQStCVixhQS9CVSxFQWdDVixhQWhDVSxFQWlDVixTQWpDVSxFQWtDVixPQWxDVSxFQW1DVixjQW5DVSxFQW9DVixTQXBDVSxFQXFDVixZQXJDVSxFQXNDVixZQXRDVSxFQXVDVixTQXZDVSxFQXdDVixPQXhDVSxFQXlDVixTQXpDVSxFQTBDVixRQTFDVSxFQTJDVixjQTNDVSxFQTRDVixhQTVDVSxFQTZDVixhQTdDVSxFQThDVixTQTlDVSxFQStDVixZQS9DVSxFQWdEVixlQWhEVSxFQWlEVixZQWpEVSxFQWtEVixZQWxEVSxFQW1EVixNQW5EVSxFQW9EVixVQXBEVSxFQXFEVixjQXJEVSxFQXNEVixTQXREVSxFQXVEVixRQXZEVSxFQXdEVixRQXhEVSxFQXlEVixRQXpEVSxFQTBEVixXQTFEVSxFQTJEVixTQTNEVSxFQTREVixNQTVEVSxFQTZEVixTQTdEVSxFQThEVixNQTlEVSxFQStEVixNQS9EVSxFQWdFVixNQWhFVSxFQWlFVixXQWpFVSxFQWtFVixVQWxFVSxFQW1FVixXQW5FVSxFQW9FVixRQXBFVSxFQXFFVixTQXJFVSxFQXNFVixjQXRFVSxFQXVFVixXQXZFVSxFQXdFVixhQXhFVSxFQXlFVixNQXpFVSxFQTBFVixRQTFFVSxFQTJFVixXQTNFVSxFQTRFVixjQTVFVSxFQTZFVixRQTdFVSxFQThFVixTQTlFVSxFQStFVixTQS9FVSxFQWdGVixVQWhGVSxFQWlGVixPQWpGVSxFQWtGVixPQWxGVSxFQW1GVixRQW5GVSxFQW9GVixVQXBGVSxFQXFGVixZQXJGVSxFQXNGVixPQXRGVSxFQXVGVixVQXZGVSxFQXdGVixTQXhGVSxFQXlGVixZQXpGVSxFQTBGVixZQTFGVSxFQTJGVixPQTNGVSxFQTRGVixVQTVGVSxFQTZGVixTQTdGVSxFQThGVixRQTlGVSxFQStGVixTQS9GVSxFQWdHVixXQWhHVSxFQWlHVixXQWpHVSxFQWtHVixXQWxHVSxFQW1HVixPQW5HVSxFQW9HVixZQXBHVSxFQXFHVixXQXJHVSxFQXNHVixPQXRHVSxFQXVHVixPQXZHVSxFQXdHVixRQXhHVSxFQXlHVixPQXpHVSxFQTBHVixTQTFHVSxFQTJHVixXQTNHVSxFQTRHVixVQTVHVSxFQTZHVixhQTdHVSxFQThHVixXQTlHVSxFQStHVixRQS9HVSxFQWdIVixPQWhIVSxFQWlIVixVQWpIVSxFQWtIVixPQWxIVSxFQW1IVixhQW5IVSxFQW9IVixXQXBIVSxFQXFIVixNQXJIVSxFQXNIVixPQXRIVSxFQXVIVixRQXZIVSxFQXdIVixPQXhIVSxFQXlIVixPQXpIVSxFQTBIVixjQTFIVSxFQTJIVixRQTNIVSxFQTRIVixjQTVIVSxFQTZIVixZQTdIVSxFQThIVixRQTlIVSxFQStIVixRQS9IVSxFQWdJVixVQWhJVSxFQWlJVixTQWpJVSxFQWtJVixRQWxJVSxFQW1JVixPQW5JVSxFQW9JVixTQXBJVSxFQXFJVixNQXJJVSxFQXNJVixRQXRJVSxFQXVJVixTQXZJVSxFQXdJVixRQXhJVSxFQXlJVixPQXpJVSxFQTBJVixRQTFJVSxFQTJJVixVQTNJVSxFQTRJVixVQTVJVSxFQTZJVixTQTdJVSxFQThJVixhQTlJVSxFQStJVixNQS9JVSxFQWdKVixPQWhKVSxFQWlKVixRQWpKVSxFQWtKVixTQWxKVSxFQW1KVixRQW5KVSxFQW9KVixZQXBKVSxFQXFKVixVQXJKVSxFQXNKVixTQXRKVSxFQXVKVixRQXZKVSxFQXdKVixRQXhKVSxFQXlKVixVQXpKVSxDQUFkOztrQkE0SmVBLEsiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIgICAgIGltcG9ydCBLaXR0ZW4gZnJvbSBcIi4vanMva2l0dGVuXCI7XG4gICAgIGltcG9ydCB3b3JkcyBmcm9tIFwiLi9qcy93b3Jkc1wiO1xuXG4gICAgIFxuICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXQpO1xuICAgICAvLyBHbG9iYWxzXG4gICAgIC8vIG1vZGVzXG5cbiAgICAgbGV0IHRpbWUgPSAzMDtcbiAgICAgbGV0IHNjb3JlID0gMDtcbiAgICAgbGV0IGlzUGxheWluZztcbiAgICAgbGV0IGN1cnJlbnRXb3JkcyA9IFtdO1xuICAgICBsZXQgYWN0aXZlS2l0dGVucyA9IFtdO1xuXG5cbiAgICAgY29uc3Qga2l0dGVuSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAga2l0dGVuSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tLzItcGlyYXRlcy1jb3B5LnBuZyc7XG4gICAgIGNvbnN0IGtpdHRlblBvcyA9IFswLCA0MDBdO1xuXG4gICAgIC8vIERPTSBFbGVtZW50c1xuICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICBjb25zdCB3b3JkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd29yZC1pbnB1dCcpO1xuICAgICBjb25zdCBzY29yZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKTtcbiAgICAgY29uc3QgdGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZScpO1xuICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcbiAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZW92ZXInKTtcbiAgICAgY29uc3QgZmluYWxTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaW5hbC1zY29yZScpO1xuICAgICBjb25zdCB3cG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BtJyk7XG5cblxuICAgICAvLyBjb25zdCBjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWV0YWgnKTsgLy8gRE9NIE1hbmlwdWxhdGlvbiAoYXMgb3Bwb3NlZCB0byBjYW52YXMtLSBtYXliZSBjb21lIGJhY2sgdG8gdGhpcylcblxuICAgICAvLyBEaWN0aW9uYXJ5XG4gICAgLy8gY29uc3QgZGljdGlvbmFyeSA9IGN1cnJlbnRNb2RlO1xuICAgIC8vIGNvbnN0IG1vZGUgPSB7XG4gICAgLy8gICAgIHdvcmRzOiB3b3JkcyxcbiAgICAvLyAgICAgY29kaW5nOiBjb2RpbmcsXG4gICAgLy8gfTtcblxuICAgIC8vIGNvbnN0IGN1cnJlbnRNb2RlID0gbW9kZS53b3JkcztcblxuXG4gICAgIC8vIExvZ2ljXG5cbiAgICAgLy8gSW5pdGlhbGl6ZSBHYW1lXG4gICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAvLyBzdGFydCAgbWF0Y2hpbmcgb24gd29yZCBpbnB1dFxuICAgICAgICAgd29yZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlTWF0Y2gpO1xuICAgICAgICAgLy8gb25DaGFuZ2U/P1xuICAgICAgICAgLy8gQ2FsbCBjb3VudGRvd24gZXZlcnkgc2Vjb25kXG4gICAgICAgICBzZXRJbnRlcnZhbChjb3VudGRvd24sIDEwMDApO1xuICAgICAgICAgLy8gQ2hlY2sgZ2FtZSBzdGF0dXNcbiAgICAgICAgIHNldEludGVydmFsKGNoZWNrU3RhdHVzLCA1MCk7XG4gICAgICAgICAvLyBzZXRJbnRlcnZhbChyZWxlYXNlTW9yZUtpdHRlbnMsIDIwMDApO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gcmVsZWFzZU1vcmVLaXR0ZW5zKCkge1xuICAgICAgICAgY29uc3Qgd29yZCA9IHJhbmRvbVdvcmQoKTtcbiAgICAgICAgIGNvbnN0IHBvcyA9IHJhbmRvbVBvc2l0aW9uKCk7XG4gICAgICAgICBjb25zdCBuZXdLaXR0ZW4gPSBuZXcgS2l0dGVuKHBvcywgd29yZCwga2l0dGVuSW1hZ2UsIGFjdGl2ZUtpdHRlbnMsIGN1cnJlbnRXb3JkcywgY3R4KTtcbiAgICAgICAgIGFjdGl2ZUtpdHRlbnMucHVzaChuZXdLaXR0ZW4pO1xuICAgICAgICAgLy8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKG5ld0tpdHRlbikpXG4gICAgICAgICAvLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUobmV3S2l0dGVuKSk7XG5cbiAgICAgfVxuXG5cblxuICAgICBmdW5jdGlvbiBtYXRjaElucHV0KCkge1xuICAgICAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAgICAgaWYgKGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgICAgICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgICAgICAgc2NvcmUgKys7XG4gICAgICAgICAgICAgc2NvcmVEaXNwbGF5LmlubmVySFRNTCsrOyBcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZU1hdGNoKCkge1xuICAgICAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAgICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgICBpZiAobWF0Y2hJbnB1dCgpKSB7XG4gICAgICAgICAgICAgaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0udXBkYXRlKGkpO1xuICAgICAgICAgICAgIHdvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICB9XG4gICAgIH1cblxuXG4gICAgIC8vIHBpY2sgYW5kIHNob3cgcmFuZG9tICB3b3JkIFxuICAgICBmdW5jdGlvbiByYW5kb21Xb3JkKCkge1xuICAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIGFycmF5IGluZGV4XG4gICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRzLmxlbmd0aCk7XG4gICAgICAgICAvLyBTYXZlIHJhbmRvbSB3b3JkIHRvIGEgdmFyaWFibGUgJiBwdXNoIGl0IGludG8gY3VycmVudFdvcmRzIGFycmF5XG4gICAgICAgIGNvbnN0IHdvcmQgPSB3b3Jkc1tyYW5kb21JbmRleF07XG4gICAgICAgICBjdXJyZW50V29yZHMucHVzaCh3b3JkKTtcbiAgICAgICAgIC8vIE91dHB1dCBhIHJhbmRvbXdvcmRcbiAgICAgICAgIHJldHVybiB3b3JkO1xuXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiByYW5kb21Qb3NpdGlvbigpIHtcbiAgICAgICAgIGxldCByYW5kb21Qb3NpdGlvbiA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMzYpICsgMSk7XG4gICAgICAgICByYW5kb21Qb3NpdGlvbiA9IDQwMC1yYW5kb21Qb3NpdGlvbjtcbiAgICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgICAgIHJldHVybiBbMCwgcmFuZG9tUG9zaXRpb25dO1xuICAgICB9XG5cbiAgICAgLy8gQ291bnRkb3duIHRpbWVyXG4gICAgIGZ1bmN0aW9uIGNvdW50ZG93bigpIHtcbiAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aW1lIGlzICBub3QgcnVuIG91dFxuICAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgICAgLy8gZGVjcmVtZW50IHRpbWVcbiAgICAgICAgICAgICB0aW1lLS07XG4gICAgICAgICB9IGVsc2UgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgIH1cbiAgICAgICAgIC8vIFNob3cgdGltZVxuICAgICAgICAgdGltZURpc3BsYXkuaW5uZXJIVE1MID0gdGltZTtcbiAgICAgfVxuXG4gICAgIC8vIENoZWNrIGdhbWUgc3RhdHVzXG4gICAgIGZ1bmN0aW9uIGNoZWNrU3RhdHVzKCkge1xuICAgICAgICAgaWYgKCFpc1BsYXlpbmcgJiYgdGltZSA9PT0gMCkge1xuICAgICAgICAgICAgIGNvbnN0IHBsYXllclN0YXRzID0ge1xuICAgICAgICAgICAgICAgICB5b3VyU2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAgICAgICB3cG06IE1hdGguZmxvb3Ioc2NvcmUgKiAyKSxcbiAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgIE9iamVjdC5mcmVlemUocGxheWVyU3RhdHMpO1xuICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW5pdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICBnYW1lT3Zlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICAgZGVidWdnZXJcbiAgICAgICAgICAgICBmaW5hbFNjb3JlLmlubmVySFRNTCA9IHBsYXllclN0YXRzLnlvdXJTY29yZTtcbiAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgIHdwbS5pbm5lckhUTUwgPSBwbGF5ZXJTdGF0cy53cG07XG4gICAgICAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSAnR2FtZSBPdmVyISc7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgIHNjb3JlID0gMDtcbiAgICAgICAgICAgICBzY29yZURpc3BsYXkuaW5uZXJIVE1MPTA7XG4gICAgICAgICB9XG4gICAgIH1cblxuXG4gICAgIGZ1bmN0aW9uIGFuaW1hdGUoYWN0aXZlS2l0dGVucykge1xuICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA4MDAsIDYwMCk7XG4gICAgICAgXG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZUtpdHRlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q2F0ID0gYWN0aXZlS2l0dGVuc1tpXTtcbiAgICAgICAgICAgICBpZiAoY3VycmVudENhdC51cGRhdGUoKSkgaS0tO1xuICAgICAgICAgICAgIGN1cnJlbnRDYXQuZHJhdyhjdHgpO1xuICAgICAgICAgfVxuXG5cblxuXG5cblxuICAgICAgICAgLy8gaWYgKGtpdHRlblBvc1swXSA8IDgwMCApIHtcbiAgICAgICAgIC8vIGMuc3R5bGUudHJhbnNmb3JtID1gdHJhbnNsYXRlKCR7a2l0dGVuUG9zWzBdfXB4LCAwcHgpYFxuICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWV0YWgnKTtcbiAgICAgICAgIC8vIERPTSBNYW5pcHVsYXRpb24gKGFzIG9wcG9zZWQgdG8gY2FudmFzLS0gbWF5YmUgY29tZSBiYWNrIHRvIHRoaXMgaWYgeW91IGNvbW1lbnQgJ2MnIGJhY2sgaW4gYWJvdmUpXG4gICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuICAgICAgICAgfSk7XG4gICAgICAgICAvLyB9XG5cbiAgICAgfVxuICAgICBraXR0ZW5JbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tV29yZCh3b3Jkcyk7XG4gICAgICAgICBjb25zdCBuZXdLaXR0ZW4gPSBuZXcgS2l0dGVuKFswLCA0MDBdLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucywgY3VycmVudFdvcmRzLCBjdHgpO1xuICAgICAgICBcbiAgICAgICAgIGFjdGl2ZUtpdHRlbnMucHVzaChuZXdLaXR0ZW4pO1xuICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCAyMDAwKTtcbiAgICAgICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuXG4gICAgICAgICB9KTtcbiAgICAgfVxuXG5cbiIsImNsYXNzIEtpdHRlbiB7XG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucz1bXSwgY3VycmVudFdvcmRzPVtdKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgICAgICB0aGlzLmtpdHRlbkltYWdlID0ga2l0dGVuSW1hZ2U7XG4gICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucyA9IGFjdGl2ZUtpdHRlbnM7XG4gICAgICAgIHRoaXMuY3VycmVudFdvcmRzID0gY3VycmVudFdvcmRzO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGkpIHtcblxuICAgICAgICB0aGlzLmtpdHRlblBvc1swXSsrXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZmx5KCk7XG4gICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMua2l0dGVuUG9zWzBdID4gODAwKSB7XG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuYWN0aXZlS2l0dGVucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVLaXR0ZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdvcmRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmbHkoKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDU7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzFdIC09IDU7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmtpdHRlbkltYWdlLCAuLi50aGlzLmtpdHRlblBvcyk7XG4gICAgICAgIGN0eC5mb250ID0gXCIxNnB4IFBvcHBpbnMsIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gIGN0eC5mb250ID0gXCIxNnB4IEFudG9uLCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIGN0eC5mb250ID0gXCIxNnB4IEp1cmEsIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gY3R4LmZvbnQtZmFtaWx5ID1cIlVuaWZyYWt0dXJDb29rLCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIGN0eC5mb250LXNpemU9XCIxNnB4XCI7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLndvcmQsICh0aGlzLmtpdHRlblBvc1swXSArIDMwKSwgKHRoaXMua2l0dGVuUG9zWzFdICsgMTY2KSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLaXR0ZW47IiwiY29uc3Qgd29yZHMgPSBbXG4gICAgJ2J1YmJsZWd1bScsXG4gICAgJ3JpdmVyJyxcbiAgICAncG9wY29ybicsXG4gICAgJ3Jldm9sdmVyJyxcbiAgICAnbWFnaWMnLFxuICAgICdwb3RhdG8nLFxuICAgICdibG9ja2hlYWQnLFxuICAgICdsb29waG9sZScsXG4gICAgJ2FtYmlkZXh0cm91cycsXG4gICAgJ2Zpc2gnLFxuICAgICduaW5ldGVlbicsXG4gICAgJ2Nsb3ZlcicsXG4gICAgJ2JlZXN3YXgnLFxuICAgICdjZXJlYWwnLFxuICAgICdjaGFtZWxlb24nLFxuICAgICdsaWdodGJ1bGInLFxuICAgICdnaWJiZXJpc2gnLFxuICAgICdzZXJwZW50JyxcbiAgICAnZ2FtYmxlJyxcbiAgICAnYnVubnknLFxuICAgICdkb29ybWFuJyxcbiAgICAnYW1hdGV1cicsXG4gICAgJ2ppZ3NhdycsXG4gICAgJ2N1bHRpc2gnLFxuICAgICdiYW1ib28nLFxuICAgICdidW1ibGViZWUnLFxuICAgICdwdW1wa2luJyxcbiAgICAnaGFybW9uaWNhJyxcbiAgICAnaGFpcmN1dCcsXG4gICAgJ2plbGx5ZmlzaCcsXG4gICAgJ3F1YXJyZWxzb21lJyxcbiAgICAnZmF4IG1hY2hpbmUnLFxuICAgICdmYWlyaWVzJyxcbiAgICAncmh5bWUnLFxuICAgICdlbWJhcnJhc3NpbmcnLFxuICAgICdwYWphbWFzJyxcbiAgICAnZHVmZmVsIGJhZycsXG4gICAgJ292ZXJwcmljZWQnLFxuICAgICdrZXRjaHVwJyxcbiAgICAna29hbGEnLFxuICAgICdwYW50aGVyJyxcbiAgICAnZmxvd2VyJyxcbiAgICAnc3F1aXNobWFsbG93JyxcbiAgICAnc3luZXN0aGVzaWEnLFxuICAgICd0ZW1wZXN0dW91cycsXG4gICAgJ2ZhbGFmZWwnLFxuICAgICdwZWRlc3RyaWFuJyxcbiAgICAnZGVubmlzIHJvZG1hbicsXG4gICAgJ2Jhc2tldGJhbGwnLFxuICAgICdyYWluZm9yZXN0JyxcbiAgICAnbWVvdycsXG4gICAgJ2RlbnR1cmVzJyxcbiAgICAnaGVsZW4ga2VsbGVyJyxcbiAgICAncGVyc2lhbicsXG4gICAgJ2tpdHRlbicsXG4gICAgJ3BpcmF0ZScsXG4gICAgJ2VnZ25vZycsXG4gICAgJ2ZhY2V0aW91cycsXG4gICAgJ2xldHR1Y2UnLFxuICAgICdtYXRlJyxcbiAgICAncGFuY2FrZScsXG4gICAgJ2ZvcmsnLFxuICAgICdzb3VwJyxcbiAgICAnd2luZScsXG4gICAgJ3dvbHZlcmluZScsXG4gICAgJ2xvdmViaXJkJyxcbiAgICAnc2hvZSBsYWNlJyxcbiAgICAnZHJhd2VyJyxcbiAgICAncGVhbnV0cycsXG4gICAgJ2Zha2UgZmxvd2VycycsXG4gICAgJ2Nob2NvbGF0ZScsXG4gICAgJ2NyZWRpdCBjYXJkJyxcbiAgICAnc29mYScsXG4gICAgJ3Nhcm9uZycsXG4gICAgJ3RyYWNrc3VpdCcsXG4gICAgJ2p1aWN5IGphY2tldCcsXG4gICAgJ3BvbmNobycsXG4gICAgJ3RhbmtpbmknLFxuICAgICdzdW5yb29mJyxcbiAgICAnc3VuZHJlc3MnLFxuICAgICdiYW1iaScsXG4gICAgJ2NvY29hJyxcbiAgICAnYnV0dGVyJyxcbiAgICAnY2Fyb3VzZWwnLFxuICAgICdzdGFyZ2F6aW5nJyxcbiAgICAnaG9uZXknLFxuICAgICdtYXJpbmFkZScsXG4gICAgJ2Zvc3NpbHMnLFxuICAgICdzb21lcnNhdWx0JyxcbiAgICAndHJhbXBvbGluZScsXG4gICAgJ2xpYnJhJyxcbiAgICAnYXF1YXJpdXMnLFxuICAgICdyYWluYm93JyxcbiAgICAnZ2VtaW5pJyxcbiAgICAnc2NvcnBpbycsXG4gICAgJ2NhcHJpY29ybicsXG4gICAgJ2Jvb2sgZmFpcicsXG4gICAgJ2hvcHNrb3RjaCcsXG4gICAgJ3N1Z2FyJyxcbiAgICAnYmxhY2tsaWdodCcsXG4gICAgJ3N1Z2FyZnJlZScsXG4gICAgJ3BsdXRvJyxcbiAgICAnZnJvdGgnLFxuICAgICd0dWxpcHMnLFxuICAgICdzYW5keScsXG4gICAgJ2J1bmtiZWQnLFxuICAgICdjaGluYXRvd24nLFxuICAgICd0b3J0aWxsYScsXG4gICAgJ3BhcmtpbmcgbG90JyxcbiAgICAnYmFieSBibHVlJyxcbiAgICAncmFjb29uJyxcbiAgICAndmFsZXQnLFxuICAgICdwcmluY2VzcycsXG4gICAgJ3BlYWNoJyxcbiAgICAndGVsZXZpc2lvbnMnLFxuICAgICdjaHJpc3RtYXMnLFxuICAgICdnb3RoJyxcbiAgICAnY2FtZW8nLFxuICAgICdmb3Jnb3QnLFxuICAgICdhbmdlbCcsXG4gICAgJ2NhY3RpJyxcbiAgICAnZmlyZSBoeWRyYW50JyxcbiAgICAnc2hhZG93JyxcbiAgICAnZHJ5IGNsZWFuaW5nJyxcbiAgICAnZmluZ2VydGlwcycsXG4gICAgJ2NvY29vbicsXG4gICAgJ3NvY2NlcicsXG4gICAgJ2Nhc3NldHRlJyxcbiAgICAnbWF0YWRvcicsXG4gICAgJ2p1bmdsZScsXG4gICAgJ3RpZ2VyJyxcbiAgICAnZGFybGluZycsXG4gICAgJ3dpbmsnLFxuICAgICdzbWlsZXMnLFxuICAgICdtb25zb29uJyxcbiAgICAnY293Ym95JyxcbiAgICAnc2hhcmsnLFxuICAgICdzYWZhcmknLFxuICAgICdtb3JvY2NhbicsXG4gICAgJ2xlbW9uYWRlJyxcbiAgICAnbGltZWFkZScsXG4gICAgJ21vY2tpbmdiaXJkJyxcbiAgICAnbHVuYScsXG4gICAgJ3N1YXZlJyxcbiAgICAnbWFkYW1lJyxcbiAgICAnamV0IHNraScsXG4gICAgJ3NwZWVkbycsXG4gICAgJ21hdHpvIGJhbGwnLFxuICAgICdsb2xsaXBvcCcsXG4gICAgJ3NwYW5pc2gnLFxuICAgICdmcmVuY2gnLFxuICAgICdwZWJibGUnLFxuICAgICduYW1lIHRhZydcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHdvcmRzOyJdLCJzb3VyY2VSb290IjoiIn0=