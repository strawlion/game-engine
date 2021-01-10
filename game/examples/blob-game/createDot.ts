import { Game } from '../../src/index';
import Physics from '../../../physics/src';
import v from '../../../physics/src/vectorUtils';

// Colors
// const colors = [
//     'RGB(153,252,132)', // Sea Green 
//     'RGB(120,30,250)', // DarkPurple,
//     'RGB(166,38,250)', // Light Purple
//     'RGB(59,23,250)', // Blue
// ]
// RGB(122,114,23)
export default function createDot(game: Game<any>, { x, y }) {
    const circleBody = Physics.Bodies.circle({
        x,
        y,
        radius: 8,
    });

    const color = `#${getRandomHex()}`;
    const dot = game.createGameObject({
        type: 'Dot',
        body: circleBody,
        renderBody: {
            style: { 
                fill: color,
                stroke: color,
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
    return Math.floor(Math.random()*16777215).toString(16);
}