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
    var newKitten = new _kitten2.default(pos, word, kittenImage, activeKittens, currentWords);
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
        message.innerHTML = 'Game Over!';
        // add game over screen
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
    var newKitten = new _kitten2.default([0, 400], word, kittenImage, activeKittens, currentWords);

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
var words = ['bubblegum', 'river', 'popcorn', 'revolver', 'magic', 'potato', 'blockhead', 'loophole', 'ambidextrous', 'fish', 'nineteen', 'clover', 'beeswax', 'cereal', 'chameleon', 'lightbulb', 'gibberish', 'serpent', 'gamble', 'bunny', 'doorman', 'amateur', 'jigsaw', 'cultish', 'bamboo', 'bumblebee', 'pumpkin', 'harmonica', 'haircut', 'jellyfish', 'quarrelsome', 'fax machine', 'fairies', 'rhyme', 'embarrassing', 'pajamas', 'duffel bag', 'overpriced', 'ketchup', 'koala', 'panther', 'flower', 'squishmallow', 'synesthesia', 'tempestuous', 'falafel', 'pedestrian', 'dennis rodman', 'basketball', 'rainforest', 'meow', 'dentures', 'helen keller', 'persian', 'kitten', 'pirate', 'eggnog', 'facetious', 'lettuce', 'mate', 'pancake', 'fork', 'soup', 'wine', 'wolverine', 'lovebird', 'shoe lace', 'drawer', 'peanuts', 'fake flowers', 'chocolate', 'credit card', 'sofa', 'sarong', 'tracksuit', 'juicy jacket', 'poncho', 'tankini', 'sunroof', 'sundress', 'bambi', 'cocoa', 'butter', 'carousel', 'stargazing', 'honey', 'marinade', 'fossils', 'windowpane', 'somersault', 'trampoline', 'libra', 'aquarius', 'rainbow', 'gemini', 'scorpio', 'capricorn', 'book fair', 'hopskotch', 'sugar', 'blacklight', 'sugarfree', 'pluto', 'froth', 'tulips', 'sandy', 'bunkbed', 'chinatown', 'tortilla', 'parking lot', 'baby blue', 'racoon', 'valet', 'princess', 'peach', 'televisions', 'christmas', 'goth', 'cameo', 'forgot', 'angel', 'cacti', 'fire hydrant', 'shadow', 'dry cleaning', 'fingertips', 'cocoon', 'soccer', 'cassette', 'matador', 'jungle', 'tiger', 'darling', 'wink', 'smiles', 'monsoon', 'cowboy', 'shark', 'safari', 'moroccan', 'lemonade', 'limeade', 'mockingbird', 'luna', 'suave', 'madame', 'jet ski', 'speedo', 'matzo ball', 'lollipop', 'spanish', 'french', 'pebble', 'name tag'];

exports.default = words;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dvcmRzLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwidGltZSIsInNjb3JlIiwiaXNQbGF5aW5nIiwiY3VycmVudFdvcmRzIiwiYWN0aXZlS2l0dGVucyIsImtpdHRlbkltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5Qb3MiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndvcmRJbnB1dCIsInF1ZXJ5U2VsZWN0b3IiLCJzY29yZURpc3BsYXkiLCJ0aW1lRGlzcGxheSIsIm1lc3NhZ2UiLCJoYW5kbGVNYXRjaCIsInNldEludGVydmFsIiwiY291bnRkb3duIiwiY2hlY2tTdGF0dXMiLCJyZWxlYXNlTW9yZUtpdHRlbnMiLCJ3b3JkIiwicmFuZG9tV29yZCIsInBvcyIsInJhbmRvbVBvc2l0aW9uIiwibmV3S2l0dGVuIiwiS2l0dGVuIiwicHVzaCIsIm1hdGNoSW5wdXQiLCJ2YWx1ZSIsImluZGV4T2YiLCJpIiwiaW5uZXJIVE1MIiwiYWN0aXZlIiwidXBkYXRlIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ3b3JkcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJhbmltYXRlIiwiY2xlYXJSZWN0IiwiY3VycmVudENhdCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lc3RhbXAiLCJvbmxvYWQiLCJmbHkiLCJzcGxpY2UiLCJkcmF3SW1hZ2UiLCJmb250IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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RVUsRUE0RVYsY0E1RVUsRUE2RVYsUUE3RVUsRUE4RVYsU0E5RVUsRUErRVYsU0EvRVUsRUFnRlYsVUFoRlUsRUFpRlYsT0FqRlUsRUFrRlYsT0FsRlUsRUFtRlYsUUFuRlUsRUFvRlYsVUFwRlUsRUFxRlYsWUFyRlUsRUFzRlYsT0F0RlUsRUF1RlYsVUF2RlUsRUF3RlYsU0F4RlUsRUF5RlYsWUF6RlUsRUEwRlYsWUExRlUsRUEyRlYsWUEzRlUsRUE0RlYsT0E1RlUsRUE2RlYsVUE3RlUsRUE4RlYsU0E5RlUsRUErRlYsUUEvRlUsRUFnR1YsU0FoR1UsRUFpR1YsV0FqR1UsRUFrR1YsV0FsR1UsRUFtR1YsV0FuR1UsRUFvR1YsT0FwR1UsRUFxR1YsWUFyR1UsRUFzR1YsV0F0R1UsRUF1R1YsT0F2R1UsRUF3R1YsT0F4R1UsRUF5R1YsUUF6R1UsRUEwR1YsT0ExR1UsRUEyR1YsU0EzR1UsRUE0R1YsV0E1R1UsRUE2R1YsVUE3R1UsRUE4R1YsYUE5R1UsRUErR1YsV0EvR1UsRUFnSFYsUUFoSFUsRUFpSFYsT0FqSFUsRUFrSFYsVUFsSFUsRUFtSFYsT0FuSFUsRUFvSFYsYUFwSFUsRUFxSFYsV0FySFUsRUFzSFYsTUF0SFUsRUF1SFYsT0F2SFUsRUF3SFYsUUF4SFUsRUF5SFYsT0F6SFUsRUEwSFYsT0ExSFUsRUEySFYsY0EzSFUsRUE0SFYsUUE1SFUsRUE2SFYsY0E3SFUsRUE4SFYsWUE5SFUsRUErSFYsUUEvSFUsRUFnSVYsUUFoSVUsRUFpSVYsVUFqSVUsRUFrSVYsU0FsSVUsRUFtSVYsUUFuSVUsRUFvSVYsT0FwSVUsRUFxSVYsU0FySVUsRUFzSVYsTUF0SVUsRUF1SVYsUUF2SVUsRUF3SVYsU0F4SVUsRUF5SVYsUUF6SVUsRUEwSVYsT0ExSVUsRUEySVYsUUEzSVUsRUE0SVYsVUE1SVUsRUE2SVYsVUE3SVUsRUE4SVYsU0E5SVUsRUErSVYsYUEvSVUsRUFnSlYsTUFoSlUsRUFpSlYsT0FqSlUsRUFrSlYsUUFsSlUsRUFtSlYsU0FuSlUsRUFvSlYsUUFwSlUsRUFxSlYsWUFySlUsRUFzSlYsVUF0SlUsRUF1SlYsU0F2SlUsRUF3SlYsUUF4SlUsRUF5SlYsUUF6SlUsRUEwSlYsVUExSlUsQ0FBZDs7a0JBNkplQSxLIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiICAgICBpbXBvcnQgS2l0dGVuIGZyb20gXCIuL2pzL2tpdHRlblwiO1xuICAgICBpbXBvcnQgd29yZHMgZnJvbSBcIi4vanMvd29yZHNcIjtcblxuICAgICBcbiAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0KTtcbiAgICAgLy8gR2xvYmFsc1xuICAgICAvLyBtb2Rlc1xuXG4gICAgIGxldCB0aW1lID0gMzA7XG4gICAgIGxldCBzY29yZSA9IDA7XG4gICAgIGxldCBpc1BsYXlpbmc7XG4gICAgIGxldCBjdXJyZW50V29yZHMgPSBbXTtcbiAgICAgbGV0IGFjdGl2ZUtpdHRlbnMgPSBbXTtcblxuXG4gICAgIGNvbnN0IGtpdHRlbkltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgIGtpdHRlbkltYWdlLnNyYyA9ICdodHRwczovL2dhbWUtc2VlZHMuczMuYW1hem9uYXdzLmNvbS8yLXBpcmF0ZXMtY29weS5wbmcnO1xuICAgICBjb25zdCBraXR0ZW5Qb3MgPSBbMCwgNDAwXTtcblxuICAgICAvLyBET00gRWxlbWVudHNcbiAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgY29uc3Qgd29yZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dvcmQtaW5wdXQnKTtcbiAgICAgY29uc3Qgc2NvcmVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJyk7XG4gICAgIGNvbnN0IHRpbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWUnKTtcbiAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XG5cblxuICAgICAvLyBjb25zdCBjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWV0YWgnKTsgLy8gRE9NIE1hbmlwdWxhdGlvbiAoYXMgb3Bwb3NlZCB0byBjYW52YXMtLSBtYXliZSBjb21lIGJhY2sgdG8gdGhpcylcblxuICAgICAvLyBEaWN0aW9uYXJ5XG4gICAgLy8gY29uc3QgZGljdGlvbmFyeSA9IGN1cnJlbnRNb2RlO1xuICAgIC8vIGNvbnN0IG1vZGUgPSB7XG4gICAgLy8gICAgIHdvcmRzOiB3b3JkcyxcbiAgICAvLyAgICAgY29kaW5nOiBjb2RpbmcsXG4gICAgLy8gfTtcblxuICAgIC8vIGNvbnN0IGN1cnJlbnRNb2RlID0gbW9kZS53b3JkcztcblxuXG4gICAgIC8vIExvZ2ljXG5cbiAgICAgLy8gSW5pdGlhbGl6ZSBHYW1lXG4gICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAvLyBzdGFydCAgbWF0Y2hpbmcgb24gd29yZCBpbnB1dFxuICAgICAgICAgd29yZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlTWF0Y2gpO1xuICAgICAgICAgLy8gb25DaGFuZ2U/P1xuICAgICAgICAgLy8gQ2FsbCBjb3VudGRvd24gZXZlcnkgc2Vjb25kXG4gICAgICAgICBzZXRJbnRlcnZhbChjb3VudGRvd24sIDEwMDApO1xuICAgICAgICAgLy8gQ2hlY2sgZ2FtZSBzdGF0dXNcbiAgICAgICAgIHNldEludGVydmFsKGNoZWNrU3RhdHVzLCA1MCk7XG4gICAgICAgICAvLyBzZXRJbnRlcnZhbChyZWxlYXNlTW9yZUtpdHRlbnMsIDIwMDApO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gcmVsZWFzZU1vcmVLaXR0ZW5zKCkge1xuICAgICAgICAgY29uc3Qgd29yZCA9IHJhbmRvbVdvcmQoKTtcbiAgICAgICAgIGNvbnN0IHBvcyA9IHJhbmRvbVBvc2l0aW9uKCk7XG4gICAgICAgICBjb25zdCBuZXdLaXR0ZW4gPSBuZXcgS2l0dGVuKHBvcywgd29yZCwga2l0dGVuSW1hZ2UsIGFjdGl2ZUtpdHRlbnMsIGN1cnJlbnRXb3Jkcyk7XG4gICAgICAgICBhY3RpdmVLaXR0ZW5zLnB1c2gobmV3S2l0dGVuKTtcbiAgICAgICAgIC8vIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gYW5pbWF0ZShuZXdLaXR0ZW4pKVxuICAgICAgICAgLy8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKG5ld0tpdHRlbikpO1xuXG4gICAgIH1cblxuXG5cbiAgICAgZnVuY3Rpb24gbWF0Y2hJbnB1dCgpIHtcbiAgICAgICAgIGxldCB2YWx1ZSA9IHdvcmRJbnB1dC52YWx1ZTtcbiAgICAgICAgIGlmIChjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICAgICAgIGxldCBpID0gY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgICAgIHNjb3JlICsrO1xuICAgICAgICAgICAgIHNjb3JlRGlzcGxheS5pbm5lckhUTUwrKzsgXG4gICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICB9XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBoYW5kbGVNYXRjaCgpIHtcbiAgICAgICAgIGxldCB2YWx1ZSA9IHdvcmRJbnB1dC52YWx1ZTtcbiAgICAgICAgIGxldCBpID0gY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgaWYgKG1hdGNoSW5wdXQoKSkge1xuICAgICAgICAgICAgIGlzUGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICAgYWN0aXZlS2l0dGVuc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLnVwZGF0ZShpKTtcbiAgICAgICAgICAgICB3b3JkSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgfVxuICAgICB9XG5cblxuICAgICAvLyBwaWNrIGFuZCBzaG93IHJhbmRvbSAgd29yZCBcbiAgICAgZnVuY3Rpb24gcmFuZG9tV29yZCgpIHtcbiAgICAgICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBhcnJheSBpbmRleFxuICAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3Jkcy5sZW5ndGgpO1xuICAgICAgICAgLy8gU2F2ZSByYW5kb20gd29yZCB0byBhIHZhcmlhYmxlICYgcHVzaCBpdCBpbnRvIGN1cnJlbnRXb3JkcyBhcnJheVxuICAgICAgICBjb25zdCB3b3JkID0gd29yZHNbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgY3VycmVudFdvcmRzLnB1c2god29yZCk7XG4gICAgICAgICAvLyBPdXRwdXQgYSByYW5kb213b3JkXG4gICAgICAgICByZXR1cm4gd29yZDtcblxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gcmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgICBsZXQgcmFuZG9tUG9zaXRpb24gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTM2KSArIDEpO1xuICAgICAgICAgcmFuZG9tUG9zaXRpb24gPSA0MDAtcmFuZG9tUG9zaXRpb247XG4gICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21Qb3NpdGlvbik7XG4gICAgICAgICByZXR1cm4gWzAsIHJhbmRvbVBvc2l0aW9uXTtcbiAgICAgfVxuXG4gICAgIC8vIENvdW50ZG93biB0aW1lclxuICAgICBmdW5jdGlvbiBjb3VudGRvd24oKSB7XG4gICAgICAgICAvLyBNYWtlIHN1cmUgdGltZSBpcyAgbm90IHJ1biBvdXRcbiAgICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgICAgIC8vIGRlY3JlbWVudCB0aW1lXG4gICAgICAgICAgICAgdGltZS0tO1xuICAgICAgICAgfSBlbHNlIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgICAvLyBTaG93IHRpbWVcbiAgICAgICAgIHRpbWVEaXNwbGF5LmlubmVySFRNTCA9IHRpbWU7XG4gICAgIH1cblxuICAgICAvLyBDaGVjayBnYW1lIHN0YXR1c1xuICAgICBmdW5jdGlvbiBjaGVja1N0YXR1cygpIHtcbiAgICAgICAgIGlmICghaXNQbGF5aW5nICYmIHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdHYW1lIE92ZXIhJztcbiAgICAgICAgICAgIC8vIGFkZCBnYW1lIG92ZXIgc2NyZWVuXG4gICAgICAgICAgICAgc2NvcmUgPSAwO1xuICAgICAgICAgICAgIHNjb3JlRGlzcGxheS5pbm5lckhUTUw9MDtcbiAgICAgICAgIH1cbiAgICAgfVxuXG5cbiAgICAgZnVuY3Rpb24gYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKSB7XG4gICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDgwMCwgNjAwKTtcbiAgICAgICBcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlS2l0dGVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDYXQgPSBhY3RpdmVLaXR0ZW5zW2ldO1xuICAgICAgICAgICAgIGlmIChjdXJyZW50Q2F0LnVwZGF0ZSgpKSBpLS07XG4gICAgICAgICAgICAgY3VycmVudENhdC5kcmF3KGN0eCk7XG4gICAgICAgICB9XG5cblxuXG5cblxuXG4gICAgICAgICAvLyBpZiAoa2l0dGVuUG9zWzBdIDwgODAwICkge1xuICAgICAgICAgLy8gYy5zdHlsZS50cmFuc2Zvcm0gPWB0cmFuc2xhdGUoJHtraXR0ZW5Qb3NbMF19cHgsIDBweClgXG4gICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlZXRhaCcpO1xuICAgICAgICAgLy8gRE9NIE1hbmlwdWxhdGlvbiAoYXMgb3Bwb3NlZCB0byBjYW52YXMtLSBtYXliZSBjb21lIGJhY2sgdG8gdGhpcyBpZiB5b3UgY29tbWVudCAnYycgYmFjayBpbiBhYm92ZSlcbiAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4ge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIGFuaW1hdGUoYWN0aXZlS2l0dGVucyk7XG4gICAgICAgICB9KTtcbiAgICAgICAgIC8vIH1cblxuICAgICB9XG4gICAgIGtpdHRlbkltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKHdvcmRzKTtcbiAgICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4oWzAsIDQwMF0sIHdvcmQsIGtpdHRlbkltYWdlLCBhY3RpdmVLaXR0ZW5zLCBjdXJyZW50V29yZHMpO1xuICAgICAgICBcbiAgICAgICAgIGFjdGl2ZUtpdHRlbnMucHVzaChuZXdLaXR0ZW4pO1xuICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCAyMDAwKTtcbiAgICAgICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuXG4gICAgICAgICB9KTtcbiAgICAgfVxuXG5cbiIsImNsYXNzIEtpdHRlbiB7XG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucz1bXSwgY3VycmVudFdvcmRzPVtdKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgICAgICB0aGlzLmtpdHRlbkltYWdlID0ga2l0dGVuSW1hZ2U7XG4gICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucyA9IGFjdGl2ZUtpdHRlbnM7XG4gICAgICAgIHRoaXMuY3VycmVudFdvcmRzID0gY3VycmVudFdvcmRzO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGkpIHtcblxuICAgICAgICB0aGlzLmtpdHRlblBvc1swXSsrXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZmx5KCk7XG4gICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMua2l0dGVuUG9zWzBdID4gODAwKSB7XG4gICAgICAgICAgICBsZXQgaSA9IHRoaXMuYWN0aXZlS2l0dGVucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVLaXR0ZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdvcmRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmbHkoKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDU7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzFdIC09IDU7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmtpdHRlbkltYWdlLCAuLi50aGlzLmtpdHRlblBvcyk7XG4gICAgICAgIGN0eC5mb250ID0gXCIxNnB4IFBvcHBpbnMsIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gIGN0eC5mb250ID0gXCIxNnB4IEFudG9uLCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIGN0eC5mb250ID0gXCIxNnB4IEp1cmEsIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gY3R4LmZvbnQtZmFtaWx5ID1cIlVuaWZyYWt0dXJDb29rLCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIGN0eC5mb250LXNpemU9XCIxNnB4XCI7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLndvcmQsICh0aGlzLmtpdHRlblBvc1swXSArIDMwKSwgKHRoaXMua2l0dGVuUG9zWzFdICsgMTY2KSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLaXR0ZW47IiwiY29uc3Qgd29yZHMgPSBbXG4gICAgJ2J1YmJsZWd1bScsXG4gICAgJ3JpdmVyJyxcbiAgICAncG9wY29ybicsXG4gICAgJ3Jldm9sdmVyJyxcbiAgICAnbWFnaWMnLFxuICAgICdwb3RhdG8nLFxuICAgICdibG9ja2hlYWQnLFxuICAgICdsb29waG9sZScsXG4gICAgJ2FtYmlkZXh0cm91cycsXG4gICAgJ2Zpc2gnLFxuICAgICduaW5ldGVlbicsXG4gICAgJ2Nsb3ZlcicsXG4gICAgJ2JlZXN3YXgnLFxuICAgICdjZXJlYWwnLFxuICAgICdjaGFtZWxlb24nLFxuICAgICdsaWdodGJ1bGInLFxuICAgICdnaWJiZXJpc2gnLFxuICAgICdzZXJwZW50JyxcbiAgICAnZ2FtYmxlJyxcbiAgICAnYnVubnknLFxuICAgICdkb29ybWFuJyxcbiAgICAnYW1hdGV1cicsXG4gICAgJ2ppZ3NhdycsXG4gICAgJ2N1bHRpc2gnLFxuICAgICdiYW1ib28nLFxuICAgICdidW1ibGViZWUnLFxuICAgICdwdW1wa2luJyxcbiAgICAnaGFybW9uaWNhJyxcbiAgICAnaGFpcmN1dCcsXG4gICAgJ2plbGx5ZmlzaCcsXG4gICAgJ3F1YXJyZWxzb21lJyxcbiAgICAnZmF4IG1hY2hpbmUnLFxuICAgICdmYWlyaWVzJyxcbiAgICAncmh5bWUnLFxuICAgICdlbWJhcnJhc3NpbmcnLFxuICAgICdwYWphbWFzJyxcbiAgICAnZHVmZmVsIGJhZycsXG4gICAgJ292ZXJwcmljZWQnLFxuICAgICdrZXRjaHVwJyxcbiAgICAna29hbGEnLFxuICAgICdwYW50aGVyJyxcbiAgICAnZmxvd2VyJyxcbiAgICAnc3F1aXNobWFsbG93JyxcbiAgICAnc3luZXN0aGVzaWEnLFxuICAgICd0ZW1wZXN0dW91cycsXG4gICAgJ2ZhbGFmZWwnLFxuICAgICdwZWRlc3RyaWFuJyxcbiAgICAnZGVubmlzIHJvZG1hbicsXG4gICAgJ2Jhc2tldGJhbGwnLFxuICAgICdyYWluZm9yZXN0JyxcbiAgICAnbWVvdycsXG4gICAgJ2RlbnR1cmVzJyxcbiAgICAnaGVsZW4ga2VsbGVyJyxcbiAgICAncGVyc2lhbicsXG4gICAgJ2tpdHRlbicsXG4gICAgJ3BpcmF0ZScsXG4gICAgJ2VnZ25vZycsXG4gICAgJ2ZhY2V0aW91cycsXG4gICAgJ2xldHR1Y2UnLFxuICAgICdtYXRlJyxcbiAgICAncGFuY2FrZScsXG4gICAgJ2ZvcmsnLFxuICAgICdzb3VwJyxcbiAgICAnd2luZScsXG4gICAgJ3dvbHZlcmluZScsXG4gICAgJ2xvdmViaXJkJyxcbiAgICAnc2hvZSBsYWNlJyxcbiAgICAnZHJhd2VyJyxcbiAgICAncGVhbnV0cycsXG4gICAgJ2Zha2UgZmxvd2VycycsXG4gICAgJ2Nob2NvbGF0ZScsXG4gICAgJ2NyZWRpdCBjYXJkJyxcbiAgICAnc29mYScsXG4gICAgJ3Nhcm9uZycsXG4gICAgJ3RyYWNrc3VpdCcsXG4gICAgJ2p1aWN5IGphY2tldCcsXG4gICAgJ3BvbmNobycsXG4gICAgJ3RhbmtpbmknLFxuICAgICdzdW5yb29mJyxcbiAgICAnc3VuZHJlc3MnLFxuICAgICdiYW1iaScsXG4gICAgJ2NvY29hJyxcbiAgICAnYnV0dGVyJyxcbiAgICAnY2Fyb3VzZWwnLFxuICAgICdzdGFyZ2F6aW5nJyxcbiAgICAnaG9uZXknLFxuICAgICdtYXJpbmFkZScsXG4gICAgJ2Zvc3NpbHMnLFxuICAgICd3aW5kb3dwYW5lJyxcbiAgICAnc29tZXJzYXVsdCcsXG4gICAgJ3RyYW1wb2xpbmUnLFxuICAgICdsaWJyYScsXG4gICAgJ2FxdWFyaXVzJyxcbiAgICAncmFpbmJvdycsXG4gICAgJ2dlbWluaScsXG4gICAgJ3Njb3JwaW8nLFxuICAgICdjYXByaWNvcm4nLFxuICAgICdib29rIGZhaXInLFxuICAgICdob3Bza290Y2gnLFxuICAgICdzdWdhcicsXG4gICAgJ2JsYWNrbGlnaHQnLFxuICAgICdzdWdhcmZyZWUnLFxuICAgICdwbHV0bycsXG4gICAgJ2Zyb3RoJyxcbiAgICAndHVsaXBzJyxcbiAgICAnc2FuZHknLFxuICAgICdidW5rYmVkJyxcbiAgICAnY2hpbmF0b3duJyxcbiAgICAndG9ydGlsbGEnLFxuICAgICdwYXJraW5nIGxvdCcsXG4gICAgJ2JhYnkgYmx1ZScsXG4gICAgJ3JhY29vbicsXG4gICAgJ3ZhbGV0JyxcbiAgICAncHJpbmNlc3MnLFxuICAgICdwZWFjaCcsXG4gICAgJ3RlbGV2aXNpb25zJyxcbiAgICAnY2hyaXN0bWFzJyxcbiAgICAnZ290aCcsXG4gICAgJ2NhbWVvJyxcbiAgICAnZm9yZ290JyxcbiAgICAnYW5nZWwnLFxuICAgICdjYWN0aScsXG4gICAgJ2ZpcmUgaHlkcmFudCcsXG4gICAgJ3NoYWRvdycsXG4gICAgJ2RyeSBjbGVhbmluZycsXG4gICAgJ2ZpbmdlcnRpcHMnLFxuICAgICdjb2Nvb24nLFxuICAgICdzb2NjZXInLFxuICAgICdjYXNzZXR0ZScsXG4gICAgJ21hdGFkb3InLFxuICAgICdqdW5nbGUnLFxuICAgICd0aWdlcicsXG4gICAgJ2RhcmxpbmcnLFxuICAgICd3aW5rJyxcbiAgICAnc21pbGVzJyxcbiAgICAnbW9uc29vbicsXG4gICAgJ2Nvd2JveScsXG4gICAgJ3NoYXJrJyxcbiAgICAnc2FmYXJpJyxcbiAgICAnbW9yb2NjYW4nLFxuICAgICdsZW1vbmFkZScsXG4gICAgJ2xpbWVhZGUnLFxuICAgICdtb2NraW5nYmlyZCcsXG4gICAgJ2x1bmEnLFxuICAgICdzdWF2ZScsXG4gICAgJ21hZGFtZScsXG4gICAgJ2pldCBza2knLFxuICAgICdzcGVlZG8nLFxuICAgICdtYXR6byBiYWxsJyxcbiAgICAnbG9sbGlwb3AnLFxuICAgICdzcGFuaXNoJyxcbiAgICAnZnJlbmNoJyxcbiAgICAncGViYmxlJyxcbiAgICAnbmFtZSB0YWcnXG5dO1xuXG5leHBvcnQgZGVmYXVsdCB3b3JkczsiXSwic291cmNlUm9vdCI6IiJ9