<div align=center><img src="https://drawcall.github.io/Proton/images/logo/proton.png"/></div>

---

<div align="center">
  <a href='https://www.npmjs.com/package/proton-engine'>
    <img src='https://badge.fury.io/js/proton-engine.svg' alt='npm version' height='18'>
  </a>
  <a href="https://npmjs.org/package/proton-engine">
  <img title="NPM downloads" src="http://img.shields.io/npm/dm/proton-engine.svg" alt='dm' height='18'>
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

Check out examples at [http://drawcall.github.io/Proton/](http://drawcall.github.io/Proton/). The **3D version** of the proton engine is here [here](https://github.com/drawcall/three.proton/). An available **react version** is [here](https://github.com/lindelof/particles-bg).

## Features

- **Easy to use** - Particles can be emitted from a point, line, rectangle, circle, etc.
- **Powerful** - 16 different kinds of renderers, also you can easily customize your own renderer.
- **Three.js support** - Check out [three.proton](https://github.com/drawcall/three.proton/)
- **Perfect performance** - Push your particles to the max.
- **Reactive** - Watch and run emitters based on changes to properties.
- **Customizable** - Use your own update function, initialize function, particle factory, and renderer.
- **Compatibility** - Support for both Canvas, DOM, WebGL, Pixi.js (up to v8), EaselJS, and custom renderers.

> **Note:** If you need 3D particle effects, please use [three.proton](https://github.com/drawcall/three.proton/).

## Documentation

See detailed documentation please visit [https://projects.jpeer.at/proton/](https://projects.jpeer.at/proton/).
Thank you very much [@matsu7089](https://github.com/matsu7089) for writing a [good tutorial](https://qiita.com/matsu7089/items/dcb7d326e4ec1340eba6).

## Installation

#### Install using npm

> Note: NPM package-name has been changed from `proton-js` to `proton-engine`

```shell
npm install proton-engine --save
```

```javascript
import Proton from "proton-engine";
```

#### OR include in html

```html
<script type="text/javascript" src="js/proton.web.min.js"></script>
```

## Usage

Proton is very simple to use, a dozen lines of code can create a particle animation.

```javascript
import Proton, {
  Emitter,
  Rate,
  Span,
  Radius,
  Life,
  Velocity,
  Color,
  Alpha,
  CanvasRenderer,
} from "proton-engine";

const proton = new Proton();
const emitter = new Emitter();

//set Rate
emitter.rate = new Rate(new Span(10, 20), 0.1);

//add Initialize
emitter.addInitialize(new Radius(1, 12));
emitter.addInitialize(new Life(2, 4));
emitter.addInitialize(new Velocity(3, new Span(0, 360), "polar"));

//add Behaviour
emitter.addBehaviour(new Color("ff0000", "random"));
emitter.addBehaviour(new Alpha(1, 0));

//set emitter position
emitter.p.x = canvas.width / 2;
emitter.p.y = canvas.height / 2;
emitter.emit(5);

//add emitter to the proton
proton.addEmitter(emitter);

// add canvas renderer
const renderer = new CanvasRenderer(canvas);
proton.addRenderer(renderer);
```

### Rendering with Pixi.js v8

Pixi.js v8 introduced several breaking changes to its API, particularly in the Graphics API. Proton Engine 7.2.0+ fully supports Pixi.js v8 with a new, compatible PixiRenderer.

```javascript
// Create a Pixi.js v8 application (using async initialization)
const app = new PIXI.Application();
(async function() {
  // Initialize the Pixi app
  await app.init({
      resizeTo: window,
      background: '#000',
      antialias: true
  });
  
  document.body.appendChild(app.canvas);
  
  // Create a Proton instance
  // When using in browser with script tags, make sure to include proton.web.js
  const proton = new Proton();
  
  // Create an emitter
  const emitter = new Proton.Emitter();
  // Configure your emitter...
  
  // Add the Pixi.js renderer to Proton
  const renderer = new Proton.PixiRenderer(app.stage);
  proton.addRenderer(renderer);
  
  // Start the emitter
  emitter.emit();
  proton.addEmitter(emitter);
  
  // Update Proton in the Pixi.js animation loop
  app.ticker.add(() => {
    proton.update();
  });
})();
```

Check out a complete example in `example/pixiv8.html`.

## Remarks

- `Proton.Span` (or `Proton.getSpan`) is a very important concept of the Proton engine, it's everywhere. If you understand its usage, you can create almost any desired effect!

- If you want to create wind, rain, or snow, etc, you can use the `emitter.preEmit` method to pre-render the scene.

- Use `Proton.Body` and `Proton.Color` at the same time. I suggest you'd better use the `WebGLRenderer` not `CanvasRenderer`.

- Added `Proton.Cyclone` behavior, you can make vortex effects with Cyclone. Demo please check [here](https://codesandbox.io/s/proton-cyclone-rzweu).

- `proton.fps` In modern browsers, if the FPS exceeds 60 and you want to maintain a stable 60 FPS, you need to set `proton.fps = 60`. You can set this property when the game engine has fixed fps or some browsers have a higher refresh rate.

- Use Euler integration calculation is more accurate (default false) `Proton.USE_CLOCK = false or true;`.

Proton has now been upgraded to the **v4** version. Performance has been greatly improved and api also has some improvements. For more details, please check [here](https://github.com/drawcall/Proton/releases).

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
