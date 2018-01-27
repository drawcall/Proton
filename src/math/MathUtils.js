const PI = 3.1415926;

const MathUtils = {

    PI: PI,
    PIx2: PI * 2,
    PI_2: PI / 2,
    PI_180: PI / 180,
    N180_PI: 180 / PI,

    randomAToB(a, b, INT) {
        if (!INT)
            return a + Math.random() * (b - a);
        else
            return Math.floor(Math.random() * (b - a)) + a;
    },

    randomFloating(center, f, INT) {
        return this.randomAToB(center - f, center + f, INT);
    },

    randomZone(display) {},

    degreeTransform(a) {
        return a * PI / 180;
    },

    toColor16(num) {
        return "#" + num.toString(16);
    },

    randomColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }
}

export default MathUtils;