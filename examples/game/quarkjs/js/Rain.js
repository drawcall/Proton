var Rain = function(props) {
	Rain.superClass.constructor.call(this, props);
	this.init();
};

Q.inherit(Rain, Q.DisplayObjectContainer);
Rain.prototype.init = function() {
	var bmp1 = new Quark.Bitmap({
		image : Q.getDOM("rain"),
		
	});
	bmp1.rotation = 0;
	bmp1.x = 0;
	bmp1.y = 0;
	bmp1.enabled = true;
	this.addChild(bmp1);
};
