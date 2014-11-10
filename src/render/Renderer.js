//the own renderer
(function(Proton, undefined) {
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
				case 'pixi':
					return new Proton.PixiRender(this.proton, this.element);
					break;

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
})(Proton);
