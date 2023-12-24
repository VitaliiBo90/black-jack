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
        const cards = this.createDeack();
        
        return this.shuffleDeck(cards);
    }

    /**
     * Add all possible cards to deck
     * @returns {Array<Card>}
     */
    createDeack() {
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
            let randomIndex = this.getRandomIndex(cards.length);
            let temp = cards[i];
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
    getRandomIndex = (value) => Math.floor(Math.random() * value);
}