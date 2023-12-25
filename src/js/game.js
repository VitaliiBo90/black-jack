import { Deck } from './deck.js';
import { Hand } from './hand.js';
import { startCardAmount, endGameMsgs } from '../constants.js';


export class Game {
    /**
     * Game constructor
     */
    constructor() {
        this.deck = {};
        this.player = {};
        this.dealer = {}; 

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

        document.getElementById('main-container').classList.remove('end-game');
        document.getElementById('result').innerHTML = '';
        document.getElementById(`${this.player.name}-cards`).innerHTML = '';
        document.getElementById(`${this.dealer.name}-cards`).innerHTML = '<img id="back" src="../cards/Back.png">';
        document.getElementById(`${this.player.name}-score`).innerHTML = '';
        document.getElementById(`${this.dealer.name}-score`).innerHTML = '';
    
        for (let i = 0; i < startCardAmount; i++) {
            this.addCard(this.player);
            this.addCard(this.dealer);
        }
    }
    
    /**
     * Hit button click logic
     */
    hit() {
        this.addCard(this.player);

        if (this.player.score === 21) {
            return this.stay();
        }

        if (this.player.score > 21) {
            this.resultMessage(endGameMsgs.loose);
        }
    }

    /**
     * Stay button click logic
     */
    stay() {
        while (this.dealer.score <= this.player.score && this.dealer.score !== 21) {
            this.addCard(this.dealer);
        }

        if (this.dealer.score < this.player.score || this.dealer.score > 21) {
            return this.resultMessage(endGameMsgs.win)
        }

        if (this.dealer.score === this.player.score) {
            return this.resultMessage(endGameMsgs.draw)
        }

        this.resultMessage(endGameMsgs.loose);
    }

    /**
     * General pick from the this.deck card logic
     * @param {Hand} hand - can be this.player or this.dealer
     */
    addCard(hand) {
        const card = this.deck.cards.pop();

        hand.addCard(card);
        document.getElementById(`${hand.name}-cards`).append(card.img);
    }

    /**
     * Showing result message after the game ends on the top of the screen
     * @param {string} msg - messages are taken from endGameMsgs constant
     */
    resultMessage(msg) {
        document.getElementById('main-container').classList.add('end-game');
        document.getElementById('result').innerHTML = msg;
        document.getElementById(`${this.player.name}-score`).innerHTML = this.player.score;
        document.getElementById(`${this.dealer.name}-score`).innerHTML = this.dealer.score;
    }
}







