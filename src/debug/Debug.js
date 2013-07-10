(function(Proton, undefined) {
	var Debug = Debug || {
		addEventListener : function(proton, fun) {
			proton.addEventListener(Proton.PROTON_UPDATE, function(e) {
				fun();
			});
		},

		setStyle : function(c) {
			var color = c || '#ff0000';
			var rgb = Proton.Util.hexToRGB(color);
			var style = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + 0.5 + ')';
			return style;
		},

		drawZone : function(proton, canvas, zone, clear) {
			var context = canvas.getContext('2d');
			var style = this.setStyle();
			this.addEventListener(proton, function() {
				if (clear)
					context.clearRect(0, 0, canvas.width, canvas.height);

				if ( zone instanceof Proton.PointZone) {
					context.beginPath();
					context.fillStyle = style;
					context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
					context.fill();
					context.closePath();
				} else if ( zone instanceof Proton.LineZone) {
					context.beginPath();
					context.strokeStyle = style;
					context.moveTo(zone.x1, zone.y1);
					context.lineTo(zone.x2, zone.y2);
					context.stroke();
					context.closePath();
				} else if ( zone instanceof Proton.RectZone) {
					context.beginPath();
					context.strokeStyle = style;
					context.drawRect(zone.x, zone.y, zone.width, zone.height);
					context.stroke();
					context.closePath();
				} else if ( zone instanceof Proton.CircleZone) {
					context.beginPath();
					context.strokeStyle = style;
					context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
					context.stroke();
					context.closePath();
				}
			});
		},

		drawEmitter : function(proton, canvas, emitter, clear) {
			var context = canvas.getContext('2d');
			var style = this.setStyle();
			this.addEventListener(proton, function() {
				if (clear)
					context.clearRect(0, 0, canvas.width, canvas.height);

				context.beginPath();
				context.fillStyle = style;
				context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
				context.fill();
				context.closePath();
			});
		},

		test : {},

		setTest : function(id, value) {
			this.test[id] = value;
		},

		getTest : function(id) {
			if (this.test.hasOwnProperty(id))
				return this.test[id];
			else
				return false;
		}
	}

	Proton.Debug = Debug;
})(Proton);
