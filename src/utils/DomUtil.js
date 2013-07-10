(function(Proton, undefined) {
	var DomUtil = DomUtil || {
		createCanvas : function($id, $width, $height, $position) {
			var element = document.createElement("canvas");
			var position = $position ? $position : 'absolute';
			element.id = $id;
			element.width = $width;
			element.height = $height;
			element.style.position = position;
			return element;
		},

		transformDom : function($div, $x, $y, $scale, $rotate) {
			$div.style.WebkitTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.MozTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.OTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.msTransform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
			$div.style.transform = 'translate(' + $x + 'px, ' + $y + 'px) ' + 'scale(' + $scale + ') ' + 'rotate(' + $rotate + 'deg)';
		}
	}

	Proton.DomUtil = DomUtil;
})(Proton);
