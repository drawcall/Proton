/**
 * Pool is the cache pool of the proton engine, it is very important.
 *
 * get(target, params, uid)
 *  Class
 *    uid = Puid.getId -> Puid save target cache
 *    target.__puid = uid
 *
 *  body
 *    uid = Puid.getId -> Puid save target cache
 *
 *
 * expire(target)
 *  cache[target.__puid] push target
 *
 */
import Util from "../utils/Util";
import Puid from "../utils/Puid";

export default class Pool {
  /**
   * @memberof! Proton#
   * @constructor
   * @alias Proton.Pool
   *
   * @todo add description
   * @todo add description of properties
   *
   * @property {Number} total
   * @property {Object} cache
   */
  constructor(num) {
    this.total = 0;
    this.cache = {};
  }

  /**
   * @todo add description
   *
   * @method get
   * @memberof Proton#Proton.Pool
   *
   * @param {Object|Function} target
   * @param {Object} [params] just add if `target` is a function
   *
   * @return {Object}
   */
  get(target, params, uid) {
    let p;
    uid = uid || target.__puid || Puid.getId(target);

    if (this.cache[uid] && this.cache[uid].length > 0) {
      p = this.cache[uid].pop();
    } else {
      p = this.createOrClone(target, params);
    }

    p.__puid = target.__puid || uid;
    return p;
  }

  /**
   * @todo add description
   *
   * @method set
   * @memberof Proton#Proton.Pool
   *
   * @param {Object} target
   *
   * @return {Object}
   */
  expire(target) {
    return this.getCache(target.__puid).push(target);
  }

  /**
   * Creates a new class instance
   *
   * @todo add more documentation
   *
   * @method create
   * @memberof Proton#Proton.Pool
   *
   * @param {Object|Function} target any Object or Function
   * @param {Object} [params] just add if `target` is a function
   *
   * @return {Object}
   */
  createOrClone(target, params) {
    this.total++;

    if (this.create) {
      return this.create(target, params);
    } else if (typeof target === "function") {
      return Util.classApply(target, params);
    } else {
      return target.clone();
    }
  }

  /**
   * @todo add description - what is in the cache?
   *
   * @method getCount
   * @memberof Proton#Proton.Pool
   *
   * @return {Number}
   */
  getCount() {
    let count = 0;
    for (let id in this.cache) count += this.cache[id].length;
    return count++;
  }

  /**
   * Destroyes all items from Pool.cache
   *
   * @method destroy
   * @memberof Proton#Proton.Pool
   */
  destroy() {
    for (let id in this.cache) {
      this.cache[id].length = 0;
      delete this.cache[id];
    }
  }

  /**
   * Returns Pool.cache
   *
   * @method getCache
   * @memberof Proton#Proton.Pool
   * @private
   *
   * @param {Number} uid the unique id
   *
   * @return {Object}
   */
  getCache(uid = "default") {
    if (!this.cache[uid]) this.cache[uid] = [];
    return this.cache[uid];
  }
}
