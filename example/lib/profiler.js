(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.pf = root.profiler = factory();
    }
}(this, function (b) {
    var cache = {};

    return {
        showAll: false,

        set: function (config) {
            if (config.showAll !== undefined) this.showAll = config.showAll;
            if (config.count !== undefined) this.count(config.count, "_ALL_");
            if (config.delay !== undefined) this.delay(config.delay, "_ALL_");
            if (config.keydown !== undefined) this.keydown("_ALL_");
        },

        count: function (count, name) {
            name = name || 'default';
            this.create(name);
            cache[name].count = count;
            cache[name].useC = true;
        },

        delay: function (begin, name) {
            name = name || 'default';
            this.create(name);
            cache[name].begin = begin * 1000;
        },

        keydown: function (name) {

        },

        a: function (name) {
            name = name || 'default';
            this.create(name);

            if (cache[name].out) return;

            cache[name].t++;

            cache[name].start = (performance || Date).now();
        },

        b: function (name) {
            name = name || 'default';
            this.create(name);

            if (cache[name].out) return;
            if (cache[name].t < cache[name].begin) return;

            cache[name].end = (performance || Date).now();
            cache[name].m = performance.memory.usedJSHeapSize / 1048576;
            cache[name].index++;

            this.c(name);

            if (!cache[name].useC) {
                this.log(name);
            } else {
                if (this.out(name)) {
                    this.log(name);
                    cache[name].out = true;
                }
            }
        },

        c: function (name) {
            var time = cache[name].end - (cache[name].start || cache[name].end);
            time = this.floor(time);
            cache[name].times.push(time);

            cache[name].memorys.push(cache[name].m);
        },

        floor: function (val) {
            return Math.floor(val * Math.pow(10, 5)) / Math.pow(10, 5);
        },

        log: function (name) {
            var char = "------------------------------------ PROFILER ------------------------------------";
            console.log("%c " + char, "color:#34a900");
            console.log("%c name: " + name, "color:#34a900");
            console.log("%c average time: " + this.averageTime(name), "color:#2490ff");
            console.log("%c average memory: " + this.averageMemory(name), "color:#ff8041");

            if (this.showAll) {
                console.log("%c all time: " + cache[name].times.toString(), "color:#2490ff");
                console.log("%c all memory: " + cache[name].memorys.toString(), "color:#ff8041");
            }

            console.log("%c " + char, "color:#34a900");
        },

        out: function (name) {
            if (cache[name].count && cache[name].count <= cache[name].index) {
                return true;
            } else {
                return false;
            }
        },

        create: function (name) {
            if (!cache[name]) cache[name] = {};
            if (!cache[name].times) cache[name].times = [];
            if (!cache[name].memorys) cache[name].memorys = [];
            if (!cache[name].index) cache[name].index = 0;
            if (!cache[name].t) cache[name].t = 0;
            if (!cache[name].begin) cache[name].begin = 0;
        },

        averageTime: function (name) {
            var total = 0;
            for (var i = 0; i < cache[name].times.length; i++) {
                var time = cache[name].times[i];
                total += time;
            }

            return this.floor(total / (cache[name].count || 1));
        },

        averageMemory: function (name) {
            var total = 0;
            for (var i = 0; i < cache[name].memorys.length; i++) {
                var m = cache[name].memorys[i];
                total += m;
            }

            return this.floor(total / (cache[name].count || 1));
        }
    };
}));