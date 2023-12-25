require.context('../cards', true);
require.context('../css', true);
import { Game } from './game.js';

/**
 * Initialize Game
 */
window.onload = function() {
    new Game();
}
