export default class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
  }

  contains(x, y) {
    if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y)
      return true;
    else return false;
  }
}
