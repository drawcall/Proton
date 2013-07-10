//数值积分
(function(Proton, undefined) {
	var NumericalIntegration = function(type) {
		this.type = Proton.Util.initValue(type, Proton.EULER);
	}

	NumericalIntegration.prototype = {
		integrate : function(particles, time, damping) {
			this.eulerIntegrate(particles, time, damping);
		},

		eulerIntegrate : function(particle, time, damping) {
			if (!particle.sleep) {
				particle.old.p.copy(particle.p);
				particle.old.v.copy(particle.v);
				particle.a.multiplyScalar(1 / particle.mass);
				particle.v.add(particle.a.multiplyScalar(time));
				particle.p.add(particle.old.v.multiplyScalar(time));
				if (damping)
					particle.v.multiplyScalar(damping);
				particle.a.clear();
			}
		}
	}

	Proton.NumericalIntegration = NumericalIntegration;
})(Proton);
