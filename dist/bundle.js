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
backgroundImage.src = 'https://game-seeds.s3.amazonaws.com/background.jpg';

var kittenImage = new Image();
kittenImage.src = 'https://game-seeds.s3.amazonaws.com/mini-pirates.png';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9raXR0ZW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXQiLCJ0aW1lIiwic2NvcmUiLCJpc1BsYXlpbmciLCJjdXJyZW50V29yZHMiLCJhY3RpdmVLaXR0ZW5zIiwiYmFja2dyb3VuZEltYWdlIiwiSW1hZ2UiLCJzcmMiLCJraXR0ZW5JbWFnZSIsImtpdHRlblBvcyIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0Iiwid29yZElucHV0IiwicXVlcnlTZWxlY3RvciIsInNjb3JlRGlzcGxheSIsInRpbWVEaXNwbGF5IiwibWVzc2FnZSIsIndvcmRzIiwiaGFuZGxlTWF0Y2giLCJzZXRJbnRlcnZhbCIsImNvdW50ZG93biIsImNoZWNrU3RhdHVzIiwicmVsZWFzZU1vcmVLaXR0ZW5zIiwid29yZCIsInJhbmRvbVdvcmQiLCJwb3MiLCJyYW5kb21Qb3NpdGlvbiIsIm5ld0tpdHRlbiIsIktpdHRlbiIsInB1c2giLCJtYXRjaElucHV0IiwidmFsdWUiLCJpbmRleE9mIiwiaSIsImlubmVySFRNTCIsInNwbGljZSIsImFjdGl2ZSIsInVwZGF0ZSIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJiYWNrZ3JvdW5kIiwiQmFja2dyb3VuZCIsImRyYXciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lc3RhbXAiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiLCJmbHkiLCJmb250IiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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SUFBSixHQUFXLHVCQUFYO0FBQ0E7QUFDQTtBQUNBN0MsZ0JBQUk4QyxTQUFKLEdBQWdCLFlBQWhCO0FBQ0E5QyxnQkFBSStDLFFBQUosQ0FBYSxLQUFLbEMsSUFBbEIsRUFBeUIsS0FBS2pCLFNBQUwsQ0FBZSxDQUFmLElBQW9CLEVBQTdDLEVBQW1ELEtBQUtBLFNBQUwsQ0FBZSxDQUFmLElBQW9CLEdBQXZFO0FBQ0g7Ozs7OztrQkFHVXNCLE0iLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIgICAgIGltcG9ydCBLaXR0ZW4gZnJvbSBcIi4vanMva2l0dGVuXCI7XG4gICAgIFxuICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGluaXQpO1xuICAgICAvLyBHbG9iYWxzXG5cbiAgICAgbGV0IHRpbWUgPSAzMDtcbiAgICAgbGV0IHNjb3JlID0gMDtcbiAgICAgbGV0IGlzUGxheWluZztcbiAgICAgbGV0IGN1cnJlbnRXb3JkcyA9IFtdO1xuICAgICBsZXQgYWN0aXZlS2l0dGVucyA9IFtdO1xuXG5cbiAgICAgLy8gSW1hZ2VzXG4gICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICBiYWNrZ3JvdW5kSW1hZ2Uuc3JjID0gJ2h0dHBzOi8vZ2FtZS1zZWVkcy5zMy5hbWF6b25hd3MuY29tL2JhY2tncm91bmQuanBnJ1xuXG4gICAgIGNvbnN0IGtpdHRlbkltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgIGtpdHRlbkltYWdlLnNyYyA9ICdodHRwczovL2dhbWUtc2VlZHMuczMuYW1hem9uYXdzLmNvbS9taW5pLXBpcmF0ZXMucG5nJztcbiAgICAgY29uc3Qga2l0dGVuUG9zID0gWzAsIDQwMF07XG5cbiAgICAgLy8gRE9NIEVsZW1lbnRzXG4gICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgIGNvbnN0IHdvcmRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JkLWlucHV0Jyk7XG4gICAgIGNvbnN0IHNjb3JlRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xuICAgICBjb25zdCB0aW1lRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lJyk7XG4gICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuXG5cbiAgICAgLy8gY29uc3QgYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVldGFoJyk7IC8vIERPTSBNYW5pcHVsYXRpb24gKGFzIG9wcG9zZWQgdG8gY2FudmFzLS0gbWF5YmUgY29tZSBiYWNrIHRvIHRoaXMpXG5cbiAgICAgLy8gRGljdGlvbmFyeVxuICAgICBjb25zdCB3b3JkcyA9IFtcbiAgICAgICAgICdidWJibGVndW0nLFxuICAgICAgICAgJ3JpdmVyJyxcbiAgICAgICAgICdwb3Bjb3JuJyxcbiAgICAgICAgICdyZXZvbHZlcicsXG4gICAgICAgICAnbWFnaWMnLFxuICAgICAgICAgJ3BvdGF0bycsXG4gICAgICAgICAnYmxvY2toZWFkJyxcbiAgICAgICAgICdsb29waG9sZScsXG4gICAgICAgICAnYW1iaWRleHRyb3VzJyxcbiAgICAgICAgICdmaXNoJyxcbiAgICAgICAgICduaW5ldGVlbicsXG4gICAgICAgICAnY2xvdmVyJyxcbiAgICAgICAgICdiZWVzd2F4JyxcbiAgICAgICAgICdjZXJlYWwnLFxuICAgICAgICAgJ2NoYW1lbGVvbicsXG4gICAgICAgICAnbGlnaHRidWxiJyxcbiAgICAgICAgICdnaWJiZXJpc2gnLFxuICAgICAgICAgJ3NlcnBlbnQnLFxuICAgICAgICAgJ2dhbWJsZScsXG4gICAgICAgICAnYnVubnknLFxuICAgICAgICAgJ2Rvb3JtYW4nLFxuICAgICAgICAgJ2FtYXRldXInLFxuICAgICAgICAgJ2ppZ3NhdycsXG4gICAgICAgICAnY3VsdGlzaCcsXG4gICAgICAgICAnYmFtYm9vJyxcbiAgICAgICAgICdidW1ibGViZWUnLFxuICAgICAgICAgJ3B1bXBraW4nLFxuICAgICAgICAgJ2hhcm1vbmljYScsXG4gICAgICAgICAnaGFpcmN1dCcsXG4gICAgICAgICAnamVsbHlmaXNoJyxcbiAgICAgICAgICdxdWFycmVsc29tZScsXG4gICAgICAgICAnZmF4IG1hY2hpbmUnLFxuICAgICAgICAgJ2ZhaXJpZXMnLFxuICAgICAgICAgJ3JoeW1lJyxcbiAgICAgICAgICdlbWJhcnJhc3NpbmcnLFxuICAgICAgICAgJ3BhamFtYXMnLFxuICAgICAgICAgJ2R1ZmZlbCBiYWcnLFxuICAgICAgICAgJ292ZXJwcmljZWQnLFxuICAgICAgICAgJ2tldGNodXAnLFxuICAgICAgICAgJ2tvYWxhJyxcbiAgICAgICAgICdwYW50aGVyJyxcbiAgICAgICAgICdmbG93ZXInLFxuICAgICAgICAgJ3NxdWlzaG1hbGxvdycsXG4gICAgICAgICAnc3luZXN0aGVzaWEnLFxuICAgICAgICAgJ3RlbXBlc3R1b3VzJyxcbiAgICAgICAgICdmYWxhZmVsJyxcbiAgICAgICAgICdwZWRlc3RyaWFuJyxcbiAgICAgICAgICdkZW5uaXMgcm9kbWFuJyxcbiAgICAgICAgICdiYXNrZXRiYWxsJyxcbiAgICAgICAgICdyYWluZm9yZXN0JyxcbiAgICAgICAgICdtZW93JyxcbiAgICAgICAgICdkZW50dXJlcycsXG4gICAgICAgICAnaGVsZW4ga2VsbGVyJyxcbiAgICAgXTtcblxuICAgICAvLyBMb2dpY1xuXG4gICAgIC8vIEluaXRpYWxpemUgR2FtZVxuICAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgLy8gc3RhcnQgIG1hdGNoaW5nIG9uIHdvcmQgaW5wdXRcbiAgICAgICAgIHdvcmRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGhhbmRsZU1hdGNoKTtcbiAgICAgICAgIC8vIG9uQ2hhbmdlPz9cbiAgICAgICAgIC8vIENhbGwgY291bnRkb3duIGV2ZXJ5IHNlY29uZFxuICAgICAgICAgc2V0SW50ZXJ2YWwoY291bnRkb3duLCAxMDAwKTtcbiAgICAgICAgIC8vIENoZWNrIGdhbWUgc3RhdHVzXG4gICAgICAgICBzZXRJbnRlcnZhbChjaGVja1N0YXR1cywgNTApO1xuICAgICAgICAgLy8gc2V0SW50ZXJ2YWwocmVsZWFzZU1vcmVLaXR0ZW5zLCAyMDAwKTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIHJlbGVhc2VNb3JlS2l0dGVucygpIHtcbiAgICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKCk7XG4gICAgICAgICBjb25zdCBwb3MgPSByYW5kb21Qb3NpdGlvbigpO1xuICAgICAgICAgY29uc3QgbmV3S2l0dGVuID0gbmV3IEtpdHRlbihwb3MsIHdvcmQsIGtpdHRlbkltYWdlLCBhY3RpdmVLaXR0ZW5zLCBjdXJyZW50V29yZHMpO1xuICAgICAgICAgYWN0aXZlS2l0dGVucy5wdXNoKG5ld0tpdHRlbik7XG4gICAgICAgICAvLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUobmV3S2l0dGVuKSlcbiAgICAgICAgIC8vIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gYW5pbWF0ZShuZXdLaXR0ZW4pKTtcblxuICAgICB9XG5cbiAgICAgLy8gTWF0Y2ggaW5wdXQgLSBPTEQgV09SS0lORyBDT0RFXG4gICAgIC8vIGZ1bmN0aW9uIG1hdGNoSW5wdXQoKSB7XG4gICAgIC8vICAgICBsZXQgdmFsdWUgPSB3b3JkSW5wdXQudmFsdWU7XG4gICAgIC8vICAgICBpZihjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAvLyAgICAgICAgICAgICBpID0gY3VycmVudFdvcmRzLmluZGV4T2YodmFsdWUpO1xuICAgICAvLyAgICAgICAgICAgICBzY29yZURpc3BsYXkuaW5uZXJIVE1MKys7XG4gICAgIC8vICAgICAgICAgICAgIGN1cnJlbnRXb3Jkcy5zcGxpY2UoaSwgMSk7XG4gICAgIC8vICAgICAgICAgICAgIHdvcmRJbnB1dC52YWx1ZT1cIlwiO1xuICAgICAvLyAgICAgfVxuICAgICAvLyB9XG5cbiAgICAgLy8gTkVXOlxuICAgICBmdW5jdGlvbiBtYXRjaElucHV0KCkge1xuICAgICAgICAgbGV0IHZhbHVlID0gd29yZElucHV0LnZhbHVlO1xuICAgICAgICAgaWYgKGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgICAgICAgbGV0IGkgPSBjdXJyZW50V29yZHMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgICAgICAgc2NvcmUgKys7XG4gICAgICAgICAgICAgc2NvcmVEaXNwbGF5LmlubmVySFRNTCsrOyBcbiAgICAgICAgICAgICBjdXJyZW50V29yZHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlTWF0Y2goKSB7XG4gICAgICAgICBsZXQgdmFsdWUgPSB3b3JkSW5wdXQudmFsdWU7XG4gICAgICAgICBsZXQgaSA9IGN1cnJlbnRXb3Jkcy5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgIGlmIChtYXRjaElucHV0KCkpIHtcbiAgICAgICAgICAgICBpc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgYWN0aXZlS2l0dGVuc1tpXS51cGRhdGUoaSk7XG4gICAgICAgICAgICAvLyBhY3RpdmVLaXR0ZW5zW2ldLmZseSgpO1xuICAgICAgICAgICAgIHdvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICB9XG4gICAgIH1cblxuXG4gICAgIC8vIHBpY2sgYW5kIHNob3cgcmFuZG9tICB3b3JkIFxuICAgICBmdW5jdGlvbiByYW5kb21Xb3JkKCkge1xuICAgICAgICAgLy8gR2VuZXJhdGUgcmFuZG9tIGFycmF5IGluZGV4XG4gICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRzLmxlbmd0aCk7XG4gICAgICAgICAvLyBTYXZlIHJhbmRvbSB3b3JkIHRvIGEgdmFyaWFibGUgJiBwdXNoIGl0IGludG8gY3VycmVudFdvcmRzIGFycmF5XG4gICAgICAgIGNvbnN0IHdvcmQgPSB3b3Jkc1tyYW5kb21JbmRleF07XG4gICAgICAgICBjdXJyZW50V29yZHMucHVzaCh3b3JkKTtcbiAgICAgICAgIC8vIE91dHB1dCBhIHJhbmRvbXdvcmRcbiAgICAgICAgIHJldHVybiB3b3JkO1xuXG4gICAgIH1cblxuICAgICBmdW5jdGlvbiByYW5kb21Qb3NpdGlvbigpIHtcbiAgICAgICAgIGxldCByYW5kb21Qb3NpdGlvbiA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMzYpICsgMSk7XG4gICAgICAgICByYW5kb21Qb3NpdGlvbiA9IDQwMC1yYW5kb21Qb3NpdGlvbjtcbiAgICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgICAgIHJldHVybiBbMCwgcmFuZG9tUG9zaXRpb25dO1xuICAgICB9XG5cbiAgICAgLy8gQ291bnRkb3duIHRpbWVyXG4gICAgIGZ1bmN0aW9uIGNvdW50ZG93bigpIHtcbiAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aW1lIGlzICBub3QgcnVuIG91dFxuICAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgICAgLy8gZGVjcmVtZW50IHRpbWVcbiAgICAgICAgICAgICB0aW1lLS07XG4gICAgICAgICB9IGVsc2UgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgIH1cbiAgICAgICAgIC8vIFNob3cgdGltZVxuICAgICAgICAgdGltZURpc3BsYXkuaW5uZXJIVE1MID0gdGltZTtcbiAgICAgfVxuXG4gICAgIC8vIENoZWNrIGdhbWUgc3RhdHVzXG4gICAgIGZ1bmN0aW9uIGNoZWNrU3RhdHVzKCkge1xuICAgICAgICAgaWYgKCFpc1BsYXlpbmcgJiYgdGltZSA9PT0gMCkge1xuICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gJ0dhbWUgT3ZlciEnO1xuICAgICAgICAgfVxuICAgICB9XG5cblxuICAgICBmdW5jdGlvbiBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpIHtcbiAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgODAwLCA2MDApO1xuICAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKGJhY2tncm91bmRJbWFnZSk7XG4gICAgICAgICBiYWNrZ3JvdW5kLmRyYXcoKTtcbiAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlS2l0dGVucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnNbaV0udXBkYXRlKCkuZHJhdyhjdHgpO1xuICAgICAgICAgfVxuXG5cblxuXG5cblxuICAgICAgICAgLy8gaWYgKGtpdHRlblBvc1swXSA8IDgwMCApIHtcbiAgICAgICAgIC8vIGMuc3R5bGUudHJhbnNmb3JtID1gdHJhbnNsYXRlKCR7a2l0dGVuUG9zWzBdfXB4LCAwcHgpYFxuICAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWV0YWgnKTtcbiAgICAgICAgIC8vIERPTSBNYW5pcHVsYXRpb24gKGFzIG9wcG9zZWQgdG8gY2FudmFzLS0gbWF5YmUgY29tZSBiYWNrIHRvIHRoaXMgaWYgeW91IGNvbW1lbnQgJ2MnIGJhY2sgaW4gYWJvdmUpXG4gICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICBhbmltYXRlKGFjdGl2ZUtpdHRlbnMpO1xuICAgICAgICAgfSk7XG4gICAgICAgICAvLyB9XG5cbiAgICAgfVxuICAgICBraXR0ZW5JbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICBjb25zdCBiYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoYmFja2dyb3VuZEltYWdlKTtcbiAgICAgICAgIGNvbnN0IHdvcmQgPSByYW5kb21Xb3JkKHdvcmRzKTtcbiAgICAgICAgIGNvbnN0IG5ld0tpdHRlbiA9IG5ldyBLaXR0ZW4oWzAsIDQwMF0sIHdvcmQsIGtpdHRlbkltYWdlLCBhY3RpdmVLaXR0ZW5zLCBjdXJyZW50V29yZHMpO1xuICAgICAgICBcbiAgICAgICAgIC8vIG5ld1xuICAgICAgICAgYWN0aXZlS2l0dGVucy5wdXNoKG5ld0tpdHRlbik7XG4gICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICBzZXRJbnRlcnZhbChyZWxlYXNlTW9yZUtpdHRlbnMsIDIwMDApO1xuICAgICAgICAgICAgIGFuaW1hdGUoYWN0aXZlS2l0dGVucyk7XG5cbiAgICAgICAgIH0pO1xuICAgICB9XG5cbiAgICAgLy8gQ2xhc3Nlc1xuICAgIC8vICBjbGFzcyBLaXR0ZW4ge1xuICAgIC8vICAgICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSkge1xuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgIC8vICAgICAgICAgIHRoaXMud29yZCA9IHdvcmQ7XG4gICAgLy8gICAgICAgICAgdGhpcy5raXR0ZW5JbWFnZSA9IGtpdHRlbkltYWdlO1xuXG4gICAgLy8gICAgICB9XG5cbiAgICAvLyAgICAgIHVwZGF0ZSgpIHtcblxuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuUG9zWzBdKytcbiAgICAvLyAgICAgICAgICBpZiAodGhpcy53b3JkID09PSBcIlwiKSB7XG4gICAgLy8gICAgICAgICAgICAgIHRoaXMuZmx5KCk7XG4gICAgLy8gICAgICAgICAgICAgIGFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksMSk7XG4gICAgLy8gICAgICAgICAgfVxuICAgIC8vICAgICAgICAgIGlmICh0aGlzLmtpdHRlblBvc1swXSA+IDc5OSkge1xuICAgIC8vICAgICAgICAgICAgICBpID0gYWN0aXZlS2l0dGVucy5pbmRleE9mKHRoaXMpO1xuICAgIC8vICAgICAgICAgICAgICBhY3RpdmVLaXR0ZW5zLnNwbGljZShpLDEpO1xuICAgIC8vICAgICAgICAgICAgICBjdXJyZW50V29yZHMuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAvLyAgICAgIH1cblxuICAgIC8vICAgICAgZmx5KCkge1xuICAgIC8vICAgICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDVcbiAgICAvLyAgICAgICAgICB0aGlzLmtpdHRlblBvc1sxXSAtPSA1XG4gICAgLy8gICAgICB9XG5cbiAgICAvLyAgICAgIC8vIHVsdGltYXRlbHkgdGFrZSBpbiBjdHggZm9yIGRyYXdcbiAgICAvLyAgICAgIGRyYXcoKSB7XG4gICAgLy8gICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAvLyAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMua2l0dGVuSW1hZ2UsIC4uLnRoaXMua2l0dGVuUG9zKTtcbiAgICAvLyAgICAgICAgICBjdHguZm9udCA9IFwiMTZweCBBcmlhbFwiO1xuICAgIC8vICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImFxdWFtYXJpbmVcIjtcbiAgICAvLyAgICAgICAgICBjdHguZmlsbFRleHQodGhpcy53b3JkLCAodGhpcy5raXR0ZW5Qb3NbMF0gKyAzMCksICh0aGlzLmtpdHRlblBvc1sxXSArIDE2NSkpO1xuICAgIC8vICAgICAgfVxuICAgIC8vICB9XG5cblxuICAgICBjbGFzcyBCYWNrZ3JvdW5kIHtcbiAgICAgICAgIGNvbnN0cnVjdG9yKGJhY2tncm91bmRJbWFnZSkge1xuICAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZEltYWdlO1xuICAgICAgICAgfVxuXG4gICAgICAgICBkcmF3KCkge1xuICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kSW1hZ2UsIDAsIDApO1xuICAgICAgICAgfVxuXG4gICAgIH1cbiIsImNsYXNzIEtpdHRlbiB7XG4gICAgY29uc3RydWN0b3Ioa2l0dGVuUG9zLCB3b3JkLCBraXR0ZW5JbWFnZSwgYWN0aXZlS2l0dGVucz1bXSwgY3VycmVudFdvcmRzPVtdKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zID0ga2l0dGVuUG9zO1xuICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgICAgICB0aGlzLmtpdHRlbkltYWdlID0ga2l0dGVuSW1hZ2U7XG4gICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucyA9IGFjdGl2ZUtpdHRlbnM7XG4gICAgICAgIHRoaXMuY3VycmVudFdvcmRzID0gY3VycmVudFdvcmRzO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKGkpIHtcblxuICAgICAgICB0aGlzLmtpdHRlblBvc1swXSsrXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZmx5KCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUtpdHRlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmtpdHRlblBvc1swXSA+IDc5OSkge1xuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLmFjdGl2ZUtpdHRlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlS2l0dGVucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXb3Jkcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmbHkoKSB7XG4gICAgICAgIHRoaXMua2l0dGVuUG9zWzBdICs9IDVcbiAgICAgICAgdGhpcy5raXR0ZW5Qb3NbMV0gLT0gNVxuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5raXR0ZW5JbWFnZSwgLi4udGhpcy5raXR0ZW5Qb3MpO1xuICAgICAgICBjdHguZm9udCA9IFwiMTZweCBKdXJhLCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIC8vIGN0eC5mb250LWZhbWlseSA9XCJVbmlmcmFrdHVyQ29vaywgc2Fucy1zZXJpZlwiO1xuICAgICAgICAvLyBjdHguZm9udC1zaXplPVwiMTZweFwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJhcXVhbWFyaW5lXCI7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLndvcmQsICh0aGlzLmtpdHRlblBvc1swXSArIDMwKSwgKHRoaXMua2l0dGVuUG9zWzFdICsgMTY1KSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLaXR0ZW47Il0sInNvdXJjZVJvb3QiOiIifQ==