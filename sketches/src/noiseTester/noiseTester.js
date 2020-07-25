// import tooloud from 'tooloud';
// const { Worley } = tooloud;
import createWorleyNoiseGen from './createWorleyNoiseGen';

// import utils from './utils';
// const { getRandomLine, applyNoise, getRandomPoint } = utils;
import { range } from 'lodash';

// import v from './vectorUtils';

export default {
    setup,
    draw,
};

// TODO: Allow toggling noise
function setup() {
    createCanvas(windowWidth, windowHeight)
    frameRate(1)
    noLoop()
}

function draw() {
    // const res = Worley.create('seed');
    // res
    clear()

    const worley = createWorleyNoiseGen({
                        seed: 123,
                    });
    const smoothness = 100;

    const points = [];
    const grid = [];
    for (const x of range(width)) {
        const col = [];
        grid.push(col);
        for (const y of range(height)) {
            const nearbyFeatures = worley.getNearbyFeaturePoints({
                x: x/smoothness,
                y: y/smoothness,
            })

            const closestPointWeight = nearbyFeatures[0].distance;
            // const result = worley.Euclidean(x/smoothness, y/smoothness, 0);
            // const [closestPointWeight, secondClosestPointWeight, thirdClosestPointWeight] = worley.Euclidean(x/smoothness, y/smoothness, 0);
            // wor
            const point = {
                id: `${x},${y}`,
                x,
                y,
                value: // Crystalline
                // secondClosestPointWeight - closestPointWeight,
                // thirdClosestPointWeight - secondClosestPointWeight,

                // Bulbous
                closestPointWeight,

                // Weird
                // secondClosestPointWeight,
                // thirdClosestPointWeight,
            };
            col.push(point);
            points.push(point)
            // const [closestPointWeight, secondClosestPointWeight, thirdClosestPointWeight] = Worley.Euclidean(x, y, 0);
        }
    }

    // Experimental transforms
    // TODO: How to find and highlight local maxima
    // for (const point of points) {
    //     // // Increase distance between points and then filter
    //     // if ((point.value ** 3) < .1) {
    //     //     point.value = 0;
    //     // }
    //     // Increase distance between points and then filter
    //     point.value **= 2;
    // }
    // const minValue = points.reduce((minValue, point) => Math.min(minValue, point.value), 1);
    // const maxValue = points.reduce((maxValue, point) => Math.max(maxValue, point.value), 0);

    // traverseLocalMaximum(grid, point => {
    //     // console.log('found', point);
    //     point.value = 1
    // });

    // console.log(minValue, maxValue)
    for (let {x, y, value} of points) {
        // if (value < 1) {
        //     value = 0;
        // }
        // Higher values are more white
        stroke(Math.floor(255 * value));
        // stroke(170);
        point(x, y);
    }
}

function traverseLocalMaximum(grid, fn) {

    const visited = new Set();
    // function traverseLocalMaximumHelper(x, y) {
    //     const point = grid[x][y];

    //     const neighbors = getNeighbors(x, y, grid)
    //                         .filter(neighbor => !visited.has(neighbor.id));

    //     if (!neighbors.length) {
    //         return;
    //     }
    //     const maxNeighbor = neighbors.reduce((maxNeighbor, neighbor) => {
    //         return (!maxNeighbor || neighbor.value > maxNeighbor.value) ? neighbor : maxNeighbor;
    //     }, null);
    //     fn(point);
    //     visited.add(point.id);
    //     traverseLocalMaximumHelper(maxNeighbor.x, maxNeighbor.y)
    // }

    const numValues = grid.length * grid[0].length;
    const hillClimbStartingPoints = [];
    for (const col of grid) {
        for (const point of col) {
            if (point.value > .6) {
                hillClimbStartingPoints.push(point);
            }
        }

    }

    for (let point of hillClimbStartingPoints) {
        // let nextUnvisitedPoint;
        // for (const col of grid) {
        //     for (const point of col) {
        //         if (!visited.has(point.id)) {
        //             nextUnvisitedPoint = point;
        //             break;
        //         }
        //     }
        //     if (nextUnvisitedPoint) {
        //         break;
        //     }
        // }



        // let point = nextUnvisitedPoint;

        while (point) {
            fn(point);
            visited.add(point.id);

            const neighbors = getNeighbors(point.x, point.y, grid)
                                .filter(neighbor => !visited.has(neighbor.id));
            const maxNeighbor = neighbors.reduce((maxNeighbor, neighbor) => {
                return (!maxNeighbor || neighbor.value > maxNeighbor.value) ? neighbor : maxNeighbor;
            }, null);

            point = maxNeighbor;
        }
        // traverseLocalMaximumHelper(nextUnvisitedPoint.x, nextUnvisitedPoint.y);
    }


}

function getNeighbors(x, y, grid) {
    const offsets = [-1, 0, 1];
    const neighbors = [];
    for (const xOffset of offsets) {
        for (const yOffset of offsets) {
            const neighborX = x + xOffset;
            const neighborY = y + yOffset;
            const isSelf = xOffset == 0 && yOffset == 0;
            if (isSelf || neighborX < 0 || neighborY < 0 || neighborX >= grid.length || neighborY >= grid[0].length) {
                continue;
            }
            neighbors.push(grid[neighborX][neighborY]);
        }
    }

    return neighbors;
}

// TODO: Worley noise idea
// Randomly distribute points through grid
// for each pixel, compute distance to nearest point
// normalize distances such that 0-1 represents min-max distance of set of points closest to that point
// does this require precomputation? yes, otherwise wont know ranking


function worleyNoise() {

}