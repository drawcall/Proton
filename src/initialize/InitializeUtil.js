(function(Proton, undefined) {
	var InitializeUtil = {

		initialize : function(emitter, particle, initializes) {
			var length = initializes.length, i;
			for ( i = 0; i < length; i++) {
				if (initializes[i] instanceof Proton.Initialize)
					initializes[i].init(emitter, particle);
				else
					Proton.InitializeUtil.init(emitter, particle, initializes[i]);
			}

			Proton.InitializeUtil.bindEmitter(emitter, particle);
		},
		
		//////////////////////init//////////////////////
		init : function(emitter, particle, initialize) {
			Proton.Util.setPrototypeByObject(particle, initialize);
			Proton.Util.setVector2DByObject(particle, initialize);
		},

		bindEmitter : function(emitter, particle) {
			if (emitter.bindEmitter) {
				particle.p.add(emitter.p);
				particle.v.add(emitter.v);
				particle.a.add(emitter.a);
				particle.v.rotate(Proton.MathUtils.degreeTransform(emitter.rotation));
			}
		}
		//////////////////////init//////////////////////
	}

	Proton.InitializeUtil = InitializeUtil;
})(Proton);
