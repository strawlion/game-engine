import Body from '../physics/Body';
import Renderer from '../render';
import Physics from '../physics';
import GameObject from './GameObject';

interface GameConfig {
    width: number;
    height: number;
    targetGameLogicFrameRate: number;
    onStart?: () => void;
    // processInput: () => any;
    update?: () => void;
    render?: (distanceBetweenGameLogicFrames: number) => void;
}

type InputEventId = 'w' | 'a' | 's' | 'd' | ' ';

// TODO: Should we allow
type InputEventHandler = (() => void) | {
    onKeyDown?: () => void;
    onKeyUp?: () => void;
}
interface GameObjectConfig {
    type: string;
    body: Body;
    image?: string;
    input?: Partial<Record<InputEventId, InputEventHandler>>;
    start?: () => void;
    update?: () => void;
    onCollision?: (otherObject: GameObject) => void;
}

// TODO: Extract pixi to a plugin (SOC)

// PIXI
// const renderObjectContainer = new PIXI.Container();
// app.stage.addChild(renderObjectContainer);
// PIXI

// TODO: Stage, container
// https://github.com/Coder2012/pixi/tree/master/spaceshooter
// https://codepen.io/celsowhite/pen/XWbEzpx

export {
    createGame,
    GameObject,
};

export interface Game {
    width: number;
    height: number;
    start: () => any;
    renderer: ReturnType<typeof Renderer.createRenderer>;
    physics: typeof Physics;
    inputManager:  ReturnType<typeof getInputManager>;
    createGameObject: (config: GameObjectConfig) => GameObject;
    assetLoader: ReturnType<typeof Renderer.createAssetLoader>;
    world: GameObject[];
}

function createGame(config: GameConfig): Game {

    const {
        targetGameLogicFrameRate,
        update,
        render,
    } = config;

    const renderer = Renderer.createRenderer(config);
    const inputManager = getInputManager(renderer.view);

    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;

    const assetLoader = Renderer.createAssetLoader();

    const game: Game = {
        width: config.width,
        height: config.height,
        start,
        renderer,
        physics: Physics,
        inputManager,
        createGameObject,
        assetLoader,
        world: [],
    };

    return game;

    // TODO: Can we get away with not attaching update to game object?
    // e.g. having objects attach their own handlers to game.onUpdate
    function createGameObject(config: GameObjectConfig): GameObject {

        const gameObject: GameObject = {
            ...config,
            isDestroyed: false,
            destroy() {
                // @ts-ignore
                gameObject.isDestroyed = true;
            }
        };

        if (config.image) {
            gameObject.renderBody = {
                image: assetLoader.get(config.image)
            };
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
                    if (update) {
                        update();
                    }

                    Physics.nextTick(game, game.world);

                    // Update - Trigger handlers
                    for (const gameObject of game.world) {
                        if (gameObject.update) {
                            gameObject.update();
                        }
                    }

                    // TODO: Is this right place for remove? Can we avoid mutability
                    // by doing removal externally? A lot of work for the game creator though
                    game.world = game.world.filter(object => !object.isDestroyed);
                })()

                timeBehindRealWorld -= MS_PER_UPDATE;
            }

            const distanceBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;

            // Render - Variable timestep
            (() => {
                game.renderer.nextTick(game.world);
                if (render) {
                    render(distanceBetweenGameLogicFrames);
                }
            })()

            previousTime = currentTime;
            window.requestAnimationFrame(nextTick);
        }
    }

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
    }, true);
    element.ownerDocument.addEventListener('keyup', event => {
        keyToIsDown[event.key.toLowerCase()] = false;
        const eventHandlers = keyToKeyDownHandlers[event.key.toLowerCase()] || [];
        eventHandlers.forEach(handler => handler());
    }, true);

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
