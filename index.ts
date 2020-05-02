import * as PIXI from 'pixi.js';

interface GameConfig {
    targetGameLogicFrameRate: number;
    update: () => any;
}

// TODO: Extract pixi to a plugin (SOC)

// PIXI
const app = new PIXI.Application();
// const renderObjectContainer = new PIXI.Container();
// app.stage.addChild(renderObjectContainer);
// PIXI

// TODO: Stage, container
// https://github.com/Coder2012/pixi/tree/master/spaceshooter
// https://codepen.io/celsowhite/pen/XWbEzpx

export default createGame;

function createGame(config: GameConfig) {

    const {
        targetGameLogicFrameRate,
        update,
    } = config;

    const MS_PER_UPDATE = 1000 / targetGameLogicFrameRate;


    return {
        view: app.view,
        start,
    };

    function start() {
        let previousTime = Date.now();
        let timeBehindRealWorld = 0;

        while (true) { // TODO: use setTimeout
            const currentTime = Date.now();
            const elapsedTime = currentTime - previousTime;
            previousTime = currentTime;
            timeBehindRealWorld += elapsedTime;

            // process input

            // Fixed Game Logic timestep - TODO: bail after num iterations
            while (timeBehindRealWorld >= MS_PER_UPDATE) {
                update();
                timeBehindRealWorld -= MS_PER_UPDATE;
            }

            const timeBetweenGameLogicFrames = timeBehindRealWorld / MS_PER_UPDATE;

            // Variable render timestep
            updateRenderer(timeBetweenGameLogicFrames);
            previousTime = currentTime;
        }

        function updateRenderer(interpolationFactor) {}
    }

}

//
