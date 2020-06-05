import Renderer from '../render';
import Physics from '../physics';
import GameObject from './GameObject';
import { createStore } from '../stateManager/stateManager';
import GameObjectConfig from './GameObjectConfig';
import Game from './Game';
import getInputManager from './input/createInputManager';
import InputEventId from './input/KeyEventId';

export default createGame;


async function createGame<GameState extends BaseGameState<GameState>>(config: GameConfig<GameState>): Promise<Game<GameState>> {

    const {
        targetGameLogicFrameRate = 60,
        update,
        render,
        state,
        initialize,
        container,
    } = config;


    const store = createStore<GameState>({
        // state: {},
        mutations: {
            gameInitialized(state, game: Game<GameState>) {
                Object.assign(state, {
                    game,
                });

                if (config.state.events.gameInitialized) {
                    config.state.events.gameInitialized(state, game);
                }
            },
            update(state) {
                const { game } = state;
                const world = config.state.getWorld(state);
                if (update) {
                    update();
                }


                Physics.nextTick(game, world);

                // Update - Trigger handlers
                for (const gameObject of world) {
                    if (gameObject.update) {
                        gameObject.update();
                    }
                }

                // TODO: Is this right place for remove? Can we avoid mutability
                // by doing removal externally? A lot of work for the game creator though
                // game.world = game.world.filter(object => !object.isDestroyed);
            }
        },
    });


    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;



    // TODO: Should we create these with noop mocks instead of null?
    const IS_HEADLESS_MODE = !container;
    let renderer = null;
    let inputManager = null;
    let assetLoader = null;
    if (!IS_HEADLESS_MODE) {
        renderer = Renderer.createRenderer(config);
        inputManager = getInputManager(renderer.view);
        assetLoader = Renderer.createAssetLoader();
        container.appendChild(renderer.view);
    }


    const game: Game<GameState> = {
        width: config.width,
        height: config.height,
        start,
        renderer,
        physics: Physics,
        inputManager,
        createGameObject,
        assetLoader,
        store,
    };

    if (initialize) {
        await initialize(game);
    }
    store.commit('gameInitialized', game);


    return game;

    // TODO: Can we get away with not attaching update to game object?
    // e.g. having objects attach their own handlers to game.onUpdate
    function createGameObject(config: GameObjectConfig): GameObject {

        const gameObject: GameObject = {
            ...config,
        };

        // TODO: Should we check every time?
        // TODO: Can do this in a more performant way
        // TOOD: How to deregister later
        if (config.input) {
            if (config.input.keys) {
                inputManager.registerKeyEvents(config.input.keys);
            }
            if (config.input.mouse) {
                inputManager.registerMouseEvents(config.input.mouse);
            }

        }

        if (assetLoader) {
            if (config.image) {
                gameObject.renderBody = {
                    image: assetLoader.get(config.image)
                };
            }
        }


        return gameObject;
    }


    function start() {
        if (config.onStart) {
            config.onStart();
        }

        let previousTime = Date.now();
        let timeBehindRealWorld = 0;

        nextTick();

        function nextTick() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - previousTime;
            timeBehindRealWorld += elapsedTime;

            // processInput();

            // Fixed Game Logic timestep - TODO: bail after num iterations
            while (timeBehindRealWorld >= MS_PER_UPDATE) {
                // Update
                (() => {
                    store.commit('update')
                })()

                timeBehindRealWorld -= MS_PER_UPDATE;
            }

            const distanceBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;

            // Render - Variable timestep
            (() => {
                const world = config.state.getWorld(store.state);
                game.renderer.nextTick(world);
                if (render) {
                    render(distanceBetweenGameLogicFrames);
                }
            })()

            previousTime = currentTime;
            window.requestAnimationFrame(nextTick);
        }
    }

}


interface BaseGameState<GameState> {
    game?: Game<GameState>;
}

interface GameConfig<GameState> {
    width: number;
    height: number;
    container: HTMLElement,
    targetGameLogicFrameRate?: number;
    initialize?: (game: Game<GameState>) => (void | Promise<void>);
    state: {
        getWorld: (state: GameState) => GameObject[];
        events: Record<string, (state: GameState, data) => void>;
    };
    onStart?: () => void;
    update?: () => void;
    render?: (distanceBetweenGameLogicFrames: number) => void;
}
