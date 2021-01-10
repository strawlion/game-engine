import Renderer from '../../render';
import Physics from '../../physics/src';
import GameObject from './GameObject';
import GameObjectConfig from './GameObjectConfig';
import Game from './Game';
import getInputManager from './input/createInputManager';
import GameConfig from './GameConfig';
import createTimerManager from './timer/createTimerManager';

export default createGame;


async function createGame<GameState extends BaseGameState<GameState>>(config: GameConfig<GameState>): Promise<Game<GameState>> {

    const {
        targetGameLogicFrameRate = 60,
        update,
        getInitialState,
        getWorld,
        initialize,
        container,
        camera = { 
            origin: { x: 0, y: 0 } 
        },
    } = config;


    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;


    // TODO: Should we create these with noop mocks instead of null?
    const IS_HEADLESS_MODE = !container;
    let renderer = null;
    let inputManager = null;
    let assetLoader = null;
    if (!IS_HEADLESS_MODE) {
        renderer = Renderer.createRenderer({ ...config, camera });
        inputManager = getInputManager({
            canvasElement: renderer.view,
            camera,
        });
        assetLoader = Renderer.createAssetLoader();
        container.appendChild(renderer.view);
    }


    const game: Game<GameState> = {
        width: config.width,
        height: config.height,
        
        start,
        createGameObject,

        camera,
        renderer,
        physics: Physics,
        inputManager,
        timerManager: createTimerManager({
            targetGameLogicFrameRate,
        }),
        assetLoader,
    };

    if (initialize) {
        await initialize(game);
    }

    game.state = getInitialState(game);

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
        let previousTime = Date.now();
        let timeBehindRealWorld = 0;
        
        const shouldReportFPS = false;
        let previousReportedFpsTimestamp = Date.now();
        const FPS_REPORT_INTERVAL = 1000;
        
        // TODO: model events better on game objects
        for (const gameObject of getWorld(game.state)) {
            if (gameObject.start) {
                gameObject.start();
            }
        }

        nextTick();

        function nextTick() {
            const now = Date.now();
            const currentTime = now;

            // Log FPS if enabled
            if (shouldReportFPS && previousReportedFpsTimestamp < (now - FPS_REPORT_INTERVAL)) {
                const fps = 1000 / (currentTime - previousTime);
                console.log(fps);
                previousReportedFpsTimestamp = now;
            }
            
            // TODO: How to handle pausing?
            const elapsedTime = currentTime - previousTime;
            timeBehindRealWorld += elapsedTime;


            // Fixed Game Logic timestep - TODO: bail after num iterations
            while (timeBehindRealWorld >= MS_PER_UPDATE) {
                nextLogicTick()
                timeBehindRealWorld -= MS_PER_UPDATE;
            }

            // Render - Variable timestep
            if (renderer) {
                const distanceBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;
                renderer.nextTick(getWorld(game.state), distanceBetweenGameLogicFrames);
            }

            previousTime = currentTime;
            window.requestAnimationFrame(nextTick);
        }
    }

    function nextLogicTick() {
        if (update) {
            update();
        }

        game.timerManager.nextTimerTick();

        // TODO: Process inputs here
        // processInput();
        

        const world = getWorld(game.state);
        Physics.nextTick(game, world.filter(o => o.body));

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

}


interface BaseGameState<GameState> {
    game?: Game<GameState>;
}

