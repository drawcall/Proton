export default {
    id: 0,
    cache: {},

    getID(target) {
        let uid = this.getCacheID(target);
        if (uid) return uid;

        uid = `PUID_${this.id++}`;
        this.cache[uid] = target;

        return uid;
    },

    getCacheID(target) {
        let obj;
        for (let id in this.cache) {
            obj = this.cache[id];

            if (obj === target) return id;
            
            if (typeof obj === 'object' && typeof target === 'object' && obj.isInner && target.isInner) {
                if (obj.src === target.src)
                    return id;
            }
        }

        return null;
    },

    getTarget(uid) {
        return this.cache[uid];
    }
}