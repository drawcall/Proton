(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.GravityWell
	 *
	 * @param {Proton.Vector2D} [centerPoint=new Proton.Vector2D] The point in the center
	 * @param {Number} [force=100]					The force	
	 * @param {Number} [life=Infinity]				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear]	this behaviour's easing
	 *
	 * @property {String} name The Behaviour name
	 */
	function GravityWell(centerPoint, force, life, easing) {
		GravityWell._super_.call(this, life, easing);
		this.distanceVec = new Proton.Vector2D();
		this.centerPoint = Proton.Util.initValue(centerPoint, new Proton.Vector2D);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		this.name = "GravityWell";
	}

	Proton.Util.inherits(GravityWell, Proton.Behaviour);

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.GravityWell
	 * @instance
	 *
	 * @param {Proton.Vector2D} [centerPoint=new Proton.Vector2D] The point in the center
	 * @param {Number} [force=100]					The force	
	 * @param {Number} [life=Infinity]				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear]	this behaviour's easing
	 */
	GravityWell.prototype.reset = function(centerPoint, force, life, easing) {
		this.distanceVec = new Proton.Vector2D();
		this.centerPoint = Proton.Util.initValue(centerPoint, new Proton.Vector2D);
		this.force = Proton.Util.initValue(this.normalizeValue(force), 100);
		if (life)
			GravityWell._super_.prototype.reset.call(this, life, easing);
	};

	/**
	 * @inheritdoc
	 */
	GravityWell.prototype.initialize = function(particle) {

	};

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @method applyBehaviour
	 * @memberof Proton#Proton.GravityWell
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} the integrate time 1/ms
	 * @param {Int} the particle index
	 */
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
})(Proton);
