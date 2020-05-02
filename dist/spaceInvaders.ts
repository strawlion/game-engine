import gameEngine from '../../src/index';
import Physics from '../../physics';
import Renderer from '../../render';
import rxjs from 'rxjs';

const { createGame } = gameEngine;
const gameConfig = {
    width: 800,
    height: 600,
};

// Add renderer
const renderer = Renderer.createRenderer(gameConfig);
document.body.appendChild(renderer.view);

const inputManager = getInputManager(renderer.view);

const game = createGame({
    targetGameLogicFrameRate: 60,
    onStart,
    update,
    render,
});

// TODO:
// - Make it easy to create game objects
// - Input management
// - Collision handling
// - Make it easy to use percentages rather than absolute positioning
// https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/


// Create invaders
const invaders = [];
for (let i = 0; i < 5; i++) {
    invaders.push(
        Physics.Bodies.circle({
            x: (gameConfig.width * 0.2 * (i + .5)),
            y: gameConfig.height * 0.10,
            radius: 15,
        })
    )
}


// Create Player
const player = Physics.Bodies.circle({ x: 400, y: 200, radius: 25 });

const world = [
    ...invaders,
    player,
];

game.start();

function onStart() {
    invaders.forEach(invader => {
        invader.velocity = { x: 1, y: 0 };
    })

    // Configure player keys
    const keys = ['w', 'a', 's', 'd'];
    for (const key of keys) {
        inputManager.onKeyDown(key, updatePlayerVelocity)
                    .onKeyUp(key, updatePlayerVelocity);
    }
}

// function processInput() {

// }

function updatePlayerVelocity() {
    const velocity = { x: 0, y: 0 };
    inputManager
        .ifKeyDown('w', () => velocity.y -= 1)
        .ifKeyDown('a', () => velocity.x -= 1)
        .ifKeyDown('s', () => velocity.y += 1)
        .ifKeyDown('d', () => velocity.x += 1)
    player.velocity = velocity;
}

function update() {

    const firstInvader = invaders[0];
    const lastInvader = invaders[invaders.length - 1];
    const isFirstInvaderOffLeftSide = (firstInvader.x - firstInvader.radius) <= 0;
    const isLastInvaderOffRightSide = (lastInvader.x + lastInvader.radius) >= gameConfig.width;
    if (isFirstInvaderOffLeftSide || isLastInvaderOffRightSide) {
        invaders.forEach(invader => invader.velocity.x *= -1);
        invaders.forEach(invader => invader.y += gameConfig.height * .01);
    }

    Physics.nextTick(world);
}

function render(distanceBetweenGameLogicFrames: number) {
    renderer.nextTick(world);
}



// TODO: Process events off update loop, use velocity instead of modifying x/y
// TODO: Abstract out
// TODO: Foreign key layouts?
// NOTE: Case sensitive at the moment
function getInputManager(element) {
    const keyToIsDown = {};
    const keyToKeyDownHandlers = {};
    const keyToKeyUpHandlers = {};

    // TODO: Should we set this on the input element instead?
    element.ownerDocument.addEventListener('keydown', event => {
        keyToIsDown[event.key.toLowerCase()] = true;
        const eventHandlers = keyToKeyDownHandlers[event.key.toLowerCase()] || [];
        eventHandlers.forEach(handler => handler());
    });
    element.ownerDocument.addEventListener('keyup', event => {
        keyToIsDown[event.key.toLowerCase()] = false;
        const eventHandlers = keyToKeyDownHandlers[event.key.toLowerCase()] || [];
        eventHandlers.forEach(handler => handler());
    });

    const inputManager = {
        isKeyDown,
        ifKeyDown,
        onKeyDown,
        onKeyUp,
    };
    return inputManager;


    function isKeyDown(key) {
        return keyToIsDown[key];
    }

    // TODO: allow mapping multiple keys to same event
    // TODO: Naming, Down or press?
    function ifKeyDown(key, fn) {
        if (isKeyDown(key)) {
            fn();
        }
        return inputManager;
    }

    function onKeyDown(key, fn) {
        const eventHandlers = keyToKeyDownHandlers[key] = keyToKeyDownHandlers[key] || [];
        eventHandlers.push(fn);
        return inputManager;
    }
    function onKeyUp(key, fn) {
        const eventHandlers = keyToKeyUpHandlers[key] = keyToKeyUpHandlers[key] || [];
        eventHandlers.push(fn);
        return inputManager;
    }
}
