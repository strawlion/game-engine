// import createGame from '../../src/index';
// import Matter from 'matter-js';

// const CollisionGroup = {
//     NO_COLLISION: -1,
// };

// const engine = Matter.Engine.create();
// const render = Matter.Render.create({
//     element: document.body,
//     engine,
// });

// // create two boxes and a ground
// var boxA = Matter.Bodies.rectangle(400, 200, 80, 80, { collisionFilter: { group: CollisionGroup.NO_COLLISION }, });
// var boxB = Matter.Bodies.rectangle(450, 50, 80, 80, { collisionFilter: { group: CollisionGroup.NO_COLLISION } });
// var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// const circle = Matter.Bodies.circle(400, 200, 25, {
//     isStatic: true,
//     collisionFilter: { group: CollisionGroup.NO_COLLISION },
//     // mass: 0,
// })
// // add all of the bodies to the world
// Matter.World.add(engine.world, [boxA, boxB, circle, ground]);

// Matter.Engine.run(engine);
// Matter.Render.run(render);

// // const game = createGame({
// //     targetGameLogicFrameRate: 60,
// //     update,
// //     render,
// // })

// // document.body.appendChild(game.view);
// // game.start();

// function update() {

// }

// // function render(distanceBetweenGameLogicFrames: number) {

// // }
