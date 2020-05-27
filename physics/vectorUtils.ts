import Vector from './Vector';

export default {
    add,
    subtract,
    multiply,
    divide,
    magnitude,
    direction,
    normalize,
    lookTowards,
};

function multiply(vector: Vector, value: number): Vector {
    return {
        x: vector.x * value,
        y: vector.y * value,
    };
}

function divide(vector: Vector, value: number) {
    return {
        x: vector.x / value,
        y: vector.y / value,
    };
}

function add(vector: Vector, value: number | Vector): Vector {
    const addX = typeof value === 'number' ? value : value.x;
    const addY = typeof value === 'number' ? value : value.y;
    return {
        x: vector.x + addX,
        y: vector.y + addY,
    };
}

function subtract(vector: Vector, value: number | Vector): Vector {
    const subX = typeof value === 'number' ? value : value.x;
    const subY = typeof value === 'number' ? value : value.y;
    return {
        x: vector.x - subX,
        y: vector.y - subY,
    };
}

function magnitude(vector: Vector): number {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

function normalize(vector: Vector): Vector {
    return divide(vector, magnitude(vector));
}

function distanceBetween(vector: Vector, otherVector: Vector): Vector {
    return subtract(vector, otherVector);
}

function clone(vector: Vector): Vector {
    return {
        ...vector,
    };
}

function direction(radians: number): Vector {
    return {
        x: Math.sin(radians),
        y: -Math.cos(radians),
    };
}

// https://www.gamefromscratch.com/post/2012/11/18/GameDev-math-recipes-Rotating-to-face-a-point.aspx
function lookTowards(pointToRotate: Vector, pointShouldBeFacing: Vector): number {
    // Get distance between the two objects
    const distanceVector = distanceBetween(pointShouldBeFacing, pointToRotate);
    const angle = Math.atan2(distanceVector.y, distanceVector.x);

    return (
        angle +
        Math.PI/2 // atan2 assumes 0 is looking right. Our engine assumes its looking up, so adjust for this
    );
}
