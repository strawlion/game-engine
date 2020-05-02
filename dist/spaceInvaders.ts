import createGame from '../../src/index';
import Physics from '../../physics';
import Renderer from '../../render';

const gameConfig = {
    width: 800,
    height: 600,
};

// Add renderer
const renderer = Renderer.createRenderer(gameConfig);
document.body.appendChild(renderer.view);

const game = createGame({
    targetGameLogicFrameRate: 60,
    onStart,
    update,
    render,
});



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
