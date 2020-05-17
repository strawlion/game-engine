import { createGame } from '../../src/index';
import createGameStore from './state/createGameStore';

let store;
const game = createGame({
    width: 800,
    height: 600,
    targetGameLogicFrameRate: 60,
    onInit(game) {
        document.body.appendChild(game.renderer.view);
        store = createGameStore(game);
    },
    update() {
        // TODO: Don't recreate world every frame, use iterable over multiple arrays
        game.world = store.getters.world;
    }

});




const assets = [
    'images/galaga-ship.png',
    'images/space-invader.png'
];

Promise.all(assets.map(game.assetLoader.load))
        .then(onAssetsLoaded);

function onAssetsLoaded() {
    game.start();
}

// TODO:
// - Make it easy to create game objects
// - Input management
// - Collision handling
// - Make it easy to use percentages rather than absolute positioning
// https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
