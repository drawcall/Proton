(function ( Proton, undefined ) {

	function PixiRender ( proton, element, stroke ) {
		PixiRender._super_.call( this, proton, element );
		this.stroke = stroke;
	}

	Proton.Util.inherits( PixiRender, Proton.BaseRender );

	PixiRender.prototype.PI_180 = Math.PI / 180;

	PixiRender.prototype.resize = function ( width, height ) {

	};

	PixiRender.prototype.start = function () {
		PixiRender._super_.prototype.start.call( this );
	};

	PixiRender.prototype.onProtonUpdate = function () {

	};

	/**
	 * @param particle
	 */
	PixiRender.prototype.onParticleCreated = function ( particle ) {
		if ( particle.target ) {
			particle.target = new PIXI.Sprite( particle.target );
			particle.target.anchor.x = 0.5;
			particle.target.anchor.y = 0.5;
			this.element.addChild( particle.target );
		} else {
			var graphics = new PIXI.Graphics();
			if ( this.stroke ) {
				if ( this.stroke == true ) {
					graphics.beginStroke( '#000000' );
				} else if ( this.stroke instanceof String ) {
					graphics.beginStroke( this.stroke );
				}
			}
			graphics.beginFill( particle.color );
			graphics.drawCircle( 0, 0, particle.radius );
			particle.target = graphics;
			this.element.addChild( particle.target );
		}
	};

	/**
	 * @param particle
	 */
	PixiRender.prototype.onParticleUpdate = function ( particle ) {
		if ( particle.target ) {
			particle.target.position.x = particle.p.x;
			particle.target.position.y = particle.p.y;
			particle.target.alpha = particle.alpha;
			particle.target.scale.x = particle.scale;
			particle.target.scale.y = particle.scale;
			// using cached version of Math.PI / 180 for slight performance increase.
			particle.target.rotation = particle.rotation * this.PI_180;// Math.PI / 180;
		}
	};

	/**
	 * @param particle
	 */
	PixiRender.prototype.onParticleDead = function ( particle ) {
		if ( particle.target ) {
			this.element.removeChild( particle.target );
		}
	};

	Proton.PixiRender = PixiRender;
})( Proton );
