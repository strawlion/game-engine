import v from './vectorUtils';

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
    console.log(points)

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
    const line = getRandomLine();
    const perpendicular = v.getPerpendicular(line.unitVector);

    const wallVolatility = 20;
    const smoothness = 9;
    return {
        points: line.points.map(p => {
            return v.add(
                p,
                v.multiply(
                    perpendicular,
                    // (random() < .5 ? -1 : 1) *
                    noise(p.x / smoothness) * wallVolatility
                )
            )
        }),
    };
}

function getRandomLine() {
    const start = getRandomPoint();
    const end = getRandomPoint();
    const startEndVector = v.subtract(start, end);
    const startEndVectorLength = v.getMagnitude(startEndVector)
    const unitVector = v.divide(startEndVector, startEndVectorLength);

    const numPointsToSample = 100;
    const sampledSegmentLength = startEndVectorLength / numPointsToSample;
    const points = [];
    for (let i = 0; i < numPointsToSample; i++) {
        points.push(
            // TODO: Why have to use subtract here vs add?
            v.subtract(start,
                v.multiply(unitVector, sampledSegmentLength * i)
            )
        );
    }

    return {
        unitVector,
        length: startEndVectorLength,
        points,
    };
}

function getRandomPoint() {
    return {
      x: random(width),
      y: random(height)
    }
}
