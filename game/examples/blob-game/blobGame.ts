import { createGame, Game, GameObject } from '../../src/index';
import Physics from '../../../physics/src';
import v from '../../../physics/src/vectorUtils';

import createPlayer from './createPlayer';
import createWorldBounds from './createWorldBounds';
import createDot from './createDot';

setupGame();

async function setupGame() {
    // const worldBounds : []

    // TODO: Camera follows player
    const game = await createGame<GameState>({
        width: 800,
        height: 600,
        container: document.body,
        targetGameLogicFrameRate: 30,
        // camera: {
        //     origin: { x: 0, y: 0 }
        // },
        update,
        // TODO: Do we need to use game object to instantiate players?
        getInitialState: game => ({
            dots: [],
            player: createPlayer(game, { x: 400, y: 200 }),
            worldBounds: createWorldBounds(game),
        }),
        // TODO: Do this in some better fashion...
        getWorld(state) {
            return [
                state.player,
                ...state.dots,
                ...state.worldBounds,
            ];
        },
    });


    game.start();
    // TODO: Should be part of game?
    start();

    function start() {
        const MAX_DOTS = 50;
        game.timerManager.createIntervalTimer(() => {
            if (game.state.dots.length >= MAX_DOTS) {
                return;
            }
            const dot = createDot(game, v.random({
                min: { x: 0, y: 0 },
                max: { x: game.width, y: game.height },
            }))

            game.state.dots.push(dot);
        }, 500);
    }

    function update() {

    }
}



interface GameState {
    game?: Game<GameState>; // TODO: Don't use full game representation here
    player?: GameObject;
    dots?: GameObject[];
    worldBounds?: GameObject[]; // TODO: Should we do this by default?
}
