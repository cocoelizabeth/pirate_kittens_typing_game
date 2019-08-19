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
window.Image;
// Globals
// modes

var time = 30;
var score = 0;
var isPlaying = void 0;
var currentWords = [];
var activeKittens = [];

var kittenImage = new Image();

kittenImage.src = "https://game-seeds.s3.amazonaws.com/pirate-big-sit-outline.png";
//  kittenImage.src = 'https://game-seeds.s3.amazonaws.com/2-pirates-copy.png';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dvcmRzLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwiSW1hZ2UiLCJ0aW1lIiwic2NvcmUiLCJpc1BsYXlpbmciLCJjdXJyZW50V29yZHMiLCJhY3RpdmVLaXR0ZW5zIiwia2l0dGVuSW1hZ2UiLCJzcmMiLCJraXR0ZW5Qb3MiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndvcmRJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJzY29yZURpc3BsYXkiLCJ0aW1lRGlzcGxheSIsIm1lc3NhZ2UiLCJnYW1lT3ZlciIsImZpbmFsU2NvcmUiLCJ3cG0iLCJoYW5kbGVNYXRjaCIsInNldEludGVydmFsIiwiY291bnRkb3duIiwiY2hlY2tTdGF0dXMiLCJyZWxlYXNlTW9yZUtpdHRlbnMiLCJ3b3JkIiwicmFuZG9tV29yZCIsInBvcyIsInJhbmRvbVBvc2l0aW9uIiwibmV3S2l0dGVuIiwiS2l0dGVuIiwicHVzaCIsIm1hdGNoSW5wdXQiLCJ2YWx1ZSIsImluZGV4T2YiLCJpIiwiaW5uZXJIVE1MIiwiYWN0aXZlIiwidXBkYXRlIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ3b3JkcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJwbGF5ZXJTdGF0cyIsInlvdXJTY29yZSIsIk9iamVjdCIsImZyZWV6ZSIsImNsZWFySW50ZXJ2YWwiLCJzdHlsZSIsImRpc3BsYXkiLCJhbmltYXRlIiwiY2xlYXJSZWN0IiwiY3VycmVudENhdCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lc3RhbXAiLCJvbmxvYWQiLCJmbHkiLCJzcGxp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QlYsV0E1QlUsRUE2QlYsU0E3QlUsRUE4QlYsV0E5QlUsRUErQlYsYUEvQlUsRUFnQ1YsYUFoQ1UsRUFpQ1YsU0FqQ1UsRUFrQ1YsT0FsQ1UsRUFtQ1YsY0FuQ1UsRUFvQ1YsU0FwQ1UsRUFxQ1YsWUFyQ1UsRUFzQ1YsWUF0Q1UsRUF1Q1YsU0F2Q1UsRUF3Q1YsT0F4Q1UsRUF5Q1YsU0F6Q1UsRUEwQ1YsUUExQ1UsRUEyQ1YsY0EzQ1UsRUE0Q1YsYUE1Q1UsRUE2Q1YsYUE3Q1UsRUE4Q1YsU0E5Q1UsRUErQ1YsWUEvQ1UsRUFnRFYsZUFoRFUsRUFpRFYsWUFqRFUsRUFrRFYsWUFsRFUsRUFtRFYsTUFuRFUsRUFvRFYsVUFwRFUsRUFxRFYsY0FyRFUsRUFzRFYsU0F0RFUsRUF1RFYsUUF2RFUsRUF3RFYsUUF4RFUsRUF5RFYsUUF6RFUsRUEwRFYsV0ExRFUsRUEyRFYsU0EzRFUsRUE0RFYsTUE1RFUsRUE2RFYsU0E3RFUsRUE4RFYsTUE5RFUsRUErRFYsTUEvRFUsRUFnRVYsTUFoRVUsRUFpRVYsV0FqRVUsRUFrRVYsVUFsRVUsRUFtRVYsV0FuRVUsRUFvRVYsUUFwRVUsRUFxRVYsU0FyRVUsRUFzRVYsY0F0RVUsRUF1RVYsV0F2RVUsRUF3RVYsYUF4RVUsRUF5RVYsTUF6RVUsRUEwRVYsUUExRVUsRUEyRVYsV0EzRVUsRUE0RVYsY0E1RVUsRUE2RVYsUUE3RVUsRUE4RVYsU0E5RVUsRUErRVYsU0EvRVUsRUFnRlYsVUFoRlUsRUFpRlYsT0FqRlUsRUFrRlYsT0FsRlUsRUFtRlYsUUFuRlUsRUFvRlYsVUFwRlUsRUFxRlYsWUFyRlUsRUFzRlYsT0F0RlUsRUF1RlYsVUF2RlUsRUF3RlYsU0F4RlUsRUF5RlYsWUF6RlUsRUEwRlYsWUExRlUsRUEyRlYsT0EzRlUsRUE0RlYsVUE1RlUsRUE2RlYsU0E3RlUsRUE4RlYsUUE5RlUsRUErRlYsU0EvRlUsRUFnR1YsV0FoR1UsRUFpR1YsV0FqR1UsRUFrR1YsV0FsR1UsRUFtR1YsT0FuR1UsRUFvR1YsWUFwR1UsRUFxR1YsV0FyR1UsRUFzR1YsT0F0R1UsRUF1R1YsT0F2R1UsRUF3R1YsUUF4R1UsRUF5R1YsT0F6R1UsRUEwR1YsU0ExR1UsRUEyR1YsV0EzR1UsRUE0R1YsVUE1R1UsRUE2R1YsYUE3R1UsRUE4R1YsV0E5R1UsRUErR1YsUUEvR1UsRUFnSFYsT0FoSFUsRUFpSFYsVUFqSFUsRUFrSFYsT0FsSFUsRUFtSFYsYUFuSFUsRUFvSFYsV0FwSFUsRUFxSFYsTUFySFUsRUFzSFYsT0F0SFUsRUF1SFYsUUF2SFUsRUF3SFYsT0F4SFUsRUF5SFYsT0F6SFUsRUEwSFYsY0ExSFUsRUEySFYsUUEzSFUsRUE0SFYsY0E1SFUsRUE2SFYsWUE3SFUsRUE4SFYsUUE5SFUsRUErSFYsUUEvSFUsRUFnSVYsVUFoSVUsRUFpSVYsU0FqSVUsRUFrSVYsUUFsSVUsRUFtSVYsT0FuSVUsRUFvSVYsU0FwSVUsRUFxSVYsTUFySVUsRUFzSVYsUUF0SVUsRUF1SVYsU0F2SVUsRUF3SVYsUUF4SVUsRUF5SVYsT0F6SVUsRUEwSVYsUUExSVUsRUEySVYsVUEzSVUsRUE0SVYsVUE1SVUsRUE2SVYsU0E3SVUsRUE4SVYsYUE5SVUsRUErSVYsTUEvSVUsRUFnSlYsT0FoSlUsRUFpSlYsUUFqSlUsRUFrSlYsU0FsSlUsRUFtSlYsUUFuSlUsRUFvSlYsWUFwSlUsRUFxSlYsVUFySlUsRUFzSlYsU0F0SlUsRUF1SlYsUUF2SlUsRUF3SlYsUUF4SlUsRUF5SlYsVUF6SlUsQ0FBZDs7a0JBNEplQSxLIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiICAgICBpbXBvcnQgS2l0dGVuIGZyb20gXCIuL2pzL2tpdHRlblwiO1xuICAgICBpbXBvcnQgd29yZHMgZnJvbSBcIi4vanMvd29yZHNcIjtcbiAgICBcbiAgICAgXG4gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdCk7XG4gICAgIHdpbmRvdy5JbWFnZVxuICAgICAvLyBHbG9iYWxzXG4gICAgIC8vIG1vZGVzXG5cbiAgICAgbGV0IHRpbWUgPSAzMDtcbiAgICAgbGV0IHNjb3JlID0gMDtcbiAgICAgbGV0IGlzUGxheWluZztcbiAgICAgbGV0IGN1cnJlbnRXb3JkcyA9IFtdO1xuICAgICBsZXQgYWN0aXZlS2l0dGVucyA9IFtdO1xuXG5cbiAgICAgY29uc3Qga2l0dGVuSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgXG4gICAgICBraXR0ZW5JbWFnZS5zcmMgPSBcIi4vYXNzZXRzL2ltZy9ib2F0LnN2Z1wiXG4gICAgLy8gIGtpdHRlbkltYWdlLnNyYyA9ICdodHRwczovL2dhbWUtc2VlZHMuczMuYW1hem9uYXdzLmNvbS8yLXBpcmF0ZXMtY29weS5wbmcnO1xuICAgICBjb25zdCBraXR0ZW5Qb3MgPSBbMCwgNDAwXTtcblxuICAgICAvLyBET00gRWxlbWVudHNcbiAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgY29uc3Qgd29yZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dvcmQtaW5wdXQnKTtcbiAgICAgY29uc3Qgc2NvcmVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJyk7XG4gICAgIGNvbnN0IHRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWUnKTtcbiAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XG4gICAgIGNvbnN0IGdhbWVPdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVvdmVyJyk7XG4gICAgIGNvbnN0IGZpbmFsU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluYWwtc2NvcmUnKTtcbiAgICAgY29uc3Qgd3BtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwbScpO1xuXG5cbiAgICAgLy8gY29uc3QgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVldGFoJyk7IC8vIERPTSBNYW5pcHVsYXRpb24gKGFzIG9wcG9zZWQgdG8gY2FudmFzLS0gbWF5YmUgY29tZSBiYWNrIHRvIHRoaXMpXG5cbiAgICAgLy8gRGljdGlvbmFyeVxuICAgIC8vIGNvbnN0IGRpY3Rpb25hcnkgPSBjdXJyZW50TW9kZTtcbiAgICAvLyBjb25zdCBtb2RlID0ge1xuICAgIC8vICAgICB3b3Jkczogd29yZHMsXG4gICAgLy8gICAgIGNvZGluZzogY29kaW5nLFxuICAgIC8vIH07XG5cbiAgICAvLyBjb25zdCBjdXJyZW50TW9kZSA9IG1vZGUud29yZHM7XG5cblxuICAgICAvLyBMb2dpY1xuXG4gICAgIC8vIEluaXRpYWxpemUgR2FtZVxuICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgLy8gc3RhcnQgIG1hdGNoaW5nIG9uIHdvcmQgaW5wdXRcbiAgICAgICAgIHdvcmRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZU1hdGNoKTtcbiAgICAgICAgIC8vIG9uQ2hhbmdlPz9cbiAgICAgICAgIC8vIENhbGwgY291bnRkb3duIGV2ZXJ5IHNlY29uZFxuICAgICAgICAgc2V0SW50ZXJ2YWwoY291bnRkb3duLCAxMDAwKTtcbiAgICAgICAgIC8vIENoZWNrIGdhbWUgc3RhdHVzXG4gICAgICAgICBzZXRJbnRlcnZhbChjaGVja1N0YXR1cywgNTApO1xuICAgICAgICAgLy8gc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCAyMDAwKTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHJlbGVhc2VNb3JlS2l0dGVucygpIHtcbiAgICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKCk7XG4gICAgICAgICBjb25zdCBwb3MgPSByYW5kb21Qb3NpdGlvbigpO1xuICAgICAgICAgY29uc3QgbmV3S2l0dGVuID0gbmV3IEtpdHRlbihwb3MsIHdvcmQsIGtpdHRlbkltYWdlLCBhY3RpdmVLaXR0ZW5zLCBjdXJyZW50V29yZHMsIGN0eCk7XG4gICAgICAgICBhY3RpdmVLaXR0ZW5zLnB1c2gobmV3S2l0dGVuKTtcbiAgICAgICAgXG4gICAgICAgICAvLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUobmV3S2l0dGVuKSlcbiAgICAgICAgIC8vIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gYW5pbWF0ZShuZXdLaXR0ZW4pKTtcblxuICAgICB9XG5cblxuXG4gICAgIGZ1bmN0aW9uIG1hdGNoSW5wdXQoKSB7XG4gICAgICAgICBsZXQgdmFsdWUgPSB3b3JkSW5wdXQudmFsdWU7XG4gICAgICAgICBpZiAoY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgICAgICBsZXQgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgICAgICBzY29yZSArKztcbiAgICAgICAgICAgICBzY29yZURpc3BsYXkuaW5uZXJIVE1MKys7IFxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlTWF0Y2goKSB7XG4gICAgICAgICBsZXQgdmFsdWUgPSB3b3JkSW5wdXQudmFsdWU7XG4gICAgICAgICBsZXQgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgIGlmIChtYXRjaElucHV0KCkpIHtcbiAgICAgICAgICAgICBpc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgYWN0aXZlS2l0dGVuc1tpXS51cGRhdGUoaSk7XG4gICAgICAgICAgICAgd29yZElucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgIH1cbiAgICAgfVxuXG5cbiAgICAgLy8gcGljayBhbmQgc2hvdyByYW5kb20gIHdvcmQgXG4gICAgIGZ1bmN0aW9uIHJhbmRvbVdvcmQoKSB7XG4gICAgICAgICAvLyBHZW5lcmF0ZSByYW5kb20gYXJyYXkgaW5kZXhcbiAgICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZHMubGVuZ3RoKTtcbiAgICAgICAgIC8vIFNhdmUgcmFuZG9tIHdvcmQgdG8gYSB2YXJpYWJsZSAmIHB1c2ggaXQgaW50byBjdXJyZW50V29yZHMgYXJyYXlcbiAgICAgICAgY29uc3Qgd29yZCA9IHdvcmRzW3JhbmRvbUluZGV4XTtcbiAgICAgICAgIGN1cnJlbnRXb3Jkcy5wdXNoKHdvcmQpO1xuICAgICAgICAgLy8gT3V0cHV0IGEgcmFuZG9td29yZFxuICAgICAgICAgcmV0dXJuIHdvcmQ7XG5cbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHJhbmRvbVBvc2l0aW9uKCkge1xuICAgICAgICAgbGV0IHJhbmRvbVBvc2l0aW9uID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEzNikgKyAxKTtcbiAgICAgICAgIHJhbmRvbVBvc2l0aW9uID0gNDAwLXJhbmRvbVBvc2l0aW9uO1xuICAgICAgICAgY29uc29sZS5sb2cocmFuZG9tUG9zaXRpb24pO1xuICAgICAgICAgcmV0dXJuIFswLCByYW5kb21Qb3NpdGlvbl07XG4gICAgIH1cblxuICAgICAvLyBDb3VudGRvd24gdGltZXJcbiAgICAgZnVuY3Rpb24gY291bnRkb3duKCkge1xuICAgICAgICAgLy8gTWFrZSBzdXJlIHRpbWUgaXMgIG5vdCBydW4gb3V0XG4gICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICAgICAvLyBkZWNyZW1lbnQgdGltZVxuICAgICAgICAgICAgIHRpbWUtLTtcbiAgICAgICAgIH0gZWxzZSBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICAgICAgIGlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgfVxuICAgICAgICAgLy8gU2hvdyB0aW1lXG4gICAgICAgICB0aW1lRGlzcGxheS5pbm5lckhUTUwgPSB0aW1lO1xuICAgICB9XG5cbiAgICAgLy8gQ2hlY2sgZ2FtZSBzdGF0dXNcbiAgICAgZnVuY3Rpb24gY2hlY2tTdGF0dXMoKSB7XG4gICAgICAgICBpZiAoIWlzUGxheWluZyAmJiB0aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgY29uc3QgcGxheWVyU3RhdHMgPSB7XG4gICAgICAgICAgICAgICAgIHlvdXJTY29yZTogc2NvcmUsXG4gICAgICAgICAgICAgICAgIHdwbTogTWF0aC5mbG9vcihzY29yZSAqIDIpLFxuICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgT2JqZWN0LmZyZWV6ZShwbGF5ZXJTdGF0cyk7XG4gICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbml0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIGdhbWVPdmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgIGZpbmFsU2NvcmUuaW5uZXJIVE1MID0gcGxheWVyU3RhdHMueW91clNjb3JlO1xuICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgd3BtLmlubmVySFRNTCA9IHBsYXllclN0YXRzLndwbTtcbiAgICAgICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdHYW1lIE92ZXIhJztcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgc2NvcmUgPSAwO1xuICAgICAgICAgICAgIHNjb3JlRGlzcGxheS5pbm5lckhUTUw9MDtcbiAgICAgICAgIH1cbiAgICAgfVxuXG5cbiAgICAgZnVuY3Rpb24gYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKSB7XG4gICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDgwMCwgNjAwKTtcbiAgICAgICBcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlS2l0dGVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDYXQgPSBhY3RpdmVLaXR0ZW5zW2ldO1xuICAgICAgICAgICAgIGlmIChjdXJyZW50Q2F0LnVwZGF0ZSgpKSBpLS07XG4gICAgICAgICAgICAgY3VycmVudENhdC5kcmF3KGN0eCk7XG4gICAgICAgICB9XG5cblxuXG5cblxuXG4gICAgICAgICAvLyBpZiAoa2l0dGVuUG9zWzBdIDwgODAwICkge1xuICAgICAgICAgLy8gYy5zdHlsZS50cmFuc2Zvcm0gPWB0cmFuc2xhdGUoJHtraXR0ZW5Qb3NbMF19cHgsIDBweClgXG4gICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlZXRhaCcpO1xuICAgICAgICAgLy8gRE9NIE1hbmlwdWxhdGlvbiAoYXMgb3Bwb3NlZCB0byBjYW52YXMtLSBtYXliZSBjb21lIGJhY2sgdG8gdGhpcyBpZiB5b3UgY29tbWVudCAnYycgYmFjayBpbiBhYm92ZSlcbiAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4ge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIGFuaW1hdGUoYWN0aXZlS2l0dGVucyk7XG4gICAgICAgICB9KTtcbiAgICAgICAgIC8vIH1cblxuICAgICB9XG4gICAgIGtpdHRlbkltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKHdvcmRzKTtcbiAgICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4oWzAsIDQwMF0sIHdvcmQsIGtpdHRlbkltYWdlLCBhY3RpdmVLaXR0ZW5zLCBjdXJyZW50V29yZHMsIGN0eCk7XG4gICAgICAgIFxuICAgICAgICAgYWN0aXZlS2l0dGVucy5wdXNoKG5ld0tpdHRlbik7XG4gICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICBzZXRJbnRlcnZhbChyZWxlYXNlTW9yZUtpdHRlbnMsIDIwMDApO1xuICAgICAgICAgICAgIGFuaW1hdGUoYWN0aXZlS2l0dGVucyk7XG4gICAgICAgICAgIFxuXG4gICAgICAgICB9KTtcbiAgICAgfVxuXG5cbiIsImNsYXNzIEtpdHRlbiB7XG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucz1bXSwgY3VycmVudFdvcmRzPVtdKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgICAgICB0aGlzLmtpdHRlbkltYWdlID0ga2l0dGVuSW1hZ2U7XG4gICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucyA9IGFjdGl2ZUtpdHRlbnM7XG4gICAgICAgIHRoaXMuY3VycmVudFdvcmRzID0gY3VycmVudFdvcmRzO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGkpIHtcblxuICAgICAgICB0aGlzLmtpdHRlblBvc1swXSsrXG4gICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5mbHkoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuYWN0aXZlS2l0dGVucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5raXR0ZW5Qb3NbMF0gPiA4MDApIHtcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy5hY3RpdmVLaXR0ZW5zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50V29yZHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZseSgpIHtcbiAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMF0gKz0gNTtcbiAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMV0gLT0gNTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMua2l0dGVuSW1hZ2UsIC4uLnRoaXMua2l0dGVuUG9zKTtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggUG9wcGlucywgc2Fucy1zZXJpZlwiO1xuICAgICAgICAvLyAgY3R4LmZvbnQgPSBcIjE2cHggQW50b24sIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gY3R4LmZvbnQgPSBcIjE2cHggSnVyYSwgc2Fucy1zZXJpZlwiO1xuICAgICAgICAvLyBjdHguZm9udC1mYW1pbHkgPVwiVW5pZnJha3R1ckNvb2ssIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gY3R4LmZvbnQtc2l6ZT1cIjE2cHhcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMud29yZCwgKHRoaXMua2l0dGVuUG9zWzBdICsgMzApLCAodGhpcy5raXR0ZW5Qb3NbMV0gKyAxNjYpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtpdHRlbjsiLCJjb25zdCB3b3JkcyA9IFtcbiAgICAnYnViYmxlZ3VtJyxcbiAgICAncml2ZXInLFxuICAgICdwb3Bjb3JuJyxcbiAgICAncmV2b2x2ZXInLFxuICAgICdtYWdpYycsXG4gICAgJ3BvdGF0bycsXG4gICAgJ2Jsb2NraGVhZCcsXG4gICAgJ2xvb3Bob2xlJyxcbiAgICAnYW1iaWRleHRyb3VzJyxcbiAgICAnZmlzaCcsXG4gICAgJ25pbmV0ZWVuJyxcbiAgICAnY2xvdmVyJyxcbiAgICAnYmVlc3dheCcsXG4gICAgJ2NlcmVhbCcsXG4gICAgJ2NoYW1lbGVvbicsXG4gICAgJ2xpZ2h0YnVsYicsXG4gICAgJ2dpYmJlcmlzaCcsXG4gICAgJ3NlcnBlbnQnLFxuICAgICdnYW1ibGUnLFxuICAgICdidW5ueScsXG4gICAgJ2Rvb3JtYW4nLFxuICAgICdhbWF0ZXVyJyxcbiAgICAnamlnc2F3JyxcbiAgICAnY3VsdGlzaCcsXG4gICAgJ2JhbWJvbycsXG4gICAgJ2J1bWJsZWJlZScsXG4gICAgJ3B1bXBraW4nLFxuICAgICdoYXJtb25pY2EnLFxuICAgICdoYWlyY3V0JyxcbiAgICAnamVsbHlmaXNoJyxcbiAgICAncXVhcnJlbHNvbWUnLFxuICAgICdmYXggbWFjaGluZScsXG4gICAgJ2ZhaXJpZXMnLFxuICAgICdyaHltZScsXG4gICAgJ2VtYmFycmFzc2luZycsXG4gICAgJ3BhamFtYXMnLFxuICAgICdkdWZmZWwgYmFnJyxcbiAgICAnb3ZlcnByaWNlZCcsXG4gICAgJ2tldGNodXAnLFxuICAgICdrb2FsYScsXG4gICAgJ3BhbnRoZXInLFxuICAgICdmbG93ZXInLFxuICAgICdzcXVpc2htYWxsb3cnLFxuICAgICdzeW5lc3RoZXNpYScsXG4gICAgJ3RlbXBlc3R1b3VzJyxcbiAgICAnZmFsYWZlbCcsXG4gICAgJ3BlZGVzdHJpYW4nLFxuICAgICdkZW5uaXMgcm9kbWFuJyxcbiAgICAnYmFza2V0YmFsbCcsXG4gICAgJ3JhaW5mb3Jlc3QnLFxuICAgICdtZW93JyxcbiAgICAnZGVudHVyZXMnLFxuICAgICdoZWxlbiBrZWxsZXInLFxuICAgICdwZXJzaWFuJyxcbiAgICAna2l0dGVuJyxcbiAgICAncGlyYXRlJyxcbiAgICAnZWdnbm9nJyxcbiAgICAnZmFjZXRpb3VzJyxcbiAgICAnbGV0dHVjZScsXG4gICAgJ21hdGUnLFxuICAgICdwYW5jYWtlJyxcbiAgICAnZm9yaycsXG4gICAgJ3NvdXAnLFxuICAgICd3aW5lJyxcbiAgICAnd29sdmVyaW5lJyxcbiAgICAnbG92ZWJpcmQnLFxuICAgICdzaG9lIGxhY2UnLFxuICAgICdkcmF3ZXInLFxuICAgICdwZWFudXRzJyxcbiAgICAnZmFrZSBmbG93ZXJzJyxcbiAgICAnY2hvY29sYXRlJyxcbiAgICAnY3JlZGl0IGNhcmQnLFxuICAgICdzb2ZhJyxcbiAgICAnc2Fyb25nJyxcbiAgICAndHJhY2tzdWl0JyxcbiAgICAnanVpY3kgamFja2V0JyxcbiAgICAncG9uY2hvJyxcbiAgICAndGFua2luaScsXG4gICAgJ3N1bnJvb2YnLFxuICAgICdzdW5kcmVzcycsXG4gICAgJ2JhbWJpJyxcbiAgICAnY29jb2EnLFxuICAgICdidXR0ZXInLFxuICAgICdjYXJvdXNlbCcsXG4gICAgJ3N0YXJnYXppbmcnLFxuICAgICdob25leScsXG4gICAgJ21hcmluYWRlJyxcbiAgICAnZm9zc2lscycsXG4gICAgJ3NvbWVyc2F1bHQnLFxuICAgICd0cmFtcG9saW5lJyxcbiAgICAnbGlicmEnLFxuICAgICdhcXVhcml1cycsXG4gICAgJ3JhaW5ib3cnLFxuICAgICdnZW1pbmknLFxuICAgICdzY29ycGlvJyxcbiAgICAnY2Fwcmljb3JuJyxcbiAgICAnYm9vayBmYWlyJyxcbiAgICAnaG9wc2tvdGNoJyxcbiAgICAnc3VnYXInLFxuICAgICdibGFja2xpZ2h0JyxcbiAgICAnc3VnYXJmcmVlJyxcbiAgICAncGx1dG8nLFxuICAgICdmcm90aCcsXG4gICAgJ3R1bGlwcycsXG4gICAgJ3NhbmR5JyxcbiAgICAnYnVua2JlZCcsXG4gICAgJ2NoaW5hdG93bicsXG4gICAgJ3RvcnRpbGxhJyxcbiAgICAncGFya2luZyBsb3QnLFxuICAgICdiYWJ5IGJsdWUnLFxuICAgICdyYWNvb24nLFxuICAgICd2YWxldCcsXG4gICAgJ3ByaW5jZXNzJyxcbiAgICAncGVhY2gnLFxuICAgICd0ZWxldmlzaW9ucycsXG4gICAgJ2NocmlzdG1hcycsXG4gICAgJ2dvdGgnLFxuICAgICdjYW1lbycsXG4gICAgJ2ZvcmdvdCcsXG4gICAgJ2FuZ2VsJyxcbiAgICAnY2FjdGknLFxuICAgICdmaXJlIGh5ZHJhbnQnLFxuICAgICdzaGFkb3cnLFxuICAgICdkcnkgY2xlYW5pbmcnLFxuICAgICdmaW5nZXJ0aXBzJyxcbiAgICAnY29jb29uJyxcbiAgICAnc29jY2VyJyxcbiAgICAnY2Fzc2V0dGUnLFxuICAgICdtYXRhZG9yJyxcbiAgICAnanVuZ2xlJyxcbiAgICAndGlnZXInLFxuICAgICdkYXJsaW5nJyxcbiAgICAnd2luaycsXG4gICAgJ3NtaWxlcycsXG4gICAgJ21vbnNvb24nLFxuICAgICdjb3dib3knLFxuICAgICdzaGFyaycsXG4gICAgJ3NhZmFyaScsXG4gICAgJ21vcm9jY2FuJyxcbiAgICAnbGVtb25hZGUnLFxuICAgICdsaW1lYWRlJyxcbiAgICAnbW9ja2luZ2JpcmQnLFxuICAgICdsdW5hJyxcbiAgICAnc3VhdmUnLFxuICAgICdtYWRhbWUnLFxuICAgICdqZXQgc2tpJyxcbiAgICAnc3BlZWRvJyxcbiAgICAnbWF0em8gYmFsbCcsXG4gICAgJ2xvbGxpcG9wJyxcbiAgICAnc3BhbmlzaCcsXG4gICAgJ2ZyZW5jaCcsXG4gICAgJ3BlYmJsZScsXG4gICAgJ25hbWUgdGFnJ1xuXTtcblxuZXhwb3J0IGRlZmF1bHQgd29yZHM7Il0sInNvdXJjZVJvb3QiOiIifQ==