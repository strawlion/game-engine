import { Game } from '../../src/index';
import Physics from '../../../physics/src';
import v from '../../../physics/src/vectorUtils';

export default function createDot(game: Game<any>, { x, y }) {
    const circleBody = Physics.Bodies.circle({
        x,
        y,
        radius: 5,
    });

    const color = `#${getRandomHex()}`;
    const dot = game.createGameObject({
        type: 'Dot',
        body: circleBody,
        renderBody: {
            style: { 
                fill: color, 
                stroke: color 
            },
            shape: circleBody,
        },
        onCollision(otherObj) {
            // TODO: design objects such that they can't destroy others in their handlers
            // All objects should maintain their own state. Does that make sense?
            if (otherObj.type === 'Player') {
                game.state.dots = game.state.dots.filter(d => d !== dot);
            }
        },
    });

    return dot;
}


function getRandomHex() {
    return Math.floor(Math.random() * 16).toString();
}