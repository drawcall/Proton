(function(Proton, undefined) {
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
})(Proton);
