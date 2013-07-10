(function(Proton, undefined) {
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
})(Proton);
