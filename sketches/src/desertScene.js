import utils from './utils';
import ColorPalette from './ColorPalette';
const { getRandomLine, applyNoise } = utils;
import v from './vectorUtils';
// https://www.codeproject.com/Articles/15604/Ray-casting-in-a-2D-tile-based-environment
// https://www.mathsisfun.com/algebra/vectors-cross-product.html

// TODO: Make lines look more natural
const numberOfLinesToGenerate = 15;
export default {
    setup,
    draw,
};

let groundY;
// TODO: Why are vertical lines straighter?
function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
    noLoop()
    noSmooth()
    groundY = windowHeight * .75;
}

function draw() {
    clear()
    background(ColorPalette.lightOrange);

    // TODO: to pixellate, draw small circle and transform bigger

    // Sun
    noStroke();
    fill(ColorPalette.darkOrange);
    ellipse(
        width * .85,
        height * .3,
        120
    )

    // Mountains
    const mountainY = groundY - 100;
    const mountainPoints = [
        { x: 0, y: height },
        ...applyNoise({
            line: getRandomLine({
                start: { x: 0, y: mountainY },
                end: { x: width, y: mountainY },
            }),
            smoothness: 300,
            volatility: 250,
            getShouldApplyNoise: (_, index) => index > 0,
        }).points,
        { x: width, y: height },
    ];

    noStroke()
    fill(ColorPalette.orange);
    beginShape();
    for (const { x, y } of mountainPoints) {
        vertex(x, y);
    }
    endShape(CLOSE);

    // Ground
    const groundPoints = [
        { x: 0, y: height },
        ...applyNoise({
            line: getRandomLine({
                start: { x: 0, y: groundY },
                end: { x: width, y: groundY },
            }),
            smoothness: 100,
            volatility: 50,
            getShouldApplyNoise: (_, index) => index > 0,
        }).points,
        { x: width, y: height },
    ]

    noStroke()
    fill(ColorPalette.brown);
    beginShape();
    for (const { x, y } of groundPoints) {
        vertex(x, y);
    }
    endShape(CLOSE);

    // drawLine(line);
    // rect(groundRect.x, groundRect.y, groundRect.width, groundRect.height);

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
    // TODO:
    // numBranchesPerLine
    // Use noise fn  to determine where cracks form?
    // TODO: Raycast to prevent intersection with other line

    const lines = [];
    for (let i = 0; i < numberOfLinesToGenerate; i++) {
        const prevLine = lines[i - 1];
        // const newLineStartPoint = prevLine ? prevLine.points[Math.floor(Math.random() * prevLine.points.length)]
        //                                    : getRandomPoint();
        const newLineStartPoint = getRandomPoint();
        const newLineEndPoint = getRandomPoint();
        // const candidateEndPoint = null;
        const candidateEndPoint = null;
        // getClosestIntersectingPoint(
        //     { points: [newLineStartPoint, newLineEndPoint] },
        //     lines.filter(line => line !== prevLine),
        // );
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
        stroke(ColorPalette.darkBrown)
        // strokeWeight(2)
        line(
            prevPoint.x, prevPoint.y,
            point.x, point.y,
        )
    }
}

function getRandomPoint() {
    return utils.getRandomPoint({
        x: 0,
        y: groundY,
        width,
        height: groundY + (windowHeight - groundY)
    })
}
