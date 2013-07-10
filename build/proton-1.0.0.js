/*!
 * Proton v1.0.0
 * https://github.com/a-jie
 *
 * Copyright 2011-2013, A-JIE
 * Licensed under the MIT license
 * https://github.com/a-jie/license
 *
 */

(function(window, undefined) {
	//the max particle number in pool
	Proton.POOL_MAX = 1000;
	Proton.TIME_STEP = 60;
	//1:100
	Proton.MEASURE = 100;
	Proton.EULER = 'euler';
	Proton.RK2 = 'runge-kutta2';
	Proton.RK4 = 'runge-kutta4';
	Proton.VERLET = 'verlet';

	Proton.PARTICLE_CREATED = 'partilcleCreated';
	Proton.PARTICLE_UPDATE = 'partilcleUpdate';
	Proton.PARTICLE_SLEEP = 'particleSleep';
	Proton.PARTICLE_DEAD = 'partilcleDead';
	Proton.PROTON_UPDATE = 'protonUpdate';
	Proton.PROTON_UPDATE_AFTER = 'protonUpdateAfter';
	Proton.EMITTER_ADDED = 'emitterAdded';
	Proton.EMITTER_REMOVED = 'emitterRemoved';

	Proton.amendChangeTabsBug = true;
	Proton.TextureBuffer = {};
	Proton.TextureCanvasBuffer = {};

	/**
	 * Proton is a html5 particle engine
	 *
	 * @class Proton
	 * @constructor
	 */
	function Proton(proParticleCount, integrationType) {
		this.proParticleCount = Proton.Util.initValue(proParticleCount, Proton.POOL_MAX);
		this.integrationType = Proton.Util.initValue(integrationType, Proton.EULER);
		this.emitters = [];
		this.renderers = [];
		this.time = 0;
		this.oldTime = 0;

		Proton.pool = new Proton.ParticlePool(this.proParticleCount);
		Proton.integrator = new Proton.NumericalIntegration(this.integrationType);
	}


	Proton.prototype = {
		/**
		 * add a type of Renderer
		 *
		 * @method addRender
		 * @param {Renderer} render
		 */
		addRender : function(render) {
			render.proton = this;
			this.renderers.push(render.proton);
		},
		/**
		 * add the Emitter
		 *
		 * @method addEmitter
		 * @param {Emitter} emitter
		 */
		addEmitter : function(emitter) {
			this.emitters.push(emitter);
			emitter.parent = this;

			this.dispatchEvent(new Proton.Event({
				type : Proton.EMITTER_ADDED,
				emitter : emitter
			}));
		},

		removeEmitter : function(emitter) {
			var index = this.emitters.indexOf(emitter);
			this.emitters.splice(index, 1);
			emitter.parent = null;

			this.dispatchEvent(new Proton.Event({
				type : Proton.EMITTER_REMOVED,
				emitter : emitter
			}));
		},

		update : function() {
			this.dispatchEvent(new Proton.Event({
				type : Proton.PROTON_UPDATE
			}));

			if (!this.oldTime)
				this.oldTime = new Date().getTime();

			var time = new Date().getTime();
			this.elapsed = (time - this.oldTime) / 1000;
			if (Proton.amendChangeTabsBug)
				this.amendChangeTabsBug();
			this.oldTime = time;
			if (this.elapsed > 0) {
				for (var i = 0; i < this.emitters.length; i++) {
					this.emitters[i].update(this.elapsed);
				}
			}

			this.dispatchEvent(new Proton.Event({
				type : Proton.PROTON_UPDATE_AFTER
			}));
		},

		amendChangeTabsBug : function() {
			if (this.elapsed > .5) {
				this.oldTime = new Date().getTime();
				this.elapsed = 0;
			}
		},

		getParticleNumber : function() {
			var total = 0;
			for (var i = 0; i < this.emitters.length; i++) {
				total += this.emitters[i].particles.length;
			}
			return total;
		},

		destory : function() {
			for (var i = 0; i < this.emitters.length; i++) {
				this.emitters[i].destory();
				delete this.emitters[i];
			}

			this.emitters = [];
			this.time = 0;
			this.oldTime = 0;
			Proton.pool.release();
		}
	};

	window.Proton = Proton;


/*
 * EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 **/

	function EventDispatcher() {
		this.initialize();
	};

	var p = EventDispatcher.prototype;

	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.removeEventListener = p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
	};

	p._listeners = null;

	p.initialize = function() {
	};

	p.addEventListener = function(type, listener) {
		var listeners = this._listeners;
		if (!listeners) {
			listeners = this._listeners = {};
		} else {
			this.removeEventListener(type, listener);
		}
		var arr = listeners[type];
		if (!arr) {
			arr = listeners[type] = [];
		}
		arr.push(listener);
		return listener;
	};

	p.removeEventListener = function(type, listener) {
		var listeners = this._listeners;
		if (!listeners) {
			return;
		}
		var arr = listeners[type];
		if (!arr) {
			return;
		}
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i] == listener) {
				if (l == 1) {
					delete (listeners[type]);
				}// allows for faster checks.
				else {
					arr.splice(i, 1);
				}
				break;
			}
		}
	};

	p.removeAllEventListeners = function(type) {
		if (!type) {
			this._listeners = null;
		} else if (this._listeners) {
			delete (this._listeners[type]);
		}
	};

	p.dispatchEvent = function(eventObj, target) {
		var ret = false, listeners = this._listeners;
		if (eventObj && listeners) {
			if ( typeof eventObj == "string") {
				eventObj = {
					type : eventObj
				};
			}
			var arr = listeners[eventObj.type];
			if (!arr) {
				return ret;
			}
			eventObj.target = target || this;
			arr = arr.slice();
			// to avoid issues with items being removed or added during the dispatch
			for (var i = 0, l = arr.length; i < l; i++) {
				var o = arr[i];
				if (o.handleEvent) {
					ret = ret || o.handleEvent(eventObj);
				} else {
					ret = ret || o(eventObj);
				}
			}
		}
		return !!ret;
	};

	p.hasEventListener = function(type) {
		var listeners = this._listeners;
		return !!(listeners && listeners[type]);
	};

	Proton.EventDispatcher = EventDispatcher;
	Proton.EventDispatcher.initialize(Proton.prototype);



	function Event(pObj) {
		this.type = 'null';
		this.particle = null;
		this.emitter = null;
		this.particles = [];
		Proton.Util.setPrototypeByObject(this, pObj);
	}
	
	Event.PARTICLE_CREATED = Proton.PARTICLE_CREATED;
	Event.PARTICLE_UPDATA = Proton.PARTICLE_UPDATA;
	Event.PARTICLE_SLEEP = Proton.PARTICLE_SLEEP;
	Event.PARTICLE_DEAD = Proton.PARTICLE_DEAD;

	Proton.Event = Event;



	var Util = Util || {
		initValue : function(value, defaults) {
			var value = (value != null && value != undefined) ? value : defaults;
			return value;
		},

		isArray : function(value) {
			return typeof value === 'object' && value.hasOwnProperty('length');
		},

		destroyArray : function(array) {
			array.length = 0;
		},

		destroyObject : function(obj) {
			for (var o in obj)
			delete obj[o];
		},

		getVector2D : function(postionOrX, y) {
			if ( typeof (postionOrX) == 'object') {
				return postionOrX;
			} else {
				var vector2d = new Proton.Vector2D(postionOrX, y);
				return vector2d;
			}
		},

		judgeVector2D : function(pOBJ) {
			var result = '';
			if (pOBJ.hasOwnProperty('x') || pOBJ.hasOwnProperty('y') || pOBJ.hasOwnProperty('p') || pOBJ.hasOwnProperty('position'))
				result += 'p';
			if (pOBJ.hasOwnProperty('vx') || pOBJ.hasOwnProperty('vx') || pOBJ.hasOwnProperty('v') || pOBJ.hasOwnProperty('velocity'))
				result += 'v';
			if (pOBJ.hasOwnProperty('ax') || pOBJ.hasOwnProperty('ax') || pOBJ.hasOwnProperty('a') || pOBJ.hasOwnProperty('accelerate'))
				result += 'a';

			return result;
		},

		setVector2DByObject : function(target, pOBJ) {
			if (pOBJ.hasOwnProperty('x'))
				target.p.x = pOBJ['x'];

			if (pOBJ.hasOwnProperty('y'))
				target.p.y = pOBJ['y'];

			if (pOBJ.hasOwnProperty('vx'))
				target.v.x = pOBJ['vx'];

			if (pOBJ.hasOwnProperty('vy'))
				target.v.y = pOBJ['vy'];

			if (pOBJ.hasOwnProperty('ax'))
				target.a.x = pOBJ['ax'];

			if (pOBJ.hasOwnProperty('ay'))
				target.a.y = pOBJ['ay'];

			if (pOBJ.hasOwnProperty('p'))
				particle.p.copy(pOBJ['p']);

			if (pOBJ.hasOwnProperty('v'))
				particle.v.copy(pOBJ['v']);

			if (pOBJ.hasOwnProperty('a'))
				particle.a.copy(pOBJ['a']);

			if (pOBJ.hasOwnProperty('position'))
				particle.p.copy(pOBJ['position']);

			if (pOBJ.hasOwnProperty('velocity'))
				particle.v.copy(pOBJ['velocity']);

			if (pOBJ.hasOwnProperty('accelerate'))
				particle.a.copy(pOBJ['accelerate']);
		},
		//强行添加属性
		addPrototypeByObject : function(target, prototypeObject, filters) {
			for (var singlePrototype in prototypeObject ) {
				if (filters) {
					if (filters.indexOf(singlePrototype) < 0)
						target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
				} else {
					target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
				}
			}

			return target;
		},
		//set prototype
		setPrototypeByObject : function(target, prototypeObject, filters) {
			for (var singlePrototype in prototypeObject ) {
				if (target.hasOwnProperty(singlePrototype)) {
					if (filters) {
						if (filters.indexOf(singlePrototype) < 0)
							target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
					} else {
						target[singlePrototype] = Proton.Util.getSpanValue(prototypeObject[singlePrototype]);
					}
				}
			}

			return target;
		},

		setSpanValue : function(a, b, c) {
			if ( a instanceof Proton.Span) {
				return a;
			} else {
				if (!b) {
					return new Proton.Span(a);
				} else {
					if (!c)
						return new Proton.Span(a, b);
					else
						return new Proton.Span(a, b, c);
				}
			}
		},

		getSpanValue : function(pan) {
			if ( pan instanceof Proton.Span)
				return pan.getValue();
			else
				return pan;
		},

		inherits : function(subClass, superClass) {
			subClass._super_ = superClass;
			if (Object['create']) {
				//console.log(subClass,superClass);
				subClass.prototype = Object.create(superClass.prototype, {
					constructor : {
						value : superClass
					}
				});
			} else {
				var F = function() {
				};
				F.prototype = superClass.prototype;
				subClass.prototype = new F();
				subClass.prototype.constructor = subClass;
			}
		},

		getImageData : function(context, image, rect) {
			context.drawImage(image, rect.x, rect.y);
			var imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
			context.clearRect(rect.x, rect.y, rect.width, rect.height);
			return imagedata;
		},

		getImage : function(img, particle, drawCanvas, fun) {
			if ( typeof (img) == 'string') {
				this.loadAndSetImage(img, particle, drawCanvas, fun);
			} else if ( typeof (img) == 'object') {
				this.loadAndSetImage(img.src, particle, drawCanvas, fun);
			} else if ( img instanceof Image) {
				this.loadedImage(img.src, particle, drawCanvas, fun, img);
			}
		},

		loadedImage : function(src, particle, drawCanvas, fun, target) {
			particle.target = target;
			particle.transform.src = src;
			if (!Proton.TextureBuffer[src])
				Proton.TextureBuffer[src] = particle.target;
			if (drawCanvas) {
				if (Proton.TextureCanvasBuffer[src]) {
					particle.transform.canvas = Proton.TextureCanvasBuffer[src];
				} else {
					var _width = Proton.WebGLUtil.nhpot(particle.target.width);
					var _height = Proton.WebGLUtil.nhpot(particle.target.height);
					particle.transform.canvas = Proton.DomUtil.createCanvas('canvas' + src, _width, _height);
					var context = particle.transform.canvas.getContext('2d');
					context.drawImage(particle.target, 0, 0, particle.target.width, particle.target.height);
					Proton.TextureCanvasBuffer[src] = particle.transform.canvas;
				}
			}
			if (fun)
				fun(particle);
		},

		loadAndSetImage : function(src, particle, drawCanvas, fun) {
			if (Proton.TextureBuffer[src]) {
				this.loadedImage(src, particle, drawCanvas, fun, Proton.TextureBuffer[src]);
			} else {
				var self = this;
				var myImage = new Image();
				myImage.onload = function(e) {
					self.loadedImage(src, particle, drawCanvas, fun, e.target);
				}
				myImage.src = src;
			}
		},

		hexToRGB : function(h) {
			var hex16 = (h.charAt(0) == "#") ? h.substring(1, 7) : h;
			var r = parseInt(hex16.substring(0, 2), 16);
			var g = parseInt(hex16.substring(2, 4), 16);
			var b = parseInt(hex16.substring(4, 6), 16);

			return {
				r : r,
				g : g,
				b : b
			}
		},

		rgbToHex : function(rbg) {
			return 'rgb(' + rbg.r + ', ' + rbg.g + ', ' + rbg.b + ')';
		}
	};

	Proton.Util = Util;



	var WebGLUtil = WebGLUtil || {
		ipot : function(length) {
			return (length & (length - 1)) == 0;
		},

		nhpot : function(length) {--length;
			for (var i = 1; i < 32; i <<= 1) {
				length = length | length >> i;
			}
			return length + 1;
		},

		makeTranslation : function(tx, ty) {
			return [1, 0, 0, 0, 1, 0, tx, ty, 1];
		},

		makeRotation : function(angleInRadians) {
			var c = Math.cos(angleInRadians);
			var s = Math.sin(angleInRadians);
			return [c, -s, 0, s, c, 0, 0, 0, 1];
		},

		makeScale : function(sx, sy) {
			return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
		},

		matrixMultiply : function(a, b) {
			var a00 = a[0 * 3 + 0];
			var a01 = a[0 * 3 + 1];
			var a02 = a[0 * 3 + 2];
			var a10 = a[1 * 3 + 0];
			var a11 = a[1 * 3 + 1];
			var a12 = a[1 * 3 + 2];
			var a20 = a[2 * 3 + 0];
			var a21 = a[2 * 3 + 1];
			var a22 = a[2 * 3 + 2];
			var b00 = b[0 * 3 + 0];
			var b01 = b[0 * 3 + 1];
			var b02 = b[0 * 3 + 2];
			var b10 = b[1 * 3 + 0];
			var b11 = b[1 * 3 + 1];
			var b12 = b[1 * 3 + 2];
			var b20 = b[2 * 3 + 0];
			var b21 = b[2 * 3 + 1];
			var b22 = b[2 * 3 + 2];
			return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
		}
	}

	Proton.WebGLUtil = WebGLUtil;



	var DomUtil = DomUtil || {
		createCanvas : function($id, $width, $height, $position) {
			var element = document.createElement("canvas");
			var position = $position ? $position : 'absolute';
			element.id = $id;
			element.width = $width;
			element.height = $height;
			element.style.position = position;
			return element;
		},

		transformDom : function($div, $x, $y, $scale, $rotate) {
			$div.style.WebkitTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.MozTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.OTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.msTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.transform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
		}
	}

	Proton.DomUtil = DomUtil;



	function MStack() {
		this.mats = [];
		this.size = 0;
		for (var i = 0; i < 20; i++)
			this.mats.push(Proton.Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
	}


	MStack.prototype.set = function(m, i) {
		if (i == 0)
			Proton.Mat3.set(m, this.mats[0]);
		else
			Proton.Mat3.multiply(this.mats[i - 1], m, this.mats[i]);
		this.size = Math.max(this.size, i + 1);
	}

	MStack.prototype.push = function(m) {
		if (this.size == 0)
			Proton.Mat3.set(m, this.mats[0]);
		else
			Proton.Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);
		this.size++;
	}

	MStack.prototype.pop = function() {
		if (this.size > 0)
			this.size--;
	}

	MStack.prototype.top = function() {
		return (this.mats[this.size - 1]);
	}

	Proton.MStack = MStack;




	Particle.ID = 0;
	/**
	 * the Particle class
	 *
	 * @class Proton.Particle
	 * @constructor
	 * @param {Object} pObj the parameters object;
	 * for example {life:3,dead:false}
	 */
	function Particle(pOBJ) {
		/**
		 * The particle's id;
		 * @property id
		 * @type {String} id
		 */
		this.id = 'particle_' + Particle.ID++;
		this.reset(true);
		Proton.Util.setPrototypeByObject(this, pOBJ);
	}


	Particle.prototype = {
		getDirection : function() {
			return Math.atan2(this.v.x, -this.v.y) * (180 / Math.PI);
		},

		reset : function(init) {
			this.life = Infinity;
			this.age = 0;
			//能量损失
			this.energy = 1;
			this.dead = false;
			this.sleep = false;
			this.target = null;
			this.sprite = null;
			this.parent = null;
			this.mass = 1;
			this.radius = 10;
			this.alpha = 1;
			this.scale = 1;
			this.rotation = 0;
			this.color = null;
			this.easing = Proton.ease.setEasingByName(Proton.easeLinear);
			if (init) {
				this.transform = {}
				this.p = new Proton.Vector2D();
				this.v = new Proton.Vector2D();
				this.a = new Proton.Vector2D();
				this.old = {
					p : new Proton.Vector2D(),
					v : new Proton.Vector2D(),
					a : new Proton.Vector2D()
				};
				this.behaviours = [];
			} else {
				Proton.Util.destroyObject(this.transform);
				this.p.set(0, 0);
				this.v.set(0, 0);
				this.a.set(0, 0);
				this.old.p.set(0, 0);
				this.old.v.set(0, 0);
				this.old.a.set(0, 0);
				this.removeAllBehaviours();
			}

			this.transform.rgb = {
				r : 255,
				g : 255,
				b : 255
			}
			return this;
		},

		update : function(time, index) {
			if (!this.sleep) {
				this.age += time;
				var length = this.behaviours.length, i;
				for ( i = 0; i < length; i++) {
					if (this.behaviours[i])
						this.behaviours[i].applyBehaviour(this, time, index)
				}
			} else {

			}

			if (this.age >= this.life) {
				this.destory();
			} else {
				var scale = this.easing(this.age / this.life);
				this.energy = Math.max(1 - scale, 0);
			}

		},

		addBehaviour : function(behaviour) {
			this.behaviours.push(behaviour);
			if (behaviour.hasOwnProperty('parents'))
				behaviour.parents.push(this);
			behaviour.initialize(this);
		},

		addBehaviours : function(behaviours) {
			var length = behaviours.length, i;
			for ( i = 0; i < length; i++) {
				this.addBehaviour(behaviours[i]);
			}
		},

		removeBehaviour : function(behaviour) {
			var index = this.behaviours.indexOf(behaviour);
			if (index > -1) {
				var behaviour = this.behaviours.splice(index, 1);
				behaviour.parents = null;
			}
		},

		removeAllBehaviours : function() {
			Proton.Util.destroyArray(this.behaviours);
		},
		/**
		 * Destory this particle
		 * @method destory
		 */
		destory : function() {
			this.removeAllBehaviours();
			this.energy = 0;
			this.dead = true;
			this.parent = null;
		}
	};

	Proton.Particle = Particle;




	function ParticlePool(num, releaseTime) {
		this.proParticleCount = Proton.Util.initValue(num, 0);
		this.releaseTime = Proton.Util.initValue(releaseTime, -1);
		this.poolList = [];
		this.timeoutID = 0;
		for (var i = 0; i < this.proParticleCount; i++) {
			this.add();
		}
		//////////////////////////////
		if (this.releaseTime > 0)
			this.timeoutID = setTimeout(this.release, this.releaseTime / 1000);
	}


	ParticlePool.prototype = {
		create : function(newTypeParticleClass) {
			if (newTypeParticleClass)
				return new newTypeParticle;
			else
				return new Proton.Particle;
		},
		getCount : function() {
			return this.poolList.length;
		},
		add : function() {
			return this.poolList.push(this.create());
		},
		get : function() {
			if (this.poolList.length === 0) {
				return this.create();
			} else {
				return this.poolList.pop().reset();
			}

		},
		set : function(particle) {
			if (this.poolList.length < Proton.POOL_MAX)
				return this.poolList.push(particle);
		},
		release : function() {
			for (var i = 0; i < this.poolList.length; i++) {
				if (this.poolList[i]['destory'])
					this.poolList[i].destory();
				delete this.poolList[i];
			}
			this.poolList = [];
		}
	}

	Proton.ParticlePool = ParticlePool;




	var MathUtils = {
		randomAToB : function(a, b, INT) {
			if (!INT)
				return a + Math.random() * (b - a );
			else
				return Math.floor(Math.random() * (b - a)) + a;
		},
		randomFloating : function(center, f, INT) {
			return MathUtils.randomAToB(center - f, center + f, INT);
		},
		randomZone : function(display) {

		},

		degreeTransform : function(a) {
			return a * Math.PI / 180;
		},

		toColor16 : function getRGB(num) {
			return "#" + num.toString(16);
		},
		
		randomColor : function() {
			return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
		}
	}

	Proton.MathUtils = MathUtils;


//数值积分

	var NumericalIntegration = function(type) {
		this.type = Proton.Util.initValue(type, Proton.EULER);
	}

	NumericalIntegration.prototype = {
		integrate : function(particles, time, damping) {
			this.eulerIntegrate(particles, time, damping);
		},

		eulerIntegrate : function(particle, time, damping) {
			if (!particle.sleep) {
				particle.old.p.copy(particle.p);
				particle.old.v.copy(particle.v);
				particle.a.multiplyScalar(1 / particle.mass);
				particle.v.add(particle.a.multiplyScalar(time));
				particle.p.add(particle.old.v.multiplyScalar(time));
				if (damping)
					particle.v.multiplyScalar(damping);
				particle.a.clear();
			}
		}
	}

	Proton.NumericalIntegration = NumericalIntegration;


//@author mrdoob / http://mrdoob.com/

	var Vector2D = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	Vector2D.prototype = {
		set : function(x, y) {

			this.x = x;
			this.y = y;
			return this;

		},

		setX : function(x) {

			this.x = x;
			return this;

		},

		setY : function(y) {

			this.y = y;

			return this;

		},

		setComponent : function(index, value) {

			switch ( index ) {

				case 0:
					this.x = value;
					break;
				case 1:
					this.y = value;
					break;
				default:
					throw new Error("index is out of range: " + index);

			}

		},

		getGradient : function() {
			if (this.x != 0)
				return Math.atan2(this.y, this.x);
			else if (this.y > 0)
				return Math.PI / 2;
			else if (this.y < 0)
				return -Math.PI / 2;
		},

		getComponent : function(index) {

			switch ( index ) {

				case 0:
					return this.x;
				case 1:
					return this.y;
				default:
					throw new Error("index is out of range: " + index);

			}

		},

		copy : function(v) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add : function(v, w) {

			if (w !== undefined) {
				return this.addVectors(v, w);

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addXY : function(a, b) {

			this.x += a;
			this.y += b;

			return this;

		},

		addVectors : function(a, b) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScalar : function(s) {

			this.x += s;
			this.y += s;

			return this;

		},

		sub : function(v, w) {

			if (w !== undefined) {
				return this.subVectors(v, w);

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subVectors : function(a, b) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiplyScalar : function(s) {

			this.x *= s;
			this.y *= s;

			return this;

		},

		divideScalar : function(s) {

			if (s !== 0) {

				this.x /= s;
				this.y /= s;

			} else {

				this.set(0, 0);

			}

			return this;

		},

		min : function(v) {

			if (this.x > v.x) {

				this.x = v.x;

			}

			if (this.y > v.y) {

				this.y = v.y;

			}

			return this;

		},

		max : function(v) {

			if (this.x < v.x) {

				this.x = v.x;

			}

			if (this.y < v.y) {

				this.y = v.y;

			}

			return this;

		},

		clamp : function(min, max) {

			// This function assumes min < max, if this assumption isn't true it will not operate correctly

			if (this.x < min.x) {

				this.x = min.x;

			} else if (this.x > max.x) {

				this.x = max.x;

			}

			if (this.y < min.y) {

				this.y = min.y;

			} else if (this.y > max.y) {

				this.y = max.y;

			}

			return this;

		},

		negate : function() {

			return this.multiplyScalar(-1);

		},

		dot : function(v) {

			return this.x * v.x + this.y * v.y;

		},

		lengthSq : function() {

			return this.x * this.x + this.y * this.y;

		},

		length : function() {

			return Math.sqrt(this.x * this.x + this.y * this.y);

		},

		normalize : function() {

			return this.divideScalar(this.length());

		},

		distanceTo : function(v) {

			return Math.sqrt(this.distanceToSquared(v));

		},

		rotate : function(tha) {
			var x = this.x;
			var y = this.y;
			this.x = x * Math.cos(tha) + y * Math.sin(tha);
			this.y = -x * Math.sin(tha) + y * Math.cos(tha);
			return this;
		},

		distanceToSquared : function(v) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		setLength : function(l) {

			var oldLength = this.length();

			if (oldLength !== 0 && l !== oldLength) {

				this.multiplyScalar(l / oldLength);
			}

			return this;

		},

		lerp : function(v, alpha) {

			this.x += (v.x - this.x ) * alpha;
			this.y += (v.y - this.y ) * alpha;

			return this;

		},

		equals : function(v) {

			return ((v.x === this.x ) && (v.y === this.y ) );

		},

		toArray : function() {

			return [this.x, this.y];

		},

		clear : function() {
			this.x = 0.0;
			this.y = 0.0;
			return this;
		},

		clone : function() {

			return new Proton.Vector2D(this.x, this.y);

		}
	};

	Proton.Vector2D = Vector2D;



	var Polar2D = function(r, tha) {
		this.r = Math.abs(r) || 0;
		this.tha = tha || 0;
	}

	Polar2D.prototype = {
		set : function(r, tha) {

			this.r = r;
			this.tha = tha;
			return this;

		},

		setR : function(r) {

			this.r = r;
			return this;

		},

		setTha : function(tha) {

			this.tha = tha;

			return this;

		},

		copy : function(p) {

			this.r = p.r;
			this.tha = p.tha;

			return this;

		},

		toVector : function() {
			return new Proton.Vector2D(this.getX(), this.getY());
		},

		getX : function() {
			return this.r * Math.sin(this.tha);
		},

		getY : function() {
			return -this.r * Math.cos(this.tha);
		},

		normalize : function() {

			this.r = 1;
			return this;
		},

		equals : function(v) {

			return ((v.r === this.r ) && (v.tha === this.tha ) );

		},

		toArray : function() {

			return [this.r, this.tha];

		},

		clear : function() {
			this.r = 0.0;
			this.tha = 0.0;
			return this;
		},

		clone : function() {

			return new Proton.Polar2D(this.r, this.tha);

		}
	};

	Proton.Polar2D = Polar2D;



	function Span(a, b, center) {
		this.isArray = false;

		if (Proton.Util.isArray(a)) {
			this.isArray = true;
			this.a = a;
		} else {
			this.a = Proton.Util.initValue(a, 1);
			this.b = Proton.Util.initValue(b, this.a);
			this.center = Proton.Util.initValue(center, false);
		}
	}


	Span.prototype = {
		getValue : function(INT) {
			if (this.isArray) {
				return this.a[Math.floor(this.a.length * Math.random())];
			} else {
				if (!this.center)
					return Proton.MathUtils.randomAToB(this.a, this.b, INT);
				else
					return Proton.MathUtils.randomFloating(this.a, this.b, INT);
			}
		}
	}

	Proton.Span = Span;
	Proton.getSpan = function(a, b, center) {
		return new Proton.Span(a, b, center);
	}



	function ColorSpan(color) {
		if (Proton.Util.isArray(color)) {
			this.colorArr = color;
		} else {
			this.colorArr = [color];
		}
	}


	Proton.Util.inherits(ColorSpan, Proton.Span);
	ColorSpan.prototype.getValue = function() {
		var color = this.colorArr[Math.floor(this.colorArr.length * Math.random())];
		if (color == 'random' || color == 'Random')
			return Proton.MathUtils.randomColor();
		else
			return color;
	}

	Proton.ColorSpan = ColorSpan;



	function Rectangle(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.bottom = this.y + this.height;
		this.right = this.x + this.width;
	}


	Rectangle.prototype = {
		contains : function(x, y) {
			if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y)
				return true
			else
				return false
		}
	}

	Proton.Rectangle = Rectangle;



	var Mat3 = Mat3 || {
		create : function(mat3) {
			var mat = new Float32Array(9);
			if (mat3)
				this.set(mat3, mat);
			return mat;
		},
		set : function(mat1, mat2) {
			for (var i = 0; i < 9; i++)
				mat2[i] = mat1[i];
			return mat2;
		},
		multiply : function(mat, mat2, mat3) {
			var a00 = mat[0], a01 = mat[1], a02 = mat[2], a10 = mat[3], a11 = mat[4], a20 = mat[6], a21 = mat[7], b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b10 = mat2[3], b11 = mat2[4], b20 = mat2[6], b21 = mat2[7];

			mat3[0] = b00 * a00 + b01 * a10;
			mat3[1] = b00 * a01 + b01 * a11;
			mat3[2] = a02 * b02;
			mat3[3] = b10 * a00 + b11 * a10;
			mat3[4] = b10 * a01 + b11 * a11;
			mat3[6] = b20 * a00 + b21 * a10 + a20;
			mat3[7] = b20 * a01 + b21 * a11 + a21;
			return mat3;
		},
		inverse : function(mat, mat3) {
			var a00 = mat[0], a01 = mat[1], a10 = mat[3], a11 = mat[4], a20 = mat[6], a21 = mat[7], b01 = a11, b11 = -a10, b21 = a21 * a10 - a11 * a20, d = a00 * b01 + a01 * b11, id;
			id = 1 / d;
			mat3[0] = b01 * id;
			mat3[1] = (-a01 ) * id;
			mat3[3] = b11 * id;
			mat3[4] = a00 * id;
			mat3[6] = b21 * id;
			mat3[7] = (-a21 * a00 + a01 * a20) * id;
			return mat3;
		},
		multiplyVec2 : function(m, vec, mat3) {
			var x = vec[0], y = vec[1];
			mat3[0] = x * m[0] + y * m[3] + m[6];
			mat3[1] = x * m[1] + y * m[4] + m[7];
			return mat3;
		}
	}

	Proton.Mat3 = Mat3;



	Behaviour.id = 0;
	/**
	 * The Behaviour class is the base for the other Behaviour
	 *
	 * @class Behaviour
	 * @constructor
	 */
	function Behaviour(life, easing) {
		/**
		 * The behaviour's id;
		 * @property id
		 * @type {String} id
		 */
		this.id = 'Behaviour_' + Behaviour.id++;
		this.life = Proton.Util.initValue(life, Infinity);
		/**
		 * The behaviour's decaying trend, for example Proton.easeOutQuart;
		 * @property easing
		 * @type {String}
		 * @default Proton.easeLinear
		 */
		this.easing = Proton.ease.setEasingByName(easing);
		this.age = 0;
		this.energy = 1;
		/**
		 * The behaviour is Dead;
		 * @property dead
		 * @type {Boolean}
		 */
		this.dead = false;
		/**
		 * The behaviour's parents array;
		 * @property parents
		 * @type {Array}
		 */
		this.parents = [];
		/**
		 * The behaviour name;
		 * @property name
		 * @type {string}
		 */
		this.name = 'Behaviour';
	}


	Behaviour.prototype = {
		/**
		 * Reset this behaviour's parameters
		 *
		 * @method reset
		 * @param {Number} this behaviour's life
		 * @param {String} this behaviour's easing
		 */
		reset : function(life, easing) {
			this.life = Proton.Util.initValue(life, Infinity);
			this.easing = Proton.Util.initValue(easing, Proton.ease.setEasingByName(Proton.easeLinear));
		},
		/**
		 * Normalize a force by 1:100;
		 *
		 * @method normalizeForce
		 * @param {Proton.Vector2D} force 
		 */
		normalizeForce : function(force) {
			return force.multiplyScalar(Proton.MEASURE);
		},

		/**
		 * Normalize a value by 1:100;
		 *
		 * @method normalizeValue
		 * @param {Number} value
		 */
		normalizeValue : function(value) {
			return value * Proton.MEASURE;
		},

		/**
		 * Initialize the behaviour's parameters for all particles
		 *
		 * @method initialize
		 * @param {Proton.Particle} particle
		 */
		initialize : function(particle) {
		},
		
		/**
		 * Apply this behaviour for all particles every time
		 *
		 * @method applyBehaviour
		 * @param {Proton.Particle} particle
		 * @param {Number} the integrate time 1/ms
		 * @param {Int} the particle index
		 */
		applyBehaviour : function(particle, time, index) {
			this.age += time;
			if (this.age >= this.life || this.dead) {
				this.energy = 0;
				this.dead = true;
				this.destory();
			} else {
				var scale = this.easing(particle.age / particle.life);
				this.energy = Math.max(1 - scale, 0);
			}
		},
		
		/**
		 * Destory this behaviour
		 * @method destory
		 */
		destory : function() {
			var index;
			var length = this.parents.length, i;
			for ( i = 0; i < length; i++) {
				this.parents[i].removeBehaviour(this);
			}

			this.parents = [];
		}
	};

	Proton.Behaviour = Behaviour;



	/**
	 * The number of particles per second emission (a [particle]/b [s]);
	 * @class Proton.Rate
	 * @constructor
	 * @param {Array or Number or Proton.Span} numpan the number of each emission;
	 * @param {Array or Number or Proton.Span} timepan the time of each emission;
	 * for example: new Proton.Rate(new Proton.Span(10, 20), new Proton.Span(.1, .25));
	 */
	function Rate(numpan, timepan) {
		this.numPan = Proton.Util.initValue(numpan, 1);
		this.timePan = Proton.Util.initValue(timepan, 1);
		this.numPan = Proton.Util.setSpanValue(this.numPan);
		this.timePan = Proton.Util.setSpanValue(this.timePan);
		this.startTime = 0;
		this.nextTime = 0;
		this.init();
	}


	Rate.prototype = {
		init : function() {
			this.startTime = 0;
			this.nextTime = this.timePan.getValue();
		},

		getValue : function(time) {
			this.startTime += time;
			if (this.startTime >= this.nextTime) {
				this.startTime = 0;
				this.nextTime = this.timePan.getValue();
				if (this.numPan.b == 1) {
					if (this.numPan.getValue(false) > 0.5)
						return 1;
					else
						return 0;
				} else {
					return this.numPan.getValue(true);
				}
			}
			return 0;
		}
	}

	Proton.Rate = Rate;



	function Initialize() {

	}


	Initialize.prototype.reset = function() {

	}

	Initialize.prototype.init = function(emitter, particle) {
		if (particle) {
			this.initialize(particle);
		} else {
			this.initialize(emitter);
		}
	};

	///sub class init
	Initialize.prototype.initialize = function(target) {
	};

	Proton.Initialize = Initialize;



	var InitializeUtil = {

		initialize : function(emitter, particle, initializes) {
			var length = initializes.length, i;
			for ( i = 0; i < length; i++) {
				if (initializes[i] instanceof Proton.Initialize)
					initializes[i].init(emitter, particle);
				else
					Proton.InitializeUtil.init(emitter, particle, initializes[i]);
			}

			Proton.InitializeUtil.bindEmitter(emitter, particle);
		},
		
		//////////////////////init//////////////////////
		init : function(emitter, particle, initialize) {
			Proton.Util.setPrototypeByObject(particle, initialize);
			Proton.Util.setVector2DByObject(particle, initialize);
		},

		bindEmitter : function(emitter, particle) {
			if (emitter.bindEmitter) {
				particle.p.add(emitter.p);
				particle.v.add(emitter.v);
				particle.a.add(emitter.a);
				particle.v.rotate(Proton.MathUtils.degreeTransform(emitter.rotation));
			}
		}
		//////////////////////init//////////////////////
	}

	Proton.InitializeUtil = InitializeUtil;



	function Life(a, b, c) {
		Life._super_.call(this);
		this.lifePan = Proton.Util.setSpanValue(a, b, c);
	}


	Proton.Util.inherits(Life, Proton.Initialize);
	Life.prototype.initialize = function(target) {
		if (this.lifePan.a == Infinity)
			target.life = Infinity;
		else
			target.life = this.lifePan.getValue();
	};

	Proton.Life = Life;



	function Position(zone) {
		Position._super_.call(this);
		this.zone = Proton.Util.initValue(zone, new Proton.PointZone());
	}


	Proton.Util.inherits(Position, Proton.Initialize);
	Position.prototype.reset = function(zone) {
		this.zone = Proton.Util.initValue(zone, new Proton.PointZone());
	};

	Position.prototype.initialize = function(target) {
		this.zone.getPosition();
		target.p.x = this.zone.vector.x;
		target.p.y = this.zone.vector.y;
	};

	Proton.Position = Position;
	Proton.P = Position;



	//radius and tha
	function Velocity(rpan, thapan, type) {
		Velocity._super_.call(this);
		this.rPan = Proton.Util.setSpanValue(rpan);
		this.thaPan = Proton.Util.setSpanValue(thapan);
		this.type = Proton.Util.initValue(type, 'vector');
	}


	Proton.Util.inherits(Velocity, Proton.Initialize);

	Velocity.prototype.reset = function(rpan, thapan, type) {
		this.rPan = Proton.Util.setSpanValue(rpan);
		this.thaPan = Proton.Util.setSpanValue(thapan);
		this.type = Proton.Util.initValue(type, 'vector');
	};

	Velocity.prototype.normalizeVelocity = function(vr) {
		return vr * Proton.MEASURE;
	}

	Velocity.prototype.initialize = function(target) {
		if (this.type == 'p' || this.type == 'P' || this.type == 'polar') {
			var polar2d = new Proton.Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * Math.PI / 180);
			target.v.x = polar2d.getX();
			target.v.y = polar2d.getY();
		} else {
			target.v.x = this.normalizeVelocity(this.rPan.getValue());
			target.v.y = this.normalizeVelocity(this.thaPan.getValue());
		}
	};

	Proton.Velocity = Velocity;
	Proton.V = Velocity;



	function Mass(a, b, c) {
		Mass._super_.call(this);
		this.massPan = Proton.Util.setSpanValue(a, b, c);
	}


	Proton.Util.inherits(Mass, Proton.Initialize);
	Mass.prototype.initialize = function(target) {
		target.mass = this.massPan.getValue();
	};

	Proton.Mass = Mass;



	function Radius(a, b, c) {
		Radius._super_.call(this);
		this.radius = Proton.Util.setSpanValue(a, b, c);
	}


	Proton.Util.inherits(Radius, Proton.Initialize);
	Radius.prototype.reset = function(a, b, c) {
		this.radius = Proton.Util.setSpanValue(a, b, c);
	};

	Radius.prototype.initialize = function(particle) {
		particle.radius = this.radius.getValue();
		particle.transform.oldRadius = particle.radius;
	};

	Proton.Radius = Radius;



	function ImageTarget(image, w, h) {
		ImageTarget._super_.call(this);
		this.image = this.setSpanValue(image);
		this.w = Proton.Util.initValue(w, 20);
		this.h = Proton.Util.initValue(h, this.w);
	}


	Proton.Util.inherits(ImageTarget, Proton.Initialize);
	ImageTarget.prototype.initialize = function(particle) {
		var imagetarget = this.image.getValue();
		if ( typeof (imagetarget) == 'string') {
			particle.target = {
				width : this.w,
				height : this.h,
				src : imagetarget
			}
		} else {
			particle.target = imagetarget;
		}
	};

	ImageTarget.prototype.setSpanValue = function(color) {
		if ( color instanceof Proton.ColorSpan) {
			return color;
		} else {
			return new Proton.ColorSpan(color);
		}
	}

	Proton.ImageTarget = ImageTarget;



	function Force(fx, fy, life, easing) {
		Force._super_.call(this, life, easing);
		this.force = this.normalizeForce(new Proton.Vector2D(fx, fy));
		this.name = "Force";
	}


	Proton.Util.inherits(Force, Proton.Behaviour);
	Force.prototype.reset = function(fx, fy, life, easing) {
		this.force = this.normalizeForce(new Proton.Vector2D(fx, fy));
		if (life)
			Force._super_.prototype.reset.call(this, life, easing);
	}

	Force.prototype.applyBehaviour = function(particle, time, index) {
		Force._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.a.add(this.force);
	};

	Proton.Force = Force;
	Proton.F = Force;



	function Attraction(targetPosition, force, radius, life, easing) {
		Attraction._super_.call(this, life, easing);
		this.targetPosition = Proton.Util.initValue(targetPosition, new Proton.Vector2D);
		this.radius = Proton.Util.initValue(radius, 1000);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.radiusSq = this.radius * this.radius
		this.attractionForce = new Proton.Vector2D();
		this.lengthSq = 0;
		this.name = "Attraction";
	}


	Proton.Util.inherits(Attraction, Proton.Behaviour);
	Attraction.prototype.reset = function(targetPosition, force, radius, life, easing) {
		this.targetPosition = Proton.Util.initValue(targetPosition, new Proton.Vector2D);
		this.radius = Proton.Util.initValue(radius, 1000);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.radiusSq = this.radius * this.radius
		this.attractionForce = new Proton.Vector2D();
		this.lengthSq = 0;
		if (life)
			Attraction._super_.prototype.reset.call(this, life, easing);
	}

	Attraction.prototype.applyBehaviour = function(particle, time, index) {
		Attraction._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.attractionForce.copy(this.targetPosition);
		this.attractionForce.sub(particle.p);
		this.lengthSq = this.attractionForce.lengthSq();
		if (this.lengthSq > 0.000004 && this.lengthSq < this.radiusSq) {
			this.attractionForce.normalize();
			this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
			this.attractionForce.multiplyScalar(this.force);
			particle.a.add(this.attractionForce);
		}
	};

	Proton.Attraction = Attraction;




	function RandomDrift(driftX, driftY, delay, life, easing) {
		RandomDrift._super_.call(this, life, easing);
		this.reset(driftX, driftY, delay);
		this.time = 0;
		this.name = "RandomDrift";
	}


	Proton.Util.inherits(RandomDrift, Proton.Behaviour);
	RandomDrift.prototype.reset = function(driftX, driftY, delay, life, easing) {
		this.panFoce = new Proton.Vector2D(driftX, driftY);
		this.panFoce = this.normalizeForce(this.panFoce);
		this.delay = delay;
		if (life)
			RandomDrift._super_.prototype.reset.call(this, life, easing);
	}

	RandomDrift.prototype.applyBehaviour = function(particle, time, index) {
		RandomDrift._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.time += time;
		if (this.time >= this.delay) {
			
			particle.a.addXY(Proton.MathUtils.randomAToB(-this.panFoce.x, this.panFoce.x), Proton.MathUtils.randomAToB(-this.panFoce.y, this.panFoce.y));
			this.time = 0;
		};
	};

	Proton.RandomDrift = RandomDrift;



	function Repulsion(targetPosition, force, radius, life, easing) {
		Repulsion._super_.call(this, targetPosition, force, radius, life, easing);
		this.force *= -1;
		this.name = "Repulsion";
	}


	Proton.Util.inherits(Repulsion, Proton.Attraction);
	Repulsion.prototype.reset = function(targetPosition, force, radius, life, easing) {
		Repulsion._super_.prototype.reset.call(this, targetPosition, force, radius, life, easing);
		this.force *= -1;
	}
	Proton.Repulsion = Repulsion;




	function Gravity(g, life, easing) {
		Gravity._super_.call(this, 0, g, life, easing);
		this.name = "Gravity";
	}


	Proton.Util.inherits(Gravity, Proton.Force);
	Gravity.prototype.reset = function(g, life, easing) {
		Gravity._super_.prototype.reset.call(this, 0, g, life, easing);
	}
	Proton.Gravity = Gravity;
	Proton.G = Gravity;



	//can use Collision(emitter,true,function(){}) or Collision();
	function Collision(emitter, mass, callback, life, easing) {
		Collision._super_.call(this, life, easing);
		this.reset(emitter, mass, callback);
		this.name = "Collision";
	}


	Proton.Util.inherits(Collision, Proton.Behaviour);
	Collision.prototype.reset = function(emitter, mass, callback, life, easing) {
		this.emitter = Proton.Util.initValue(emitter, null);
		this.mass = Proton.Util.initValue(mass, true);
		this.callback = Proton.Util.initValue(callback, null);
		this.collisionPool = [];
		this.delta = new Proton.Vector2D();
		if (life)
			Collision._super_.prototype.reset.call(this, life, easing);
	}

	Collision.prototype.applyBehaviour = function(particle, time, index) {
		var newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
		var otherParticle;
		var lengthSq;
		var overlap;
		var averageMass1, averageMass2;
		var length = newPool.length;
		for (var i = 0; i < length; i++) {
			otherParticle = newPool[i];
			if (otherParticle !== particle) {
				this.delta.copy(otherParticle.p);
				this.delta.sub(particle.p);
				lengthSq = this.delta.lengthSq();
				distance = particle.radius + otherParticle.radius;

				if (lengthSq <= distance * distance) {
					overlap = distance - Math.sqrt(lengthSq);
					overlap += 0.5;
					totalMass = particle.mass + otherParticle.mass;
					averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
					averageMass2 = this.mass ? particle.mass / totalMass : 0.5;
					particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
					otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));
					if (this.callback)
						this.callback(particle, otherParticle);
				}
			}
		}
	};

	Proton.Collision = Collision;




	function CrossZone(zone, crossType, life, easing) {
		CrossZone._super_.call(this, life, easing);
		this.reset(zone, crossType);
		///dead /bound /cross
		this.name = "CrossZone";
	}


	Proton.Util.inherits(CrossZone, Proton.Behaviour);
	CrossZone.prototype.reset = function(zone, crossType, life, easing) {
		this.zone = zone;
		this.zone.crossType = Proton.Util.initValue(crossType, "dead");
		if (life)
			CrossZone._super_.prototype.reset.call(this, life, easing);
	}

	CrossZone.prototype.applyBehaviour = function(particle, time, index) {
		CrossZone._super_.prototype.applyBehaviour.call(this, particle, time, index);
		this.zone.crossing(particle);
	};

	Proton.CrossZone = CrossZone;



	function Alpha(a, b, life, easing) {
		Alpha._super_.call(this, life, easing);
		this.reset(a, b);
		/**
		 * The Behaviour name;
		 * @property name
		 * @type {string}
		 */
		this.name = "Alpha";
	}


	Proton.Util.inherits(Alpha, Proton.Behaviour);
	Alpha.prototype.reset = function(a, b, life, easing) {
		if (b == null || b == undefined)
			this.same = true;
		else
			this.same = false;
		this.a = Proton.Util.setSpanValue(Proton.Util.initValue(a, 1));
		this.b = Proton.Util.setSpanValue(b);
		if (life)
			Alpha._super_.prototype.reset.call(this, life, easing);
	}

	Alpha.prototype.initialize = function(particle) {
		particle.transform.alphaA = this.a.getValue();
		if (this.same)
			particle.transform.alphaB = particle.transform.alphaA;
		else
			particle.transform.alphaB = this.b.getValue();
	};

	Alpha.prototype.applyBehaviour = function(particle, time, index) {
		Alpha._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.alpha = particle.transform.alphaB + (particle.transform.alphaA - particle.transform.alphaB) * this.energy;
		if (particle.alpha < 0.001)
			particle.alpha = 0;
	};

	Proton.Alpha = Alpha;



	function Scale(a, b, life, easing) {
		Scale._super_.call(this, life, easing);
		this.reset(a, b);
		this.name = "Scale";
	}


	Proton.Util.inherits(Scale, Proton.Behaviour);
	Scale.prototype.reset = function(a, b, life, easing) {
		if (b == null || b == undefined)
			this.same = true;
		else
			this.same = false;
		this.a = Proton.Util.setSpanValue(Proton.Util.initValue(a, 1));
		this.b = Proton.Util.setSpanValue(b);
		if (life)
			Scale._super_.prototype.reset.call(this, life, easing);
	}

	Scale.prototype.initialize = function(particle) {
		particle.transform.scaleA = this.a.getValue();
		particle.transform.oldRadius = particle.radius;
		if (this.same)
			particle.transform.scaleB = particle.transform.scaleA;
		else
			particle.transform.scaleB = this.b.getValue();

	};

	Scale.prototype.applyBehaviour = function(particle, time, index) {
		Scale._super_.prototype.applyBehaviour.call(this, particle, time, index);
		particle.scale = particle.transform.scaleB + (particle.transform.scaleA - particle.transform.scaleB) * this.energy;
		if (particle.scale < 0.0001)
			particle.scale = 0;
		particle.radius = particle.transform.oldRadius * particle.scale;
	};

	Proton.Scale = Scale;



	function Rotate(a, b, style, life, easing) {
		Rotate._super_.call(this, life, easing);
		this.reset(a, b, style);
		this.name = "Rotate";
	}


	Proton.Util.inherits(Rotate, Proton.Behaviour);
	Rotate.prototype.reset = function(a, b, style, life, easing) {
		if (b == null || b == undefined)
			this.same = true;
		else
			this.same = false;
		this.a = Proton.Util.setSpanValue(Proton.Util.initValue(a, "Velocity"));
		this.b = Proton.Util.setSpanValue(Proton.Util.initValue(b, 0));
		this.style = Proton.Util.initValue(style, 'to');
		if (life)
			Rotate._super_.prototype.reset.call(this, life, easing);
	}

	Rotate.prototype.initialize = function(particle) {
		particle.rotation = this.a.getValue();
		particle.transform.rotationA = this.a.getValue();
		if (!this.same)
			particle.transform.rotationB = this.b.getValue();
	};

	Rotate.prototype.applyBehaviour = function(particle, time, index) {
		Rotate._super_.prototype.applyBehaviour.call(this, particle, time, index);
		if (!this.same) {
			if (this.style == 'to' || this.style == 'TO' || this.style == '_') {
				particle.rotation += particle.transform.rotationB + (particle.transform.rotationA - particle.transform.rotationB) * this.energy
			} else {
				particle.rotation += particle.transform.rotationB;
			}
		} else if (this.a.a == "V" || this.a.a == "Velocity" || this.a.a == "v") {
			//beta...
			particle.rotation = particle.getDirection();
		}
	};

	Proton.Rotate = Rotate;



	function Color(color1, color2, life, easing) {
		Color._super_.call(this, life, easing);
		this.reset(color1, color2);
		this.name = "Color";
	}


	Proton.Util.inherits(Color, Proton.Behaviour);
	Color.prototype.reset = function(color1, color2, life, easing) {
		this.color1 = this.setSpanValue(color1);
		this.color2 = this.setSpanValue(color2);
		if (life)
			Color._super_.prototype.reset.call(this, life, easing);
	}

	Color.prototype.initialize = function(particle) {
		particle.color = this.color1.getValue();
		particle.transform.beginRGB = Proton.Util.hexToRGB(particle.color);

		if (this.color2)
			particle.transform.endRGB = Proton.Util.hexToRGB(this.color2.getValue());
	};

	Color.prototype.applyBehaviour = function(particle, time, index) {
		if (this.color2) {
			Color._super_.prototype.applyBehaviour.call(this, particle, time, index);
			particle.transform.rgb.r = particle.transform.endRGB.r + (particle.transform.beginRGB.r - particle.transform.endRGB.r) * this.energy;
			particle.transform.rgb.g = particle.transform.endRGB.g + (particle.transform.beginRGB.g - particle.transform.endRGB.g) * this.energy;
			particle.transform.rgb.b = particle.transform.endRGB.b + (particle.transform.beginRGB.b - particle.transform.endRGB.b) * this.energy;
			particle.transform.rgb.r = parseInt(particle.transform.rgb.r, 10);
			particle.transform.rgb.g = parseInt(particle.transform.rgb.g, 10);
			particle.transform.rgb.b = parseInt(particle.transform.rgb.b, 10);
		} else {
			particle.transform.rgb.r = particle.transform.beginRGB.r;
			particle.transform.rgb.g = particle.transform.beginRGB.g;
			particle.transform.rgb.b = particle.transform.beginRGB.b;

		}
	};

	Color.prototype.setSpanValue = function(color) {
		if (color) {
			if ( color instanceof Proton.ColorSpan) {
				return color;
			} else {
				return new Proton.ColorSpan(color);
			}
		} else {
			return null;
		}
	}

	Proton.Color = Color;



	function GravityWell(centerPoint, force, life, easing) {
		GravityWell._super_.call(this, life, easing);
		this.distanceVec = new Proton.Vector2D();
		this.centerPoint = Proton.Util.initValue(centerPoint, new Proton.Vector2D);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.name = "GravityWell";
	}


	Proton.Util.inherits(GravityWell, Proton.Behaviour);
	GravityWell.prototype.reset = function(centerPoint, force, life, easing) {
		this.distanceVec = new Proton.Vector2D();
		this.centerPoint = Proton.Util.initValue(centerPoint, new Proton.Vector2D);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		if (life)
			GravityWell._super_.prototype.reset.call(this, life, easing);
	};
	GravityWell.prototype.initialize = function(particle) {

	};

	GravityWell.prototype.applyBehaviour = function(particle, time, index) {
		this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
		var distanceSq = this.distanceVec.lengthSq();
		if (distanceSq != 0) {
			var distance = this.distanceVec.length();
			var factor = (this.force * time ) / (distanceSq * distance );
			particle.v.x += factor * this.distanceVec.x;
			particle.v.y += factor * this.distanceVec.y;
		}
	}

	Proton.GravityWell = GravityWell;



	Emitter.ID = 0;
	/**
	 * You can use this emit particles.
	 *
	 * It will dispatch follow events:
	 * Proton.PARTICLE_CREATED
	 * Proton.PARTICLE_UPDATA
	 * Proton.PARTICLE_DEAD
	 *
	 * @class Proton.Emitter
	 * @constructor
	 * @param {Object} pObj the parameters object;
	 * for example {damping:0.01,bindEmitter:false}
	 */
	function Emitter(pObj) {
		this.initializes = [];
		this.particles = [];
		this.behaviours = [];
		this.emitTime = 0;
		this.emitTotalTimes = -1;
		/**
		 * The friction coefficient for all particle emit by This;
		 * @property damping
		 * @type {Number}
		 * @default 0.006
		 */
		this.damping = .006;
		/**
		 * If bindEmitter the particles can bind this emitter's property;
		 * @property bindEmitter
		 * @type {Boolean}
		 * @default true
		 */
		this.bindEmitter = true;
		/**
		 * The number of particles per second emit (a [particle]/b [s]);
		 * @property rate
		 * @type {Proton.Rate}
		 * @default Proton.Rate(1, .1)
		 */
		this.rate = new Proton.Rate(1, .1);
		Emitter._super_.call(this, pObj);
		/**
		 * The emitter's id;
		 * @property id
		 * @type {String} id
		 */
		this.id = 'emitter_' + Emitter.ID++;
	};

	Proton.Util.inherits(Emitter, Proton.Particle);
	Proton.EventDispatcher.initialize(Emitter.prototype);
	/**
	 * start emit particle
	 * @method emit
	 * @param {Number} emitTime begin emit time;
	 * @param {String} life the life of this emitter
	 */
	Emitter.prototype.emit = function(emitTime, life) {
		this.emitTime = 0;
		this.emitTotalTimes = Proton.Util.initValue(emitTime, Infinity);

		if (life == true || life == 'life' || life == 'destroy') {
			if (emitTime == 'once')
				this.life = 1;
			else
				this.life = this.emitTotalTimes;

		} else if (!isNaN(life)) {
			this.life = life;
		}

		this.rate.init();
	};

	/**
	 * stop emiting
	 * @method stopEmit
	 */
	Emitter.prototype.stopEmit = function() {
		this.emitTotalTimes = -1;
		this.emitTime = 0;
	};

	/**
	 * remove current all particles
	 * @method removeAllParticles
	 */
	Emitter.prototype.removeAllParticles = function() {
		for (var i = 0; i < this.particles.length; i++)
			this.particles[i].dead = true;
	};
	/**
	 * create single particle;
	 * 
	 * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
	 * @method removeAllParticles
	 */
	Emitter.prototype.createParticle = function(initialize, behaviour) {
		var particle = Proton.pool.get();
		this.setupParticle(particle, initialize, behaviour);
		this.dispatchEvent(new Proton.Event({
			type : Proton.PARTICLE_CREATED,
			particle : particle
		}));
		return particle;
	};
	/**
	 * add initialize to this emitter
	 * @method addSelfInitialize
	 */
	Emitter.prototype.addSelfInitialize = function(pObj) {
		if (pObj['init']) {
			pObj.init(this);
		} else {
			this.initAll();
		}
	};
	/**
	 * add the Initialize to particles;
	 * 
	 * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
	 * @method addInitialize
	 * @param {Proton.Initialize} initialize like this new Proton.Radius(1, 12)
	 */
	Emitter.prototype.addInitialize = function() {
		var length = arguments.length, i;
		for ( i = 0; i < length; i++) {
			this.initializes.push(arguments[i]);
		}
	};
	/**
	 * remove the Initialize
	 * @method removeInitialize
	 * @param {Proton.Initialize} initialize a initialize
	 */
	Emitter.prototype.removeInitialize = function(initializer) {
		var index = this.initializes.indexOf(initializer);
		if (index > -1) {
			this.initializes.splice(index, 1);
		}
	};

	/**
	 * remove all Initializes
	 * @method removeInitializers
	 */
	Emitter.prototype.removeInitializers = function() {
		Proton.Util.destroyArray(this.initializes);
	};
	/**
	 * add the Behaviour to particles;
	 * 
	 * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
	 * @method addBehaviour
	 * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
	 */
	Emitter.prototype.addBehaviour = function() {
		var length = arguments.length, i;
		for ( i = 0; i < length; i++) {
			this.behaviours.push(arguments[i]);
			if (arguments[i].hasOwnProperty("parents"))
				arguments[i].parents.push(this);
		}
	};
	/**
	 * remove the Behaviour
	 * @method removeBehaviour
	 * @param {Proton.Behaviour} behaviour a behaviour
	 */
	Emitter.prototype.removeBehaviour = function(behaviour) {
		var index = this.behaviours.indexOf(behaviour);
		if (index > -1)
			this.behaviours.splice(index, 1);
	};
	/**
	 * remove all behaviours
	 * @method removeAllBehaviours
	 */
	Emitter.prototype.removeAllBehaviours = function() {
		Proton.Util.destroyArray(this.behaviours);
	};

	Emitter.prototype.integrate = function(time) {
		var damping = 1 - this.damping;
		Proton.integrator.integrate(this, time, damping);
		var length = this.particles.length, i;
		for ( i = 0; i < length; i++) {
			var particle = this.particles[i];
			particle.update(time, i);
			Proton.integrator.integrate(particle, time, damping);

			this.dispatchEvent(new Proton.Event({
				type : Proton.PARTICLE_UPDATE,
				particle : particle
			}));
		}
	};

	Emitter.prototype.emitting = function(time) {
		if (this.emitTotalTimes == 'once') {
			var length = this.rate.getValue(99999), i;
			for ( i = 0; i < length; i++) {
				this.createParticle();
			}

			this.emitTotalTimes = 'none';
		} else if (!isNaN(this.emitTotalTimes)) {
			this.emitTime += time;
			if (this.emitTime < this.emitTotalTimes) {
				var length = this.rate.getValue(time), i;
				for ( i = 0; i < length; i++) {
					this.createParticle();
				}
			}
		}
	}

	Emitter.prototype.update = function(time) {
		this.age += time;
		if (this.age >= this.life || this.dead) {
			this.destroy();
		}

		this.emitting(time);
		this.integrate(time);
		var particle;
		var length = this.particles.length, k;
		for ( k = length - 1; k >= 0; k--) {
			particle = this.particles[k];
			if (particle.dead) {
				Proton.pool.set(particle);
				this.particles.splice(k, 1);
				this.dispatchEvent(new Proton.Event({
					type : Proton.PARTICLE_DEAD,
					particle : particle
				}));
			}
		}
	};

	Emitter.prototype.setupParticle = function(particle, initialize, behaviour) {
		var initializes = this.initializes;
		var behaviours = this.behaviours;

		if (initialize) {
			if ( initialize instanceof Array)
				initializes = initialize;
			else
				initializes = [initialize];
		}

		if (behaviour) {
			if ( behaviour instanceof Array)
				behaviours = behaviour;
			else
				behaviours = [behaviour];
		}

		Proton.InitializeUtil.initialize(this, particle, initializes);
		particle.addBehaviours(behaviours);
		particle.parent = this;
		this.particles.push(particle);
	};

	/**
	 * Destory this Emitter
	 * @method destory
	 */
	Emitter.prototype.destroy = function() {
		this.dead = true;
		this.emitTotalTimes = -1;
		if (this.particles.length == 0) {
			this.removeInitializers();
			this.removeAllBehaviours();

			if (this.parent)
				this.parent.removeEmitter(this);
		}
	}

	Proton.Emitter = Emitter;



	/**
	 * The BehaviourEmitter class inherits from Proton.Emitter
	 *
	 * use the BehaviourEmitter you can add behaviours to self;
	 * @class Proton.BehaviourEmitter
	 * @constructor
	 * @param {Object} pObj the parameters object;
	 */
	function BehaviourEmitter(pObj) {
		this.selfBehaviours = [];
		BehaviourEmitter._super_.call(this, pObj);
	};

	Proton.Util.inherits(BehaviourEmitter, Proton.Emitter);
	/**
	 * add the Behaviour to emitter;
	 *
	 * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
	 * @method addSelfBehaviour
	 * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
	 */
	BehaviourEmitter.prototype.addSelfBehaviour = function() {
		var length = arguments.length, i;
		for ( i = 0; i < length; i++) {
			this.selfBehaviours.push(arguments[i]);
		}
	};
	/**
	 * remove the Behaviour for self
	 * @method removeSelfBehaviour
	 * @param {Proton.Behaviour} behaviour a behaviour
	 */
	BehaviourEmitter.prototype.removeSelfBehaviour = function(behaviour) {
		var index = this.selfBehaviours.indexOf(behaviour);
		if (index > -1)
			this.selfBehaviours.splice(index, 1);
	};

	BehaviourEmitter.prototype.update = function(time) {
		BehaviourEmitter._super_.prototype.update.call(this, time);

		if (!this.sleep) {
			var length = this.selfBehaviours.length, i;
			for ( i = 0; i < length; i++) {
				this.selfBehaviours[i].applyBehaviour(this, time, i)
			}
		}
	}

	Proton.BehaviourEmitter = BehaviourEmitter;



	/**
	 * The FollowEmitter class inherits from Proton.Emitter
	 *
	 * use the FollowEmitter will emit particle when mousemoving
	 *
	 * @class Proton.FollowEmitter
	 * @constructor
	 * @param {Element} mouseTarget mouseevent's target;
	 * @param {Number} ease the easing of following speed;
	 * @default 0.7
	 * @param {Object} pObj the parameters object;
	 */
	function FollowEmitter(mouseTarget, ease, pObj) {
		this.mouseTarget = Proton.Util.initValue(mouseTarget, window);
		this.ease = Proton.Util.initValue(ease, .7);
		this._allowEmitting = false;
		this.initEventHandler();
		FollowEmitter._super_.call(this, pObj);
	};

	Proton.Util.inherits(FollowEmitter, Proton.Emitter);
	FollowEmitter.prototype.initEventHandler = function() {
		var self = this;
		this.mousemoveHandler = function(e) {
			self.mousemove.call(self, e);
		};

		this.mousedownHandler = function(e) {
			self.mousedown.call(self, e);
		};

		this.mouseupHandler = function(e) {
			self.mouseup.call(self, e);
		};
		this.mouseTarget.addEventListener('mousemove', this.mousemoveHandler, false);
	}
	/**
	 * start emit particle
	 * @method emit
	 */
	FollowEmitter.prototype.emit = function() {
		this._allowEmitting = true;
	}
	/**
	 * stop emiting
	 * @method stopEmit
	 */
	FollowEmitter.prototype.stopEmit = function() {
		this._allowEmitting = false;
	}

	FollowEmitter.prototype.mousemove = function(e) {
		if (e.layerX || e.layerX == 0) {
			this.p.x += (e.layerX - this.p.x) * this.ease;
			this.p.y += (e.layerY - this.p.y) * this.ease;
		} else if (e.offsetX || e.offsetX == 0) {
			this.p.x += (e.offsetX - this.p.x) * this.ease;
			this.p.y += (e.offsetY - this.p.y) * this.ease;
		}
		if (this._allowEmitting)
			FollowEmitter._super_.prototype.emit.call(this, 'once');
	};
	/**
	 * Destory this Emitter
	 * @method destory
	 */
	FollowEmitter.prototype.destroy = function() {
		FollowEmitter._super_.prototype.destroy.call(this);
		this.mouseTarget.removeEventListener('mousemove', this.mousemoveHandler, false);
	}

	Proton.FollowEmitter = FollowEmitter;



	var ease = ease || {
		easeLinear : function(value) {
			return value;
		},

		easeInQuad : function(value) {
			return Math.pow(value, 2);
		},

		easeOutQuad : function(value) {
			return -(Math.pow((value - 1), 2) - 1);
		},

		easeInOutQuad : function(value) {
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(value, 2);
			return -0.5 * ((value -= 2) * value - 2);
		},

		easeInCubic : function(value) {
			return Math.pow(value, 3);
		},

		easeOutCubic : function(value) {
			return (Math.pow((value - 1), 3) + 1);
		},

		easeInOutCubic : function(value) {
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(value, 3);
			return 0.5 * (Math.pow((value - 2), 3) + 2);
		},

		easeInQuart : function(value) {
			return Math.pow(value, 4);
		},

		easeOutQuart : function(value) {
			return -(Math.pow((value - 1), 4) - 1);
		},

		easeInOutQuart : function(value) {
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(value, 4);
			return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
		},
	
		easeInSine : function(value) {
			return -Math.cos(value * (Math.PI / 2)) + 1;
		},

		easeOutSine : function(value) {
			return Math.sin(value * (Math.PI / 2));
		},

		easeInOutSine : function(value) {
			return (-0.5 * (Math.cos(Math.PI * value) - 1));
		},

		easeInExpo : function(value) {
			return (value === 0) ? 0 : Math.pow(2, 10 * (value - 1));
		},

		easeOutExpo : function(value) {
			return (value === 1) ? 1 : -Math.pow(2, -10 * value) + 1;
		},

		easeInOutExpo : function(value) {
			if (value === 0)
				return 0;
			if (value === 1)
				return 1;
			if ((value /= 0.5) < 1)
				return 0.5 * Math.pow(2, 10 * (value - 1));
			return 0.5 * (-Math.pow(2, -10 * --value) + 2);
		},

		easeInCirc : function(value) {
			return -(Math.sqrt(1 - (value * value)) - 1);
		},

		easeOutCirc : function(value) {
			return Math.sqrt(1 - Math.pow((value - 1), 2));
		},

		easeInOutCirc : function(value) {
			if ((value /= 0.5) < 1)
				return -0.5 * (Math.sqrt(1 - value * value) - 1);
			return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
		},
		
		easeInBack : function(value) {
			var s = 1.70158;
			return (value) * value * ((s + 1) * value - s);
		},

		easeOutBack : function(value) {
			var s = 1.70158;
			return ( value = value - 1) * value * ((s + 1) * value + s) + 1;
		},

		easeInOutBack : function(value) {
			var s = 1.70158;
			if ((value /= 0.5) < 1)
				return 0.5 * (value * value * (((s *= (1.525)) + 1) * value - s));
			return 0.5 * ((value -= 2) * value * (((s *= (1.525)) + 1) * value + s) + 2);
		},

		setEasingByName : function(name) {
			switch (name) {
				case 'easeLinear':
					return Proton.ease.easeLinear;
					break;

				case 'easeInQuad':
					return Proton.ease.easeInQuad;
					break;

				case 'easeOutQuad':
					return Proton.ease.easeOutQuad;
					break;

				case 'easeInOutQuad':
					return Proton.ease.easeInOutQuad;
					break;

				case 'easeInCubic':
					return Proton.ease.easeInCubic;
					break;

				case 'easeOutCubic':
					return Proton.ease.easeOutCubic;
					break;

				case 'easeInOutCubic':
					return Proton.ease.easeInOutCubic;
					break;

				case 'easeInQuart':
					return Proton.ease.easeInQuart;
					break;

				case 'easeOutQuart':
					return Proton.ease.easeOutQuart;
					break;

				case 'easeInOutQuart':
					return Proton.ease.easeInOutQuart;
					break;

				case 'easeInSine':
					return Proton.ease.easeInSine;
					break;

				case 'easeOutSine':
					return Proton.ease.easeOutSine;
					break;

				case 'easeInOutSine':
					return Proton.ease.easeInOutSine;
					break;

				case 'easeInExpo':
					return Proton.ease.easeInExpo;
					break;

				case 'easeOutExpo':
					return Proton.ease.easeOutExpo;
					break;

				case 'easeInOutExpo':
					return Proton.ease.easeInOutExpo;
					break;

				case 'easeInCirc':
					return Proton.ease.easeInCirc;
					break;

				case 'easeOutCirc':
					return Proton.ease.easeOutCirc;
					break;

				case 'easeInOutCirc':
					return Proton.ease.easeInOutCirc;
					break;

				case 'easeInBack':
					return Proton.ease.easeInBack;
					break;

				case 'easeOutBack':
					return Proton.ease.easeOutBack;
					break;

				case 'easeInOutBack':
					return Proton.ease.easeInOutBack;
					break;
				
				default:
					return Proton.ease.easeLinear;
					break;
			}
		}
	}

	Proton.ease = ease;
	Proton.easeLinear = 'easeLinear';

	Proton.easeInQuad = 'easeInQuad';
	Proton.easeOutQuad = 'easeOutQuad';
	Proton.easeInOutQuad = 'easeInOutQuad';

	Proton.easeInCubic = 'easeInCubic';
	Proton.easeOutCubic = 'easeOutCubic';
	Proton.easeInOutCubic = 'easeInOutCubic';

	Proton.easeInQuart = 'easeInQuart';
	Proton.easeOutQuart = 'easeOutQuart';
	Proton.easeInOutQuart = 'easeInOutQuart';

	Proton.easeInSine = 'easeInSine';
	Proton.easeOutSine = 'easeOutSine';
	Proton.easeInOutSine = 'easeInOutSine';

	Proton.easeInExpo = 'easeInExpo';
	Proton.easeOutExpo = 'easeOutExpo';
	Proton.easeInOutExpo = 'easeInOutExpo';

	Proton.easeInCirc = 'easeInCirc';
	Proton.easeOutCirc = 'easeOutCirc';
	Proton.easeInOutCirc = 'easeInOutCirc';

	Proton.easeInBack = 'easeInBack';
	Proton.easeOutBack = 'easeOutBack';
	Proton.easeInOutBack = 'easeInOutBack';
	


//the own renderer

	function Renderer(type, proton, element) {
		///element dom/div canvas/canvas easeljs/cantainer(or stage)
		this.element = element;
		this.type = Proton.Util.initValue(type, 'canvas');
		this.proton = proton;
		this.renderer = this.getRenderer();
	}


	Renderer.prototype = {
		start : function() {
			this.addEventHandler();
			this.renderer.start();
		},
		stop : function() {
			this.renderer.stop();
		},

		resize : function(width, height) {
			this.renderer.resize(width, height);
		},
		setStroke : function(color, thinkness) {
			if (this.renderer.hasOwnProperty('stroke'))
				this.renderer.setStroke(color, thinkness);
			else
				alert('Sorry this renderer do not suppest stroke method!');
		},
		createImageData : function(data) {
			if (this.renderer instanceof Proton.PixelRender)
				this.renderer.createImageData(data);
		},
		setMaxRadius : function(radius) {
			if (this.renderer instanceof Proton.WebGLRender)
				this.renderer.setMaxRadius(radius);
		},
		blendEquation : function(A) {
			if (this.renderer instanceof Proton.WebGLRender)
				this.renderer.blendEquation(A);
		},
		blendFunc : function(A, B) {
			if (this.renderer instanceof Proton.WebGLRender)
				this.renderer.blendFunc(A, B);
		},
		setType : function(type) {
			this.type = type;
			this.renderer = this.getRenderer();
		},
		getRenderer : function() {
			switch(this.type) {
				case 'dom':
					return new Proton.DomRender(this.proton, this.element);
					break;

				case 'canvas':
					return new Proton.CanvasRender(this.proton, this.element);
					break;

				case 'webgl':
					return new Proton.WebGLRender(this.proton, this.element);
					break;

				case 'easel':
					return new Proton.EaselRender(this.proton, this.element);
					break;

				case 'easeljs':
					return new Proton.EaselRender(this.proton, this.element);
					break;

				case 'pixel':
					return new Proton.PixelRender(this.proton, this.element);
					break;

				default:
					return new Proton.BaseRender(this.proton, this.element);
			}
		},
		render : function(callback) {
			this.renderer.render(callback);
		},
		addEventHandler : function() {
			if (this.onProtonUpdate)
				this.renderer.onProtonUpdate = this.onProtonUpdate;

			if (this.onParticleCreated)
				this.renderer.onParticleCreated = this.onParticleCreated;

			if (this.onParticleUpdate)
				this.renderer.onParticleUpdate = this.onParticleUpdate;

			if (this.onParticleDead)
				this.renderer.onParticleDead = this.onParticleDead;
		}
	}

	Proton.Renderer = Renderer;



	function BaseRender(proton, element, stroke) {
		this.proton = proton;
		this.element = element;
		this.stroke = stroke;
	}


	BaseRender.prototype = {
		start : function() {
			var self = this;
			this.proton.addEventListener(Proton.PROTON_UPDATE, function(e) {
				self.onProtonUpdate.call(self);
			});

			this.proton.addEventListener(Proton.PROTON_UPDATE_AFTER, function(e) {
				self.onProtonUpdateAfter.call(self);
			});

			this.proton.addEventListener(Proton.EMITTER_ADDED, function(e) {
				self.onEmitterAdded.call(self, e.emitter);
			});

			this.proton.addEventListener(Proton.EMITTER_REMOVED, function(e) {
				self.onEmitterRemoved.call(self, e.emitter);
			});

			var length = this.proton.emitters.length, i;
			for ( i = 0; i < length; i++) {
				var emitter = this.proton.emitters[i];
				this.addEmitterListener(emitter);
			}
		},

		resize : function(width, height) {
		},

		addEmitterListener : function(emitter) {
			var self = this;
			emitter.addEventListener(Proton.PARTICLE_CREATED, function(e) {
				self.onParticleCreated.call(self, e.particle);
			});
			emitter.addEventListener(Proton.PARTICLE_UPDATE, function(e) {
				self.onParticleUpdate.call(self, e.particle);
			});
			emitter.addEventListener(Proton.PARTICLE_DEAD, function(e) {
				self.onParticleDead.call(self, e.particle);
			});
		},

		stop : function() {
			var length = this.proton.emitters.length, i;
			this.proton.removeAllEventListeners();
			for ( i = 0; i < length; i++) {
				var emitter = this.proton.emitters[i];
				emitter.removeAllEventListeners();
			}
		},

		onEmitterAdded : function(emitter) {
			this.addEmitterListener(emitter);
		},

		onEmitterRemoved : function(emitter) {
			emitter.removeAllEventListeners();
		},

		onProtonUpdate : function() {

		},

		onProtonUpdateAfter : function() {

		},

		onParticleCreated : function(particle) {

		},

		onParticleUpdate : function(particle) {

		},

		onParticleDead : function(particle) {

		}
	}

	Proton.BaseRender = BaseRender;



	function DomRender(proton, element) {
		DomRender._super_.call(this, proton, element);
		this.stroke = null;
	}


	Proton.Util.inherits(DomRender, Proton.BaseRender);

	DomRender.prototype.start = function() {
		DomRender._super_.prototype.start.call(this);
	}

	DomRender.prototype.setStroke = function(color, thinkness) {
		color = Proton.Util.initValue(color, '#000000');
		thinkness = Proton.Util.initValue(thinkness, 1);
		this.stroke = {
			color : color,
			thinkness : thinkness
		};
	}

	DomRender.prototype.onProtonUpdate = function() {
	}

	DomRender.prototype.onParticleCreated = function(particle) {
		if (particle.target) {
			var self = this;
			Proton.Util.getImage(particle.target, particle, false, function(particle) {
				self.setImgInDIV.call(self, particle);
			});
		} else {
			particle.transform.canvas = Proton.DomUtil.createCanvas(particle.id + '_canvas', particle.radius + 1, particle.radius + 1, 'absolute');
			particle.transform.bakOldRadius = particle.radius;

			if (this.stroke) {
				particle.transform.canvas.width = 2 * particle.radius + this.stroke.thinkness * 2;
				particle.transform.canvas.height = 2 * particle.radius + this.stroke.thinkness * 2;
			} else {
				particle.transform.canvas.width = 2 * particle.radius + 1;
				particle.transform.canvas.height = 2 * particle.radius + 1;
			}

			particle.transform.context = particle.transform.canvas.getContext('2d');
			particle.transform.context.fillStyle = particle.color;
			particle.transform.context.beginPath();
			particle.transform.context.arc(particle.radius, particle.radius, particle.radius, 0, Math.PI * 2, true);

			if (this.stroke) {
				particle.transform.context.strokeStyle = this.stroke.color;
				particle.transform.context.lineWidth = this.stroke.thinkness;
				particle.transform.context.stroke();
			}

			particle.transform.context.closePath();
			particle.transform.context.fill();
			this.element.appendChild(particle.transform.canvas);
		}

	}

	DomRender.prototype.onParticleUpdate = function(particle) {
		if (particle.target) {
			if (particle.target instanceof Image) {
				particle.transform.canvas.style.opacity = particle.alpha;
				Proton.DomUtil.transformDom(particle.transform.canvas, particle.p.x - particle.target.width / 2, particle.p.y - particle.target.height / 2, particle.scale, particle.rotation);
			}
		} else {
			particle.transform.canvas.style.opacity = particle.alpha;
			if (particle.transform['oldRadius'])
				Proton.DomUtil.transformDom(particle.transform.canvas, particle.p.x - particle.transform.oldRadius, particle.p.y - particle.transform.oldRadius, particle.scale, particle.rotation);
			else
				Proton.DomUtil.transformDom(particle.transform.canvas, particle.p.x - particle.transform.bakOldRadius, particle.p.y - particle.transform.bakOldRadius, particle.scale, particle.rotation);
		}
	}

	DomRender.prototype.onParticleDead = function(particle) {
		if (particle.transform.canvas)
			this.element.removeChild(particle.transform.canvas);
	}

	DomRender.prototype.setImgInDIV = function(particle) {
		particle.transform.canvas = Proton.DomUtil.createCanvas(particle.id + '_canvas', particle.target.width + 1, particle.target.height + 1, 'absolute', particle.p.x - particle.radius, particle.p.y - particle.radius);
		particle.transform.context = particle.transform.canvas.getContext('2d');
		particle.transform.context.drawImage(particle.target, 0, 0, particle.target.width, particle.target.height);
		this.element.appendChild(particle.transform.canvas);
	}

	Proton.DomRender = DomRender;



	function EaselRender(proton, element, stroke) {
		EaselRender._super_.call(this, proton, element);
		this.stroke = stroke;
	}


	Proton.Util.inherits(EaselRender, Proton.BaseRender);
	EaselRender.prototype.resize = function(width, height) {

	}
	EaselRender.prototype.start = function() {
		EaselRender._super_.prototype.start.call(this);
	};

	EaselRender.prototype.onProtonUpdate = function() {

	}

	EaselRender.prototype.onParticleCreated = function(particle) {
		if (particle.target) {
			particle.target = particle.target.clone();
			if (!particle.target.parent) {
				if (!!particle.target['image']) {
					particle.target.regX = particle.target.image.width / 2;
					particle.target.regY = particle.target.image.height / 2;
				}
				this.element.addChild(particle.target);
			}
		} else {
			var graphics = new createjs.Graphics();
			if (this.stroke) {
				if (this.stroke == true) {
					graphics.beginStroke('#000000');
				} else if (this.stroke instanceof String) {
					graphics.beginStroke(this.stroke);
				}
			}

			graphics.beginFill(particle.color).drawCircle(0, 0, particle.radius);
			var shape = new createjs.Shape(graphics);
			particle.target = shape;
			this.element.addChild(particle.target);
		}
	}

	EaselRender.prototype.onParticleUpdate = function(particle) {
		if (particle.target) {
			particle.target.x = particle.p.x;
			particle.target.y = particle.p.y;
			particle.target.alpha = particle.alpha;
			particle.target.scaleX = particle.target.scaleY = particle.scale;
			particle.target.rotation = particle.rotation;
		}
	}

	EaselRender.prototype.onParticleDead = function(particle) {
		if (particle.target) {
			if (particle.target.parent)
				particle.target.parent.removeChild(particle.target);
		}
	}

	Proton.EaselRender = EaselRender;



	function CanvasRender(proton, element) {
		CanvasRender._super_.call(this, proton, element);
		this.stroke = null;
		this.context = this.element.getContext("2d");
		this.bufferCache = {};
	}


	Proton.Util.inherits(CanvasRender, Proton.BaseRender);
	CanvasRender.prototype.resize = function(width, height) {
		this.element.width = width;
		this.element.height = height;
	}
	CanvasRender.prototype.start = function() {
		CanvasRender._super_.prototype.start.call(this);
	}

	CanvasRender.prototype.setStroke = function(color, thinkness) {
		color = Proton.Util.initValue(color, '#000000');
		thinkness = Proton.Util.initValue(thinkness, 1);
		this.stroke = {
			color : color,
			thinkness : thinkness
		};
	}

	CanvasRender.prototype.onProtonUpdate = function() {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
	}

	CanvasRender.prototype.onParticleCreated = function(particle) {
		if (particle.target)
			Proton.Util.getImage(particle.target, particle, false);
		else
			particle.color = particle.color ? particle.color : '#ff0000';
	}

	CanvasRender.prototype.onParticleUpdate = function(particle) {
		if (particle.target) {
			if (particle.target instanceof Image) {
				var w = particle.target.width * particle.scale | 0;
				var h = particle.target.height * particle.scale | 0;
				var x = particle.p.x - w / 2;
				var y = particle.p.y - h / 2;

				if (!!particle.color) {
					if (!particle.transform["buffer"])
						particle.transform.buffer = this.getBuffer(particle.target);
					var bufferContext = particle.transform.buffer.getContext('2d');
					bufferContext.clearRect(0, 0, particle.transform.buffer.width, particle.transform.buffer.height);
					bufferContext.globalAlpha = particle.alpha;
					bufferContext.drawImage(particle.target, 0, 0);
					bufferContext.globalCompositeOperation = "source-atop";
					bufferContext.fillStyle = Proton.Util.rgbToHex(particle.transform.rgb);
					bufferContext.fillRect(0, 0, particle.transform.buffer.width, particle.transform.buffer.height);
					bufferContext.globalCompositeOperation = "source-over";
					bufferContext.globalAlpha = 1;
					this.context.drawImage(particle.transform.buffer, 0, 0, particle.transform.buffer.width, particle.transform.buffer.height, x, y, w, h);
				} else {
					this.context.save();
					this.context.globalAlpha = particle.alpha;
					this.context.translate(particle.p.x, particle.p.y);
					this.context.rotate(Proton.MathUtils.degreeTransform(particle.rotation));
					this.context.translate(-particle.p.x, -particle.p.y);
					this.context.drawImage(particle.target, 0, 0, particle.target.width, particle.target.height, x, y, w, h);
					this.context.globalAlpha = 1;
					this.context.restore();
				}
			}
		} else {
			if (particle.transform["rgb"])
				this.context.fillStyle = 'rgba(' + particle.transform.rgb.r + ',' + particle.transform.rgb.g + ',' + particle.transform.rgb.b + ',' + particle.alpha + ')';
			else
				this.context.fillStyle = particle.color;
			this.context.beginPath();
			this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);
			if (this.stroke) {
				this.context.strokeStyle = this.stroke.color;
				this.context.lineWidth = this.stroke.thinkness;
				this.context.stroke();
			}

			this.context.closePath();
			this.context.fill();
		}
	}

	CanvasRender.prototype.onParticleDead = function(particle) {

	}

	CanvasRender.prototype.getBuffer = function(image) {
		if ( image instanceof Image) {
			var size = image.width + '_' + image.height;
			var canvas = this.bufferCache[size];
			if (!canvas) {
				canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				this.bufferCache[size] = canvas;
			}
			return canvas;
		}
	}

	Proton.CanvasRender = CanvasRender;



	function PixelRender(proton, element, rectangle) {
		PixelRender._super_.call(this, proton, element);
		this.context = this.element.getContext('2d');
		this.imageData = null;
		this.rectangle = null;
		this.rectangle = rectangle;
		this.createImageData(rectangle);
	}


	Proton.Util.inherits(PixelRender, Proton.BaseRender);
	PixelRender.prototype.resize = function(width, height) {
		this.element.width = width;
		this.element.height = height;
	}
	PixelRender.prototype.createImageData = function(rectangle) {
		if (!rectangle)
			this.rectangle = new Proton.Rectangle(0, 0, this.element.width, this.element.height);
		else
			this.rectangle = rectangle;
		this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height);
		this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
	}

	PixelRender.prototype.start = function() {
		PixelRender._super_.prototype.start.call(this);
	};

	PixelRender.prototype.onProtonUpdate = function() {
		this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
		this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
	}

	PixelRender.prototype.onProtonUpdateAfter = function() {
		this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
	}

	PixelRender.prototype.onParticleCreated = function(particle) {

	}

	PixelRender.prototype.onParticleUpdate = function(particle) {
		if (this.imageData) {
			this.setPixel(this.imageData, Math.floor(particle.p.x - this.rectangle.x), Math.floor(particle.p.y - this.rectangle.y), particle);
		}
	}

	PixelRender.prototype.setPixel = function(imagedata, x, y, particle) {
		var rgb = particle.transform.rgb;
		if ((x < 0) || (x > this.element.width) || (y < 0) || (y > this.elementwidth))
			return;

		var i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;

		imagedata.data[i] = rgb.r;
		imagedata.data[i + 1] = rgb.g;
		imagedata.data[i + 2] = rgb.b;
		imagedata.data[i + 3] = particle.alpha * 255;
	}

	PixelRender.prototype.onParticleDead = function(particle) {

	}

	Proton.PixelRender = PixelRender;



	function WebGLRender(proton, element) {
		WebGLRender._super_.call(this, proton, element);
		this.gl = this.element.getContext('experimental-webgl', {
			antialias : true,
			stencil : false,
			depth : false
		});
		if (!this.gl)
			alert("Sorry your browser do not suppest WebGL!");
		this.initVar();
		this.setMaxRadius();
		this.initShaders();
		this.initBuffers();
		this.gl.blendEquation(this.gl.FUNC_ADD);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);
	}


	Proton.Util.inherits(WebGLRender, Proton.BaseRender);
	WebGLRender.prototype.resize = function(width, height) {
		this.umat[4] = -2;
		this.umat[7] = 1;
		this.smat[0] = 1 / width;
		this.smat[4] = 1 / height;
		this.mstack.set(this.umat, 0);
		this.mstack.set(this.smat, 1);
		this.gl.viewport(0, 0, width, height);
		this.element.width = width;
		this.element.height = height;
	}

	WebGLRender.prototype.setMaxRadius = function(radius) {
		this.circleCanvasURL = this.createCircle(radius);
	}

	WebGLRender.prototype.getVertexShader = function() {
		var vsSource = ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n");
		return vsSource;
	}

	WebGLRender.prototype.getFragmentShader = function() {
		var fsSource = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n");
		return fsSource;
	}

	WebGLRender.prototype.initVar = function() {
		this.mstack = new Proton.MStack();
		this.umat = Proton.Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
		this.smat = Proton.Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
		this.texturebuffers = {};
	}

	WebGLRender.prototype.start = function() {
		WebGLRender._super_.prototype.start.call(this);
		this.resize(this.element.width, this.element.height);
	}

	WebGLRender.prototype.blendEquation = function(A) {
		this.gl.blendEquation(this.gl[A]);
	}

	WebGLRender.prototype.blendFunc = function(A, B) {
		this.gl.blendFunc(this.gl[A], this.gl[B]);
	}

	WebGLRender.prototype.getShader = function(gl, str, fs) {
		var shader;
		if (fs)
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		else
			shader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(shader, str);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}

	WebGLRender.prototype.initShaders = function() {
		var fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
		var vertexShader = this.getShader(this.gl, this.getVertexShader(), false);

		this.sprogram = this.gl.createProgram();
		this.gl.attachShader(this.sprogram, vertexShader);
		this.gl.attachShader(this.sprogram, fragmentShader);
		this.gl.linkProgram(this.sprogram);
		if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS))
			alert("Could not initialise shaders");

		this.gl.useProgram(this.sprogram);
		this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition");
		this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord");
		this.gl.enableVertexAttribArray(this.sprogram.tca);
		this.gl.enableVertexAttribArray(this.sprogram.vpa);

		this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat");
		this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler");
		this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture");
		this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor");
		this.gl.uniform1i(this.sprogram.useTex, 1);
	};

	WebGLRender.prototype.initBuffers = function() {
		this.unitIBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
		var vs = [0, 3, 1, 0, 2, 3];
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);

		var ids = [];
		for (var i = 0; i < 100; i++)
			ids.push(i);

		idx = new Uint16Array(ids);
		this.unitI33 = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);

		ids = [];
		for ( i = 0; i < 100; i++)
			ids.push(i, i + 1, i + 2);

		idx = new Uint16Array(ids);
		this.stripBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
	};

	WebGLRender.prototype.createCircle = function(raidus) {
		this.circleCanvasRadius = Proton.WebGLUtil.nhpot(Proton.Util.initValue(raidus, 32));
		var canvas = Proton.DomUtil.createCanvas('circle_canvas', this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
		var context = canvas.getContext('2d');
		context.beginPath();
		context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
		context.closePath();
		context.fillStyle = '#FFF';
		context.fill();
		return canvas.toDataURL();
	};

	WebGLRender.prototype.setImgInCanvas = function(particle) {
		var _w = particle.target.width;
		var _h = particle.target.height;
		var _width = Proton.WebGLUtil.nhpot(particle.target.width);
		var _height = Proton.WebGLUtil.nhpot(particle.target.height);
		var _scaleX = particle.target.width / _width;
		var _scaleY = particle.target.height / _height;

		if (!this.texturebuffers[particle.transform.src])
			this.texturebuffers[particle.transform.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];
		particle.transform.texture = this.texturebuffers[particle.transform.src][0];
		particle.transform.vcBuffer = this.texturebuffers[particle.transform.src][1];
		particle.transform.tcBuffer = this.texturebuffers[particle.transform.src][2];
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.tcBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.vcBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);

		var context = particle.transform.canvas.getContext('2d');
		var data = context.getImageData(0, 0, _width, _height);

		this.gl.bindTexture(this.gl.TEXTURE_2D, particle.transform.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
		particle.transform.textureLoaded = true;
		particle.transform.textureWidth = _w;
		particle.transform.textureHeight = _h;
	}

	WebGLRender.prototype.setStroke = function(color, thinkness) {

	}

	WebGLRender.prototype.onProtonUpdate = function() {
		//this.gl.clearColor(0, 0, 0, 1);
		//this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	WebGLRender.prototype.onParticleCreated = function(particle) {
		var self = this;
		particle.transform.textureLoaded = false;
		particle.transform.tmat = Proton.Mat3.create();
		particle.transform.tmat[8] = 1;
		particle.transform.imat = Proton.Mat3.create();
		particle.transform.imat[8] = 1;
		if (particle.target) {
			Proton.Util.getImage(particle.target, particle, true, function(particle) {
				self.setImgInCanvas.call(self, particle);
				particle.transform.oldScale = 1;
			});
		} else {
			Proton.Util.getImage(this.circleCanvasURL, particle, true, function(particle) {
				self.setImgInCanvas.call(self, particle);
				particle.transform.oldScale = particle.radius / self.circleCanvasRadius;
			});
		}
	}

	WebGLRender.prototype.onParticleUpdate = function(particle) {
		if (particle.transform.textureLoaded) {
			this.updateMatrix(particle);
			this.gl.uniform3f(this.sprogram.color, particle.transform.rgb.r / 255, particle.transform.rgb.g / 255, particle.transform.rgb.b / 255);
			this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.vcBuffer);
			this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.tcBuffer);
			this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, particle.transform.texture);
			this.gl.uniform1i(this.sprogram.samplerUniform, 0);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
			this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
			this.mstack.pop();
		}
	}

	WebGLRender.prototype.onParticleDead = function(particle) {
		
	}

	WebGLRender.prototype.updateMatrix = function(particle) {
		var moveOriginMatrix = Proton.WebGLUtil.makeTranslation(-particle.transform.textureWidth / 2, -particle.transform.textureHeight / 2);
		var translationMatrix = Proton.WebGLUtil.makeTranslation(particle.p.x, particle.p.y);
		var angel = particle.rotation * (Math.PI / 180);
		var rotationMatrix = Proton.WebGLUtil.makeRotation(angel);
		var scale = particle.scale * particle.transform.oldScale;
		var scaleMatrix = Proton.WebGLUtil.makeScale(scale, scale);

		var matrix = Proton.WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);
		matrix = Proton.WebGLUtil.matrixMultiply(matrix, rotationMatrix);
		matrix = Proton.WebGLUtil.matrixMultiply(matrix, translationMatrix);

		Proton.Mat3.inverse(matrix, particle.transform.imat);
		matrix[2] = particle.alpha;
		this.mstack.push(matrix);
	}

	Proton.WebGLRender = WebGLRender;



	function Zone() {
		this.vector = new Proton.Vector2D(0, 0);
		this.random = 0;
		this.crossType = "dead";
		this.alert = true;
	}


	Zone.prototype = {
		getPosition : function() {

		},

		crossing : function(particle) {

		}
	};

	Proton.Zone = Zone;



	function LineZone(x1, y1, x2, y2, direction) {
		LineZone._super_.call(this);
		if (x2 - x1 >= 0) {
			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;
		} else {
			this.x1 = x2;
			this.y1 = y2;
			this.x2 = x1;
			this.y2 = y1;
		}
		this.dx = this.x2 - this.x1;
		this.dy = this.y2 - this.y1;
		this.minx = Math.min(this.x1, this.x2);
		this.miny = Math.min(this.y1, this.y2);
		this.maxx = Math.max(this.x1, this.x2);
		this.maxy = Math.max(this.y1, this.y2);
		this.dot = this.x2 * this.y1 - this.x1 * this.y2;
		this.xxyy = this.dx * this.dx + this.dy * this.dy;
		this.gradient = this.getGradient();
		this.length = this.getLength();
		this.direction = Proton.Util.initValue(direction, '>');
	}


	Proton.Util.inherits(LineZone, Proton.Zone);
	LineZone.prototype.getPosition = function() {
		this.random = Math.random();
		this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
		this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
		return this.vector;
	}

	LineZone.prototype.getDirection = function(x, y) {
		var A = this.dy;
		var B = -this.dx;
		var C = this.dot;
		var D = B == 0 ? 1 : B;
		if ((A * x + B * y + C) * D > 0)
			return true
		else
			return false;
	}

	LineZone.prototype.getDistance = function(x, y) {
		var A = this.dy;
		var B = -this.dx;
		var C = this.dot;
		var D = (A * x + B * y + C);
		return D / Math.sqrt(this.xxyy);
	}

	LineZone.prototype.getSymmetric = function(v) {
		var tha2 = v.getGradient();
		var tha1 = this.getGradient();
		var tha = 2 * (tha1 - tha2);
		var oldx = v.x;
		var oldy = v.y;
		v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
		v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
		return v;
	}

	LineZone.prototype.getGradient = function() {
		return Math.atan2(this.dy, this.dx);
	}

	LineZone.prototype.getRange = function(particle, fun) {
		var angle = Math.abs(this.getGradient());
		if (angle <= Math.PI / 4) {
			if (particle.p.x < this.maxx && particle.p.x > this.minx) {
				fun();
			}
		} else {
			if (particle.p.y < this.maxy && particle.p.y > this.miny) {
				fun();
			}
		}
	}

	LineZone.prototype.getLength = function() {
		return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
	}

	LineZone.prototype.crossing = function(particle) {
		var self = this;
		if (this.crossType == "dead") {
			if (this.direction == ">" || this.direction == "R" || this.direction == "right" || this.direction == "down") {
				this.getRange(particle, function() {
					if (self.getDirection(particle.p.x, particle.p.y))
						particle.dead = true;
				})
			} else {
				this.getRange(particle, function() {
					if (!self.getDirection(particle.p.x, particle.p.y))
						particle.dead = true;
				})
			}
		} else if (this.crossType == "bound") {
			this.getRange(particle, function() {
				if (self.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
					if (self.dx == 0) {
						particle.v.x *= -1;
					} else if (self.dy == 0) {
						particle.v.y *= -1;
					} else {
						self.getSymmetric(particle.v);
					}
				}
			});
		} else if (this.crossType == "cross") {
			if (this.alert) {
				alert('Sorry lineZone does not support cross method');
				this.alert = false;
			}
		}
	}

	Proton.LineZone = LineZone;



	function CircleZone(x, y, radius) {
		CircleZone._super_.call(this);
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.angle = 0;
		this.center = {
			x : this.x,
			y : this.y
		};
	}


	Proton.Util.inherits(CircleZone, Proton.Zone);
	CircleZone.prototype.getPosition = function() {
		this.random = Math.random();
		this.angle = Math.PI * 2 * Math.random();
		this.vector.x = this.x + this.random * this.radius * Math.cos(this.angle);
		this.vector.y = this.y + this.random * this.radius * Math.sin(this.angle);
		return this.vector;
	}

	CircleZone.prototype.setCenter = function(x, y) {
		this.center.x = x;
		this.center.y = y;
	}

	CircleZone.prototype.crossing = function(particle) {
		var d = particle.p.distanceTo(this.center);
		if (this.crossType == "dead") {
			if (d - particle.radius > this.radius)
				particle.dead = true;
		} else if (this.crossType == "bound") {
			if (d + particle.radius >= this.radius)
				this.getSymmetric(particle);
		} else if (this.crossType == "cross") {
			if (this.alert) {
				alert('Sorry CircleZone does not support cross method');
				this.alert = false;
			}
		}
	}

	CircleZone.prototype.getSymmetric = function(particle) {
		var tha2 = particle.v.getGradient();
		var tha1 = this.getGradient(particle);
		var tha = 2 * (tha1 - tha2);
		var oldx = particle.v.x;
		var oldy = particle.v.y;
		particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
		particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
	}

	CircleZone.prototype.getGradient = function(particle) {
		return -Math.PI / 2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
	}

	Proton.CircleZone = CircleZone;



	function PointZone(x, y) {
		PointZone._super_.call(this);
		this.x = x;
		this.y = y;
	}


	Proton.Util.inherits(PointZone, Proton.Zone);
	PointZone.prototype.getPosition = function() {
		this.vector.x = this.x;
		this.vector.y = this.y;
		return this.vector;
	}

	PointZone.prototype.crossing = function(particle) {
		if (this.alert) {
			alert('Sorry PointZone does not support crossing method');
			this.alert = false;
		}
	}

	Proton.PointZone = PointZone;



	function RectZone(x, y, width, height) {
		RectZone._super_.call(this);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}


	Proton.Util.inherits(RectZone, Proton.Zone);
	RectZone.prototype.getPosition = function() {
		this.vector.x = this.x + Math.random() * this.width;
		this.vector.y = this.y + Math.random() * this.height;
		return this.vector;
	}

	RectZone.prototype.crossing = function(particle) {
		if (this.crossType == "dead") {
			if (particle.p.x + particle.radius < this.x)
				particle.dead = true;
			else if (particle.p.x - particle.radius > this.x + this.width)
				particle.dead = true;

			if (particle.p.y + particle.radius < this.y)
				particle.dead = true;
			else if (particle.p.y - particle.radius > this.y + this.height)
				particle.dead = true;
		} else if (this.crossType == "bound") {
			if (particle.p.x - particle.radius < this.x) {
				particle.p.x = this.x + particle.radius;
				particle.v.x *= -1;
			} else if (particle.p.x + particle.radius > this.x + this.width) {
				particle.p.x = this.x + this.width - particle.radius;
				particle.v.x *= -1;
			}
			
			if (particle.p.y - particle.radius < this.y) {
				particle.p.y = this.y + particle.radius;
				particle.v.y *= -1;
			} else if (particle.p.y + particle.radius > this.y + this.height) {
				particle.p.y = this.y + this.height - particle.radius;
				particle.v.y *= -1;
			}
		} else if (this.crossType == "cross") {
			if (particle.p.x + particle.radius < this.x && particle.v.x <= 0)
				particle.p.x = this.x + this.width + particle.radius;
			else if (particle.p.x - particle.radius > this.x + this.width && particle.v.x >= 0)
				particle.p.x = this.x - particle.radius;

			if (particle.p.y + particle.radius < this.y && particle.v.y <= 0)
				particle.p.y = this.y + this.height + particle.radius;
			else if (particle.p.y - particle.radius > this.y + this.height && particle.v.y >= 0)
				particle.p.y = this.y - particle.radius;
		}
	}

	Proton.RectZone = RectZone;



	function ImageZone(imageData, x, y, d) {
		ImageZone._super_.call(this);
		this.reset(imageData, x, y, d);
	}


	Proton.Util.inherits(ImageZone, Proton.Zone);
	ImageZone.prototype.reset = function(imageData, x, y, d) {
		this.imageData = imageData;
		this.x = Proton.Util.initValue(x, 0);
		this.y = Proton.Util.initValue(y, 0);
		this.d = Proton.Util.initValue(d, 2);
		this.vectors = [];
		this.setVectors();
	}

	ImageZone.prototype.setVectors = function() {
		var i, j;
		var length1 = this.imageData.width;
		var length2 = this.imageData.height;
		for ( i = 0; i < length1; i += this.d) {
			for ( j = 0; j < length2; j += this.d) {
				var index = ((j >> 0) * length1 + (i >> 0)) * 4;
				if (this.imageData.data[index + 3] > 0) {
					this.vectors.push({
						x : i + this.x,
						y : j + this.y
					});
				}
			}
		}
		return this.vector;
	}

	ImageZone.prototype.getBound = function(x, y) {
		var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
		if (this.imageData.data[index + 3] > 0)
			return true;
		else
			return false;
	}

	ImageZone.prototype.getPosition = function() {
		return this.vector.copy(this.vectors[Math.floor(Math.random() * this.vectors.length)]);
	}

	ImageZone.prototype.getColor = function(x, y) {
		x -= this.x;
		y -= this.y;
		var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
		return {
			r : this.imageData.data[i],
			g : this.imageData.data[i + 1],
			b : this.imageData.data[i + 2],
			a : this.imageData.data[i + 3]
		};
	}

	ImageZone.prototype.crossing = function(particle) {
		if (this.crossType == "dead") {
			if (this.getBound(particle.p.x - this.x, particle.p.y - this.y))
				particle.dead = true;
			else
				particle.dead = false;
		} else if (this.crossType == "bound") {
			if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y))
				particle.v.negate();
		}
	}

	Proton.ImageZone = ImageZone;


/**
 * You can use this emit particles.
 *
 * This method will console.log the fixed number of your info  in updata or requestAnimationFrame
 * 
 * use like this Proton.log('+12',mc); log 12 times
 *
 * @class Proton.log
 * @constructor
 * @param {*} logInfo;
 */

	var log = function() {
		if (window.console && window.console.log) {
			var arg = arguments;
			if ( typeof arguments[0] == 'string') {
				if (arguments[0].indexOf('+') == 0) {
					var n = parseInt(arguments[0]);
					if (log.once < n) {
						delete arg[0];
						console.log(arg);
						log.once++;
					}
				} else {
					console.log(arg);
				}
			} else {
				console.log(arg);
			}
		}
	}

	log.once = 0;
	Proton.log = log;



	var Debug = Debug || {
		addEventListener : function(proton, fun) {
			proton.addEventListener(Proton.PROTON_UPDATE, function(e) {
				fun();
			});
		},

		setStyle : function(c) {
			var color = c || '#ff0000';
			var rgb = Proton.Util.hexToRGB(color);
			var style = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + 0.5 + ')';
			return style;
		},

		drawZone : function(proton, canvas, zone, clear) {
			var context = canvas.getContext('2d');
			var style = this.setStyle();
			this.addEventListener(proton, function() {
				if (clear)
					context.clearRect(0, 0, canvas.width, canvas.height);

				if ( zone instanceof Proton.PointZone) {
					context.beginPath();
					context.fillStyle = style;
					context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
					context.fill();
					context.closePath();
				} else if ( zone instanceof Proton.LineZone) {
					context.beginPath();
					context.strokeStyle = style;
					context.moveTo(zone.x1, zone.y1);
					context.lineTo(zone.x2, zone.y2);
					context.stroke();
					context.closePath();
				} else if ( zone instanceof Proton.RectZone) {
					context.beginPath();
					context.strokeStyle = style;
					context.drawRect(zone.x, zone.y, zone.width, zone.height);
					context.stroke();
					context.closePath();
				} else if ( zone instanceof Proton.CircleZone) {
					context.beginPath();
					context.strokeStyle = style;
					context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
					context.stroke();
					context.closePath();
				}
			});
		},

		drawEmitter : function(proton, canvas, emitter, clear) {
			var context = canvas.getContext('2d');
			var style = this.setStyle();
			this.addEventListener(proton, function() {
				if (clear)
					context.clearRect(0, 0, canvas.width, canvas.height);

				context.beginPath();
				context.fillStyle = style;
				context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
				context.fill();
				context.closePath();
			});
		},

		test : {},

		setTest : function(id, value) {
			this.test[id] = value;
		},

		getTest : function(id) {
			if (this.test.hasOwnProperty(id))
				return this.test[id];
			else
				return false;
		}
	}

	Proton.Debug = Debug;


})(window);
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
( function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}()); 