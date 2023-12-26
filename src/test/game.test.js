import { Game } from '../js/game.js';
import { Hand } from '../js/hand.js';
import { endGameMsgs } from '../constants.js';

let game;

describe('Game ', () => {
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

        test('should have correct classes in html', () => {
            expect(document.getElementById('main-container').classList.contains('end-game')).toBe(false);
            expect(document.getElementById('result').innerHTML).toBe('');
            expect(document.getElementById('player-score').innerHTML).toBe('');
            expect(document.getElementById('dealer-score').innerHTML).toBe('');
        });

        test('hands should have correct amount of cards in dom', () => {
            expect(document.getElementById('player-cards').children.length).toBe(2);
            expect(document.getElementById('dealer-cards').children.length).toBe(2);
        });

        test('hands should have correct amount of addCard calls', () => {
            // addCard called twice for player and dealer
            expect(Hand.prototype.addCard).toHaveBeenCalledTimes(4);
        });
    });

    describe('hit ', () => {
        beforeEach(() => {
            game.player.score = 0;
            game.player.aceCount = 0;
            game.dealer.score = 0;
            game.dealer.aceCount = 0;
            jest.spyOn(Hand.prototype, 'addCard');
            jest.spyOn(Game.prototype, 'addCard');
            jest.spyOn(Game.prototype, 'rotateBackCard');
            jest.spyOn(Game.prototype, 'endGame');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should call Hand addCard method', () => { 
            game.hit();
            expect(Hand.prototype.addCard).toHaveBeenCalledTimes(1);
        });

        test('should call Game addCard method with player parameter', () => { 
            game.hit();
            expect(Game.prototype.addCard).toHaveBeenCalledTimes(1);
            expect(Game.prototype.addCard).toHaveBeenCalledWith(game.player);
        });

        test('should call rotateBackCard and endGame if user score more than 21', () => {
            game.player.score = 22;
            game.hit();
            expect(Game.prototype.rotateBackCard).toHaveBeenCalledTimes(1);
            expect(Game.prototype.endGame).toHaveBeenCalledTimes(1);
            expect(Game.prototype.endGame).toHaveBeenCalledWith(endGameMsgs.loose);
        });
    });

    describe('stay ', () => {
        beforeEach(() => {
            game.player.score = 0;
            game.player.aceCount = 0;
            game.dealer.score = 0;
            game.dealer.aceCount = 0;
            jest.spyOn(Game.prototype, 'addCard');
            jest.spyOn(Game.prototype, 'rotateBackCard');
            jest.spyOn(Game.prototype, 'endGame');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should call rotateBackCard', () => { 
            game.stay();
            expect(Game.prototype.rotateBackCard).toHaveBeenCalledTimes(1);
        });

        test('should call addCard if dealer.score <= player.score and dealer score != 21', () => { 
            game.player.score = 18;
            game.dealer.score = 17;

            game.stay();
            expect(Game.prototype.addCard).toHaveBeenCalled();
            expect(Game.prototype.addCard).toHaveBeenCalledWith(game.dealer);
        });

        test('should call endGame with win parameter if dealer.score > 21', () => { 
            game.dealer.score = 22;

            game.stay();
            expect(Game.prototype.endGame).toHaveBeenCalledTimes(1);
            expect(Game.prototype.endGame).toHaveBeenCalledWith(endGameMsgs.win);
        });

        test('should call endGame with draw parameter if dealer.score = 21 and dealer.score = player.score', () => { 
            game.dealer.score = 21;
            game.player.score = 21;

            game.stay();
            expect(Game.prototype.endGame).toHaveBeenCalledTimes(1);
            expect(Game.prototype.endGame).toHaveBeenCalledWith(endGameMsgs.draw);
        });

        test('should call endGame with loose parameter if and dealer.score > player.score and dealer.score <= 21', () => { 
            game.dealer.score = 18;
            game.player.score = 17;

            game.stay();
            expect(Game.prototype.endGame).toHaveBeenCalledTimes(1);
            expect(Game.prototype.endGame).toHaveBeenCalledWith(endGameMsgs.loose);
        });

        test('should have correct classes in html', () => {
            game.player.score = 18;
            game.dealer.score = 22; 
            game.stay();

            expect(document.getElementById('main-container').classList.contains('end-game')).toBe(true);
            expect(document.getElementById('result').innerHTML).toBe(endGameMsgs.win);
            expect(document.getElementById('player-score').innerHTML).toBe('18');
            expect(document.getElementById('dealer-score').innerHTML).toBe('22');
        });
    })
});