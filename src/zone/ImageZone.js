(function(Proton, undefined) {
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
})(Proton);
