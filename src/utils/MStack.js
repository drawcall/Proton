(function(Proton, undefined) {
	function MStack() {
		this.mats = [];
		this.size = 0;
		for (var i = 0; i < 20; i++)
			this.mats.push(Proton.Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
	}


	MStack.prototype.set = function(m, i) {
		if (i == 0)
			Proton.Mat3.set(m, this.mats[0]);
		else
			Proton.Mat3.multiply(this.mats[i - 1], m, this.mats[i]);
		this.size = Math.max(this.size, i + 1);
	}

	MStack.prototype.push = function(m) {
		if (this.size == 0)
			Proton.Mat3.set(m, this.mats[0]);
		else
			Proton.Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);
		this.size++;
	}

	MStack.prototype.pop = function() {
		if (this.size > 0)
			this.size--;
	}

	MStack.prototype.top = function() {
		return (this.mats[this.size - 1]);
	}

	Proton.MStack = MStack;
})(Proton);
