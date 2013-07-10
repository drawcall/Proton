(function(Proton, undefined) {
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
})(Proton);
