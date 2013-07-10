(function(Proton, undefined) {
	var CanvasUtil = CanvasUtil || {
		blur : function(src, dst, w, h) {
			var c;
			var r, g, b;
			for (var y = 1; y < h - 1; y++) {
				for (var x = 1; x < w - 1; x++) {
					r = 0;
					g = 0;
					b = 0;

					for (var yb = -1; yb <= 1; yb++) {
						for (var xb = -1; xb <= 1; xb++) {
							c = src[(x + xb) + (y - yb) * w];
							r += (c >> 16) & 0xFF;
							g += (c >> 8) & 0xFF;
							b += (c) & 0xFF;
						}
					}

					r /= 9;
					g /= 9;
					b /= 9;
					dst[x + y * w] = 0xff000000 | (r << 16) | (g << 8) | b;
				}
			}
		},

		scaleBrightness : function(src, dst, w, h, s) {

			var r, g, b;
			var c;
			var a;
			var as = s;

			s = 1.0;
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {

					c = src[x + y * w];
					a = Math.floor(as * ((c >> 24) & 0xFF));
					r = Math.floor(s * ((c >> 16) & 0xFF));
					g = Math.floor(s * ((c >> 8) & 0xFF));
					b = Math.floor(s * ((c) & 0xFF));
					dst[x + y * w] = (a << 24) | (r << 16) | (g << 8) | b;

				}
			}
		}
	}

	Proton.CanvasUtil = CanvasUtil;
})(Proton);
