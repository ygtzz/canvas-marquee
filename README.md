# canvas-marquee

a marquee component based on canvas

## Installation
```bash
npm i canvas-marquee -S

yarn add canvas-marquee
```

## Usage
```javascript
import Marquee from 'canvas-marquee';
var textList = ['跑马灯', '666', '233333333',
        'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
        'Angular', '测试跑马灯效果'
    ];
var opts = {
    id:'canvas',
    data:textList,
    top:20,
    offset:1,
    gap:10,
    font:'20px Arial',
    color:'#339966'
};
var marquee = new Marquee(opts);
marquee.draw();
```   
## options
- `id` {string} the canvas element’s id
- `data` {array} the data to show in canvas
- `top` {number} text top offset in canvas
- `offset` {number} text move step, default is 1
- `gap` {number} text item gap
- `color` {string} text color