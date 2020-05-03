import Body from '../physics/Body';
import Renderer from '../render';
import Physics from '../physics';

interface GameConfig {
    width: number;
    height: number;
    targetGameLogicFrameRate: number;
    onStart?: () => any;
    // processInput: () => any;
    update?: () => any;
    render?: (distanceBetweenGameLogicFrames: number) => any;
}


interface GameObject {
    body: Body;
    update?: () => any;
}

interface GameObjectConfig {
    body: Body;
    start?: () => any;
    update?: () => any;
}

// TODO: Extract pixi to a plugin (SOC)

// PIXI
// const renderObjectContainer = new PIXI.Container();
// app.stage.addChild(renderObjectContainer);
// PIXI

// TODO: Stage, container
// https://github.com/Coder2012/pixi/tree/master/spaceshooter
// https://codepen.io/celsowhite/pen/XWbEzpx

export default {
    createGame,
};

export interface Game {
    width: number;
    height: number;
    start: () => any;
    renderer: ReturnType<typeof Renderer.createRenderer>;
    physics: typeof Physics;
    inputManager:  ReturnType<typeof getInputManager>;
    createGameObject: (GameObjectConfig) => GameObject;
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


    const game: Game = {
        width: config.width,
        height: config.height,
        start,
        renderer,
        physics: Physics,
        inputManager,
        createGameObject,
        world: [],
    };
    return game;

    // TODO: Can we get away with not attaching update to game object?
    // e.g. having objects attach their own handlers to game.onUpdate
    function createGameObject(config: GameObjectConfig): GameObject {
        return {
            ...config,
        };
    }


    function start() {
        let previousTime = Date.now();
        let timeBehindRealWorld = 0;

        nextTick();

        function nextTick() {
            window.requestAnimationFrame(nextTick);

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


                    // MAPPING is slow
                    Physics.nextTick(game.world.map(e => e.body));

                    for (const gameObject of game.world) {
                        if (gameObject.update) {
                            gameObject.update();
                        }
                    }
                })()

                timeBehindRealWorld -= MS_PER_UPDATE;
            }

            const distanceBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;

            // Variable render timestep
            (() => {
                game.renderer.nextTick(game.world.map(e => e.body));
                if (render) {
                    render(distanceBetweenGameLogicFrames);
                }
            })()

            previousTime = currentTime;
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
    });
    element.ownerDocument.addEventListener('keyup', event => {
        keyToIsDown[event.key.toLowerCase()] = false;
        const eventHandlers = keyToKeyDownHandlers[event.key.toLowerCase()] || [];
        eventHandlers.forEach(handler => handler());
    });

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
