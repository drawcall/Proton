Proton
======
Proton is a html5 particle engine.It include canvas,dom,webgl,easel and pixel five kinds of renderer.Of course you can customize your own renderer,it is very easy.
It is very easy, flexible and powerful.You can learn to use it in five minutes.
site : http://a-jie.github.io/Proton/

## Features

- Five kinds of renderer :canvas dom webgl easeljs pixijs
- Only ten lines code,you can achieve a very cool effect.Such as the demo of 71squared's ParticleDesigner
- Can be applied to any game engine
- Contains a variety of behaviours , you can easily achieve a variety of effects
- Three kinds of emitter can simulate more physical effect

##Usage

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
