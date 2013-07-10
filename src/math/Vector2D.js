//@author mrdoob / http://mrdoob.com/
(function(Proton, undefined) {
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
})(Proton);
