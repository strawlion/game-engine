import { createGame } from '../../src/index';
import gameStore from './state/gameStore';
import gameEvents from './state/gameEvents';


setupGame();

async function setupGame() {
    const game = createGame({
        width: 800,
        height: 600,
        targetGameLogicFrameRate: 60,
        update,
    });


    await initGame();

    game.start();

    async function initGame() {
        document.body.appendChild(game.renderer.view);
        const assets = [
            'images/galaga-ship.png',
            'images/space-invader.png'
        ];
        await Promise.all(assets.map(game.assetLoader.load))
        gameEvents.gameInitialized(game);
    }

    function update() {
        // TODO: Don't recreate world every frame, use iterable over multiple arrays
        game.world = gameStore.getters.world;
    }
}

// TODO:
// - Make it easy to create game objects
// - Input management
// - Collision handling
// - Make it easy to use percentages rather than absolute positioning
// https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
