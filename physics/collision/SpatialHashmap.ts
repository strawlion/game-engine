// TODO: separation of concerns, Hashmap shouldnt know all shapes, use points

import Vector from '../Vector';
import { clamp } from 'lodash';
import Body from '../body/Body';
import Circle from '../body/Circle';
import Rectangle from '../body/Rectangle';

// TODO: Store points up front so don't need to be recomputed each frame
const Shape = {
    circle: {
        getEnclosingRect: getSmallestEnclosingRect,
    },
    rectangle: {
        getEnclosingRect: v => v,
    }
};

export default class SpatialHashmap {
    config: SpatialHashmapConfig;
    grid: MapCell[][];

    constructor(config: SpatialHashmapConfig) {
        this.config = config;

        const grid = [];
        for (let i = 0; i < config.cellSize; i++) {
            grid.push([])
            for (let j = 0; j < config.cellSize; j++) {
                grid[i][j] = {
                    id: `${i},${j}`,
                    objects: [],
                };
            }
        }
        this.grid = grid;
    }

    // TODO: optimize
    add(object: MapObject) {

        // @ts-ignore
        const enclosingRect: Rectangle = Shape[object.body.type].getEnclosingRect(object.body);
        const rectPoints = getRectPoints(enclosingRect);

        const [minCellX, minCellY] = getCellId(this.config, rectPoints.topLeft);
        const [maxCellX, maxCellY] = getCellId(this.config, rectPoints.bottomRight);

        for (let x = minCellX; x <= maxCellX; x++) {
            for (let y = minCellY; y <= maxCellY; y++) {
                this.grid[x][y].objects.push(object)
            }
        }
    }

    forEachCell(doSomething: (cell: MapCell) => any) {
        for (const row of this.grid) {
            for (const cell of row) {
                doSomething(cell);
            }
        }
    }

    mapCell<T>(transformFn: (cell: MapCell) => T): T[] {
        const mappingResult = [];
        this.forEachCell(cell => {
            mappingResult.push(transformFn(cell));
        });
        return mappingResult;
    }

    filterCell<T>(shouldIncludeFn: (cell: MapCell) => T): MapCell[] {
        const mappingResult = [];
        this.forEachCell(cell => {
            if (shouldIncludeFn(cell)) {
                mappingResult.push(cell);
            }
        });
        return mappingResult;
    }

}


// TODO: handle out of bounds.
// TODO: Off by one?
function getCellId(config: SpatialHashmapConfig, point: Vector): [number, number] {
    const percentageThroughWidth = point.x / config.width;
    const percentageThroughHeight = point.y / config.height;
    return [
        clamp(Math.floor(percentageThroughWidth * config.cellSize), 0, config.cellSize - 1),
        clamp(Math.floor(percentageThroughHeight * config.cellSize), 0, config.cellSize - 1),
    ];
}

// TODO: These functions don't work, don't consider middle of elements
// e.g. Circle that is bigger than single cell and no outer points touch
// e.g. Middle of long rect
function getSmallestEnclosingRect(circle: Circle): Rectangle {
    const { x, y, radius } = circle;
    const left = x - radius;
    const top = y - radius;
    const right = x + radius;
    const bottom = y + radius;
    return {
        type: 'rectangle',
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
        velocity: undefined,
        rotation: undefined,
    };
}

function getRectPoints(rect: Rectangle) {
    const { x, y, width, height } = rect;
    return {
        topLeft: { x, y },
        topRight: { x: (x + width), y },
        bottomLeft: { x, y: (y + height) },
        bottomRight: { x: (x + width), y: (y + height) },
    };
}




interface SpatialHashmapConfig {
    width: number;
    height: number;
    // TODO: Rename this, represents Math.sqrt(numCells)
    cellSize: number;
}

interface MapObject {
    body: Body;
}

interface MapCell {
    id: string;
    objects: MapObject[];
}
