<div align=center><img src="https://drawcall.github.io/Proton/images/logo/proton.png"/></div>

---

<div align="center">
  <a href='https://www.npmjs.com/package/proton-engine'>
    <img src='https://badge.fury.io/js/proton-engine.svg' alt='npm version' height='18'>
  </a>
  <a href='https://travis-ci.com/drawcall/Proton'>
    <img src='https://travis-ci.com/drawcall/Proton.svg?branch=master' alt='travis' height='18'>
  </a>
  <a href='https://github.com/drawcall/Proton/issues'>
    <img src='https://img.shields.io/github/issues/drawcall/Proton.svg' alt='issues open' height='18'>
  </a>
  <a href='https://cdnjs.com/libraries/proton-engine'>
    <img src='https://img.shields.io/cdnjs/v/proton-engine' alt='issues open' height='18'>
  </a>
  <a href='#'>
    <img src='https://img.shields.io/npm/l/proton-engine.svg' alt='license:MIT' height='18'>
  </a>
</div>


Proton is a lightweight and powerful Javascript particle animation library. Use it to easily create a variety of cool particle effects.

Check out examples at [http://drawcall.github.io/Proton/](http://drawcall.github.io/Proton/). The **3D version** of the proton engine is here [https://github.com/drawcall/three.proton/](https://github.com/drawcall/three.proton/)

## Features

- **Easy to use** It takes only a dozen lines of code to create a particle animation effect.
- **Multiple effects** Use Proton to create flames, fireworks, bullets, explosions, and more.
- **Any scene** You can use it in frameworks such as `react`, `vue`, `angular`, and `pixi.js`, `Phaser`, etc.
- **Efficient rendering** Its rendering efficiency is very high, you can render tens of thousands of particles in the page.
- **Simulated physics** Proton can simulate various physical properties including gravity and Brownian motion.
- **Several renderers** Proton provides a variety of renderers, of course you can also customize your own renderer
  - `CanvasRenderer` - Proton's canvas renderer
  - `DomRenderer` - Proton's dom renderer, supporting hardware acceleration.
  - `WebGLRenderer` - Proton's webgl renderer.
  - `PixelRenderer` - Proton's pixel renderer, It can implement pixel animation.
  - `EaselRenderer` - Easeljs proton renderer.
  - `EaselRenderer` - Pixi.js proton renderer.
  - `CustomRenderer` - Use a custom renderer that can be applied to any scene.

## Documentation

See detailed documentation please visit [https://projects.jpeer.at/proton/](https://projects.jpeer.at/proton/).
Thank you very much [@matsu7089](https://github.com/matsu7089) for writing a [good tutorial](https://qiita.com/matsu7089/items/dcb7d326e4ec1340eba6).
 

## Installation

#### Install using npm 
[![anix](https://nodei.co/npm/proton-engine.png)](https://npmjs.org/package/proton-engine)

##### Note: NPM package-name has been changed from `proton-js` to `proton-engine`

```shell
npm install proton-engine --save
```

```javascript
import Proton from 'proton-engine';
```

#### OR include in html
```html
<script type="text/javascript" src="js/proton.min.js"></script> 
```

## Usage

Proton is very simple to use, a dozen lines of code can create a particle animation.

```javascript
const proton = new Proton();
const emitter = new Proton.Emitter();

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
const renderer = new Proton.CanvasRenderer(canvas);
proton.addRenderer(renderer);
```

## Remarks
* `Proton.Span` (or `Proton.getSpan`) is a very important concept of the Proton engine, it's everywhere. If you understand its usage, you can create almost any desired effect! 

* If you want to create wind, rain, or snow, etc, you can use the `emitter.preEmit` method to pre-render the scene.

* Use `Proton.Body` and `Proton.Color` at the same time. I suggest you'd better use the `WebGLRenderer` not `CanvasRenderer`.

* Added `Proton.Cyclone` behavior, you can make vortex effects with Cyclone. Demo please check [here](https://codesandbox.io/s/proton-cyclone-rzweu).

* `proton.fps` In most cases, you don't need to set this property. You can set this property when the game engine has fixed fps or some browsers have a higher refresh rate.

* Use Euler integration calculation is more accurate (default false) `Proton.USE_CLOCK = false or true;`.

Proton has now been upgraded to the __v4__ version. Performance has been greatly improved and api also has some improvements. For more details, please check [here](https://github.com/drawcall/Proton/releases).

## Building

`node` is a dependency, use terminal to install it with:   

```javascript
git clone git://github.com/drawcall/Proton.git

...
npm install
npm run build
``` 

And run example 

```javascript
npm start
//vist http://localhost:3001/example/
```

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/drawcall/Proton/releases).


## License
Proton is released under the MIT License. http://www.opensource.org/licenses/mit-license
