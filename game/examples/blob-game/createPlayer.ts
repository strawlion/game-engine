import { Game } from '../../src/index';
import Physics from '../../../physics/src';
import v from '../../../physics/src/vectorUtils';
import Circle from '../../../physics/src/body/Circle';

export default function createPlayer(game: Game<any>, { x, y }) {
    const circleBody = Physics.Bodies.circle({
        x,
        y,
        radius: 25,
    });

    const numPoints = 360;
    const radius = 25;
    const polygonBody = Physics.Bodies.polygon({
        x,
        y,
        points: generateUniformCircleEdgePoints({
            getRadius: () => radius, 
            numPoints,
        }),
    });


    const player = game.createGameObject({
        type: 'Player',
        
        // TODO: Should input handlers still be per obj, but global handler calls them?
        // TODO: How can we make it easy to handle different control schemes? should not be hardbound to keyboard/mouse
        // input: {
        //     keys: {
        //         'w': {
        //             onKeyDown: updatePlayerVelocity,
        //             onKeyUp: updatePlayerVelocity,
        //         },
        //         'a': {
        //             onKeyDown: updatePlayerVelocity,
        //             onKeyUp: updatePlayerVelocity,
        //         },
        //         's': {
        //             onKeyDown: updatePlayerVelocity,
        //             onKeyUp: updatePlayerVelocity,
        //         },
        //         'd': {
        //             onKeyDown: updatePlayerVelocity,
        //             onKeyUp: updatePlayerVelocity,
        //         },
        //     },
        //     mouse: {
        //         // TODOHIGH: move to update function. 
        //         onMouseMove(mouseInfo) {
        //             // player.body.rotation = v.lookTowards(player.body, mouseInfo);
        //             const movement = v.clamp(
        //                 v.divide(v.subtract(mouseInfo, player.body), 20),
        //                 {
        //                     max: { x: 4, y: 4 }
        //                 }
        //             );

        //             player.body.x += movement.x;
        //             player.body.y += movement.y;
        //         },
        //     }
        // },
        body: circleBody,
        renderBody: {
            style: { 
                fill: 'red', 
                stroke: 'darkred',
                lineWidth: 10,
            },
            shape: circleBody, // TODO: Polygon body
        },
        start() {
            
            
        },
        update() {
            // TODOHIGH - do this as an animation, not hardcoded 4 all polygon
            // const t = Date.now();
            
            // draw sine wave at edge of circle, simulate ripple
            // TODO: Smooth blob animation
            // this.counter = this.counter || 1;
            // if (this.counter % 10 === 0) {
            //     const waveSize = 1;
            //     const frequencyDivisor = 2.5;
            //     polygonBody.points = generateUniformCircleEdgePoints({
            //         getRadius: angle => radius + Math.sin(this.counter + angle ) * 5/*Math.random() * 50*/,//(waveSize * Math.sin(this.counter + angle / frequencyDivisor)),
            //         numPoints,
            //     });
            // }
            // this.counter += 1;
            
            if (game.inputManager.mouseInfo.gamePosition) {
                const movement = v.clamp(
                    v.divide(v.subtract(game.inputManager.mouseInfo.gamePosition, player.body), 20),
                    {
                        max: { x: 4, y: 4 }
                    }
                );
    
                player.body.x += movement.x;
                player.body.y += movement.y;
            }

            game.camera.origin = {
                x: player.body.x - game.width / 2,
                y: player.body.y - game.height / 2,
            };
        },
        onCollision(otherObj) {
            if (otherObj.type === 'Dot') {
                circleBody.radius += 1;
            }
        },
    });
    return player;

    // TODO: Should we modify player here or in the store?
    // Store is better since we may need to update other objects
    function updatePlayerVelocity() {
        const velocity = { x: 0, y: 0 };
        const speed = 2;
        // game.inputManager
        // .ifKeyDown('w', () => velocity.y -= speed)
        // .ifKeyDown('a', () => velocity.x -= speed)
        // .ifKeyDown('s', () => velocity.y += speed)
        // .ifKeyDown('d', () => velocity.x += speed)


        player.body.velocity = velocity;
    }
}
// TODO: Build library helper
function generateUniformCircleEdgePoints({ getRadius, numPoints }) {
    const points = [];
    
    const endPoint = Math.PI * 2;
    const stepSize = endPoint / numPoints;
    for (let angle = 0; angle < endPoint; angle += stepSize) {
        points.push({
            x: Math.cos(angle) * getRadius(angle),
            y: Math.sin(angle) * getRadius(angle),
        });
    }
    return points;
}