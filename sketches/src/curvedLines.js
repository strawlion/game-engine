import utils from './utils';
const { getRandomLine, applyNoise } = utils;

export default {
    setup,
    draw,
};

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
    const { points } = getData();

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
    return applyNoise({
        line: getRandomLine(),
        smoothness: 9,
        volatility: 30,
    });
}
