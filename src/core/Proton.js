(function(window, undefined) {
    //the max particle number in pool
    Proton.POOL_MAX = 1000;
    Proton.TIME_STEP = 60;
    Proton.USE_CLOCK = false;
    //1:100
    Proton.MEASURE = 100;
    Proton.EULER = 'euler';
    Proton.RK2 = 'runge-kutta2';
    Proton.RK4 = 'runge-kutta4';
    Proton.VERLET = 'verlet';

    Proton.PARTICLE_CREATED = 'partilcleCreated';
    Proton.PARTICLE_UPDATE = 'partilcleUpdate';
    Proton.PARTICLE_SLEEP = 'particleSleep';
    Proton.PARTICLE_DEAD = 'partilcleDead';
    Proton.PROTON_UPDATE = 'protonUpdate';
    Proton.PROTON_UPDATE_AFTER = 'protonUpdateAfter';
    Proton.EMITTER_ADDED = 'emitterAdded';
    Proton.EMITTER_REMOVED = 'emitterRemoved';

    Proton.amendChangeTabsBug = true;
    Proton.TextureBuffer = {};
    Proton.TextureCanvasBuffer = {};

    /**
     * Proton is a html5 particle engine
     *
     * @class Proton
     * @constructor
     */
    function Proton(proParticleCount, integrationType) {
        this.integrationType = Proton.Util.initValue(integrationType, Proton.EULER);
        this.emitters = [];
        this.renderers = [];
        this.time = 0;
        this.oldTime = 0;

        Proton.pool = new Proton.Pool(100);
        Proton.integrator = new Proton.NumericalIntegration(this.integrationType);
    }


    Proton.prototype = {
        /**
         * add a type of Renderer
         *
         * @method addRender
         * @param {Renderer} render
         */
        addRender: function(render) {
            render.proton = this;
            this.renderers.push(render.proton);
        },
        /**
         * add the Emitter
         *
         * @method addEmitter
         * @param {Emitter} emitter
         */
        addEmitter: function(emitter) {
            this.emitters.push(emitter);
            emitter.parent = this;

            this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
        },

        removeEmitter: function(emitter) {
            var index = this.emitters.indexOf(emitter);
            this.emitters.splice(index, 1);
            emitter.parent = null;

            this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
        },

        update: function() {
            this.dispatchEvent(Proton.PROTON_UPDATE);

            if (Proton.USE_CLOCK) {
                if (!this.oldTime)
                    this.oldTime = new Date().getTime();

                var time = new Date().getTime();
                this.elapsed = (time - this.oldTime) / 1000;
                if (Proton.amendChangeTabsBug)
                    this.amendChangeTabsBug();
                this.oldTime = time;
            } else {
                this.elapsed = 0.0167;
            }

            if (this.elapsed > 0) {
                for (var i = 0; i < this.emitters.length; i++) {
                    this.emitters[i].update(this.elapsed);
                }
            }

            this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
        },

        amendChangeTabsBug: function() {
            if (this.elapsed > .5) {
                this.oldTime = new Date().getTime();
                this.elapsed = 0;
            }
        },

        getCount: function() {
            var total = 0;
            var length = this.emitters.length;
            for (var i = 0; i < length; i++) {
                total += this.emitters[i].particles.length;
            }
            return total;
        },

        destroy: function() {
            var length = this.emitters.length;
            for (var i = 0; i < length; i++) {
                this.emitters[i].destroy();
                delete this.emitters[i];
            }

            this.emitters = [];
            this.time = 0;
            this.oldTime = 0;
            Proton.pool.release();
        }
    };

    window.Proton = Proton;
})(window);
