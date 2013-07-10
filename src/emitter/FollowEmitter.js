(function(Proton, undefined) {
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
})(Proton);
