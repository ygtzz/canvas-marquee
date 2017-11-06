(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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

/**
 * HiDPI Canvas Polyfill (1.0.10)
 *
 * Author: Jonathan D. Johnson (http://jondavidjohn.com)
 * Homepage: https://github.com/jondavidjohn/hidpi-canvas-polyfill
 * Issue Tracker: https://github.com/jondavidjohn/hidpi-canvas-polyfill/issues
 * License: Apache-2.0
*/
(function (prototype) {
    var pixelRatio = function () {
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

        return (window.devicePixelRatio || 1) / backingStore;
    }(),
        forEach = function forEach(obj, func) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                func(obj[p], p);
            }
        }
    },
        ratioArgs = {
        'fillRect': 'all',
        'clearRect': 'all',
        'strokeRect': 'all',
        'moveTo': 'all',
        'lineTo': 'all',
        'arc': [0, 1, 2],
        'arcTo': 'all',
        'bezierCurveTo': 'all',
        'isPointinPath': 'all',
        'isPointinStroke': 'all',
        'quadraticCurveTo': 'all',
        'rect': 'all',
        'translate': 'all',
        'createRadialGradient': 'all',
        'createLinearGradient': 'all'
    };

    if (pixelRatio === 1) return;

    forEach(ratioArgs, function (value, key) {
        prototype[key] = function (_super) {
            return function () {
                var i,
                    len,
                    args = Array.prototype.slice.call(arguments);

                if (value === 'all') {
                    args = args.map(function (a) {
                        return a * pixelRatio;
                    });
                } else if (Array.isArray(value)) {
                    for (i = 0, len = value.length; i < len; i++) {
                        args[value[i]] *= pixelRatio;
                    }
                }

                return _super.apply(this, args);
            };
        }(prototype[key]);
    });

    // Stroke lineWidth adjustment
    prototype.stroke = function (_super) {
        return function () {
            this.lineWidth *= pixelRatio;
            _super.apply(this, arguments);
            this.lineWidth /= pixelRatio;
        };
    }(prototype.stroke);

    // Text
    //
    prototype.fillText = function (_super) {
        return function () {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
                return m * pixelRatio + u;
            });

            _super.apply(this, args);

            this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
                return m / pixelRatio + u;
            });
        };
    }(prototype.fillText);

    prototype.strokeText = function (_super) {
        return function () {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
                return m * pixelRatio + u;
            });

            _super.apply(this, args);

            this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (w, m, u) {
                return m / pixelRatio + u;
            });
        };
    }(prototype.strokeText);
})(CanvasRenderingContext2D.prototype);
;(function (prototype) {
    prototype.getContext = function (_super) {
        return function (type) {
            var backingStore,
                ratio,
                context = _super.call(this, type);

            if (type === '2d') {

                backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;

                ratio = (window.devicePixelRatio || 1) / backingStore;

                if (ratio > 1) {
                    this.style.height = this.height + 'px';
                    this.style.width = this.width + 'px';
                    this.width *= ratio;
                    this.height *= ratio;
                }
            }

            return context;
        };
    }(prototype.getContext);
})(HTMLCanvasElement.prototype);

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
                this.lastLeft = this.w;
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
    }]);

    return Marquee;
}();

exports.Marquee = Marquee;

/***/ })
/******/ ]);
});
//# sourceMappingURL=canvas-marquee.js.map