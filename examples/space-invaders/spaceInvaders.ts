import gameEngine from '../../src/index';
import createSpaceInvaderUtils from './createSpaceInvaderUtils';


const { createGame } = gameEngine;

const game = createGame({
    width: 800,
    height: 600,
    targetGameLogicFrameRate: 60,
});

document.body.appendChild(game.renderer.view);

const utils = createSpaceInvaderUtils(game);
game.world = [
    ...utils.createInvaderWaveOne(),
    utils.createPlayer({ x: 400, y: 200 }),
];

game.start();

// TODO:
// - Make it easy to create game objects
// - Input management
// - Collision handling
// - Make it easy to use percentages rather than absolute positioning
// https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
