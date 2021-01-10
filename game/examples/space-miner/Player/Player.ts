import Physics from '../../../../physics/src';

// TODO: Unfortunately can't be a single file, separate file per animation. Aseprite doesn't support
import PlayerAnimations from './Player.ase';


// TODO: Create custom webpack loader that returns in this form
// TODO: Later optimize things
function extractAnimations() {
    // PlayerAnimations.frames[0].
    // PlayerAnimations.frames?
}

interface Animation {

}
// import GameObject from './GameObject';

// function GameObject(properties) {
    
// }

// interface GameObjectMetadata {
//     // Gets animation from single spritesheet by id
//     // Control 
//     animations: {
//         name: string;  // Name of the image sequence to use for this animation
//                        // It's possible to define multiple animations for the same set of images
//         interpolation: 'Linear'; // TODO: What other matches?
//         // rotation, scale etc
//         duration: number; // ms
//         // frameModifiers; // TODO: Define this. Used when a frame needs to be held etc
//         // TODO: Throw if no match
//     }[],
// }
// function GameObject(o){ return o; }
// @GameObject({

// })
export default class Player {
    type = 'Player'; // NOTE: Not really needed with class based approach. Can generate at build or runtime
    body;
    renderBody;

    constructor({ x, y }) {
        this.body = Physics.Bodies.rectangle({
            x,
            y,
            width: 10,
            height: 15,
            mass: 1,
        });

        // Animations
        // Assumptions: global spritesheet
        // Spritesheet is produced during build
        // Can we get build time type safety?
        
        // Idea:
        // Webpack loader for animations
        // animations: [{
        //   frames: require('./animations/Walk'),
        //   interpolation: 'linear',
        //   duration: '2s',
        // }]
        // ./Walk
        //

        // Idea:
        // - Render body is just an image, animation lives outside renderer (timer/tween)
        // - Initially, generate spritesheets at runtime, './Walk'
        // - Long term, add build step
        // - Specifics of animation defined in decorator
        // - Is decorator better than populating properties?
        //  Main advantage is easier parsing, everything defined up front 
        // const animations = [
        //     require('./Walk')
        // ]
        // TODO: How to best structure this?
        // Image will always refer to spritemap
        this.renderBody = {
            // Image will be altered on animation schedule
            // image: game.assetLoader.get('images/pilot-spritesheet.png'),
            // activeFrame: 'walkFrameOne',
        }
    }
}

// // function createPlayer(game: Game<GameState>, { x, y }) {

// //     let cancelWalkAnimation = null;
// //     const player = game.createGameObject({
// //         type: 'Player',
// //         // TODO: Should input handlers still be per obj, but global handler calls them?
// //         input: {
// //             keys: {
// //                 'a': {
// //                     onKeyDown,
// //                     onKeyUp,
// //                 },
// //                 'd': {
// //                     onKeyDown,
// //                     onKeyUp,
// //                 },
// //             },
// //         },
// //         body: Physics.Bodies.rectangle({
// //             x,
// //             y,
// //             width: 10,
// //             height: 15,
// //             mass: 1,
// //         }),
// //         renderBody: {
// //             image: game.assetLoader.get('images/pilot-spritesheet.png'),
// //             activeFrame: 'walkFrameOne',
// //             scale: {
// //                 x: 1,
// //                 y: 1,
// //             },
// //             frames: {
// //                 walkFrameOne: { x: 7, y: 18, width: 12, height: 16 },
// //                 walkFrameTwo: { x: 24, y: 17, width: 11, height: 16 },
// //                 walkFrameThree: { x: 41, y: 18, width: 9, height: 15 },
// //                 walkFrameFour: { x: 57, y: 17, width: 10, height: 16 },
// //                 walkFrameFive: { x: 72, y: 18, width: 8, height: 15 },
// //             }
// //         },
// //     });
// //     return player;
// // }
