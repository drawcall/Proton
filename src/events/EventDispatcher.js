/*
 * EventDispatcher
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 **/

(function(Proton, undefined) {
    function EventDispatcher() {
        this.initialize();
    };

    EventDispatcher.initialize = function(target) {
        target.addEventListener = p.addEventListener;
        target.removeEventListener = p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
    };

    var p = EventDispatcher.prototype;

    p._listeners = null;

    p.initialize = function() {};
    p.addEventListener = function(type, listener) {
        if (!this._listeners) {
            this._listeners = {};
        } else {
            this.removeEventListener(type, listener);
        }

        if (!this._listeners[type]) this._listeners[type] = []
        this._listeners[type].push(listener);

        return listener;
    };

    p.removeEventListener = function(type, listener) {
        if (!this._listeners) return;
        if (!this._listeners[type]) return;

        var arr = this._listeners[type];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == listener) {
                if (l == 1) {
                    delete(this._listeners[type]);
                }
                // allows for faster checks.
                else {
                    arr.splice(i, 1);
                }
                break;
            }
        }
    };

    p.removeAllEventListeners = function(type) {
        if (!type)
            this._listeners = null;
        else if (this._listeners)
            delete(this._listeners[type]);
    };

    p.dispatchEvent = function(eventName, eventTarget) {
        var ret = false,
            listeners = this._listeners;

        if (eventName && listeners) {
            var arr = listeners[eventName];
            if (!arr) return ret;

            arr = arr.slice();
            // to avoid issues with items being removed or added during the dispatch

            var handler, i = arr.length;
            while (i--) {
                var handler = arr[i];
                ret = ret || handler(eventTarget);
            }
            
        }

        return !!ret;
    };

    p.hasEventListener = function(type) {
        var listeners = this._listeners;
        return !!(listeners && listeners[type]);
    };

    EventDispatcher.initialize(Proton.prototype);
    Proton.EventDispatcher = EventDispatcher;
})(Proton);
