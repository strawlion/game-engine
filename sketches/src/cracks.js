import utils from './utils';
const { getRandomLine, applyNoise, getRandomPoint } = utils;
import v from './vectorUtils';
// https://www.codeproject.com/Articles/15604/Ray-casting-in-a-2D-tile-based-environment
// https://www.mathsisfun.com/algebra/vectors-cross-product.html
export default {
    setup,
    draw,
};

// TODO: Why are vertical lines straighter?
function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
    noiseSeed(3)
    noiseDetail(4, .5)
    // randomSeed(6)
    noLoop()
}

function draw() {
    clear()

    const crackLines = generateCrackLines();
    for (const crackLine of crackLines) {
        drawLine(crackLine);
    }



}

function getLineFromPoints(points) {
    if (points.length < 2) {
        throw new Error('Not enough points to form a line!');
    }
    return {
        start: points[0],
        end: points[points.length - 1],
    }
}

function generateCrackLines() {
    const numberOfLinesToGenerate = 30;
    // TODO:
    // numBranchesPerLine
    // Use noise fn  to determine where cracks form?
    // TODO: Raycast to prevent intersection with other line

    const lines = [];
    for (let i = 0; i < numberOfLinesToGenerate; i++) {
        const prevLine = lines[i - 1];
        const newLineStartPoint = prevLine ? prevLine.points[Math.floor(Math.random() * prevLine.points.length)] : getRandomPoint();
        const newLineEndPoint = getRandomPoint();
        // const candidateEndPoint = null;
        const candidateEndPoint = getClosestIntersectingPoint(
            { points: [newLineStartPoint, newLineEndPoint] },
            lines.filter(line => line !== prevLine),
        );
        const start = newLineStartPoint;
        const end = candidateEndPoint || newLineEndPoint;
        if (v.equals(start, end)) {
            break; // TODO: Don't break, reattempt line gen
        }
        const newLine = applyNoise({
            line: getRandomLine({
                start,
                end,
            }),
            smoothness: 15,
            volatility: 30,
            getShouldApplyNoise: (_, index) => index > 0,
        });


        lines.push(newLine);
    }


    return lines;
}

// TODO: Represent all lines as start/end
function getClosestIntersectingPoint(line, otherLines) {
    const intersectingPoints = getIntersectionPoints(line, otherLines);
    const start = intersectingPoints[0];
    return intersectingPoints.sort((point, otherPoint) => v.distanceBetween(point, start) - v.distanceBetween(otherPoint, start))[0];
}

function getIntersectionPoints(line, otherLines) {
    const start = getLineFromPoints(line.points);

    return otherLines.map(otherLine => {
        return v.getIntersection(
            start,
            getLineFromPoints(otherLine.points)
        );
    })
    .filter(v => v);
}

function drawLine({ points }) {
    for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const point = points[i];
        stroke('black')
        line(
            prevPoint.x, prevPoint.y,
            point.x, point.y,
        )
    }
}
