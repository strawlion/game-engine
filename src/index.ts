import Body from "../physics/Body";

interface GameConfig {
    targetGameLogicFrameRate: number;
    onStart: () => any;
    // processInput: () => any;
    update: () => any;
    render: (distanceBetweenGameLogicFrames: number) => any;
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
    createGameObject,
    createGame,
};

interface GameObjectConfig {
    body: Body,
}

function createGameObject() {

}

function createGame(config: GameConfig) {

    const {
        targetGameLogicFrameRate,
        onStart,
        update,
        render,
    } = config;

    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;


    return {
        start,
    };

    function start() {
        let previousTime = Date.now();
        let timeBehindRealWorld = 0;

        onStart();
        nextTick();

        function nextTick() {
            window.requestAnimationFrame(nextTick);

            const currentTime = Date.now();
            const elapsedTime = currentTime - previousTime;
            timeBehindRealWorld += elapsedTime;

            // processInput();

            // Fixed Game Logic timestep - TODO: bail after num iterations
            while (timeBehindRealWorld >= MS_PER_UPDATE) {
                update();
                timeBehindRealWorld -= MS_PER_UPDATE;
            }

            const distanceBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;

            // Variable render timestep
            render(distanceBetweenGameLogicFrames);
            previousTime = currentTime;
        }
    }

}
