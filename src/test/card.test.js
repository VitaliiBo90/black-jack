import { Card } from '../js/card.js';

describe('Card ', () => {
    test('should have img.src on instance creation', () => {
        const card = new Card('10', 'S');

        expect(card.img.src).toContain('/cards/10-S.png');
    });
});