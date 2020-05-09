import Bodies from './Bodies';
import Body from './Body';
import Vector from './Vector';
import SpatialHashmap from './SpatialHashmap';

interface PhysicsObject {
    body: Body;
    onCollision?: (otherObject: PhysicsObject) => any;
}

export default {
    Bodies,
    nextTick,
};


function nextTick(objects: PhysicsObject[]) {
    for (const object of objects) {
        // Update position
        const velocity = {
            x: 0,
            y: 0,
            ...object.body.velocity,
        }
        object.body.x += velocity.x;
        object.body.y += velocity.y;
    }

    checkForCollisions(objects);
}

// TODO: Support different collision detection schemes
// TODO: Do we want to check non-collideable objects?
function checkForCollisions(objects: PhysicsObject[]) {
    // TODO: Don't recreate on each tick
    const worldGrid = new SpatialHashmap({ width: 100, height: 100, cellSize: 10 });

    objects.forEach(object => worldGrid.add(object));

    const potentiallyCollidingCells = worldGrid.filterCell(cell => cell.objects.length > 1);
    const objectToPreviouslyCollided = new Map<PhysicsObject, Set<PhysicsObject>>();

    for (const cell of potentiallyCollidingCells) {
        forEachPair<PhysicsObject>(cell.objects, checkForCollision);
    }

    function checkForCollision(object: PhysicsObject, otherObject: PhysicsObject) {
        if (isTouching(object.body, otherObject.body)) {
            handleCollision(object, otherObject);
            handleCollision(otherObject, object);
        }
    }

    function handleCollision(object: PhysicsObject, otherObject: PhysicsObject) {
        if (object.onCollision && !hasPreviouslyCollided(object, otherObject)) {
            object.onCollision(otherObject);
            markPreviouslyCollided(object, otherObject);
        }
    }

    function markPreviouslyCollided(object: PhysicsObject, otherObject: PhysicsObject) {
        if (!objectToPreviouslyCollided.has(object)) {
            objectToPreviouslyCollided.set(object, new Set());
        }

        objectToPreviouslyCollided.get(object).add(otherObject);
    }

    function hasPreviouslyCollided(object: PhysicsObject, otherObject: PhysicsObject) {
        return objectToPreviouslyCollided.has(object) && objectToPreviouslyCollided.get(object).has(otherObject);
    }
}


function isTouching(body: Body, otherBody: Body) {
    return distanceBetween(body, otherBody) <= (body.radius + otherBody.radius);
}

function distanceBetween(point: Vector, otherPoint: Vector) {
    return Math.sqrt((point.x - otherPoint.x) ** 2 + (point.y - otherPoint.y) ** 2);
}

function forEachPair<T>(values, fn: (value: T, otherValue: T) => any) {
    for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j <values.length; j++) {
            fn(values[i], values[j]);
        }
    }
}
