import { Game } from './core/game';

window.game = new Game;

// Start Game Loop
gameLoop(0);

function gameLoop(time) {
    requestAnimationFrame(gameLoop);
    TWEEN.update(time);
}
