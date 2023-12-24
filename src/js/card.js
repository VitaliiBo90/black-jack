/**
 * @description Card module
 * @module Card
 */

export class Card {
    /**
     * Card cosntructor
     * @param {string} value - Card value
     * @param {string} type - Card type
     */
    constructor(value, type) {
        this.value = value;
        this.type = type;
        this.img = new Image();
        this.img.src = `./cards/${value}-${type}.png`;
    }
}