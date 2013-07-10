/*
 * EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 **/
(function(Proton, undefined) {
	function EventDispatcher() {
		this.initialize();
	};

	var p = EventDispatcher.prototype;

	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.removeEventListener = p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
	};

	p._listeners = null;

	p.initialize = function() {
	};

	p.addEventListener = function(type, listener) {
		var listeners = this._listeners;
		if (!listeners) {
			listeners = this._listeners = {};
		} else {
			this.removeEventListener(type, listener);
		}
		var arr = listeners[type];
		if (!arr) {
			arr = listeners[type] = [];
		}
		arr.push(listener);
		return listener;
	};

	p.removeEventListener = function(type, listener) {
		var listeners = this._listeners;
		if (!listeners) {
			return;
		}
		var arr = listeners[type];
		if (!arr) {
			return;
		}
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i] == listener) {
				if (l == 1) {
					delete (listeners[type]);
				}// allows for faster checks.
				else {
					arr.splice(i, 1);
				}
				break;
			}
		}
	};

	p.removeAllEventListeners = function(type) {
		if (!type) {
			this._listeners = null;
		} else if (this._listeners) {
			delete (this._listeners[type]);
		}
	};

	p.dispatchEvent = function(eventObj, target) {
		var ret = false, listeners = this._listeners;
		if (eventObj && listeners) {
			if ( typeof eventObj == "string") {
				eventObj = {
					type : eventObj
				};
			}
			var arr = listeners[eventObj.type];
			if (!arr) {
				return ret;
			}
			eventObj.target = target || this;
			arr = arr.slice();
			// to avoid issues with items being removed or added during the dispatch
			for (var i = 0, l = arr.length; i < l; i++) {
				var o = arr[i];
				if (o.handleEvent) {
					ret = ret || o.handleEvent(eventObj);
				} else {
					ret = ret || o(eventObj);
				}
			}
		}
		return !!ret;
	};

	p.hasEventListener = function(type) {
		var listeners = this._listeners;
		return !!(listeners && listeners[type]);
	};

	Proton.EventDispatcher = EventDispatcher;
	Proton.EventDispatcher.initialize(Proton.prototype);
})(Proton);
