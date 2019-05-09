/**
 * get    -> PUID :: uid-> Body
 *        -> cache[abc].         -> cache[abc] .pop()
 *                               -> create [new Body| clone]
 *        -> return p1: { __pid: abc }
 *
 * expire -> cache[abc]= [p0, p1];
 *
 */
import Util from '../utils/Util';
import PUID from '../utils/PUID';

export default class FastPool {

    constructor(num) {
        this.pool = [];
    }

    add(element) {
        this.pool.push(element);
    }

    get count() {
        return this.pool.length;
    }

    get() {
        return this.pool.pop();
    }

    destroy() {
        this.pool.length = 0;
    }
}