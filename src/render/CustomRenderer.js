import BaseRenderer from "./BaseRenderer";

export default class CustomRenderer extends BaseRenderer {
  constructor(element) {
    super(element);

    this.name = "CustomRenderer";
  }
}
