import { Deck } from './deck.js';
import { Hand } from './hand.js';
import { startCardAmount, endGameMsgs } from '../constants.js'
import "../css/main.css";
require.context('../cards', true);

let deck, player, dealer;

/**
 * Start of application
 */
window.onload = function() {
    addEventListeners();
}

/**
 * Adding event listners to buttons
 */
function addEventListeners() {
    document.getElementById("start").addEventListener("click", start);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

/**
 * Start Game button click logic
 */
function start() {
    deck = new Deck();
    player = new Hand('player');
    dealer = new Hand('dealer');  

    document.getElementById('main-container').classList.remove('end-game');
    document.getElementById('result').innerHTML = '';
    document.getElementById(`${player.name}-cards`).innerHTML = '';
    document.getElementById(`${dealer.name}-cards`).innerHTML = '<img id="back" src="../cards/Back.png">';
    document.getElementById(`${player.name}-score`).innerHTML = '';
    document.getElementById(`${dealer.name}-score`).innerHTML = '';

    for (let i = 0; i < startCardAmount; i++) {
        addCard(player);
        addCard(dealer);
    }
}

/**
 * Hit button click logic
 */
function hit() {
    addCard(player);

    if (player.score === 21) {
        return stay();
    }

    if (player.score > 21) {
        resultMessage(endGameMsgs.loose);
    }
}

/**
 * Stay button click logic
 */
function stay() {
    while (dealer.score <= player.score && dealer.score !== 21) {
        addCard(dealer);
    }

    if (dealer.score < player.score || dealer.score > 21) {
        return resultMessage(endGameMsgs.win)
    }

    if (dealer.score === player.score) {
        return resultMessage(endGameMsgs.draw)
    }

    resultMessage(endGameMsgs.loose);
}


/**
 * General pick from the deck card logic
 * @param {Hand} hand - can be player or dealer
 */
function addCard(hand) {
    const card = deck.cards.pop();

    hand.addCard(card);
    document.getElementById(`${hand.name}-cards`).append(card.img);
}

/**
 * Showing result message after the game ends on the top of the screen
 * @param {string} msg - messages are taken from endGameMsgs constant
 */
function resultMessage(msg) {
    document.getElementById('main-container').classList.add('end-game');
    document.getElementById('result').innerHTML = msg;
    document.getElementById(`${player.name}-score`).innerHTML = player.score;
    document.getElementById(`${dealer.name}-score`).innerHTML = dealer.score;
}
