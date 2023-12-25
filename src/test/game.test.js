import { Game } from '../js/game.js';
import { Hand } from '../js/hand.js';

let game;

describe('Index ', () => {
    beforeAll(() => {
        document.body.innerHTML =
            '<div id="main-container" class="main-container end-game">' +
                '<h1 id="result" class="result"></h1>' +
                '<div class="table">' +
                    '<h2>Dealer: <span id="dealer-score"></span></h2>' +
                    '<div id="dealer-cards" class="cards"></div>' +

                    '<h2>Player: <span id="player-score"></span></h2>' +
                    '<div id="player-cards" class="cards"></div>' +       
                '</div>' +
                '<button id="start">Start Game</button>' +
                '<div id = "play-buttons">' +
                    '<button id="hit">Hit</button>' +
                    '<button id="stay">Stay</button>' +
                '</div>' +
            '</div>'
        
        game = new Game();
    });

    describe('start ', () => {
        beforeEach(() => {
            jest.spyOn(Hand.prototype, 'addCard');
            game.start();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should have correct hand and classes in html', () => {
            expect(document.getElementById('main-container').classList.contains('end-game')).toBe(false);
            expect(document.getElementById('result').innerHTML).toBe('');
            expect(document.getElementById('player-score').innerHTML).toBe('');
            expect(document.getElementById('dealer-score').innerHTML).toBe('');
        });

        test('hands should have correct amount of cards in dom', () => {
            expect(document.getElementById('player-cards').children.length).toBe(2);
            // dealer has 3 cards because first on is back card
            expect(document.getElementById('dealer-cards').children.length).toBe(3);
        });

        test('hands should have correct amount of cards', () => {
            // addCard called twice for player and dealer
            expect(Hand.prototype.addCard).toHaveBeenCalledTimes(4);
        });
    });

    describe('hit ', () => {
        beforeEach(() => {
            jest.spyOn(Hand.prototype, 'addCard');
            game.hit();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test(' should call addCard method', () => { 
            expect(Hand.prototype.addCard).toHaveBeenCalledTimes(1);
        });

        test(' should call stay method if user score 21', () => {
            game.player.score = 21;
            expect(Hand.prototype.addCard).toHaveBeenCalledTimes(1);
        });
    });
});