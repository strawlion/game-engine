export default createWorleyNoiseGen;

function createWorleyNoiseGen(options) {
    options = {
        seed: options.seed || 3000,
        getDistance: options.getDistance || getEuclideanDistance,
    };

    return {
        noise,
        getNearbyFeaturePoints,
    }

    function noise(point) {
        return getNearbyFeaturePoints(point)
                .map(v => v.distance)
                // TODO: Is this really needed? Seems arbitrary
                .map(x => x < 0 ? 0 : x > 1 ? 1 : x);
    }

    function getNearbyFeaturePoints(inputPoint) {

        // Compute square that bounds input point
        const boundingSquarePoints = [];
        for (let i = -1; i < 2; ++i) {
            for (let j = -1; j < 2; ++j) {
                boundingSquarePoints.push({
                    x: Math.floor(inputPoint.x) + i,
                    y: Math.floor(inputPoint.y) + j,
                })
            }
        }
    
        // Compute distance to nearby feature points
        // TODO: Can we encapsulate this random num generator?
        let lastRandom;
        const featurePointDistances = [];
        for (const boundingSquarePoint of boundingSquarePoints) {
            lastRandom = xorshift(
                hash(
                    (boundingSquarePoint.x + options.seed) & 0xffffffff,
                    (boundingSquarePoint.y) & 0xffffffff,
                )
            );
            const numberFeaturePoints = probLookup(lastRandom);
            for (let l = 0; l < numberFeaturePoints; ++l) {
                const featurePoint = {
                    // Compute (seeded) random offsets 
                    x: boundingSquarePoint.x + ((lastRandom = xorshift(lastRandom)) / 0x100000000),
                    y: boundingSquarePoint.y + ((lastRandom = xorshift(lastRandom)) / 0x100000000),
                };
    
                featurePointDistances.push({
                    featurePoint,
                    distance: options.getDistance(inputPoint, featurePoint),
                })
            }
        }
    
        return featurePointDistances
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 3);
    }
    
}




function getDistanceVector(p1, p2) {
    return [p1.x - p2.x, p1.y - p2.y];
}

function getEuclideanDistance(p1, p2) {
    return getDistanceVector(p1, p2).reduce((sum, x) => sum + (x * x), 0);
}

function getManhattanDistance(p1, p2) {
    return getDistanceVector(p1, p2).reduce((sum, x) => sum + Math.abs(x), 0)
}

function hash(i, j) {
    return ((((2166136261 ^ i) * 16777619) ^ j)) * 16777619 & 0xffffffff;
}

// https://en.wikipedia.org/wiki/Xorshift
function xorshift(value) {
    let x = value ^ (value >> 12);
    x = x ^ (x << 25);
    x = x ^ (x >> 27);
    return x * 2;
}

// TODO: What is this doing in layman's terms?
function probLookup(value) {
    value = value & 0xffffffff;
    if (value < 393325350) return 1;
    if (value < 1022645910) return 2;
    if (value < 1861739990) return 3;
    if (value < 2700834071) return 4;
    if (value < 3372109335) return 5;
    if (value < 3819626178) return 6;
    if (value < 4075350088) return 7;
    if (value < 4203212043) return 8;
    return 9;
}
