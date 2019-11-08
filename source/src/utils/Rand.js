class Rand {

    constructor() {
        this.list = [];
    }

    set(probability, target) {
        this.list.push({
            probability,
            target,
            a: 0,
            b: 1
        });

        this.calculation();
    }

    calculation() {
        let total = 0;
        for (let i = 0; i < this.list.length; i++) {
            total += this.list[i].probability;
        }

        for (let i = 0; i < this.list.length; i++) {
            const obj = this.list[i];
            const val = obj.probability / total;

            obj.a = i === 0 ? 0 : this.list[i - 1].b;
            obj.b = obj.a + val;
        }
    }

    getResult() {
        const val = Math.random();
        for (let i = 0; i < this.list.length; i++) {
            const obj = this.list[i];

            if (val <= obj.b && val > obj.a) {
                return obj.target;
            }
        }

        return this.list[0].target;
    }
};

export default Rand;