# Proton

> See the detailed documentation please visit [here](https://projects.jpeer.at/proton/)

Proton is a lightweight and powerful javascript particle engine. With it you can easily create countless cool effects.   
#### Check out examples at: [http://a-jie.github.io/Proton/](http://a-jie.github.io/Proton/)

## Features
- Seven kinds of renderers
  - canvas - CanvasRenderer 
  - dom - DomRenderer 
  - webgl - WebGLRenderer 
  - pixel - PixelRenderer
  - easeljs - EaselRenderer 
  - pixi.js - PixiRenderer
  - custom - CustomRenderer
- Create cool effects like the demo of [71squared's ParticleDesigner](https://www.71squared.com/particledesigner) in 10 lines of code.
- Integratable into any game engine.
- Veriety of behaviors which can simulate many different physical effects.
- Three kinds of emitters and can be easily expanded.
- The __3D version__ of the proton engine is here [https://a-jie.github.io/three.proton/](https://a-jie.github.io/three.proton/)

## Installation

#### Install using npm 
[![anix](https://nodei.co/npm/proton-js.png)](https://npmjs.org/package/proton-js)

``` 
npm install proton-js --save
... 
import Proton from 'proton-js';
```

#### OR include in html
``` 
<script type="text/javascript" src="js/proton.min.js"></script> 
```

## Usage
```javascript
var proton = new Proton();
var emitter = new Proton.Emitter();

//set Rate
emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);

//add Initialize
emitter.addInitialize(new Proton.Radius(1, 12));
emitter.addInitialize(new Proton.Life(2, 4));
emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));

//add Behaviour
emitter.addBehaviour(new Proton.Color('ff0000', 'random'));
emitter.addBehaviour(new Proton.Alpha(1, 0));

//set emitter position
emitter.p.x = canvas.width / 2;
emitter.p.y = canvas.height / 2;
emitter.emit(5);

//add emitter to the proton
proton.addEmitter(emitter);

// add canvas renderer
var renderer = new Proton.CanvasRenderer(canvas);
proton.addRenderer(renderer);

//use Euler integration calculation is more accurate (default false)
Proton.USE_CLOCK = false or true;
```

## Description
`Proton.Span (or Proton.getSpan)` is a very important concept of the Proton engine, it's everywhere. If you understand its usage, you can create almost any desired effect!
  
Proton has now been upgraded to the __v3__ version. Performance has been greatly improved and api also has some improvements. For more details, please check [here](https://github.com/a-jie/Proton/releases).


## Building
Node is a dependency, use terminal to install it with:   

```javascript
git clone git://github.com/a-jie/Proton.git
...
npm install
npm run build
``` 

and run example 

```javascript
npm start
//vist http://localhost:3001/example/
```

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/a-jie/Proton/releases).


## License
Proton is released under the MIT License. http://www.opensource.org/licenses/mit-license
