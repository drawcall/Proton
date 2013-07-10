/**
 * You can use this emit particles.
 *
 * This method will console.log the fixed number of your info  in updata or requestAnimationFrame
 * 
 * use like this Proton.log('+12',mc); log 12 times
 *
 * @class Proton.log
 * @constructor
 * @param {*} logInfo;
 */
(function(Proton, undefined) {
	var log = function() {
		if (window.console && window.console.log) {
			var arg = arguments;
			if ( typeof arguments[0] == 'string') {
				if (arguments[0].indexOf('+') == 0) {
					var n = parseInt(arguments[0]);
					if (log.once < n) {
						delete arg[0];
						console.log(arg);
						log.once++;
					}
				} else {
					console.log(arg);
				}
			} else {
				console.log(arg);
			}
		}
	}

	log.once = 0;
	Proton.log = log;
})(Proton);
