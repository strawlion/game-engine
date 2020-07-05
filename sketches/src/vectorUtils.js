export default {
    add,
    subtract,
    divide,
    multiply,
    getMagnitude,
    getPerpendicular,
    dotProduct,
    angleBetween,
    getIntersection,
    distanceBetween,
    equals,
};

// http://processingjs.org/learning/custom/intersect/
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

function dotProduct(vector, otherVector) {
    return (
        vector.x * otherVector.x +
        vector.y * otherVector.y
    );
}

function equals(vector, otherVector) {
    return vector.x === otherVector.x && vector.y === otherVector.y;
}

// TODO: Does this always find smaller angle?
// If not, subtract angle from 2PI
function angleBetween(vector, otherVector) {
    const angle = Math.atan2(otherVector.y, otherVector.x) - atan2(vector.y, vector.x);
    return angle < 0 ?  (angle + 2 * M_PI) : angle; // Normalize to [0, 2PI]
}

// Does not apply in 2d?
// function crossProduct(vector, otherVector) {
//     // a × b = |a| |b| sin(θ) n
//     return (
//         getMagnitude(vector) * getMagnitude(otherVector) *
//         Math.sin(angleBetween(vector, otherVector))

// |a| is the magnitude (length) of vector a
// |b| is the magnitude (length) of vector b
// θ is the angle between a and b
// n is the unit vector at right angles to both a and b
// }




// TODO: understand intuition here
function getIntersection(line, otherLine) {
    const bx = line.end.x - line.start.x;
    const by = line.end.y - line.start.y;
    const dx = otherLine.end.x - otherLine.start.x;
    const dy = otherLine.end.y - otherLine.start.y;

    const b_dot_d_perp = bx * dy - by * dx;

    if (b_dot_d_perp === 0) {
        return null;
    }

    const cx = otherLine.start.x - line.start.x;
    const cy = otherLine.start.y - line.start.y;

    const t = (cx * dy - cy * dx) / b_dot_d_perp;
    if (t < 0 || t > 1) {
        return null;
    }

    const u = (cx * by - cy * bx) / b_dot_d_perp;
    if (u < 0 || u > 1) {
        return null;
    }

    return {
        x: line.start.x+t*bx,
        y: line.start.y+t*by,
    };
}

function distanceBetween(vector, otherVector) {
    return subtract(vector, otherVector);
}
