/**
 * @description Game module
 * @module Game
 */

import { Deck } from './deck.js';
import { Hand } from './hand.js';
import { endGameMsgs } from '../constants.js';

export class Game {
    /**
     * Game constructor
     */
    constructor() {
        this.deck = {};
        this.player = {};
        this.dealer = {};
        this.backCard = {}; 

        this.addEventListeners();
    }
    
    /**
     * Adding event listners to buttons
     */
    addEventListeners() {
        document.getElementById("start").addEventListener("click", this.start.bind(this));
        document.getElementById("hit").addEventListener("click", this.hit.bind(this));
        document.getElementById("stay").addEventListener("click", this.stay.bind(this));
    }

    /**
     * Start Game button click logic
     */
    start() {
        this.deck = new Deck();
        this.player = new Hand('player');
        this.dealer = new Hand('dealer'); 
        this.backCard = this.deck.cards.pop();

        document.getElementById('main-container').classList.remove('end-game');
        document.getElementById('result').innerHTML = '';
        document.getElementById(`${this.player.name}-cards`).innerHTML = '';
        document.getElementById(`${this.dealer.name}-cards`).innerHTML = '<img id="back" src="../cards/Back.png">';
        document.getElementById(`${this.player.name}-score`).innerHTML = '';
        document.getElementById(`${this.dealer.name}-score`).innerHTML = '';
    
        this.addCard(this.player);
        this.addCard(this.player);

        // add back card for dealer
        this.dealer.addCard(this.deck.cards.pop());
        this.addCard(this.dealer);
    }
    
    /**
     * Hit button click logic
     */
    hit() {
        this.addCard(this.player);

        if (this.player.score > 21) {
            this.rotateBackCard();
            this.endGame(endGameMsgs.loose);
        }
    }

    /**
     * Stay button click logic
     */
    stay() {
        this.rotateBackCard();

        while (this.dealer.score <= this.player.score && this.dealer.score !== 21) {
            this.addCard(this.dealer);
        }

        if (this.dealer.score > 21) {
            return this.endGame(endGameMsgs.win)
        }

        if (this.dealer.score === this.player.score) {
            return this.endGame(endGameMsgs.draw)
        }

        this.endGame(endGameMsgs.loose);
    }

    /**
     * Rotate dealer back card
     */
    rotateBackCard() {
        document.getElementById('back').src = this.dealer.cards[0].img.src;
    }

    /**
     * Pick card from the the deck, add to hand and render card on the table
     * @param {Hand} hand - can be this.player or this.dealer
     */
    addCard(hand) {
        const card = this.deck.cards.pop();

        hand.addCard(card);
        document.getElementById(`${hand.name}-cards`).append(card.img);
    }

    /**
     * Showing result message after the game ends on the top of the screen
     * @param {string} msg - messages are taken from endGames constant
     */
    endGame(msg) {
        document.getElementById('main-container').classList.add('end-game');
        document.getElementById('result').innerHTML = msg;
        document.getElementById(`${this.player.name}-score`).innerHTML = this.player.score;
        document.getElementById(`${this.dealer.name}-score`).innerHTML = this.dealer.score;
    }
}







