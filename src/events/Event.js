(function(Proton, undefined) {
	function Event(pObj) {
		this.type = 'null';
		this.particle = null;
		this.emitter = null;
		this.particles = [];
		Proton.Util.setPrototypeByObject(this, pObj);
	}
	
	Event.PARTICLE_CREATED = Proton.PARTICLE_CREATED;
	Event.PARTICLE_UPDATA = Proton.PARTICLE_UPDATA;
	Event.PARTICLE_SLEEP = Proton.PARTICLE_SLEEP;
	Event.PARTICLE_DEAD = Proton.PARTICLE_DEAD;

	Proton.Event = Event;
})(Proton);
