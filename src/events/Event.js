(function(Proton, undefined) {
	function Event(pObj) {
		this.type = pObj['type'];
		this.particle = pObj['particle'];
		this.emitter = pObj['emitter'];
	}


	Event.PARTICLE_CREATED = Proton.PARTICLE_CREATED;
	Event.PARTICLE_UPDATA = Proton.PARTICLE_UPDATA;
	Event.PARTICLE_SLEEP = Proton.PARTICLE_SLEEP;
	Event.PARTICLE_DEAD = Proton.PARTICLE_DEAD;

	Proton.Event = Event;
})(Proton);
