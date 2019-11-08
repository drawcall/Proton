var Squirrel = function(props) {
	Squirrel.superClass.constructor.call(this, props);
	this.init();
};
Q.inherit(Squirrel, Q.DisplayObjectContainer);

Squirrel.prototype.init = function() {
	//松鼠的头部，是一个MovieClip类型。
	this.head = new Q.MovieClip({
		id : "head",
		image : Q.getDOM("headIdle"),
		useFrames : true,
		interval : 2,
		x : 5,
		y : 0
	});
	this.head.addFrame([{
		rect : [0, 0, 66, 56]
	}, {
		rect : [69, 0, 66, 56]
	}, {
		rect : [138, 0, 66, 56]
	}, {
		rect : [207, 0, 66, 56]
	}]);

	//松鼠的身体，也是一个MovieClip类型。
	this.body = new Q.MovieClip({
		id : "body",
		image : Q.getDOM('bodyWalk'),
		useFrames : true,
		interval : 2,
		x : 0,
		y : 25
	});
	this.body.addFrame([{
		rect : [0, 0, 108, 66]
	}, {
		rect : [109, 0, 108, 66]
	}, {
		rect : [218, 0, 108, 66]
	}, {
		rect : [327, 0, 108, 66]
	}, {
		rect : [436, 0, 108, 66]
	}, {
		rect : [545, 0, 108, 66]
	}, {
		rect : [0, 70, 108, 66]
	}, {
		rect : [109, 70, 108, 66]
	}, {
		rect : [218, 70, 108, 66]
	}, {
		rect : [327, 70, 108, 66]
	}, {
		rect : [436, 70, 108, 66]
	}]);

	//由头部和身体组成了一只松鼠。
	this.addChild(this.body, this.head);

	//初始化数据。
	this.eventChildren = false;
	this.jumping = false;
	this.speedY = this.currentSpeedY = 8;
	this.originY = this.y;
};

//控制松鼠的跳跃
Squirrel.prototype.jump = function(e) {
	if (!this.jumping) {
		this.jumping = true;
		this.currentSpeedY = this.speedY;
	}
};

//松鼠的更新函数，此方法会不断的被quark系统调用而产生跳跃动画。
Squirrel.prototype.update = function() {
	if (this.jumping) {
		this.currentSpeedY -= 0.3;
		this.y -= this.currentSpeedY;
		if (this.originY <= this.y) {
			this.y = this.originY;
			this.jumping = false;
		}
	}
}; 