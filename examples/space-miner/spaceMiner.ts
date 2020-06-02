import { createGame, Game, GameObject } from '../../src/index';
import Physics from '../../physics';
import v from '../../physics/vectorUtils';
import terrainGenerationUtils from '../../src/terrainGeneration/terrainGenerationUtils';

// const result = terrainGenerationUtils.generateCellularGrid({
//     width: 10,
//     height: 10,
//     chanceToStartAlive: 0.45,
//     neighborLimits: [1, 3],
//     birthNumber: 3,
//     numberOfSteps: 3,
// });


setupGame();

async function setupGame() {
    const game = await createGame<GameState>({
        width: 800,
        height: 600,
        container: document.body,
        // update,
        async initialize(game) {
            const assets = [
                'images/mech-spritesheet.png',
                'images/pilot-spritesheet.png',
            ];
            await Promise.all(assets.map(game.assetLoader.load))
        },
        state: {
            // TODO: Use iterable, don't recreate array
            getWorld(state) {
                return [
                    state.player,
                    ...state.terrain,
                ];
            },
            events: {
                gameInitialized(state, game: Game<GameState>) {
                    Object.assign(state, {
                        game,
                        player: createPlayer(game, { x: 400, y: 200 }),
                        // mech: createMech(game, { x: 500, y: 200 }),
                        worldBounds: createWorldBounds(game),
                        terrain: generateTerrain(game),
                    });
                },
            },

        },
    });


    game.start();
}



function createPlayer(game: Game<GameState>, { x, y }) {

    let cancelWalkAnimation = null;
    const player = game.createGameObject({
        type: 'Player',
        // TODO: Should input handlers still be per obj, but global handler calls them?
        input: {
            keys: {
                'a': {
                    onKeyDown,
                    onKeyUp,
                },
                'd': {
                    onKeyDown,
                    onKeyUp,
                },
            },
        },
        body: Physics.Bodies.rectangle({
            x,
            y,
            width: 10,
            height: 15,
            mass: 1,
        }),
        renderBody: {
            image: game.assetLoader.get('images/pilot-spritesheet.png'),
            activeFrame: 'walkFrameOne',
            scale: {
                x: 1,
                y: 1,
            },
            frames: {
                walkFrameOne: { x: 7, y: 18, width: 12, height: 16 },
                walkFrameTwo: { x: 24, y: 17, width: 11, height: 16 },
                walkFrameThree: { x: 41, y: 18, width: 9, height: 15 },
                walkFrameFour: { x: 57, y: 17, width: 10, height: 16 },
                walkFrameFive: { x: 72, y: 18, width: 8, height: 15 },
            }
        },
    });
    return player;

    function onKeyDown() {
        updatePlayerVelocity();

        const isWalkingLeft = game.inputManager.isKeyDown('a');
        player.renderBody.scale.x = isWalkingLeft ? -1 : 1;

        if (!cancelWalkAnimation) {
            const walkFrames = Object.entries(player.renderBody.frames)
                                    .map(([id, frame]) => ({ id, ...frame }))
            cancelWalkAnimation = createAnimation(walkFrames, {
                timeBetweenFrames: 100,
                onFrameChanged: frame => {
                    player.renderBody.activeFrame = frame.id;
                }
            });
        }
        createAnimation
    }

    function onKeyUp() {
        updatePlayerVelocity();

        const isWalking = game.inputManager.isKeyDown('a') || game.inputManager.isKeyDown('d');
        if (cancelWalkAnimation && !isWalking) {
            cancelWalkAnimation();
            cancelWalkAnimation = null;
        }
    }

    // TODO: Should we modify player here or in the store?
    // Store is better since we may need to update other objects
    function updatePlayerVelocity() {
        const velocity = { x: 0, y: 0 };
        const speed = 2;
        game.inputManager
        .ifKeyDown('a', () => velocity.x -= speed)
        .ifKeyDown('d', () => velocity.x += speed)

        player.body.velocity = velocity;
    }
}

function createWorldBounds(game: Game<GameState>) {
    return [
        // Top
        createWorldBound(game, {
            x: 1,
            y: -1,
            width: game.width,
            height: 1
        }),
        // Left
        createWorldBound(game, {
            x: -1,
            y: 1,
            width: 1,
            height: game.height,
        }),
        // Right
        createWorldBound(game, {
            x: game.width + 1,
            y: 1,
            width: 1,
            height: game.height,
        }),
        // Bottom
        createWorldBound(game, {
            x: 1,
            y: game.height,
            width: game.width,
            height: 1,
        }),
    ];


    function createWorldBound(game: Game<GameState>, { x, y, width, height }) {
        return game.createGameObject({
            type: 'WorldBound',
            body: Physics.Bodies.rectangle({
                x,
                y,
                width,
                height,
            })
        });
    }


}



interface GameState {
    game?: Game<GameState>; // TODO: Don't use full game representation here
    player?: GameObject;
    mech?: GameObject;
    terrain: GameObject[];
}


interface CreateAnimationConfig {
    timeBetweenFrames: number;
    onFrameChanged: (frame: any) => void;
}

function createAnimation(frames: any[], config: CreateAnimationConfig) {
    let currentFrameIdx = 0;

    const intervalId = setInterval(onFrameChanged, config.timeBetweenFrames);

    return cancel;

    function onFrameChanged() {
        currentFrameIdx = (currentFrameIdx + 1) % frames.length;
        config.onFrameChanged(frames[currentFrameIdx]);
    }

    function cancel() {
        clearInterval(intervalId);
    }
}


function generateTerrain(game: Game<GameState>) {
    const { terrainBuilder } = terrainGenerationUtils;
    const grid = terrainBuilder<string>({
        width: 20,
        height: 20,
    })
    .dirt({
        threshold: 1,
        smoothness: 1,
    })
    .cave({
        threshold: 0.31,
        smoothness: 0.15,
    })
    .build();

    console.log(grid)

    // Assuming terrain fills viewport
    const terrainOriginY = 100;
    const numHorizontalBlocks = grid.length;
    const numVerticalBlocks = grid[0].length;
    const blockWidth = game.width / numHorizontalBlocks;
    const blockHeight = (game.height - terrainOriginY) / numVerticalBlocks;

    const terrainBlocks = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const block = grid[x][y];
            const body = Physics.Bodies.rectangle({
                x: x * blockWidth,
                y: terrainOriginY + (y * blockHeight),
                width: blockWidth,
                height: blockHeight,
            })
            terrainBlocks.push(
                game.createGameObject({
                    type: block,
                    body,
                    renderBody: {
                        shape: body,
                        color: {
                            // fill: `rgba(17, 255, 0, ${block})`
                            // `rgb(255, 227, 179, ${block})`

                            // `hsl(100,100%,${block * 100}%)`
                            fill: block === 'cave' ? 'black' : '#573B0C',
                        }

                    }
                })
            );
        }
    }

    return terrainBlocks;
}
