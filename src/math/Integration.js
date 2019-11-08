export default class Integration {
  constructor(type) {
    this.type = type;
  }

  calculate(particles, time, damping) {
    this.eulerIntegrate(particles, time, damping);
  }

  // Euler Integrate
  // https://rosettacode.org/wiki/Euler_method
  eulerIntegrate(particle, time, damping) {
    if (!particle.sleep) {
      particle.old.p.copy(particle.p);
      particle.old.v.copy(particle.v);

      particle.a.multiplyScalar(1 / particle.mass);
      particle.v.add(particle.a.multiplyScalar(time));
      particle.p.add(particle.old.v.multiplyScalar(time));

      if (damping) particle.v.multiplyScalar(damping);

      particle.a.clear();
    }
  }
}
