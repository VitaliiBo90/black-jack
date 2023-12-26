/**
 * @description Hand module
 * @module Hand
 */

export class Hand {
    /**
     * Hand constructor
     * @param {string} name - can be palyer or dealer
     */
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.aceCount = 0;
        this.cards = [];
    }

    /**
     * Count hand score
     * @param {Card} card 
     */
    addCard(card) {
        this.cards.push(card);
        this.score += this.getCardScore(card);

        this.recalculateForAce();
    }

    /**
     * Count card score
     * @param {Card} card 
     * @returns {number}
     */
    getCardScore(card) {
        if (isNaN(card.value)) {
            if (card.value === 'A') {
                this.aceCount++;
                return 11;
            }
            return 10;
        }

        return Number(card.value);
    }

    /**
     * Recalculate hand points if hand get more than 21 points and has Ace
     */
    recalculateForAce() {
        if (this.score > 21 && this.aceCount > 0) {
            this.score -= 10;
            this.aceCount--;
        }
    }
}