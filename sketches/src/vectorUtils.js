export default {
    add,
    subtract,
    divide,
    multiply,
    getMagnitude,
    getPerpendicular,
};

function subtract(vector, otherVector) {
    if (typeof otherVector === 'number') {
        otherVector = { x: otherVector, y: otherVector };
    }

    return {
        x: vector.x - otherVector.x,
        y: vector.y - otherVector.y,
    };
}

function add(vector, otherVector) {
    if (typeof otherVector === 'number') {
        otherVector = { x: otherVector, y: otherVector };
    }
    return {
        x: vector.x + otherVector.x,
        y: vector.y + otherVector.y,
    };
}

function divide(vector, otherVector) {
    if (typeof otherVector === 'number') {
        otherVector = { x: otherVector, y: otherVector };
    }
    return {
        x: vector.x / otherVector.x,
        y: vector.y / otherVector.y,
    }
}

function multiply(vector, otherVector) {
    if (typeof otherVector === 'number') {
        otherVector = { x: otherVector, y: otherVector };
    }
    return {
        x: vector.x * otherVector.x,
        y: vector.y * otherVector.y,
    }
}

function getMagnitude(vector) {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

function getPerpendicular(vector) {
    return {
        x: vector.y,
        y: -vector.x
    };
}
