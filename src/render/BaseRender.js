(function(Proton, undefined) {
	function BaseRender(proton, element, stroke) {
		this.proton = proton;
		this.element = element;
		this.stroke = stroke;
		this.pool = new Proton.Pool();
	}


	BaseRender.prototype = {
		start : function() {
			var self = this;
			this.proton.addEventListener(Proton.PROTON_UPDATE, function() {
				self.onProtonUpdate.call(self);
			});

			this.proton.addEventListener(Proton.PROTON_UPDATE_AFTER, function() {
				self.onProtonUpdateAfter.call(self);
			});

			this.proton.addEventListener(Proton.EMITTER_ADDED, function(emitter) {
				self.onEmitterAdded.call(self, emitter);
			});

			this.proton.addEventListener(Proton.EMITTER_REMOVED, function(emitter) {
				self.onEmitterRemoved.call(self, emitter);
			});

			var length = this.proton.emitters.length, i;
			for ( i = 0; i < length; i++) {
				var emitter = this.proton.emitters[i];
				this.addEmitterListener(emitter);
			}
		},

		resize : function(width, height) {
		},

		addEmitterListener : function(emitter) {
			var self = this;
			emitter.addEventListener(Proton.PARTICLE_CREATED, function(particle) {
				self.onParticleCreated.call(self, particle);
			});
			emitter.addEventListener(Proton.PARTICLE_UPDATE, function(particle) {
				self.onParticleUpdate.call(self, particle);
			});
			emitter.addEventListener(Proton.PARTICLE_DEAD, function(particle) {
				self.onParticleDead.call(self, particle);
			});
		},

		stop : function() {
			var length = this.proton.emitters.length, i;
			this.proton.removeAllEventListeners();
			for ( i = 0; i < length; i++) {
				var emitter = this.proton.emitters[i];
				emitter.removeAllEventListeners();
			}
		},

		onEmitterAdded : function(emitter) {
			this.addEmitterListener(emitter);
		},

		onEmitterRemoved : function(emitter) {
			emitter.removeAllEventListeners();
		},

		onProtonUpdate : function() {

		},

		onProtonUpdateAfter : function() {

		},

		onParticleCreated : function(particle) {

		},

		onParticleUpdate : function(particle) {

		},

		onParticleDead : function(particle) {

		}
	}

	Proton.BaseRender = BaseRender;
})(Proton);
