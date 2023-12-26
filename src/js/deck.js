/**
 * @description Deck module
 * @module Deck
 */

import { Card } from './card.js';
import { types, values } from '../constants.js'

export class Deck {
    /**
     * Deck constructor
     */
    constructor() {
        this.cards = this.getShuffledDeck();
    }

    /**
     * Create and shuffle deck
     * @returns {Array<Card>}
     */
    getShuffledDeck() {
        const cards = this.createDeck(types, values);
        
        return this.shuffleDeck(cards);
    }

    /**
     * Add all possible cards to deck
     * @param {Array<string>} types - constant
     * @param {Array<string>} values - constant
     * @returns {Array<Card>}
     */
    createDeck(types, values) {
        let cards = [];

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                cards.push(new Card(values[j], types[i]))
            }
        }

        return cards;
    }

    /**
     * Shuffle cards in deck by changing position of each card with randomIndex position
     * @param {Array<Card>} cards 
     * @returns {Array<Card>}
     */
    shuffleDeck(cards) {
        for (let i = 0; i < cards.length; i++) {
            const randomIndex = this.getRandomIndex(cards.length);
            const temp = cards[i];
            cards[i] = cards[randomIndex];
            cards[randomIndex] = temp;
        }

        return cards;
    }

    /**
     * Count random index
     * @param {number} value
     * @returns {number}
     */
    getRandomIndex(value) {
        return Math.floor(Math.random() * value);
    }
}