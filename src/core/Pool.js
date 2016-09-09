(function(Proton, undefined) {

	/**
	 * @memberof! Proton#
	 * @constructor
	 * @alias Proton.Pool
	 *
	 * @todo add description
	 * @todo add description of properties
	 *
	 * @property {Number} cID
	 * @property {Object} list
	 */
	function Pool() {
		this.cID = 0;
		this.list = {};
	}
	
	Pool.prototype = {

		/**
		 * Creates a new class instance
		 *
		 * @todo add more documentation 
		 *
		 * @method create
		 * @memberof Proton#Proton.Pool
		 *
		 * @param {Object|Function} obj any Object or Function
		 * @param {Object} [params] just add if `obj` is a function
		 *
		 * @return {Object}
		 */
		create: function(obj, params) {
			this.cID++;
   
			if (typeof obj == "function")
				return Proton.Util.classApply(obj, params);
			else
				return obj.clone();
		},

		/**
		 * @todo add description - what is in the list?
		 *
		 * @method getCount
		 * @memberof Proton#Proton.Pool
		 *
		 * @return {Number}
		 */
		getCount: function() {
			var count = 0;
			for (var id in this.list)
				count += this.list[id].length;

			return count++;;
		},

		/**
		 * @todo add description
		 *
		 * @method get
		 * @memberof Proton#Proton.Pool
		 *
		 * @param {Object|Function} obj
		 * @param {Object} [params] just add if `obj` is a function
		 *
		 * @return {Object}
		 */
		get: function(obj, params) {
			var p, puid = obj.__puid || PUID.id(obj);
			if (this.list[puid] && this.list[puid].length > 0)
				p = this.list[puid].pop();
			else
				p = this.create(obj, params);

			p.__puid = obj.__puid || puid;
			return p;
		},

		/**
		 * @todo add description
		 *
		 * @method set
		 * @memberof Proton#Proton.Pool
		 *
		 * @param {Object} obj
		 *
		 * @return {Object}
		 */
		set: function(obj) {
			return this._getList(obj.__puid).push(obj);
		},

		/**
		 * Destroyes all items from Pool.list
		 *
		 * @method destroy
		 * @memberof Proton#Proton.Pool
		 */
		destroy: function() {
			for (var id in this.list) {
				this.list[id].length = 0;
				delete this.list[id];
			}
		},

		/**
		 * Returns Pool.list
		 *
		 * @method _getList
		 * @memberof Proton#Proton.Pool
		 * @private
		 *
		 * @param {Number} uid the unique id
		 *
		 * @return {Object}
		 */
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
