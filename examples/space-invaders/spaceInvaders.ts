import { createGame, Game, GameObject } from '../../src/index';
import gameStore from './state/gameStore';
import gameEvents from './state/gameEvents';
import Physics from '../../physics';


setupGame();

async function setupGame() {
    const game = await createGame<GameState>({
        width: 800,
        height: 600,
        container: document.body,
        // update,
        async initialize(game) {
            const assets = [
                'images/galaga-ship.png',
                'images/space-invader.png'
            ];
            await Promise.all(assets.map(game.assetLoader.load))
        },
        state: {
            // TODO: Use iterable, don't recreate array
            getWorld(state) {
                return [
                    ...state.invaders,
                    state.player,
                    ...state.projectiles,
                ];
            },
            events: {
                gameInitialized(state, game: Game<GameState>) {
                    Object.assign(state, {
                        game,
                        invaders: createInvaderWaveOne(game),
                        player: createPlayer(game, { x: 400, y: 200 }),
                        projectiles: [],
                    });
                },
            },

        },
    });


    game.start();

    // function update() {
        // TODO: Don't recreate world every frame, use iterable over multiple arrays
        // game.world = gameStore.getters.world;
    // }
}



// TODO: Should we alias entity.x to entity.gameObject.x
// TODO: Support "container" object
function createInvaderWaveOne(game: Game<GameState>) {
    let invaders = [];
    for (let i = 0; i < 5; i++) {
        const invader = createInvader(game, {
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
                if (otherObj.type === 'Projectile') {
                    game.store.state.invaders = game.store.state.invaders.filter(i => i !== invader);
                }
            },
        });
        invaders.push(invader);
    }


    return invaders;
}


function createInvader(game: Game<GameState>, { x, y, update, onCollision }) {
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


function createPlayer(game: Game<GameState>, { x, y }) {

    const player = game.createGameObject({
        type: 'Player',
        image: 'images/galaga-ship.png',
        // TODO: Should input handlers still be per obj, but global handler calls them?
        input: {
            keys: {
                'w': {
                    onKeyDown: updatePlayerVelocity,
                    onKeyUp: updatePlayerVelocity,
                },
                'a': {
                    onKeyDown: updatePlayerVelocity,
                    onKeyUp: updatePlayerVelocity,
                },
                's': {
                    onKeyDown: updatePlayerVelocity,
                    onKeyUp: updatePlayerVelocity,
                },
                'd': {
                    onKeyDown: updatePlayerVelocity,
                    onKeyUp: updatePlayerVelocity,
                },
                ' ': {
                    onKeyDown: fireBullet,
                },
            },
            mouse: {
                onMouseDown() {

                },
                onMouseMove() {

                },
                onMouseUp() {

                }
            }
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

    function fireBullet() {
        const projectile = game.createGameObject({
            type: 'Projectile',
            body: Physics.Bodies.circle({
                x: player.body.x,
                y: player.body.y,
                radius: 5,
                velocity: getDirectionVector(player.body.rotation),
            }),
            // TODO: On out of bounds
            onCollision(otherObj) {
                // TODO: design objects such that they can't destroy others in their handlers
                // All objects should maintain their own state. Does that make sense?
                if (otherObj.type === 'Invader') {
                    game.store.state.projectiles = game.store.state.projectiles.filter(p => p !== projectile);
                }
            },
        });

        game.store.state.projectiles.push(projectile);
    }
}



interface GameState {
    game?: Game<GameState>; // TODO: Don't use full game representation here
    invaders?: GameObject[];
    player?: GameObject;
    projectiles?: GameObject[]; // TODO: Should we "nest" objects, e.g. since these are "owned" by player, store as field on player?
}

function getDirectionVector(radians) {
    return {
        x: Math.sin(radians),
        y: -Math.cos(radians),
    };
}
