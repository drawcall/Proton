export default class Initialize {
  reset() {}

  init(emitter, particle) {
    if (particle) {
      this.initialize(particle);
    } else {
      this.initialize(emitter);
    }
  }

  // sub class init
  initialize(target) {}
}
