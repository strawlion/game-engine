import utils from './utils';
const { getRandomLine, applyNoise } = utils;

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

function generateCrackLines() {
    const numberOfLinesToGenerate = 30;
    // TODO:
    // numBranchesPerLine
    // Use noise fn  to determine where cracks form?
    // TODO: Raycast to prevent intersection with other line

    const lines = [];
    for (let i = 0; i < numberOfLinesToGenerate; i++) {
        const prevLine = lines[i - 1];
        const newLineStartPoint = prevLine ? prevLine.points[Math.floor(Math.random() * prevLine.points.length)] : undefined;
        const newLine = applyNoise({
            line: getRandomLine({ start: newLineStartPoint }),
            smoothness: 15,
            volatility: 30,
            getShouldApplyNoise: (_, index) => index > 0,
        })
        lines.push(newLine);
    }
    return lines;
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

function getData() {
    ;
}
