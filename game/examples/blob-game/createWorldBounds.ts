import { Game } from '../../src/index';
import Physics from '../../../physics/src';

export default function createWorldBounds(game: Game<any>) {
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


    function createWorldBound(game: Game<any>, { x, y, width, height }) {
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

