# Proton Documentation

> Proton is an easily customizable html5 particle engine including six different types of renderers.

## Proton overview

- [Utils](#utils)
- [Behaviour](#behaviour)
- [Particle initializations](#particle-initializations)
- [Emitter](#emitter)
- [Renderer](#renderer)

## Proton parts

### Utils

> all Utils are static, there is no need to create an instance

#### Available utils

- [Proton.Util]{@link Proton#Proton.Util}
- [Proton.DomUtil]{@link Proton#Proton.DomUtil}
- [Proton.WebGLUtil]{@link Proton#Proton.WebGLUtil}
- [Proton.CanvasUtil]{@link Proton#Proton.CanvasUtil}
- [Proton.MStack]{@link Proton#Proton.MStack}


---



### Behaviour

> Note: you can add more than just one behaviour to the emitter

Behaviours will manipulate the particles. You can add as much behaviours as you want.

#### Example

```js
// this example shows how to add a specific behaviour to the Proton instance
var proton  = new Proton;
var emitter = new Proton.Emitter();
var attractionBehaviour = new.Proton.Attraction(new Proton.Vector2D())

emitter.addBehaviour(attractionBehaviour);
emitter.emit('once');
proton.addEmmiter(emitter);
```

#### Available behaviours

- [Proton.Alpha]{@link Proton#Proton.Alpha}
- [Proton.Attraction]{@link Proton#Proton.Attraction}
- [Proton.Collision]{@link Proton#Proton.Collision}
- [Proton.Color]{@link Proton#Proton.Color}
- [Proton.CrossZone]{@link Proton#Proton.CrossZone}
- [Proton.Force]{@link Proton#Proton.Force}
- [Proton.Gravity]{@link Proton#Proton.Gravity}
- [Proton.GravityWell]{@link Proton#Proton.GravityWell}
- [Proton.RandomDrift]{@link Proton#Proton.RandomDrift}
- [Proton.Repulsion]{@link Proton#Proton.Repulsion}
- [Proton.Rotate]{@link Proton#Proton.Rotate}
- [Proton.Scale]{@link Proton#Proton.Scale}


---



### Particle initializations

These settings are for manipulating the particle. Giving more mass or even another radius.

#### Example

```js
var emitter = new Proton.Emitter();

// add one or more
emitter.addInitialize(new Proton.Mass(1));
emitter.addInitialize(new Proton.Radius(0.4, 1));
```

#### Available initializations

Todo add documentation in `./src/initialize`


---


### Emitter

#### Example

#### Available emitter


---


### Renderer

#### Example

#### Available renderer