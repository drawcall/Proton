(function(Proton, undefined) {
	function BaseRender(proton, element, stroke) {
		this.proton = proton;
		this.element = element;
		this.stroke = stroke;
	}


	BaseRender.prototype = {
		start : function() {
			var self = this;
			this.proton.addEventListener(Proton.PROTON_UPDATE, function(e) {
				self.onProtonUpdate.call(self);
			});

			this.proton.addEventListener(Proton.PROTON_UPDATE_AFTER, function(e) {
				self.onProtonUpdateAfter.call(self);
			});

			this.proton.addEventListener(Proton.EMITTER_ADDED, function(e) {
				self.onEmitterAdded.call(self, e.emitter);
			});

			this.proton.addEventListener(Proton.EMITTER_REMOVED, function(e) {
				self.onEmitterRemoved.call(self, e.emitter);
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
			emitter.addEventListener(Proton.PARTICLE_CREATED, function(e) {
				self.onParticleCreated.call(self, e.particle);
			});
			emitter.addEventListener(Proton.PARTICLE_UPDATE, function(e) {
				self.onParticleUpdate.call(self, e.particle);
			});
			emitter.addEventListener(Proton.PARTICLE_DEAD, function(e) {
				self.onParticleDead.call(self, e.particle);
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
