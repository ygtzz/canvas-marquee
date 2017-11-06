/**
 * HiDPI Canvas Polyfill (1.0.10)
 *
 * Author: Jonathan D. Johnson (http://jondavidjohn.com)
 * Homepage: https://github.com/jondavidjohn/hidpi-canvas-polyfill
 * Issue Tracker: https://github.com/jondavidjohn/hidpi-canvas-polyfill/issues
 * License: Apache-2.0
*/
(function(prototype) {
    var pixelRatio = (function() {
            var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d'),
                    backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;

            return (window.devicePixelRatio || 1) / backingStore;
        })(),

        forEach = function(obj, func) {
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
            'arc': [0,1,2],
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

    forEach(ratioArgs, function(value, key) {
        prototype[key] = (function(_super) {
            return function() {
                var i, len,
                    args = Array.prototype.slice.call(arguments);

                if (value === 'all') {
                    args = args.map(function(a) {
                        return a * pixelRatio;
                    });
                }
                else if (Array.isArray(value)) {
                    for (i = 0, len = value.length; i < len; i++) {
                        args[value[i]] *= pixelRatio;
                    }
                }

                return _super.apply(this, args);
            };
        })(prototype[key]);
    });

        // Stroke lineWidth adjustment
    prototype.stroke = (function(_super) {
        return function() {
            this.lineWidth *= pixelRatio;
            _super.apply(this, arguments);
            this.lineWidth /= pixelRatio;
        };
    })(prototype.stroke);

    // Text
    //
    prototype.fillText = (function(_super) {
        return function() {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(prototype.fillText);

    prototype.strokeText = (function(_super) {
        return function() {
            var args = Array.prototype.slice.call(arguments);

            args[1] *= pixelRatio; // x
            args[2] *= pixelRatio; // y

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m * pixelRatio) + u;
                }
            );

            _super.apply(this, args);

            this.font = this.font.replace(
                /(\d+)(px|em|rem|pt)/g,
                function(w, m, u) {
                    return (m / pixelRatio) + u;
                }
            );
        };
    })(prototype.strokeText);
})(CanvasRenderingContext2D.prototype);
;(function(prototype) {
    prototype.getContext = (function(_super) {
        return function(type) {
            var backingStore, ratio,
                context = _super.call(this, type);

            if (type === '2d') {

                backingStore = context.backingStorePixelRatio ||
                            context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;

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
    })(prototype.getContext);
})(HTMLCanvasElement.prototype);
    
class Marquee {
    constructor(opts) {
        this.opts = opts;
        this.canvas = document.getElementById(opts.id);
        let rect = this.canvas.getBoundingClientRect();
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
    shoot(value) {
        let top = this.opts.top;
        let color = this.opts.color;
        let offset = this.opts.offset || 1;
        let width = Math.ceil(this.ctx.measureText(value).width);

        let marquee = {
            value: value,
            top: top,
            left: this.getLeft(width),
            color: color,
            offset: offset,
            width: width
        }
        this.marqueeList.push(marquee);
        return marquee;
    }
    //开始绘制
    draw() {
        if (this.marqueeList.length) {
            this.ctx.clearRect(0, 0, this.w, this.h);
            for (let i = 0; i < this.marqueeList.length; i++) {
                let b = this.marqueeList[i];
                if (b.left + b.width <= 0) {
                    this.marqueeList.splice(i, 1);
                    i--;
                    this.fAddLastNode(b);
                    continue;
                }
                b.left -= b.offset;
                this.drawText(b);
            }
        }
        else{
            this.lastLeft = this.w;
            this.data.forEach((t) => {
                this.shoot(t);
            })
        }
        requestAnimationFrame(this.draw.bind(this));
    }
    //绘制文字
    drawText(marquee) {
        this.ctx.fillStyle = marquee.color;
        this.ctx.fillText(marquee.value, marquee.left, marquee.top);
    }
    fAddLastNode(b){
        var last = this.marqueeList[this.marqueeList.length-1];
        b.left = last.left + last.width + this.gap;
        this.marqueeList.push(b);
    }
    getLeft(width){
        this.lastLeft += this.lastWidth + this.gap;
        this.lastWidth = width;
        return this.lastLeft;
    }
}

export {Marquee};