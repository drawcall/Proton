Proton
======
Proton is an easily customizable html5 particle engine including five different types of renderers. <br>
Check out examples at http://a-jie.github.io/Proton/ or http://www.a-jie.cn/proton/

## Features
- Five kinds of renderers
  - canvas 
  - dom 
  - webgl 
  - easeljs 
  - pixel
- Create cool effects like the demo of <a href="http://www.71squared.com/">71squared's ParticleDesigner</a> in 10 lines of code.
- Integratable into any game engine
- Veriety of behaviors
- Three kinds of emitters which can simulate many different physical effects

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
emitter.emit();
//add emitter to the proton
proton.addEmitter(emitter);
// add canvas renderer
var renderer = new Proton.Renderer('canvas', proton, canvas);
renderer.start();
```

## Building Proton
Node is a dependency, use terminal to install it with with:<br>
`git clone git://github.com/a-jie/Proton.git`<br>
Then navigate to the build directory by running:<br>
`cd ./build`<br>
Finally run the build command:<br>
`node build.js`

## License
Proton is released under the MIT License. http://www.opensource.org/licenses/mit-license
