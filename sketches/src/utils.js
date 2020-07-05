import v from './vectorUtils';

export default {
    getRandomLine,
    getRandomPoint,
    applyNoise,
}

// TODO: Allow defining width and height
function getRandomLine({
        sampleRate = 1, // How frequently to sample a point along the line. 1 means 1 per 1 unit of distance
        start = getRandomPoint(),
        end = getRandomPoint()
    } = {}) {
    if (v.equals(start, end)) {
        throw new Error('Can\'t create line with two equal points');
    }
    const vectorFromStartToEnd = v.subtract(start, end);
    const distanceBetweenStartAndEnd = v.getMagnitude(vectorFromStartToEnd)
    const unitVector = v.divide(vectorFromStartToEnd, distanceBetweenStartAndEnd);

    const numPointsToSample = Math.max(distanceBetweenStartAndEnd * sampleRate, 2);
    const sampledSegmentLength = distanceBetweenStartAndEnd / numPointsToSample;
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
        length: distanceBetweenStartAndEnd,
        points,
    };
}

function getRandomPoint() {
    return {
      x: random(width),
      y: random(height)
    }
}

function applyNoise({
    line,
    volatility = 30,
    smoothness = 9,
    getShouldApplyNoise = () => true,
} = {}) {
    const perpendicular = v.getPerpendicular(line.unitVector);
    const noise = getSeededNoiseFn();
    // TODO: generate noise between start and end, create two parallel lines
    // Make walls rough
    return {
        points: line.points.map((point, index) => {
            if (!getShouldApplyNoise(point, index)) {
                return point;
            }
            return v.add(
                point,
                v.multiply(
                    perpendicular,
                    // TODO: Issue is that all x values are same
                    // So all points get same noise value and offset by same ammount
                    // but we want output to look like hills+valley.
                    noise(index/*point.x*/ / smoothness) * volatility
                )
            )
        }),
    };
}


function getSeededNoiseFn() {
    const seed = Math.random().toFixed(10).slice(2)
    return (...args) => {
        return noise(...args, seed);
    }
}
