/*
 * Viewporter v2.0
 * http://github.com/zynga/viewporter
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/viewporter/master/MIT-LICENSE.txt
 */
var viewporter;
(function() {

	var _viewporter;

	// initialize viewporter object
	viewporter = {

		// options
		forceDetection: false,

		disableLegacyAndroid: true,

		// constants
		ACTIVE: (function() {

			// it's best not do to anything to very weak devices running Android 2.x
			if(viewporter.disableLegacyAndroid && (/android 2/i).test(navigator.userAgent)) {
				return false;
			}

			// iPad's don't allow you to scroll away the UI of the browser
			if((/ipad/i).test(navigator.userAgent)) {
				return false;
			}

			// WebOS has no touch events, but definitely the need for viewport normalization
			if((/webos/i).test(navigator.userAgent)) {
				return true;
			}

			// touch enabled devices
			if('ontouchstart' in window) {
				return true;
			}

			return false;

		}),

		READY: false,

		// methods
		isLandscape: function() {
			return window.orientation === 90 || window.orientation === -90;
		},

		ready: function(callback) {
			window.addEventListener('viewportready', callback, false);
		},
		
		change: function(callback) {
			window.addEventListener('viewportchange', callback, false);
		},

		refresh: function(){
			if (_viewporter) {
				_viewporter.prepareVisualViewport();
			}
		},

		preventPageScroll: function() {

			// prevent page scroll if `preventPageScroll` option was set to `true`
			document.body.addEventListener('touchmove', function(event) {
				event.preventDefault();
			}, false);

			// reset page scroll if `preventPageScroll` option was set to `true`
			// this is used after showing the address bar on iOS
			document.body.addEventListener("touchstart", function() {
				_viewporter.prepareVisualViewport();
			}, false);

		}

	};

	// execute the ACTIVE flag
	viewporter.ACTIVE = viewporter.ACTIVE();

	// if we are on Desktop, no need to go further
	if (!viewporter.ACTIVE) {
		return;
	}

	// create private constructor with prototype..just looks cooler
	var _Viewporter = function() {

		var that = this;

		// Scroll away the header, but not in Chrome
		this.IS_ANDROID = /Android/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

		var _onReady = function() {

			// scroll the shit away and fix the viewport!
			that.prepareVisualViewport();

			// listen for orientation change
			var cachedOrientation = window.orientation;
			window.addEventListener('orientationchange', function() {
				if(window.orientation !== cachedOrientation) {
					that.prepareVisualViewport();
					cachedOrientation = window.orientation;
				}
			}, false);
			
		};


		// listen for document ready if not already loaded
		// then try to prepare the visual viewport and start firing custom events
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', function() {
				_onReady();
			}, false);
		} else {
			_onReady();
		}


	};

	_Viewporter.prototype = {

		getProfile: function() {

			if(viewporter.forceDetection) {
				return null;
			}

			for(var searchTerm in viewporter.profiles) {
				if(new RegExp(searchTerm).test(navigator.userAgent)) {
					return viewporter.profiles[searchTerm];
				}
			}
			return null;
		},

		postProcess: function() {

			// let everyone know we're finally ready
			viewporter.READY = true;

			this.triggerWindowEvent(!this._firstUpdateExecuted ? 'viewportready' : 'viewportchange');
			this._firstUpdateExecuted = true;

		},

		prepareVisualViewport: function() {

			var that = this;

			// if we're running in webapp mode (iOS), there's nothing to scroll away
			if(navigator.standalone) {
				return this.postProcess();
			}

			// maximize the document element's height to be able to scroll away the url bar
			document.documentElement.style.minHeight = '5000px';

			var startHeight = window.innerHeight;
			var deviceProfile = this.getProfile();
			var orientation = viewporter.isLandscape() ? 'landscape' : 'portrait';

			// try scrolling immediately
			window.scrollTo(0, that.IS_ANDROID ? 1 : 0); // Android needs to scroll by at least 1px

			// start the checker loop
			var iterations = 40;
			var check = window.setInterval(function() {

				// retry scrolling
				window.scrollTo(0, that.IS_ANDROID ? 1 : 0); // Android needs to scroll by at least 1px

				function androidProfileCheck() {
					return deviceProfile ? window.innerHeight === deviceProfile[orientation] : false;
				}
				function iosInnerHeightCheck() {
					return window.innerHeight > startHeight;
				}

				iterations--;

				// check iterations first to make sure we never get stuck
				if ( (that.IS_ANDROID ? androidProfileCheck() : iosInnerHeightCheck()) || iterations < 0) {

					// set minimum height of content to new window height
					document.documentElement.style.minHeight = window.innerHeight + 'px';

					// set the right height for the body wrapper to allow bottom positioned elements
					document.getElementById('viewporter').style.position = 'relative';
					document.getElementById('viewporter').style.height = window.innerHeight + 'px';

					clearInterval(check);

					// fire events, get ready
					that.postProcess();

				}

			}, 10);

		},

		triggerWindowEvent: function(name) {
			var event = document.createEvent("Event");
			event.initEvent(name, false, false);
			window.dispatchEvent(event);
		}

	};

	// initialize
	_viewporter = new _Viewporter();

})();

viewporter.profiles = {

	// Motorola Xoom
	'MZ601': {
		portrait: 696,
		landscape: 1176
	},

	// Samsung Galaxy S, S2 and Nexus S
	'GT-I9000|GT-I9100|Nexus S': {
		portrait: 508,
		landscape: 295
	},

	// Samsung Galaxy Pad
	'GT-P1000': {
		portrait: 657,
		landscape: 400
	},

	// HTC Desire & HTC Desire HD
	'Desire_A8181|DesireHD_A9191': {
		portrait: 533,
		landscape: 320
	}

};