import { GameObject, Game } from '../../../src';
import { createStore } from '../../../stateManager/stateManager';
import Physics from '../../../physics';
import createInputManagerPlugin from './createInputManagerPlugin';

export default createGameStore();

interface GameState {
    game?: Game; // TODO: Don't use full game representation here
    invaders?: GameObject[];
    player?: GameObject;
    projectiles?: GameObject[]; // TODO: Should we "nest" objects, e.g. since these are "owned" by player, store as field on player?
}

function createGameStore() {

    return createStore<GameState>({
        state: {},
        mutations: {
            gameInitialized(state, game: Game) {
                const utils = createSpaceInvaderUtils(game);
                Object.assign(state, {
                    game,
                    invaders: utils.createInvaderWaveOne(),
                    player: utils.createPlayer({ x: 400, y: 200 }),
                });
            },
            keyUp(state, key) {
                const playerMovementKeys =  ['w', 'a', 's', 'd'];
                if (playerMovementKeys.includes(key)) {
                    updatePlayerVelocity(state.game, state.player);
                }
            },
            keyDown(state, key) {
                const playerMovementKeys =  ['w', 'a', 's', 'd'];
                if (playerMovementKeys.includes(key)) {
                    updatePlayerVelocity(state.game, state.player);
                }

                const playerShootKey = ' ';
                if (key === playerShootKey) {
                    // state.projectiles.push(
                        // gameEvents.createGameObject({

                        // })
                    // );
                }

            }
        },
        getters: {
            // TODO: Optimize
            world(state) {
                return [
                    ...state.invaders,
                    state.player,
                ];
            }
        },
        plugins: [
            createInputManagerPlugin(),
        ]
    });
}

function updatePlayerVelocity(game, player) {
    const velocity = { x: 0, y: 0 };
    const speed = 2;
    game.inputManager
    .ifKeyDown('w', () => velocity.y -= speed)
    .ifKeyDown('a', () => velocity.x -= speed)
    .ifKeyDown('s', () => velocity.y += speed)
    .ifKeyDown('d', () => velocity.x += speed)


    player.body.velocity = velocity;
}



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

        const player = game.createGameObject({
            type: 'Player',
            image: 'images/galaga-ship.png',
            // TODO: Should input handlers still be per obj, but global handler calls them?
            input: {
                // 'w': {
                //     onKeyDown: updatePlayerVelocity,
                //     onKeyUp: updatePlayerVelocity,
                // },
                // 'a': {
                //     onKeyDown: updatePlayerVelocity,
                //     onKeyUp: updatePlayerVelocity,
                // },
                // 's': {
                //     onKeyDown: updatePlayerVelocity,
                //     onKeyUp: updatePlayerVelocity,
                // },
                // 'd': {
                //     onKeyDown: updatePlayerVelocity,
                //     onKeyUp: updatePlayerVelocity,
                // },
                // ' ': fireBullet,
            },
            body: Physics.Bodies.circle({
                x,
                y,
                radius: 25,
            }),
        });
        return player;

        // TODO: Should we modify player here or in the store?
        // Store is better since we may need to update other objects
        // function updatePlayerVelocity() {
        //     const velocity = { x: 0, y: 0 };
        //     const speed = 2;
        //     game.inputManager
        //     .ifKeyDown('w', () => velocity.y -= speed)
        //     .ifKeyDown('a', () => velocity.x -= speed)
        //     .ifKeyDown('s', () => velocity.y += speed)
        //     .ifKeyDown('d', () => velocity.x += speed)


        //     player.body.velocity = velocity;
        // }

        // function fireBullet() {

        // }
    }
}
