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
     * Here you can see all addable behaviours
     *
     * The list:
     *
     * - [Proton.Alpha]{@link Proton#Proton.Alpha}
     * - [Proton.Attraction]{@link Proton#Proton.Attraction}
     * - [Proton.Collision]{@link Proton#Proton.Collision}
     * - [Proton.Color]{@link Proton#Proton.Color}
     * - [Proton.CrossZone]{@link Proton#Proton.CrossZone}
     * - [Proton.Force]{@link Proton#Proton.Force}
     * - [Proton.Gravity]{@link Proton#Proton.Gravity}
     * - [Proton.GravityWell]{@link Proton#Proton.GravityWell}
     * - [Proton.RandomDrift]{@link Proton#Proton.RandomDrift}
     * - [Proton.Repulsion]{@link Proton#Proton.Repulsion}
     * - [Proton.Rotate]{@link Proton#Proton.Rotate}
     * - [Proton.Scale]{@link Proton#Proton.Scale}
     *
     * @namespace Behaviour
     *
     * @example
     * // this example shows how to add a specific behaviour to the Proton instance
     * var proton  = new Proton;
     * var emitter = new Proton.Emitter();
     * var attractionBehaviour = new.Proton.Attraction(new Proton.Vector2D())
     *
     * emitter.addBehaviour(attractionBehaviour);
     * emitter.emit('once');
     * proton.addEmmiter(emitter);
     */

    /**
     * The constructor to add emitters 
     *
     * @constructor Proton
     *
     * @todo proParticleCount is not in use
     * @todo add more documentation of the single properties and parameters
     *
     * @param {Number} [proParticleCount] not in use?
     * @param {Number} [integrationType=Proton.EULER]
     *
     * @property {String} [integrationType=Proton.EULER]
     * @property {Array} emitters   All added emitter
     * @property {Array} renderers  All added renderer
     * @property {Number} time      The active time
     * @property {Number} oldtime   The old time
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
         * @memberof Proton
         *
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
         * @memberof Proton
         *
         * @param {Emitter} emitter
         */
        addEmitter: function(emitter) {
            this.emitters.push(emitter);
            emitter.parent = this;

            this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
        },

        /**
         * Removes an Emitter
         *
         * @method removeEmitter
         * @memberof Proton
         *
         * @param {Proton.Emitter} emitter
         */
        removeEmitter: function(emitter) {
            var index = this.emitters.indexOf(emitter);
            this.emitters.splice(index, 1);
            emitter.parent = null;

            this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
        },

        /**
         * Updates all added emitters
         *
         * @method update
         * @memberof Proton
         */
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

        /**
         * @todo add description
         *
         * @method amendChangeTabsBug
         * @memberof Proton 
         */
        amendChangeTabsBug: function() {
            if (this.elapsed > .5) {
                this.oldTime = new Date().getTime();
                this.elapsed = 0;
            }
        },

        /**
         * Counts all particles from all emitters
         *
         * @method getCount
         * @memberof Proton 
         */
        getCount: function() {
            var total = 0;
            var length = this.emitters.length;
            for (var i = 0; i < length; i++) {
                total += this.emitters[i].particles.length;
            }
            return total;
        },

        /**
         * Destroys everything related to this Proton instance. This includes all emitters, and all properties
         *
         * @method destroy
         * @memberof Proton 
         */
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
