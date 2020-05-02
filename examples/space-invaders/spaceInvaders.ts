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
    update,
    render,
});



// Create Player
const player = Physics.Bodies.circle(400, 200, 25);

// Create invaders
const invaders = [];
for (let i = 0; i < 5; i++) {
    invaders.push(
        Physics.Bodies.circle(
            (gameConfig.width * 0.2 * (i + .5)),
            gameConfig.height * 0.10,
            15
        )
    )
}

const world = [
    ...invaders,
    player,
];

game.start();


function update() {
    Physics.nextTick(world);
}

function render(distanceBetweenGameLogicFrames: number) {
    renderer.nextTick(world);
}
