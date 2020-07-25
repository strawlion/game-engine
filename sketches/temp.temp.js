export default class Worley {
    constructor(seed = 3000) {
        this._seedValue = seed;

        this.setSeed = this.setSeed.bind(this);
        this.noise = this.noise.bind(this);
        this.Euclidean = this.Euclidean.bind(this);
        this.Manhattan = this.Manhattan.bind(this);
    }

    static d(p1, p2) {
        return [p1.x - p2.x, p1.y - p2.y];
    }

    static EuclideanDistance(p1, p2) {
        return Worley.d(p1, p2).reduce((sum, x) => sum + (x * x), 0);
    }

    static ManhattanDistance(p1, p2) {
        return Worley.d(p1, p2).reduce((sum, x) => sum + Math.abs(x), 0)
    }


    noise(input, getDistance) {
        // TODO: Can we encapsulate this random num generator?
        let lastRandom;
        let distanceArray = [9999999, 9999999, 9999999];

        // Compute square that bounds input point
        const boundingSquarePoints = [];
        for (let i = -1; i < 2; ++i) {
            for (let j = -1; j < 2; ++j) {
                boundingSquarePoints.push({
                    x: Math.floor(input.x) + i,
                    y: Math.floor(input.y) + j,
                })
            }
        }

        // Compute distances to all feature points in bounding square
        const featurePointDistances = [];
        for (const boundingSquarePoint of boundingSquarePoints) {
            lastRandom = xorshift(
                hash(
                    (boundingSquarePoint.x + this._seedValue) & 0xffffffff,
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

                const distanceToFeaturePoint = getDistance(input, featurePoint)
                insert(distanceArray, distanceToFeaturePoint);
                featurePointDistances.push({
                    featurePoint,
                    distance: distanceToFeaturePoint,
                })
            }

            // return featurePointDistances
            //         .map(v => v.distance)
            //         .sort((a, b) => a - b)
            //         .slice(0, 3)
            //         // TODO: Is this really needed?
            //         .map(x => x < 0 ? 0 : x > 1 ? 1 : x);

            const temp = distanceArray.map(x => x < 0 ? 0 : x > 1 ? 1 : x);
            // temp.features = distanceArray.features;
            return temp;
        }
    }

    setSeed(seed = 3000) {
        this._seedValue = seed;
    }

    Euclidean(x, y, z) {
        return this.noise({ x, y, z }, Worley.EuclideanDistance);
    }

    Manhattan(x, y, z) {
        return this.noise({ x, y, z }, Worley.ManhattanDistance);
    }
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

// TODO: Document
function insert(arr, value) {
    let temp;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (value > arr[i]) break;
        temp = arr[i];
        arr[i] = value;
        if (i + 1 < arr.length) arr[i + 1] = temp;
    }
}
