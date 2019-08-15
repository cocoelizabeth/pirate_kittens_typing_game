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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kitten = __webpack_require__(/*! ./js/kitten */ "./src/js/kitten.js");

var _kitten2 = _interopRequireDefault(_kitten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', init);
// Globals
// modes

var time = 30;
var score = 0;
var isPlaying = void 0;
var currentWords = [];
var activeKittens = [];

// Images
var backgroundImage = new Image();
backgroundImage.src = 'https://game-seeds.s3.amazonaws.com/background+with+palms.jpg';

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
var words = ['bubblegum', 'river', 'popcorn', 'revolver', 'magic', 'potato', 'blockhead', 'loophole', 'ambidextrous', 'fish', 'nineteen', 'clover', 'beeswax', 'cereal', 'chameleon', 'lightbulb', 'gibberish', 'serpent', 'gamble', 'bunny', 'doorman', 'amateur', 'jigsaw', 'cultish', 'bamboo', 'bumblebee', 'pumpkin', 'harmonica', 'haircut', 'jellyfish', 'quarrelsome', 'fax machine', 'fairies', 'rhyme', 'embarrassing', 'pajamas', 'duffel bag', 'overpriced', 'ketchup', 'koala', 'panther', 'flower', 'squishmallow', 'synesthesia', 'tempestuous', 'falafel', 'pedestrian', 'dennis rodman', 'basketball', 'rainforest', 'meow', 'dentures', 'helen keller'];

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

// Match input - OLD WORKING CODE
// function matchInput() {
//     let value = wordInput.value;
//     if(currentWords.indexOf(value) > -1) {
//             i = currentWords.indexOf(value);
//             scoreDisplay.innerHTML++;
//             currentWords.splice(i, 1);
//             wordInput.value="";
//     }
// }

// NEW:
function matchInput() {
    var value = wordInput.value;
    if (currentWords.indexOf(value) > -1) {
        var i = currentWords.indexOf(value);
        score++;
        scoreDisplay.innerHTML++;
        currentWords.splice(i, 1);

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
        // activeKittens[i].fly();
        wordInput.value = "";
    }
}

// pick and show random  word 
function randomWord() {
    // Generate random array index
    var randomIndex = Math.floor(Math.random() * words.length);
    // Save random word to a variable & push it into currentWords array
    var word = words[randomIndex];
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
        score = 0;
        scoreDisplay.innerHTML = 0;
    }
}

function animate(activeKittens) {
    ctx.clearRect(0, 0, 800, 600);
    var background = new Background(backgroundImage);
    background.draw();
    for (var i = 0; i < activeKittens.length; i++) {
        activeKittens[i].update().draw(ctx);
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
    //  const background = new Background(backgroundImage);
    var word = randomWord(words);
    var newKitten = new _kitten2.default([0, 400], word, kittenImage, activeKittens, currentWords);

    // new
    activeKittens.push(newKitten);
    window.requestAnimationFrame(function (timestamp) {
        setInterval(releaseMoreKittens, 2000);
        animate(activeKittens);
    });
};

// Classes
//  class Kitten {
//      constructor(kittenPos, word, kittenImage) {
//          this.kittenPos = kittenPos;
//          this.word = word;
//          this.kittenImage = kittenImage;

//      }

//      update() {

//          this.kittenPos[0]++
//          if (this.word === "") {
//              this.fly();
//              activeKittens.splice(i,1);
//          }
//          if (this.kittenPos[0] > 799) {
//              i = activeKittens.indexOf(this);
//              activeKittens.splice(i,1);
//              currentWords.splice(i,1);

//          }
//          return this;
//      }

//      fly() {
//          this.kittenPos[0] += 5
//          this.kittenPos[1] -= 5
//      }

//      // ultimately take in ctx for draw
//      draw() {
//          // debugger
//          ctx.drawImage(this.kittenImage, ...this.kittenPos);
//          ctx.font = "16px Arial";
//          ctx.fillStyle = "aquamarine";
//          ctx.fillText(this.word, (this.kittenPos[0] + 30), (this.kittenPos[1] + 165));
//      }
//  }


var Background = function () {
    function Background(backgroundImage) {
        _classCallCheck(this, Background);

        this.backgroundImage = backgroundImage;
    }

    _createClass(Background, [{
        key: 'draw',
        value: function draw() {
            ctx.drawImage(this.backgroundImage, 0, 0);
        }
    }]);

    return Background;
}();

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
                this.activeKittens.splice(i, 1);
            }
            if (this.kittenPos[0] > 799) {
                var _i = this.activeKittens.indexOf(this);
                this.activeKittens.splice(_i, 1);
                this.currentWords.splice(_i, 1);
            }
            return this;
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
            ctx.font = "16px Jura, sans-serif";
            // ctx.font-family ="UnifrakturCook, sans-serif";
            // ctx.font-size="16px";
            ctx.fillStyle = "aquamarine";
            ctx.fillText(this.word, this.kittenPos[0] + 30, this.kittenPos[1] + 165);
        }
    }]);

    return Kitten;
}();

exports.default = Kitten;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJ0aW1lIiwic2NvcmUiLCJpc1BsYXlpbmciLCJjdXJyZW50V29yZHMiLCJhY3RpdmVLaXR0ZW5zIiwiYmFja2dyb3VuZEltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5JbWFnZSIsImtpdHRlblBvcyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwid29yZElucHV0IiwicXVlcnlTZWxlY3RvciIsInNjb3JlRGlzcGxheSIsInRpbWVEaXNwbGF5IiwibWVzc2FnZSIsIndvcmRzIiwiaGFuZGxlTWF0Y2giLCJzZXRJbnRlcnZhbCIsImNvdW50ZG93biIsImNoZWNrU3RhdHVzIiwicmVsZWFzZU1vcmVLaXR0ZW5zIiwid29yZCIsInJhbmRvbVdvcmQiLCJwb3MiLCJyYW5kb21Qb3NpdGlvbiIsIm5ld0tpdHRlbiIsIktpdHRlbiIsInB1c2giLCJtYXRjaElucHV0IiwidmFsdWUiLCJpbmRleE9mIiwiaSIsImlubmVySFRNTCIsInNwbGljZSIsImFjdGl2ZSIsInVwZGF0ZSIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJiYWNrZ3JvdW5kIiwiQmFja2dyb3VuZCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lc3RhbXAiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiLCJmbHkiLCJmb250IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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RUlJLEcsRUFBSztBQUNOO0FBQ0FBLGdCQUFJMkMsU0FBSixhQUFjLEtBQUtoRCxXQUFuQiw0QkFBbUMsS0FBS0MsU0FBeEM7QUFDQUksZ0JBQUk2QyxJQUFKLEdBQVcsdUJBQVg7QUFDQTtBQUNBO0FBQ0E3QyxnQkFBSThDLFNBQUosR0FBZ0IsWUFBaEI7QUFDQTlDLGdCQUFJK0MsUUFBSixDQUFhLEtBQUtsQyxJQUFsQixFQUF5QixLQUFLakIsU0FBTCxDQUFlLENBQWYsSUFBb0IsRUFBN0MsRUFBbUQsS0FBS0EsU0FBTCxDQUFlLENBQWYsSUFBb0IsR0FBdkU7QUFDSDs7Ozs7O2tCQUdVc0IsTSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiAgICAgaW1wb3J0IEtpdHRlbiBmcm9tIFwiLi9qcy9raXR0ZW5cIjtcbiAgICAgXG4gICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdCk7XG4gICAgIC8vIEdsb2JhbHNcbiAgICAgLy8gbW9kZXNcblxuICAgICBsZXQgdGltZSA9IDMwO1xuICAgICBsZXQgc2NvcmUgPSAwO1xuICAgICBsZXQgaXNQbGF5aW5nO1xuICAgICBsZXQgY3VycmVudFdvcmRzID0gW107XG4gICAgIGxldCBhY3RpdmVLaXR0ZW5zID0gW107XG5cblxuICAgICAvLyBJbWFnZXNcbiAgICAgY29uc3QgYmFja2dyb3VuZEltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgIGJhY2tncm91bmRJbWFnZS5zcmMgPSAnaHR0cHM6Ly9nYW1lLXNlZWRzLnMzLmFtYXpvbmF3cy5jb20vYmFja2dyb3VuZCt3aXRoK3BhbG1zLmpwZydcblxuICAgICBjb25zdCBraXR0ZW5JbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICBraXR0ZW5JbWFnZS5zcmMgPSAnaHR0cHM6Ly9nYW1lLXNlZWRzLnMzLmFtYXpvbmF3cy5jb20vMi1waXJhdGVzLWNvcHkucG5nJztcbiAgICAgY29uc3Qga2l0dGVuUG9zID0gWzAsIDQwMF07XG5cbiAgICAgLy8gRE9NIEVsZW1lbnRzXG4gICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgIGNvbnN0IHdvcmRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JkLWlucHV0Jyk7XG4gICAgIGNvbnN0IHNjb3JlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xuICAgICBjb25zdCB0aW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XG4gICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuXG5cbiAgICAgLy8gY29uc3QgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVldGFoJyk7IC8vIERPTSBNYW5pcHVsYXRpb24gKGFzIG9wcG9zZWQgdG8gY2FudmFzLS0gbWF5YmUgY29tZSBiYWNrIHRvIHRoaXMpXG5cbiAgICAgLy8gRGljdGlvbmFyeVxuICAgIC8vIGNvbnN0IGRpY3Rpb25hcnkgPSBjdXJyZW50TW9kZTtcbiAgICAvLyBjb25zdCBtb2RlID0ge1xuICAgIC8vICAgICB3b3Jkczogd29yZHMsXG4gICAgLy8gICAgIGNvZGluZzogY29kaW5nLFxuICAgIC8vIH07XG5cbiAgICAvLyBjb25zdCBjdXJyZW50TW9kZSA9IG1vZGUud29yZHM7XG4gICAgY29uc3Qgd29yZHMgPSBbXG4gICAgICAgICAnYnViYmxlZ3VtJyxcbiAgICAgICAgICdyaXZlcicsXG4gICAgICAgICAncG9wY29ybicsXG4gICAgICAgICAncmV2b2x2ZXInLFxuICAgICAgICAgJ21hZ2ljJyxcbiAgICAgICAgICdwb3RhdG8nLFxuICAgICAgICAgJ2Jsb2NraGVhZCcsXG4gICAgICAgICAnbG9vcGhvbGUnLFxuICAgICAgICAgJ2FtYmlkZXh0cm91cycsXG4gICAgICAgICAnZmlzaCcsXG4gICAgICAgICAnbmluZXRlZW4nLFxuICAgICAgICAgJ2Nsb3ZlcicsXG4gICAgICAgICAnYmVlc3dheCcsXG4gICAgICAgICAnY2VyZWFsJyxcbiAgICAgICAgICdjaGFtZWxlb24nLFxuICAgICAgICAgJ2xpZ2h0YnVsYicsXG4gICAgICAgICAnZ2liYmVyaXNoJyxcbiAgICAgICAgICdzZXJwZW50JyxcbiAgICAgICAgICdnYW1ibGUnLFxuICAgICAgICAgJ2J1bm55JyxcbiAgICAgICAgICdkb29ybWFuJyxcbiAgICAgICAgICdhbWF0ZXVyJyxcbiAgICAgICAgICdqaWdzYXcnLFxuICAgICAgICAgJ2N1bHRpc2gnLFxuICAgICAgICAgJ2JhbWJvbycsXG4gICAgICAgICAnYnVtYmxlYmVlJyxcbiAgICAgICAgICdwdW1wa2luJyxcbiAgICAgICAgICdoYXJtb25pY2EnLFxuICAgICAgICAgJ2hhaXJjdXQnLFxuICAgICAgICAgJ2plbGx5ZmlzaCcsXG4gICAgICAgICAncXVhcnJlbHNvbWUnLFxuICAgICAgICAgJ2ZheCBtYWNoaW5lJyxcbiAgICAgICAgICdmYWlyaWVzJyxcbiAgICAgICAgICdyaHltZScsXG4gICAgICAgICAnZW1iYXJyYXNzaW5nJyxcbiAgICAgICAgICdwYWphbWFzJyxcbiAgICAgICAgICdkdWZmZWwgYmFnJyxcbiAgICAgICAgICdvdmVycHJpY2VkJyxcbiAgICAgICAgICdrZXRjaHVwJyxcbiAgICAgICAgICdrb2FsYScsXG4gICAgICAgICAncGFudGhlcicsXG4gICAgICAgICAnZmxvd2VyJyxcbiAgICAgICAgICdzcXVpc2htYWxsb3cnLFxuICAgICAgICAgJ3N5bmVzdGhlc2lhJyxcbiAgICAgICAgICd0ZW1wZXN0dW91cycsXG4gICAgICAgICAnZmFsYWZlbCcsXG4gICAgICAgICAncGVkZXN0cmlhbicsXG4gICAgICAgICAnZGVubmlzIHJvZG1hbicsXG4gICAgICAgICAnYmFza2V0YmFsbCcsXG4gICAgICAgICAncmFpbmZvcmVzdCcsXG4gICAgICAgICAnbWVvdycsXG4gICAgICAgICAnZGVudHVyZXMnLFxuICAgICAgICAgJ2hlbGVuIGtlbGxlcicsXG4gICAgIF07XG5cbiAgICAgLy8gTG9naWNcblxuICAgICAvLyBJbml0aWFsaXplIEdhbWVcbiAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgIC8vIHN0YXJ0ICBtYXRjaGluZyBvbiB3b3JkIGlucHV0XG4gICAgICAgICB3b3JkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVNYXRjaCk7XG4gICAgICAgICAvLyBvbkNoYW5nZT8/XG4gICAgICAgICAvLyBDYWxsIGNvdW50ZG93biBldmVyeSBzZWNvbmRcbiAgICAgICAgIHNldEludGVydmFsKGNvdW50ZG93biwgMTAwMCk7XG4gICAgICAgICAvLyBDaGVjayBnYW1lIHN0YXR1c1xuICAgICAgICAgc2V0SW50ZXJ2YWwoY2hlY2tTdGF0dXMsIDUwKTtcbiAgICAgICAgIC8vIHNldEludGVydmFsKHJlbGVhc2VNb3JlS2l0dGVucywgMjAwMCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiByZWxlYXNlTW9yZUtpdHRlbnMoKSB7XG4gICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tV29yZCgpO1xuICAgICAgICAgY29uc3QgcG9zID0gcmFuZG9tUG9zaXRpb24oKTtcbiAgICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4ocG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucywgY3VycmVudFdvcmRzKTtcbiAgICAgICAgIGFjdGl2ZUtpdHRlbnMucHVzaChuZXdLaXR0ZW4pO1xuICAgICAgICAgLy8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKG5ld0tpdHRlbikpXG4gICAgICAgICAvLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUobmV3S2l0dGVuKSk7XG5cbiAgICAgfVxuXG4gICAgIC8vIE1hdGNoIGlucHV0IC0gT0xEIFdPUktJTkcgQ09ERVxuICAgICAvLyBmdW5jdGlvbiBtYXRjaElucHV0KCkge1xuICAgICAvLyAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAvLyAgICAgaWYoY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgLy8gICAgICAgICAgICAgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgLy8gICAgICAgICAgICAgc2NvcmVEaXNwbGF5LmlubmVySFRNTCsrO1xuICAgICAvLyAgICAgICAgICAgICBjdXJyZW50V29yZHMuc3BsaWNlKGksIDEpO1xuICAgICAvLyAgICAgICAgICAgICB3b3JkSW5wdXQudmFsdWU9XCJcIjtcbiAgICAgLy8gICAgIH1cbiAgICAgLy8gfVxuXG4gICAgIC8vIE5FVzpcbiAgICAgZnVuY3Rpb24gbWF0Y2hJbnB1dCgpIHtcbiAgICAgICAgIGxldCB2YWx1ZSA9IHdvcmRJbnB1dC52YWx1ZTtcbiAgICAgICAgIGlmIChjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICAgICAgIGxldCBpID0gY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgICAgIHNjb3JlICsrO1xuICAgICAgICAgICAgIHNjb3JlRGlzcGxheS5pbm5lckhUTUwrKzsgXG4gICAgICAgICAgICAgY3VycmVudFdvcmRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZU1hdGNoKCkge1xuICAgICAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAgICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgICBpZiAobWF0Y2hJbnB1dCgpKSB7XG4gICAgICAgICAgICAgaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0udXBkYXRlKGkpO1xuICAgICAgICAgICAgLy8gYWN0aXZlS2l0dGVuc1tpXS5mbHkoKTtcbiAgICAgICAgICAgICB3b3JkSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgfVxuICAgICB9XG5cblxuICAgICAvLyBwaWNrIGFuZCBzaG93IHJhbmRvbSAgd29yZCBcbiAgICAgZnVuY3Rpb24gcmFuZG9tV29yZCgpIHtcbiAgICAgICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBhcnJheSBpbmRleFxuICAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3Jkcy5sZW5ndGgpO1xuICAgICAgICAgLy8gU2F2ZSByYW5kb20gd29yZCB0byBhIHZhcmlhYmxlICYgcHVzaCBpdCBpbnRvIGN1cnJlbnRXb3JkcyBhcnJheVxuICAgICAgICBjb25zdCB3b3JkID0gd29yZHNbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgY3VycmVudFdvcmRzLnB1c2god29yZCk7XG4gICAgICAgICAvLyBPdXRwdXQgYSByYW5kb213b3JkXG4gICAgICAgICByZXR1cm4gd29yZDtcblxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gcmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgICBsZXQgcmFuZG9tUG9zaXRpb24gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTM2KSArIDEpO1xuICAgICAgICAgcmFuZG9tUG9zaXRpb24gPSA0MDAtcmFuZG9tUG9zaXRpb247XG4gICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21Qb3NpdGlvbik7XG4gICAgICAgICByZXR1cm4gWzAsIHJhbmRvbVBvc2l0aW9uXTtcbiAgICAgfVxuXG4gICAgIC8vIENvdW50ZG93biB0aW1lclxuICAgICBmdW5jdGlvbiBjb3VudGRvd24oKSB7XG4gICAgICAgICAvLyBNYWtlIHN1cmUgdGltZSBpcyAgbm90IHJ1biBvdXRcbiAgICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgICAgIC8vIGRlY3JlbWVudCB0aW1lXG4gICAgICAgICAgICAgdGltZS0tO1xuICAgICAgICAgfSBlbHNlIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgICAvLyBTaG93IHRpbWVcbiAgICAgICAgIHRpbWVEaXNwbGF5LmlubmVySFRNTCA9IHRpbWU7XG4gICAgIH1cblxuICAgICAvLyBDaGVjayBnYW1lIHN0YXR1c1xuICAgICBmdW5jdGlvbiBjaGVja1N0YXR1cygpIHtcbiAgICAgICAgIGlmICghaXNQbGF5aW5nICYmIHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdHYW1lIE92ZXIhJztcbiAgICAgICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgICAgICAgc2NvcmVEaXNwbGF5LmlubmVySFRNTD0wO1xuICAgICAgICAgfVxuICAgICB9XG5cblxuICAgICBmdW5jdGlvbiBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpIHtcbiAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgODAwLCA2MDApO1xuICAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKGJhY2tncm91bmRJbWFnZSk7XG4gICAgICAgICBiYWNrZ3JvdW5kLmRyYXcoKTtcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlS2l0dGVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0udXBkYXRlKCkuZHJhdyhjdHgpO1xuICAgICAgICAgfVxuXG5cblxuXG5cblxuICAgICAgICAgLy8gaWYgKGtpdHRlblBvc1swXSA8IDgwMCApIHtcbiAgICAgICAgIC8vIGMuc3R5bGUudHJhbnNmb3JtID1gdHJhbnNsYXRlKCR7a2l0dGVuUG9zWzBdfXB4LCAwcHgpYFxuICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWV0YWgnKTtcbiAgICAgICAgIC8vIERPTSBNYW5pcHVsYXRpb24gKGFzIG9wcG9zZWQgdG8gY2FudmFzLS0gbWF5YmUgY29tZSBiYWNrIHRvIHRoaXMgaWYgeW91IGNvbW1lbnQgJ2MnIGJhY2sgaW4gYWJvdmUpXG4gICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuICAgICAgICAgfSk7XG4gICAgICAgICAvLyB9XG5cbiAgICAgfVxuICAgICBraXR0ZW5JbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICBjb25zdCBiYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoYmFja2dyb3VuZEltYWdlKTtcbiAgICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKHdvcmRzKTtcbiAgICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4oWzAsIDQwMF0sIHdvcmQsIGtpdHRlbkltYWdlLCBhY3RpdmVLaXR0ZW5zLCBjdXJyZW50V29yZHMpO1xuICAgICAgICBcbiAgICAgICAgIC8vIG5ld1xuICAgICAgICAgYWN0aXZlS2l0dGVucy5wdXNoKG5ld0tpdHRlbik7XG4gICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICBzZXRJbnRlcnZhbChyZWxlYXNlTW9yZUtpdHRlbnMsIDIwMDApO1xuICAgICAgICAgICAgIGFuaW1hdGUoYWN0aXZlS2l0dGVucyk7XG5cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLy8gQ2xhc3Nlc1xuICAgIC8vICBjbGFzcyBLaXR0ZW4ge1xuICAgIC8vICAgICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSkge1xuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgIC8vICAgICAgICAgIHRoaXMud29yZCA9IHdvcmQ7XG4gICAgLy8gICAgICAgICAgdGhpcy5raXR0ZW5JbWFnZSA9IGtpdHRlbkltYWdlO1xuXG4gICAgLy8gICAgICB9XG5cbiAgICAvLyAgICAgIHVwZGF0ZSgpIHtcblxuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuUG9zWzBdKytcbiAgICAvLyAgICAgICAgICBpZiAodGhpcy53b3JkID09PSBcIlwiKSB7XG4gICAgLy8gICAgICAgICAgICAgIHRoaXMuZmx5KCk7XG4gICAgLy8gICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksMSk7XG4gICAgLy8gICAgICAgICAgfVxuICAgIC8vICAgICAgICAgIGlmICh0aGlzLmtpdHRlblBvc1swXSA+IDc5OSkge1xuICAgIC8vICAgICAgICAgICAgICBpID0gYWN0aXZlS2l0dGVucy5pbmRleE9mKHRoaXMpO1xuICAgIC8vICAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zLnNwbGljZShpLDEpO1xuICAgIC8vICAgICAgICAgICAgICBjdXJyZW50V29yZHMuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAvLyAgICAgIH1cblxuICAgIC8vICAgICAgZmx5KCkge1xuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDVcbiAgICAvLyAgICAgICAgICB0aGlzLmtpdHRlblBvc1sxXSAtPSA1XG4gICAgLy8gICAgICB9XG5cbiAgICAvLyAgICAgIC8vIHVsdGltYXRlbHkgdGFrZSBpbiBjdHggZm9yIGRyYXdcbiAgICAvLyAgICAgIGRyYXcoKSB7XG4gICAgLy8gICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAvLyAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMua2l0dGVuSW1hZ2UsIC4uLnRoaXMua2l0dGVuUG9zKTtcbiAgICAvLyAgICAgICAgICBjdHguZm9udCA9IFwiMTZweCBBcmlhbFwiO1xuICAgIC8vICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImFxdWFtYXJpbmVcIjtcbiAgICAvLyAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy53b3JkLCAodGhpcy5raXR0ZW5Qb3NbMF0gKyAzMCksICh0aGlzLmtpdHRlblBvc1sxXSArIDE2NSkpO1xuICAgIC8vICAgICAgfVxuICAgIC8vICB9XG5cblxuICAgICBjbGFzcyBCYWNrZ3JvdW5kIHtcbiAgICAgICAgIGNvbnN0cnVjdG9yKGJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZEltYWdlO1xuICAgICAgICAgfVxuXG4gICAgICAgICBkcmF3KCkge1xuICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kSW1hZ2UsIDAsIDApO1xuICAgICAgICAgfVxuXG4gICAgIH1cbiIsImNsYXNzIEtpdHRlbiB7XG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucz1bXSwgY3VycmVudFdvcmRzPVtdKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgICAgICB0aGlzLmtpdHRlbkltYWdlID0ga2l0dGVuSW1hZ2U7XG4gICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucyA9IGFjdGl2ZUtpdHRlbnM7XG4gICAgICAgIHRoaXMuY3VycmVudFdvcmRzID0gY3VycmVudFdvcmRzO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGkpIHtcblxuICAgICAgICB0aGlzLmtpdHRlblBvc1swXSsrXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZmx5KCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmtpdHRlblBvc1swXSA+IDc5OSkge1xuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmFjdGl2ZUtpdHRlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXb3Jkcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmbHkoKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDVcbiAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMV0gLT0gNVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5raXR0ZW5JbWFnZSwgLi4udGhpcy5raXR0ZW5Qb3MpO1xuICAgICAgICBjdHguZm9udCA9IFwiMTZweCBKdXJhLCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIGN0eC5mb250LWZhbWlseSA9XCJVbmlmcmFrdHVyQ29vaywgc2Fucy1zZXJpZlwiO1xuICAgICAgICAvLyBjdHguZm9udC1zaXplPVwiMTZweFwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJhcXVhbWFyaW5lXCI7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLndvcmQsICh0aGlzLmtpdHRlblBvc1swXSArIDMwKSwgKHRoaXMua2l0dGVuUG9zWzFdICsgMTY1KSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLaXR0ZW47Il0sInNvdXJjZVJvb3QiOiIifQ==