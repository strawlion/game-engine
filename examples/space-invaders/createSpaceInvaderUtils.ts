import Physics from '../../physics';
import { Game } from '../../src';

export default createSpaceInvaderUtils;


function createSpaceInvaderUtils(game: Game) {

    return {
        createInvaderWaveOne,
        createPlayer,
    };

    // TODO: Should we alias entity.x to entity.gameObject.x
    // TODO: Support "container" object
    function createInvaderWaveOne() {
        const invaders = [];
        for (let i = 0; i < 5; i++) {
            invaders.push(
                createInvader({
                    x: (game.width * 0.2 * (i + .5)),
                    y: game.height * 0.10,
                    update,
                })
            );
        }

        function update() {
            const firstInvader = invaders[0];
            const lastInvader = invaders[invaders.length - 1];
            const isFirstInvaderOffLeftSide = (firstInvader.body.x - firstInvader.body.radius) <= 0;
            const isLastInvaderOffRightSide = (lastInvader.body.x + lastInvader.body.radius) >= game.width;
            if (isFirstInvaderOffLeftSide || isLastInvaderOffRightSide) {
                invaders.forEach(invader => invader.body.velocity.x *= -1);
                invaders.forEach(invader => invader.body.y += game.height * .01);
            }
        }

        return invaders;
    }


    function createInvader({ x, y, update }) {
        const body = Physics.Bodies.circle({
                        x,
                        y,
                        radius: 15,
                        velocity: { x: 1, y: 0 }, // TODO: Should be done per wave
                    });

        return game.createGameObject({
            body,
            update,
        });
    }

    function createPlayer({ x, y }) {
        const body = Physics.Bodies.circle({
                        x,
                        y,
                        radius: 25,
                    });
        const keys = ['w', 'a', 's', 'd'];
        for (const key of keys) {
            game.inputManager.onKeyDown(key, updatePlayerVelocity)
                            .onKeyUp(key, updatePlayerVelocity);
        }
        return game.createGameObject({
            body,
            onCollision,
        });

        function onCollision(otherObj) {
            console.log(otherObj.body);
        }

        function updatePlayerVelocity() {
            const velocity = { x: 0, y: 0 };
            game.inputManager
                .ifKeyDown('w', () => velocity.y -= 1)
                .ifKeyDown('a', () => velocity.x -= 1)
                .ifKeyDown('s', () => velocity.y += 1)
                .ifKeyDown('d', () => velocity.x += 1)
            body.velocity = velocity;
        }
    }
}
