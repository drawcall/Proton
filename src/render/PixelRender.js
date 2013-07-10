(function(Proton, undefined) {
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
})(Proton);
