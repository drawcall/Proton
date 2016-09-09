(function(Proton, undefined) {
	/**
	 * This behaviour let the particles follow one specific Proton.Vector2D
	 *
	 * @memberof! Proton#
	 * @augments Proton.Behaviour
	 * @constructor
	 * @alias Proton.Attraction
	 *
	 * @todo add description for 'force' and 'radius'
	 *
	 * @param {Proton.Vector2D} targetPosition the attraction point coordinates
	 * @param {Number} [force=100]
	 * @param {Number} [radius=1000]
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 *
	 * @property {Proton.Vector2D} targetPosition
	 * @property {Number} radius
	 * @property {Number} force
	 * @property {Number} radiusSq
	 * @property {Proton.Vector2D} attractionForce
	 * @property {Number} lengthSq
	 * @property {String} name The Behaviour name
	 */
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

	/**
	 * Reset this behaviour's parameters
	 *
	 * @method reset
	 * @memberof Proton#Proton.Attraction
	 * @instance
	 *
	 * @todo add description for 'force' and 'radius'
	 *
	 * @param {Proton.Vector2D} targetPosition the attraction point coordinates
	 * @param {Number} [force=100]
	 * @param {Number} [radius=1000]
	 * @param {Number} [life=Infinity] 				this behaviour's life
	 * @param {String} [easing=Proton.easeLinear] 	this behaviour's easing
	 */
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

	/**
	 * Apply this behaviour for all particles every time
	 *
	 * @memberof Proton#Proton.Attraction
	 * @method applyBehaviour
	 * @instance
	 *
	 * @param {Proton.Particle} particle
	 * @param {Number} 			time the integrate time 1/ms
	 * @param {Int} 			index the particle index
	 */
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
})(Proton);

