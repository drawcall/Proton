$(function() {
	var proton;
	var renderer;
	var fighterEmitter, bombEmitter;

	//init Crafty with FPS of 50 and create the canvas element
	Crafty.init();
	Crafty.canvas.init();

	//preload the needed assets
	var assets = ["images/bg.png", "images/meteorolite.png", "images/bomb.png", "images/fighter.png", "images/fire.png"];
	Crafty.load(assets, function() {
		Crafty.sprite("images/fighter.png", {
			fighter : [0, 0, 100, 153]
		});

		Crafty.sprite("images/meteorolite.png", {
			meteorolite : [0, 0, 100, 77]
		});

		Crafty.sprite("images/fire.png", {
			fire : [0, 0, 10, 10]
		});

		Crafty.sprite("images/bomb.png", {
			bomb : [0, 0, 20, 15]
		});

		//start the main scene when loaded
		Crafty.scene("main");
	});

	Crafty.scene("main", function() {
		Crafty.background("url('images/bg.png')");

		//player entity
		var player = Crafty.e("2D, Canvas, fighter, Controls, Collision").attr({
			move : {
				left : false,
				right : false,
				up : false,
				down : false
			},
			xspeed : 0,
			yspeed : 0,
			decay : 0.9,
			x : Crafty.viewport.width / 2,
			y : Crafty.viewport.height / 2
		}).origin("center").bind("KeyDown", function(e) {
			//on keydown, set the move booleans
			if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
				this.move.right = true;
			} else if (e.keyCode === Crafty.keys.LEFT_ARROW) {
				this.move.left = true;
			} else if (e.keyCode === Crafty.keys.UP_ARROW) {
				this.move.up = true;
			} else if (e.keyCode === Crafty.keys.SPACE) {
				//create a bullet entity
				var R = 70;
				var angle = player.rotation * Math.PI / 180;
				var px = this._x + this._w / 2 + R * Math.sin(angle);
				var py = this._y + this._h / 2 - R * Math.cos(angle);
				Crafty.e("2D, DOM, Color, bullet").attr({
					x : px,
					y : py,
					w : 4,
					h : 13,
					rotation : this._rotation,
					xspeed : 20 * Math.sin(this._rotation / 57.3),
					yspeed : 20 * Math.cos(this._rotation / 57.3)
				}).color("rgb(255, 0, 0)").bind("EnterFrame", function() {
					this.x += this.xspeed;
					this.y -= this.yspeed;

					//destroy if it goes out of bounds
					if (this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
						this.destroy();
					}
				});
			}
		}).bind("KeyUp", function(e) {
			//on key up, set the move booleans to false
			if (e.keyCode === Crafty.keys.RIGHT_ARROW) {
				this.move.right = false;
			} else if (e.keyCode === Crafty.keys.LEFT_ARROW) {
				this.move.left = false;
			} else if (e.keyCode === Crafty.keys.UP_ARROW) {
				this.move.up = false;
			}
		}).bind("EnterFrame", function() {
			if (this.move.right)
				this.rotation += 5;
			if (this.move.left)
				this.rotation -= 5;

			//acceleration and movement vector
			var vx = Math.sin(this._rotation * Math.PI / 180) * 0.3, vy = Math.cos(this._rotation * Math.PI / 180) * 0.3;

			//if the move up is true, increment the y/xspeeds
			if (this.move.up) {
				this.yspeed -= vy;
				this.xspeed += vx;
			} else {
				//if released, slow down the ship
				this.xspeed *= this.decay;
				this.yspeed *= this.decay;
			}

			//move the ship by the x and y speeds or movement vector
			this.x += this.xspeed;
			this.y += this.yspeed;

			//if ship goes out of bounds, put him back
			if (this._x > Crafty.viewport.width) {
				this.x = -64;
			}
			if (this._x < -64) {
				this.x = Crafty.viewport.width;
			}
			if (this._y > Crafty.viewport.height) {
				this.y = -64;
			}
			if (this._y < -64) {
				this.y = Crafty.viewport.height;
			}

			//if all asteroids are gone, start again with more
			if (asteroidCount <= 0) {
				initRocks(lastCount, lastCount * 2);
			}
		}).collision().onHit("asteroid", function() {
			//if player gets hit, restart the game
		});

		//keep a count of asteroids
		var asteroidCount, lastCount;

		//Asteroid component
		Crafty.c("asteroid", {
			init : function() {
				this.origin("center");
				this.attr({
					x : Crafty.math.randomInt(0, Crafty.viewport.width), //give it random positions, rotation and speed
					y : Crafty.math.randomInt(0, Crafty.viewport.height),
					xspeed : Crafty.math.randomInt(1, 5),
					yspeed : Crafty.math.randomInt(1, 5),
					rspeed : Crafty.math.randomInt(-5, 5)
				}).bind("EnterFrame", function() {
					this.x += this.xspeed;
					this.y += this.yspeed;
					this.rotation += this.rspeed;

					if (this._x > Crafty.viewport.width) {
						this.x = -64;
					}
					if (this._x < -64) {
						this.x = Crafty.viewport.width;
					}
					if (this._y > Crafty.viewport.height) {
						this.y = -64;
					}
					if (this._y < -64) {
						this.y = Crafty.viewport.height;
					}
				}).collision().onHit("bullet", function(e) {
					e[0].obj.destroy();
					//destroy the bullet
					bombEmitter.p.x = e[0].obj.x;
					bombEmitter.p.y = e[0].obj.y;
					bombEmitter.emit('once');
					var oldxspeed = this.xspeed;
					this.xspeed = -this.yspeed;
					this.yspeed = oldxspeed;
					asteroidCount++;
				});

			}
		});

		function createFighterEmitter() {
			if (!proton)
				proton = new Proton;
			fighterEmitter = new Proton.Emitter();
			fighterEmitter.rate = new Proton.Rate(new Proton.Span(6, 8), new Proton.Span(.05, .1));
			fighterEmitter.addInitialize(new Proton.Mass(1));
			fighterEmitter.addInitialize(new Proton.ImageTarget('fire'));
			fighterEmitter.addInitialize(new Proton.Life(.8));
			fighterEmitter.addInitialize(new Proton.Velocity(new Proton.Span(1, 2), new Proton.Span(180, 10, true), 'polar'));
			fighterEmitter.addBehaviour(new Proton.Alpha(1, 0));
			fighterEmitter.addBehaviour(new Proton.Scale(1, 0));
			proton.addEmitter(fighterEmitter);
			fighterEmitter.emit();
		}

		function createBombEmitter() {
			if (!proton)
				proton = new Proton;
			bombEmitter = new Proton.Emitter();
			bombEmitter.rate = new Proton.Rate(new Proton.Span(14, 16), new Proton.Span(.05, .1));
			bombEmitter.addInitialize(new Proton.Mass(1));
			bombEmitter.addInitialize(new Proton.ImageTarget('bomb'));
			bombEmitter.addInitialize(new Proton.Life(.8));
			bombEmitter.addInitialize(new Proton.Velocity(new Proton.Span(1, 2), new Proton.Span(0, 360), 'polar'));
			bombEmitter.addBehaviour(new Proton.Alpha(1, 0));
			bombEmitter.addBehaviour(new Proton.Scale(Proton.getSpan(1, 2), 0));
			proton.addEmitter(bombEmitter);
		}

		function createRenderer() {
			renderer = new Proton.Renderer('other', proton);

			renderer.onParticleCreated = function(particle) {
				var p = Crafty.e("2D, Canvas," + particle.target.src);
				particle.sprite = p;
			};

			renderer.onParticleUpdate = function(particle) {
				particle.sprite.attr({
					x : particle.p.x,
					y : particle.p.y,
					alpha : particle.alpha,
					w : particle.scale * 10,
					h : particle.scale * 10
				});
			};

			renderer.onParticleDead = function(particle) {
				particle.sprite.destroy();
			};
			renderer.start();
		}

		//function to fill the screen with asteroids by a random amount
		function initRocks(lower, upper) {
			var rocks = Crafty.math.randomInt(lower, upper);
			asteroidCount = rocks;
			lastCount = rocks;

			for (var i = 0; i < rocks; i++) {
				Crafty.e("2D, DOM, meteorolite, Collision, asteroid");
			}
		}

		//first level has between 1 and 10 asteroids
		var R = 80;
		initRocks(1, 4);
		createFighterEmitter();
		createBombEmitter();
		createRenderer();
		setInterval(function() {
			proton.update();
			var angle = player.rotation * Math.PI / 180;
			fighterEmitter.p.x = player._x + player.w / 2 + R * Math.sin(-angle) - 5;
			fighterEmitter.p.y = player._y + player.h / 2 + R * Math.cos(-angle);
			fighterEmitter.rotation = -player.rotation;
		}, 1000 / 50);
	});
});
