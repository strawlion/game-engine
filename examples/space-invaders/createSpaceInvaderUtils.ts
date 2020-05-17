import Physics from '../../physics';
import { Game, GameObject } from '../../src';

export default createSpaceInvaderUtils;


function createSpaceInvaderUtils(game: Game) {

    return {
        createInvaderWaveOne,
        createPlayer,
    };

    // TODO: Should we alias entity.x to entity.gameObject.x
    // TODO: Support "container" object
    function createInvaderWaveOne() {
        let invaders = [];
        for (let i = 0; i < 5; i++) {
            const invader = createInvader({
                x: (game.width * 0.2 * (i + .5)),
                y: game.height * 0.10,
                update() {
                    if (!invaders.length) {
                        return;
                    }
                    const firstInvader = invaders[0];
                    const lastInvader = invaders[invaders.length - 1];
                    const isFirstInvaderOffLeftSide = (firstInvader.body.x - firstInvader.body.radius) <= 0;
                    const isLastInvaderOffRightSide = (lastInvader.body.x + lastInvader.body.radius) >= game.width;
                    if (isFirstInvaderOffLeftSide || isLastInvaderOffRightSide) {
                        invader.body.velocity.x *= -1;
                        invader.body.y += game.height * .01;
                    }
                },
                onCollision(otherObj) {
                    // TODO: design objects such that they can't destroy others in their handlers
                    // All objects should maintain their own state. Does that make sense?
                    if (otherObj.type === 'Player') {
                        invader.destroy();
                        invaders = invaders.filter(i => i !== invader)
                    }
                },
            });
            invaders.push(invader);
        }


        return invaders;
    }


    function createInvader({ x, y, update, onCollision }) {
        const body = Physics.Bodies.circle({
                        x,
                        y,
                        radius: 15,
                        velocity: { x: 1, y: 0 }, // TODO: Should be done per wave
                    });

        return game.createGameObject({
            type: 'Invader',
            image: 'images/space-invader.png',
            body,
            update,
            onCollision,
        });
    }

    function createPlayer({ x, y }) {
        const keys = ['w', 'a', 's', 'd'];
        for (const key of keys) {
            game.inputManager.onKeyDown(key, updatePlayerVelocity)
                            .onKeyUp(key, updatePlayerVelocity);
        }
        const player = game.createGameObject({
            type: 'Player',
            image: 'images/galaga-ship.png',
            body: Physics.Bodies.circle({
                x,
                y,
                radius: 25,
            }),
        });
        return player;

        function updatePlayerVelocity() {
            const velocity = { x: 0, y: 0 };
            const speed = 2;
            game.inputManager
                .ifKeyDown('w', () => velocity.y -= speed)
                .ifKeyDown('a', () => velocity.x -= speed)
                .ifKeyDown('s', () => velocity.y += speed)
                .ifKeyDown('d', () => velocity.x += speed)
            player.body.velocity = velocity;
        }
    }
}
