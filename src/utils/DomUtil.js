(function(Proton, undefined) {

	/**
     * @namespace
     * @memberof! Proton#
     * @alias Proton.DomUtil
     */
	var DomUtil = DomUtil || {

		/**
         * Creates and returns a new canvas. The opacity is by default set to 0
         *
         * @memberof Proton#Proton.DomUtil
         * @method createCanvas
         *
         * @param {String} $id the canvas' id
         * @param {Number} $width the canvas' width
         * @param {Number} $height the canvas' height
         * @param {String} [$position=absolute] the canvas' position, default is 'absolute' 
         *
         * @return {Object}
         */
		createCanvas : function($id, $width, $height, $position) {
			var element = document.createElement("canvas");
			var position = $position ? $position : 'absolute';
			element.id = $id;
			element.width = $width;
			element.height = $height;
			element.style.position = position;
			element.style.opacity = 0;
			this.transformDom(element, -500, -500, 0, 0);
			return element;
		},

		/**
         * Adds a transform: translate(), scale(), rotate() to a given div element for all browsers
         *
         * @memberof Proton#Proton.DomUtil
         * @method transformDom
         *
         * @param {HTMLDivElement} $div 
         * @param {Number} $x 
         * @param {Number} $y 
         * @param {Number} $scale 
         * @param {Number} $rotate 
         */
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
