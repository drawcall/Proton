import BaseRenderer from "./BaseRenderer";

/**
 * Represents a custom renderer that extends the BaseRenderer.
 * @extends BaseRenderer
 */
export default class CustomRenderer extends BaseRenderer {
  /**
   * Creates a new CustomRenderer instance.
   * @param {HTMLElement} element - The HTML element to render to.
   */
  constructor(element) {
    super(element);

    /**
     * The name of the renderer.
     * @type {string}
     */
    this.name = "CustomRenderer";
  }
}
