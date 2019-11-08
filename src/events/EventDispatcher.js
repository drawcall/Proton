/*
 * EventDispatcher
 * This code reference since http://createjs.com/.
 *
 **/

export default class EventDispatcher {
  constructor() {
    this._listeners = null;
  }

  static bind(target) {
    target.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;

    target.prototype.hasEventListener =
      EventDispatcher.prototype.hasEventListener;

    target.prototype.addEventListener =
      EventDispatcher.prototype.addEventListener;

    target.prototype.removeEventListener =
      EventDispatcher.prototype.removeEventListener;

    target.prototype.removeAllEventListeners =
      EventDispatcher.prototype.removeAllEventListeners;
  }

  addEventListener(type, listener) {
    if (!this._listeners) {
      this._listeners = {};
    } else {
      this.removeEventListener(type, listener);
    }

    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(listener);

    return listener;
  }

  removeEventListener(type, listener) {
    if (!this._listeners) return;
    if (!this._listeners[type]) return;

    const arr = this._listeners[type];
    const length = arr.length;

    for (let i = 0; i < length; i++) {
      if (arr[i] === listener) {
        if (length === 1) {
          delete this._listeners[type];
        }

        // allows for faster checks.
        else {
          arr.splice(i, 1);
        }

        break;
      }
    }
  }

  removeAllEventListeners(type) {
    if (!type) this._listeners = null;
    else if (this._listeners) delete this._listeners[type];
  }

  dispatchEvent(type, args) {
    let result = false;
    const listeners = this._listeners;

    if (type && listeners) {
      let arr = listeners[type];
      if (!arr) return result;

      // arr = arr.slice();
      // to avoid issues with items being removed or added during the dispatch

      let handler;
      let i = arr.length;
      while (i--) {
        handler = arr[i];
        result = result || handler(args);
      }
    }

    return !!result;
  }

  hasEventListener(type) {
    const listeners = this._listeners;
    return !!(listeners && listeners[type]);
  }
}
