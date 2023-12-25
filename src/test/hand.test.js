import { Card } from '../js/card.js';
import { Hand } from '../js/hand.js';

describe('Hand ', () => {
    let hand;

    beforeEach(() => {
        hand = new Hand('player');
    });

    afterEach(() => {    
        jest.clearAllMocks();
    });

    test('getCardScore should give amount which equals its value if it is not card with picture', () => {
        const score = hand.getCardScore(new Card('5', 'S'));

        expect(score).toBe(5);
    });

    test('getCardScore should give amount which equals 10 if it is not card with value or Ace', () => {
        const score = hand.getCardScore(new Card('J', 'H'));

        expect(score).toBe(10);
    });

    test('getCardScore should give amount which equals 11 if it is Ace', () => {
        const score = hand.getCardScore(new Card('A', 'H'));

        expect(score).toBe(11);
    });

    test('getCardScore should increase aceCount if it is Ace', () => {
        hand.getCardScore(new Card('A', 'H'));

        expect(hand.aceCount).toBe(1);
    });

    test('getCardScore should not increase aceCount if it is not Ace', () => {
        hand.getCardScore(new Card('J', 'H'));

        expect(hand.aceCount).toBe(0);

        hand.getCardScore(new Card('5', 'H'));

        expect(hand.aceCount).toBe(0);
    });

    test('addCard should call all relevant methods', () => {
        jest.spyOn(Hand.prototype, 'getCardScore');
        jest.spyOn(Hand.prototype, 'recalculateForAce');

        const card = new Card('J', 'H')
        hand.addCard(card);

        expect(Hand.prototype.getCardScore).toHaveBeenCalledTimes(1);
        expect(Hand.prototype.getCardScore).toHaveBeenCalledWith(card);
        expect(Hand.prototype.recalculateForAce).toHaveBeenCalledTimes(1);
    });

    test('addCard should increse hand score with card score value', () => {
        hand.score = 5;      
        hand.addCard(new Card('J', 'H'));

        expect(hand.score).toBe(15);

        hand.addCard(new Card('2', 'D'));

        expect(hand.score).toBe(17);
    });

    test('addCard should  give 1 point instead of 11 for Ace if palyer count will be more than 21', () => {
        hand.score = 15;  
        hand.addCard(new Card('A', 'H'));

        expect(hand.score).toBe(16);
    });

    test('addCard should decrease hand value for 10 points if has aceCount > 1 and decrease aceCount by 1 if palyer count will be more than 21', () => {
        hand.score = 13;  
        hand.aceCount = 2; 
        hand.addCard(new Card('J', 'H'));

        expect(hand.score).toBe(13);
        expect(hand.aceCount).toBe(1);
    });
});