(function(Proton, undefined) {

	function ParticlePool(num, releaseTime) {
		this.proParticleCount = Proton.Util.initValue(num, 0);
		this.releaseTime = Proton.Util.initValue(releaseTime, -1);
		this.poolList = [];
		this.timeoutID = 0;
		for (var i = 0; i < this.proParticleCount; i++) {
			this.add();
		}
		//////////////////////////////
		if (this.releaseTime > 0)
			this.timeoutID = setTimeout(this.release, this.releaseTime / 1000);
	}


	ParticlePool.prototype = {
		create : function(newTypeParticleClass) {
			if (newTypeParticleClass)
				return new newTypeParticle;
			else
				return new Proton.Particle;
		},
		getCount : function() {
			return this.poolList.length;
		},
		add : function() {
			return this.poolList.push(this.create());
		},
		get : function() {
			if (this.poolList.length === 0) {
				return this.create();
			} else {
				return this.poolList.pop().reset();
			}

		},
		set : function(particle) {
			if (this.poolList.length < Proton.POOL_MAX)
				return this.poolList.push(particle);
		},
		release : function() {
			for (var i = 0; i < this.poolList.length; i++) {
				if (this.poolList[i]['destory'])
					this.poolList[i].destory();
				delete this.poolList[i];
			}
			this.poolList = [];
		}
	}

	Proton.ParticlePool = ParticlePool;

})(Proton);
