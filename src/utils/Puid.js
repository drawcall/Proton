const idsMap = {};

const Puid = {
  _index: 0,
  _cache: {},

  id(type) {
    if (idsMap[type] === undefined || idsMap[type] === null) idsMap[type] = 0;
    return `${type}_${idsMap[type]++}`;
  },

  getId(target) {
    let uid = this.getIdFromCache(target);
    if (uid) return uid;

    uid = `PUID_${this._index++}`;
    this._cache[uid] = target;

    return uid;
  },

  getIdFromCache(target) {
    let obj, id;

    for (id in this._cache) {
      obj = this._cache[id];

      if (obj === target) return id;
      if (this.isBody(obj, target) && obj.src === target.src) return id;
    }

    return null;
  },

  isBody(obj, target) {
    return (
      typeof obj === "object" &&
      typeof target === "object" &&
      obj.isInner &&
      target.isInner
    );
  },

  getTarget(uid) {
    return this._cache[uid];
  }
};

export default Puid;
