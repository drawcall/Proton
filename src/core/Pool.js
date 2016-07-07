(function(Proton, undefined) {

    function Pool() {
        this.cID = 0;
        this.list = {};
    }
    
    Pool.prototype = {
        create: function(obj, params) {
            this.cID++;
   
            if (typeof obj == "function")
                return Proton.Util.classApply(obj, params);
            else
                return obj.clone();
        },

        getCount: function() {
            var count = 0;
            for (var id in this.list)
                count += this.list[id].length;

            return count++;;
        },

        get: function(obj, params) {
            var p, puid = obj.__puid || PUID.id(obj);
            if (this.list[puid] && this.list[puid].length > 0)
                p = this.list[puid].pop();
            else
                p = this.create(obj, params);

            p.__puid = obj.__puid || puid;
            return p;
        },

        set: function(obj) {
            return this._getList(obj.__puid).push(obj);
        },

        release: function() {
            for (var id in this.list) {
                this.list[id].length = 0;
                delete this.list[id];
            }
        },

        _getList: function(uid) {
            uid = uid || "default";
            if (!this.list[uid]) this.list[uid] = [];
            return this.list[uid];
        }
    }

    Proton.Pool = Pool;

    var PUID = {
        _id: 0,
        _uids: {},
        id: function(obj) {
            for (var id in this._uids) {
                if (this._uids[id] == obj) return id;
            }

            var nid = "PUID_" + (this._id++);
            this._uids[nid] = obj;
            return nid;
        },

        hash: function(str) {
            return;
        }
    }

})(Proton);
