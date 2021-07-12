//TODO：
//1. 支持纵向文字滚动
//2. 支持多行文字滚动
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
            this.lastLeft = this.getLastLeft();
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
    getLastLeft(){
        let {start} = this.opts;
        //default is left
        let res = 0;
        if(start == 'right'){
            res = this.w;
        }
        else if(isNumber(start)){
            res = start;
        }
        return res;
    }
}


function isNumber(obj) {  
    return obj === +obj  
}

export {Marquee};
export default Marquee;