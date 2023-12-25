import { Card } from '../js/card.js';
import { Deck } from '../js/deck.js';

const mockTypes = ['S', 'C'];
const mockValues = ['A', '7'];
const mockDeck = [
    new Card('A', 'S'), new Card('7', 'S'),
    new Card('A', 'C'), new Card('7', 'C')
];
const mockShuffledDeck = [
    new Card('7', 'S'), new Card('A', 'S'),
    new Card('7', 'C'), new Card('A', 'C'),
]

describe('Deck ', () => {
    let deck;

    beforeEach(() => {
        deck = new Deck();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('createDeck should create deck in strict order', () => {
        const cards = deck.createDeck(mockTypes, mockValues);

        expect(cards).toEqual(mockDeck);
    });

    test('shuffleDeck should shuffle deck', () => {
        jest.spyOn(Deck.prototype, 'getRandomIndex')
            .mockImplementation(() => 1)
            .mockImplementationOnce(() => 3)
            .mockImplementationOnce(() => 2)
            .mockImplementationOnce(() => 0);

        expect(deck.shuffleDeck(mockDeck)).toEqual(mockShuffledDeck);
    });
});