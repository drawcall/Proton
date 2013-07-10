(function(Proton, undefined) {
	/**
	 * The BehaviourEmitter class inherits from Proton.Emitter
	 *
	 * use the BehaviourEmitter you can add behaviours to self;
	 * @class Proton.BehaviourEmitter
	 * @constructor
	 * @param {Object} pObj the parameters object;
	 */
	function BehaviourEmitter(pObj) {
		this.selfBehaviours = [];
		BehaviourEmitter._super_.call(this, pObj);
	};

	Proton.Util.inherits(BehaviourEmitter, Proton.Emitter);
	/**
	 * add the Behaviour to emitter;
	 *
	 * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
	 * @method addSelfBehaviour
	 * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
	 */
	BehaviourEmitter.prototype.addSelfBehaviour = function() {
		var length = arguments.length, i;
		for ( i = 0; i < length; i++) {
			this.selfBehaviours.push(arguments[i]);
		}
	};
	/**
	 * remove the Behaviour for self
	 * @method removeSelfBehaviour
	 * @param {Proton.Behaviour} behaviour a behaviour
	 */
	BehaviourEmitter.prototype.removeSelfBehaviour = function(behaviour) {
		var index = this.selfBehaviours.indexOf(behaviour);
		if (index > -1)
			this.selfBehaviours.splice(index, 1);
	};

	BehaviourEmitter.prototype.update = function(time) {
		BehaviourEmitter._super_.prototype.update.call(this, time);

		if (!this.sleep) {
			var length = this.selfBehaviours.length, i;
			for ( i = 0; i < length; i++) {
				this.selfBehaviours[i].applyBehaviour(this, time, i)
			}
		}
	}

	Proton.BehaviourEmitter = BehaviourEmitter;
})(Proton);
