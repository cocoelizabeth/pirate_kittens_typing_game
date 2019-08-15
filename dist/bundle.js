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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJ0aW1lIiwic2NvcmUiLCJpc1BsYXlpbmciLCJjdXJyZW50V29yZHMiLCJhY3RpdmVLaXR0ZW5zIiwiYmFja2dyb3VuZEltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5JbWFnZSIsImtpdHRlblBvcyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwid29yZElucHV0IiwicXVlcnlTZWxlY3RvciIsInNjb3JlRGlzcGxheSIsInRpbWVEaXNwbGF5IiwibWVzc2FnZSIsIndvcmRzIiwiaGFuZGxlTWF0Y2giLCJzZXRJbnRlcnZhbCIsImNvdW50ZG93biIsImNoZWNrU3RhdHVzIiwicmVsZWFzZU1vcmVLaXR0ZW5zIiwid29yZCIsInJhbmRvbVdvcmQiLCJwb3MiLCJyYW5kb21Qb3NpdGlvbiIsIm5ld0tpdHRlbiIsIktpdHRlbiIsInB1c2giLCJtYXRjaElucHV0IiwidmFsdWUiLCJpbmRleE9mIiwiaSIsImlubmVySFRNTCIsInNwbGljZSIsImFjdGl2ZSIsInVwZGF0ZSIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJiYWNrZ3JvdW5kIiwiQmFja2dyb3VuZCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lc3RhbXAiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiLCJmbHkiLCJmb250IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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SUFBSixHQUFXLHVCQUFYO0FBQ0E7QUFDQTtBQUNBN0MsZ0JBQUk4QyxTQUFKLEdBQWdCLFlBQWhCO0FBQ0E5QyxnQkFBSStDLFFBQUosQ0FBYSxLQUFLbEMsSUFBbEIsRUFBeUIsS0FBS2pCLFNBQUwsQ0FBZSxDQUFmLElBQW9CLEVBQTdDLEVBQW1ELEtBQUtBLFNBQUwsQ0FBZSxDQUFmLElBQW9CLEdBQXZFO0FBQ0g7Ozs7OztrQkFHVXNCLE0iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIgICAgIGltcG9ydCBLaXR0ZW4gZnJvbSBcIi4vanMva2l0dGVuXCI7XG4gICAgIFxuICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXQpO1xuICAgICAvLyBHbG9iYWxzXG5cbiAgICAgbGV0IHRpbWUgPSAzMDtcbiAgICAgbGV0IHNjb3JlID0gMDtcbiAgICAgbGV0IGlzUGxheWluZztcbiAgICAgbGV0IGN1cnJlbnRXb3JkcyA9IFtdO1xuICAgICBsZXQgYWN0aXZlS2l0dGVucyA9IFtdO1xuXG5cbiAgICAgLy8gSW1hZ2VzXG4gICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICBiYWNrZ3JvdW5kSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tL2JhY2tncm91bmQrd2l0aCtwYWxtcy5qcGcnXG5cbiAgICAgY29uc3Qga2l0dGVuSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAga2l0dGVuSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tLzItcGlyYXRlcy1jb3B5LnBuZyc7XG4gICAgIGNvbnN0IGtpdHRlblBvcyA9IFswLCA0MDBdO1xuXG4gICAgIC8vIERPTSBFbGVtZW50c1xuICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICBjb25zdCB3b3JkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd29yZC1pbnB1dCcpO1xuICAgICBjb25zdCBzY29yZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKTtcbiAgICAgY29uc3QgdGltZURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZScpO1xuICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcblxuXG4gICAgIC8vIGNvbnN0IGMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlZXRhaCcpOyAvLyBET00gTWFuaXB1bGF0aW9uIChhcyBvcHBvc2VkIHRvIGNhbnZhcy0tIG1heWJlIGNvbWUgYmFjayB0byB0aGlzKVxuXG4gICAgIC8vIERpY3Rpb25hcnlcbiAgICAgY29uc3Qgd29yZHMgPSBbXG4gICAgICAgICAnYnViYmxlZ3VtJyxcbiAgICAgICAgICdyaXZlcicsXG4gICAgICAgICAncG9wY29ybicsXG4gICAgICAgICAncmV2b2x2ZXInLFxuICAgICAgICAgJ21hZ2ljJyxcbiAgICAgICAgICdwb3RhdG8nLFxuICAgICAgICAgJ2Jsb2NraGVhZCcsXG4gICAgICAgICAnbG9vcGhvbGUnLFxuICAgICAgICAgJ2FtYmlkZXh0cm91cycsXG4gICAgICAgICAnZmlzaCcsXG4gICAgICAgICAnbmluZXRlZW4nLFxuICAgICAgICAgJ2Nsb3ZlcicsXG4gICAgICAgICAnYmVlc3dheCcsXG4gICAgICAgICAnY2VyZWFsJyxcbiAgICAgICAgICdjaGFtZWxlb24nLFxuICAgICAgICAgJ2xpZ2h0YnVsYicsXG4gICAgICAgICAnZ2liYmVyaXNoJyxcbiAgICAgICAgICdzZXJwZW50JyxcbiAgICAgICAgICdnYW1ibGUnLFxuICAgICAgICAgJ2J1bm55JyxcbiAgICAgICAgICdkb29ybWFuJyxcbiAgICAgICAgICdhbWF0ZXVyJyxcbiAgICAgICAgICdqaWdzYXcnLFxuICAgICAgICAgJ2N1bHRpc2gnLFxuICAgICAgICAgJ2JhbWJvbycsXG4gICAgICAgICAnYnVtYmxlYmVlJyxcbiAgICAgICAgICdwdW1wa2luJyxcbiAgICAgICAgICdoYXJtb25pY2EnLFxuICAgICAgICAgJ2hhaXJjdXQnLFxuICAgICAgICAgJ2plbGx5ZmlzaCcsXG4gICAgICAgICAncXVhcnJlbHNvbWUnLFxuICAgICAgICAgJ2ZheCBtYWNoaW5lJyxcbiAgICAgICAgICdmYWlyaWVzJyxcbiAgICAgICAgICdyaHltZScsXG4gICAgICAgICAnZW1iYXJyYXNzaW5nJyxcbiAgICAgICAgICdwYWphbWFzJyxcbiAgICAgICAgICdkdWZmZWwgYmFnJyxcbiAgICAgICAgICdvdmVycHJpY2VkJyxcbiAgICAgICAgICdrZXRjaHVwJyxcbiAgICAgICAgICdrb2FsYScsXG4gICAgICAgICAncGFudGhlcicsXG4gICAgICAgICAnZmxvd2VyJyxcbiAgICAgICAgICdzcXVpc2htYWxsb3cnLFxuICAgICAgICAgJ3N5bmVzdGhlc2lhJyxcbiAgICAgICAgICd0ZW1wZXN0dW91cycsXG4gICAgICAgICAnZmFsYWZlbCcsXG4gICAgICAgICAncGVkZXN0cmlhbicsXG4gICAgICAgICAnZGVubmlzIHJvZG1hbicsXG4gICAgICAgICAnYmFza2V0YmFsbCcsXG4gICAgICAgICAncmFpbmZvcmVzdCcsXG4gICAgICAgICAnbWVvdycsXG4gICAgICAgICAnZGVudHVyZXMnLFxuICAgICAgICAgJ2hlbGVuIGtlbGxlcicsXG4gICAgIF07XG5cbiAgICAgLy8gTG9naWNcblxuICAgICAvLyBJbml0aWFsaXplIEdhbWVcbiAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgIC8vIHN0YXJ0ICBtYXRjaGluZyBvbiB3b3JkIGlucHV0XG4gICAgICAgICB3b3JkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVNYXRjaCk7XG4gICAgICAgICAvLyBvbkNoYW5nZT8/XG4gICAgICAgICAvLyBDYWxsIGNvdW50ZG93biBldmVyeSBzZWNvbmRcbiAgICAgICAgIHNldEludGVydmFsKGNvdW50ZG93biwgMTAwMCk7XG4gICAgICAgICAvLyBDaGVjayBnYW1lIHN0YXR1c1xuICAgICAgICAgc2V0SW50ZXJ2YWwoY2hlY2tTdGF0dXMsIDUwKTtcbiAgICAgICAgIC8vIHNldEludGVydmFsKHJlbGVhc2VNb3JlS2l0dGVucywgMjAwMCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiByZWxlYXNlTW9yZUtpdHRlbnMoKSB7XG4gICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tV29yZCgpO1xuICAgICAgICAgY29uc3QgcG9zID0gcmFuZG9tUG9zaXRpb24oKTtcbiAgICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4ocG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucywgY3VycmVudFdvcmRzKTtcbiAgICAgICAgIGFjdGl2ZUtpdHRlbnMucHVzaChuZXdLaXR0ZW4pO1xuICAgICAgICAgLy8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKG5ld0tpdHRlbikpXG4gICAgICAgICAvLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUobmV3S2l0dGVuKSk7XG5cbiAgICAgfVxuXG4gICAgIC8vIE1hdGNoIGlucHV0IC0gT0xEIFdPUktJTkcgQ09ERVxuICAgICAvLyBmdW5jdGlvbiBtYXRjaElucHV0KCkge1xuICAgICAvLyAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAvLyAgICAgaWYoY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgLy8gICAgICAgICAgICAgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgLy8gICAgICAgICAgICAgc2NvcmVEaXNwbGF5LmlubmVySFRNTCsrO1xuICAgICAvLyAgICAgICAgICAgICBjdXJyZW50V29yZHMuc3BsaWNlKGksIDEpO1xuICAgICAvLyAgICAgICAgICAgICB3b3JkSW5wdXQudmFsdWU9XCJcIjtcbiAgICAgLy8gICAgIH1cbiAgICAgLy8gfVxuXG4gICAgIC8vIE5FVzpcbiAgICAgZnVuY3Rpb24gbWF0Y2hJbnB1dCgpIHtcbiAgICAgICAgIGxldCB2YWx1ZSA9IHdvcmRJbnB1dC52YWx1ZTtcbiAgICAgICAgIGlmIChjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICAgICAgIGxldCBpID0gY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgICAgIHNjb3JlICsrO1xuICAgICAgICAgICAgIHNjb3JlRGlzcGxheS5pbm5lckhUTUwrKzsgXG4gICAgICAgICAgICAgY3VycmVudFdvcmRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZU1hdGNoKCkge1xuICAgICAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAgICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgICBpZiAobWF0Y2hJbnB1dCgpKSB7XG4gICAgICAgICAgICAgaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0udXBkYXRlKGkpO1xuICAgICAgICAgICAgLy8gYWN0aXZlS2l0dGVuc1tpXS5mbHkoKTtcbiAgICAgICAgICAgICB3b3JkSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgfVxuICAgICB9XG5cblxuICAgICAvLyBwaWNrIGFuZCBzaG93IHJhbmRvbSAgd29yZCBcbiAgICAgZnVuY3Rpb24gcmFuZG9tV29yZCgpIHtcbiAgICAgICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBhcnJheSBpbmRleFxuICAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3Jkcy5sZW5ndGgpO1xuICAgICAgICAgLy8gU2F2ZSByYW5kb20gd29yZCB0byBhIHZhcmlhYmxlICYgcHVzaCBpdCBpbnRvIGN1cnJlbnRXb3JkcyBhcnJheVxuICAgICAgICBjb25zdCB3b3JkID0gd29yZHNbcmFuZG9tSW5kZXhdO1xuICAgICAgICAgY3VycmVudFdvcmRzLnB1c2god29yZCk7XG4gICAgICAgICAvLyBPdXRwdXQgYSByYW5kb213b3JkXG4gICAgICAgICByZXR1cm4gd29yZDtcblxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gcmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgICBsZXQgcmFuZG9tUG9zaXRpb24gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTM2KSArIDEpO1xuICAgICAgICAgcmFuZG9tUG9zaXRpb24gPSA0MDAtcmFuZG9tUG9zaXRpb247XG4gICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21Qb3NpdGlvbik7XG4gICAgICAgICByZXR1cm4gWzAsIHJhbmRvbVBvc2l0aW9uXTtcbiAgICAgfVxuXG4gICAgIC8vIENvdW50ZG93biB0aW1lclxuICAgICBmdW5jdGlvbiBjb3VudGRvd24oKSB7XG4gICAgICAgICAvLyBNYWtlIHN1cmUgdGltZSBpcyAgbm90IHJ1biBvdXRcbiAgICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgICAgIC8vIGRlY3JlbWVudCB0aW1lXG4gICAgICAgICAgICAgdGltZS0tO1xuICAgICAgICAgfSBlbHNlIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICAgICAvLyBTaG93IHRpbWVcbiAgICAgICAgIHRpbWVEaXNwbGF5LmlubmVySFRNTCA9IHRpbWU7XG4gICAgIH1cblxuICAgICAvLyBDaGVjayBnYW1lIHN0YXR1c1xuICAgICBmdW5jdGlvbiBjaGVja1N0YXR1cygpIHtcbiAgICAgICAgIGlmICghaXNQbGF5aW5nICYmIHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdHYW1lIE92ZXIhJztcbiAgICAgICAgIH1cbiAgICAgfVxuXG5cbiAgICAgZnVuY3Rpb24gYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKSB7XG4gICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDgwMCwgNjAwKTtcbiAgICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZXcgQmFja2dyb3VuZChiYWNrZ3JvdW5kSW1hZ2UpO1xuICAgICAgICAgYmFja2dyb3VuZC5kcmF3KCk7XG4gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZUtpdHRlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zW2ldLnVwZGF0ZSgpLmRyYXcoY3R4KTtcbiAgICAgICAgIH1cblxuXG5cblxuXG5cbiAgICAgICAgIC8vIGlmIChraXR0ZW5Qb3NbMF0gPCA4MDAgKSB7XG4gICAgICAgICAvLyBjLnN0eWxlLnRyYW5zZm9ybSA9YHRyYW5zbGF0ZSgke2tpdHRlblBvc1swXX1weCwgMHB4KWBcbiAgICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVldGFoJyk7XG4gICAgICAgICAvLyBET00gTWFuaXB1bGF0aW9uIChhcyBvcHBvc2VkIHRvIGNhbnZhcy0tIG1heWJlIGNvbWUgYmFjayB0byB0aGlzIGlmIHlvdSBjb21tZW50ICdjJyBiYWNrIGluIGFib3ZlKVxuICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgYW5pbWF0ZShhY3RpdmVLaXR0ZW5zKTtcbiAgICAgICAgIH0pO1xuICAgICAgICAgLy8gfVxuXG4gICAgIH1cbiAgICAga2l0dGVuSW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKGJhY2tncm91bmRJbWFnZSk7XG4gICAgICAgICBjb25zdCB3b3JkID0gcmFuZG9tV29yZCh3b3Jkcyk7XG4gICAgICAgICBjb25zdCBuZXdLaXR0ZW4gPSBuZXcgS2l0dGVuKFswLCA0MDBdLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucywgY3VycmVudFdvcmRzKTtcbiAgICAgICAgXG4gICAgICAgICAvLyBuZXdcbiAgICAgICAgIGFjdGl2ZUtpdHRlbnMucHVzaChuZXdLaXR0ZW4pO1xuICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCAyMDAwKTtcbiAgICAgICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuXG4gICAgICAgICB9KTtcbiAgICAgfVxuXG4gICAgIC8vIENsYXNzZXNcbiAgICAvLyAgY2xhc3MgS2l0dGVuIHtcbiAgICAvLyAgICAgIGNvbnN0cnVjdG9yKGtpdHRlblBvcywgd29yZCwga2l0dGVuSW1hZ2UpIHtcbiAgICAvLyAgICAgICAgICB0aGlzLmtpdHRlblBvcyA9IGtpdHRlblBvcztcbiAgICAvLyAgICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuSW1hZ2UgPSBraXR0ZW5JbWFnZTtcblxuICAgIC8vICAgICAgfVxuXG4gICAgLy8gICAgICB1cGRhdGUoKSB7XG5cbiAgICAvLyAgICAgICAgICB0aGlzLmtpdHRlblBvc1swXSsrXG4gICAgLy8gICAgICAgICAgaWYgKHRoaXMud29yZCA9PT0gXCJcIikge1xuICAgIC8vICAgICAgICAgICAgICB0aGlzLmZseSgpO1xuICAgIC8vICAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zLnNwbGljZShpLDEpO1xuICAgIC8vICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICBpZiAodGhpcy5raXR0ZW5Qb3NbMF0gPiA3OTkpIHtcbiAgICAvLyAgICAgICAgICAgICAgaSA9IGFjdGl2ZUtpdHRlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAvLyAgICAgICAgICAgICAgYWN0aXZlS2l0dGVucy5zcGxpY2UoaSwxKTtcbiAgICAvLyAgICAgICAgICAgICAgY3VycmVudFdvcmRzLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICBcbiAgICAvLyAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgLy8gICAgICB9XG5cbiAgICAvLyAgICAgIGZseSgpIHtcbiAgICAvLyAgICAgICAgICB0aGlzLmtpdHRlblBvc1swXSArPSA1XG4gICAgLy8gICAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMV0gLT0gNVxuICAgIC8vICAgICAgfVxuXG4gICAgLy8gICAgICAvLyB1bHRpbWF0ZWx5IHRha2UgaW4gY3R4IGZvciBkcmF3XG4gICAgLy8gICAgICBkcmF3KCkge1xuICAgIC8vICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgLy8gICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmtpdHRlbkltYWdlLCAuLi50aGlzLmtpdHRlblBvcyk7XG4gICAgLy8gICAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggQXJpYWxcIjtcbiAgICAvLyAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJhcXVhbWFyaW5lXCI7XG4gICAgLy8gICAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMud29yZCwgKHRoaXMua2l0dGVuUG9zWzBdICsgMzApLCAodGhpcy5raXR0ZW5Qb3NbMV0gKyAxNjUpKTtcbiAgICAvLyAgICAgIH1cbiAgICAvLyAgfVxuXG5cbiAgICAgY2xhc3MgQmFja2dyb3VuZCB7XG4gICAgICAgICBjb25zdHJ1Y3RvcihiYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRJbWFnZTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZHJhdygpIHtcbiAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZEltYWdlLCAwLCAwKTtcbiAgICAgICAgIH1cblxuICAgICB9XG4iLCJjbGFzcyBLaXR0ZW4ge1xuICAgIGNvbnN0cnVjdG9yKGtpdHRlblBvcywgd29yZCwga2l0dGVuSW1hZ2UsIGFjdGl2ZUtpdHRlbnM9W10sIGN1cnJlbnRXb3Jkcz1bXSkge1xuICAgICAgICB0aGlzLmtpdHRlblBvcyA9IGtpdHRlblBvcztcbiAgICAgICAgdGhpcy53b3JkID0gd29yZDtcbiAgICAgICAgdGhpcy5raXR0ZW5JbWFnZSA9IGtpdHRlbkltYWdlO1xuICAgICAgICB0aGlzLmFjdGl2ZUtpdHRlbnMgPSBhY3RpdmVLaXR0ZW5zO1xuICAgICAgICB0aGlzLmN1cnJlbnRXb3JkcyA9IGN1cnJlbnRXb3JkcztcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZShpKSB7XG5cbiAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMF0rK1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmZseSgpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVLaXR0ZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5raXR0ZW5Qb3NbMF0gPiA3OTkpIHtcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy5hY3RpdmVLaXR0ZW5zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50V29yZHMuc3BsaWNlKGksIDEpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZmx5KCkge1xuICAgICAgICB0aGlzLmtpdHRlblBvc1swXSArPSA1XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzFdIC09IDVcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMua2l0dGVuSW1hZ2UsIC4uLnRoaXMua2l0dGVuUG9zKTtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE2cHggSnVyYSwgc2Fucy1zZXJpZlwiO1xuICAgICAgICAvLyBjdHguZm9udC1mYW1pbHkgPVwiVW5pZnJha3R1ckNvb2ssIHNhbnMtc2VyaWZcIjtcbiAgICAgICAgLy8gY3R4LmZvbnQtc2l6ZT1cIjE2cHhcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYXF1YW1hcmluZVwiO1xuICAgICAgICBjdHguZmlsbFRleHQodGhpcy53b3JkLCAodGhpcy5raXR0ZW5Qb3NbMF0gKyAzMCksICh0aGlzLmtpdHRlblBvc1sxXSArIDE2NSkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS2l0dGVuOyJdLCJzb3VyY2VSb290IjoiIn0=