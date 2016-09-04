(function(Proton, undefined) {
	Behaviour.id = 0;

	/**
	 * The Behaviour class is the base for the other Behaviour
	 *
	 * @namespace
	 * @memberof! Proton#
	 * @constructor
	 * @alias Proton.Behaviour
	 *
	 * @param {Number} life 	the behaviours life
	 * @param {String} easing 	The behaviour's decaying trend, for example Proton.easeOutQuart
	 *
	 * @property {String}  id 		The behaviours id
	 * @property {Number}  life 	The behaviours life
	 * @property {String}  easing 	The behaviour's decaying trend, for example Proton.easeOutQuart
	 * @property {Number}  age=0 	How long the particle should be 'alife'
	 * @property {Number}  energy=1
	 * @property {Boolean} dead=false The particle is dead at first
	 * @property {Array}   parents 	The behaviour's parents array
	 * @property {String}  name 	The behaviour name
	 */
	function Behaviour(life, easing) {
		this.id = 'Behaviour_' + Behaviour.id++;
		this.life = Proton.Util.initValue(life, Infinity);
		this.easing = Proton.ease.setEasingByName(easing);
		this.age = 0;
		this.energy = 1;
		this.dead = false;
		this.parents = [];
		this.name = 'Behaviour';
	}


	Behaviour.prototype = {
		/**
		 * Reset this behaviour's parameters
		 *
		 * @method reset
		 * @memberof Proton#Proton.Behaviour
		 * @instance
		 *
		 * @param {Number} this behaviour's life
		 * @param {String} this behaviour's easing
		 */
		reset : function(life, easing) {
			this.life = Proton.Util.initValue(life, Infinity);
			this.easing = Proton.Util.initValue(easing, Proton.ease.setEasingByName(Proton.easeLinear));
		},
		/**
		 * Normalize a force by 1:100;
		 *
		 * @method normalizeForce
		 * @memberof Proton#Proton.Behaviour
		 * @instance
		 *
		 * @param {Proton.Vector2D} force 
		 */
		normalizeForce : function(force) {
			return force.multiplyScalar(Proton.MEASURE);
		},

		/**
		 * Normalize a value by 1:100;
		 *
		 * @method normalizeValue
		 * @memberof Proton#Proton.Behaviour
		 * @instance
		 *
		 * @param {Number} value
		 */
		normalizeValue : function(value) {
			return value * Proton.MEASURE;
		},

		/**
		 * Initialize the behaviour's parameters for all particles
		 *
		 * @method initialize
		 * @memberof Proton#Proton.Behaviour
		 * @instance
		 *
		 * @param {Proton.Particle} particle
		 */
		initialize : function(particle) {
		},
		
		/**
		 * Apply this behaviour for all particles every time
		 *
		 * @method applyBehaviour
		 * @memberof Proton#Proton.Behaviour
		 * @instance
		 *
		 * @param {Proton.Particle} particle
		 * @param {Number} the integrate time 1/ms
		 * @param {Int} the particle index
		 */
		applyBehaviour : function(particle, time, index) {
			this.age += time;
			if (this.age >= this.life || this.dead) {
				this.energy = 0;
				this.dead = true;
				this.destroy();
			} else {
				var scale = this.easing(particle.age / particle.life);
				this.energy = Math.max(1 - scale, 0);
			}
		},
		
		/**
		 * Destory this behaviour
		 *
		 * @method destroy
		 * @memberof Proton#Proton.Behaviour
		 * @instance
		 */
		destroy : function() {
			var index;
			var length = this.parents.length, i;
			for ( i = 0; i < length; i++) {
				this.parents[i].removeBehaviour(this);
			}

			this.parents = [];
		}
	};

	Proton.Behaviour = Behaviour;
})(Proton);
