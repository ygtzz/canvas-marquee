(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO：
//1. 支持纵向文字滚动
//2. 支持多行文字滚动
var Marquee = function () {
    function Marquee(opts) {
        _classCallCheck(this, Marquee);

        this.opts = opts;
        this.canvas = document.getElementById(opts.id);
        var rect = this.canvas.getBoundingClientRect();
        this.w = rect.right - rect.left;
        this.h = rect.bottom - rect.top;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = opts.font;
        this.lastLeft = this.w;
        this.gap = opts.gap;
        this.data = opts.data;
        this.marqueeList = [];
        this.lastWidth = 0;
        this.index = 0;
    }
    //添加弹幕列表


    _createClass(Marquee, [{
        key: 'shoot',
        value: function shoot(value) {
            var top = this.opts.top;
            var color = this.opts.color;
            var offset = this.opts.offset || 1;
            var width = Math.ceil(this.ctx.measureText(value).width);

            var marquee = {
                value: value,
                top: top,
                left: this.getLeft(width),
                color: color,
                offset: offset,
                width: width
            };
            this.marqueeList.push(marquee);
            return marquee;
        }
        //开始绘制

    }, {
        key: 'draw',
        value: function draw() {
            var _this = this;

            if (this.marqueeList.length) {
                this.ctx.clearRect(0, 0, this.w, this.h);
                for (var i = 0; i < this.marqueeList.length; i++) {
                    var b = this.marqueeList[i];
                    if (b.left + b.width <= 0) {
                        this.marqueeList.splice(i, 1);
                        i--;
                        this.fAddLastNode(b);
                        continue;
                    }
                    b.left -= b.offset;
                    this.drawText(b);
                }
            } else {
                this.lastLeft = this.getLastLeft();
                this.data.forEach(function (t) {
                    _this.shoot(t);
                });
            }
            requestAnimationFrame(this.draw.bind(this));
        }
        //绘制文字

    }, {
        key: 'drawText',
        value: function drawText(marquee) {
            this.ctx.fillStyle = marquee.color;
            this.ctx.fillText(marquee.value, marquee.left, marquee.top);
        }
    }, {
        key: 'fAddLastNode',
        value: function fAddLastNode(b) {
            var last = this.marqueeList[this.marqueeList.length - 1];
            b.left = last.left + last.width + this.gap;
            this.marqueeList.push(b);
        }
    }, {
        key: 'getLeft',
        value: function getLeft(width) {
            this.lastLeft += this.lastWidth + this.gap;
            this.lastWidth = width;
            return this.lastLeft;
        }
    }, {
        key: 'getLastLeft',
        value: function getLastLeft() {
            var start = this.opts.start;
            //default is left

            var res = 0;
            if (start == 'right') {
                res = this.w;
            } else if (isNumber(start)) {
                res = start;
            }
            return res;
        }
    }]);

    return Marquee;
}();

function isNumber(obj) {
    return obj === +obj;
}

exports.Marquee = Marquee;
exports.default = Marquee;

/***/ })
/******/ ]);
});
//# sourceMappingURL=canvas-marquee.js.map