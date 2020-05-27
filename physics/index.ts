import Bodies from './body/Bodies';
import Body from './body/Body';
import Vector from './Vector';
import SpatialHashmap from './collision/SpatialHashmap';
import Rectangle from './body/Rectangle';
import Circle from './body/Circle';

interface PhysicsObject {
    body: Body;
    onCollision?: (otherObject: PhysicsObject) => any;
}

interface PhysicsWorld {
    height: number;
    width: number;
}
interface PhysicsConfig {
    gravity: Vector;
}

const defaultConfig: PhysicsConfig = {
    gravity: {
        x: 0,
        y: 0,
    },
}

export default {
    Bodies,
    nextTick,
};

// Euler
// acceleration = force(time, position) / mass;
// time += timestep;
// position += timestep * velocity;
// velocity += timestep * acceleration;

// // Verlet
// acceleration = force(time, position) / mass;
// time += timestep;
// position += timestep * (velocity + timestep * acceleration / 2);
// newAcceleration = force(time, position) / mass;
// velocity += timestep * (acceleration + newAcceleration)

function nextTick(world: PhysicsWorld, objects: PhysicsObject[], config: PhysicsConfig = defaultConfig) {
    for (const object of objects) {
        // Update position
        object.body.x += object.body.velocity.x - (config.gravity.x * object.body.mass);
        object.body.y += object.body.velocity.y + (config.gravity.y * object.body.mass);
    }

    checkForCollisions(world, objects);
}

// TODO: Support different collision detection schemes
// TODO: Do we want to check non-collideable objects?
function checkForCollisions(world: PhysicsWorld, objects: PhysicsObject[]) {
    // TODO: Don't recreate on each tick
    const worldGrid = new SpatialHashmap({ width: world.width, height: world.height, cellSize: 10 });

    objects.forEach(object => worldGrid.add(object));

    const potentiallyCollidingCells = worldGrid.filterCell(cell => cell.objects.length > 1);
    const objectToPreviouslyCollided = new Map<PhysicsObject, Set<PhysicsObject>>();

    for (const cell of potentiallyCollidingCells) {
        forEachPair<PhysicsObject>(cell.objects, checkForCollision);
    }

    // TODO: Don't compute collision if neither obj has collision handler
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

// TODO: Logic is wrong for non AABB rects, revisit
// TODO: Optimize performance
function isTouching(body: Body, otherBody: Body) {
    const Shape = {
        circle: {
            circle: areCirclesTouching,
            rectangle: isCircleTouchingRectangle,
        },
        rectangle: {
            rectangle: areRectanglesTouching,
            circle: (rect, circle) => isCircleTouchingRectangle(circle, rect),
        }
    };

    return Shape[body.type][otherBody.type](body, otherBody);

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


function areCirclesTouching(body: Circle, otherBody: Circle) {
    return distanceBetween(body, otherBody) <= (body.radius + otherBody.radius);
}

function areRectanglesTouching(body: Rectangle, otherBody: Rectangle) {
    return (
        // Is the RIGHT edge of r1 to the RIGHT of the LEFT edge of r2?
        ((body.x + body.width) > otherBody.x) &&

        // Is the LEFT edge of r1 to the LEFT of the RIGHT edge of r2?
        (body.x > (otherBody.x + otherBody.width)) &&

        // Is the BOTTOM edge of r1 BELOW the TOP edge of r2?
        ((body.y + body.height) > otherBody.y) &&

        // Is the TOP edge of r1 ABOVE the BOTTOM edge of r2?
        (body.y > (otherBody.y + otherBody.height))
    );
}

// TODO: is this logic correct?
function isCircleTouchingRectangle(circle: Circle, rectangle: Rectangle) {

    // temporary variables to set edges for testing
    let testX = circle.x;
    let testY = circle.y;

    // which edge is closest?
    if (circle.x < rectangle.x) { // test left edge
        testX = rectangle.x;
    }
    else if (circle.x > (rectangle.x + rectangle.width)) {// right edge
        testX = rectangle.x + rectangle.width;
    }
    if (circle.y < rectangle.y) { // top edge
        testY = rectangle.y;
    }
    else if (circle.y > (rectangle.y + rectangle.height)) { // bottom edge
        testY = rectangle.y + rectangle.height;
    }

    // get distance from closest edges
    const distX = circle.x - testX;
    const distY = circle.y - testY;
    const distance = Math.sqrt(distX**2 + distY**2);

    // if the distance is less than the radius, collision!
    return distance <= circle.radius;
}

// TODO: Optimize
// https://gamedev.stackexchange.com/questions/96337/collision-between-aabb-and-circle
function areShapesTouching() {

}
