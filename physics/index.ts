import Bodies from './Bodies';
import Body from './Body';
import Vector from './Vector';

export default {
    Bodies,
    nextTick,
};


function nextTick(bodies: Body[]) {
    for (const body of bodies) {
        // Update position
        const velocity = {
            x: 0,
            y: 0,
            ...body.velocity,
        }
        body.x += velocity.x;
        body.y += velocity.y;
    }


    // Collision - Process them
    // TODO: Support different collision detection schemes
    const collisions = [];
    forEachPair<Body>(bodies, ([body, i], [otherBody, j]) => {
        if (isTouching(body, otherBody)) {
            collisions.push([i, j]);
        }
    });

    return {
        collisions,
    };
}


function isTouching(body: Body, otherBody: Body) {
    return distanceBetween(body, otherBody) <= (body.radius + otherBody.radius);
}

function distanceBetween(point: Vector, otherPoint: Vector) {
    return Math.sqrt((point.x - otherPoint.x) ** 2 + (point.y - otherPoint.y) ** 2);
}

function forEachPair<T>(values, fn: (value: [T, number], otherValue: [T, number]) => any) {
    for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j <values.length; j++) {
            fn([values[i], i], [values[j], j]);
        }
    }
}
