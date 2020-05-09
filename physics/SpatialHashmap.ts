// TODO: separation of concerns, Hashmap shouldnt know all shapes, use points

import Vector from './Vector';

interface SpatialHashmapConfig {
    width: number;
    height: number;
    cellSize: number;
}

interface Circle {
    x: number;
    y: number;
    radius: number;
}

// TODO: assuming always circle
interface MapObject {
    body: Circle;
}

interface MapCell {
    objects: MapObject[];
}

export default class SpatialHashmap {
    config: SpatialHashmapConfig;
    grid: MapCell[][];

    constructor(config: SpatialHashmapConfig) {
        this.config = config;

        const grid = [];
        for (let i = 0; i < config.cellSize; i++) {
            grid.push([])
            for (let j = 0; j < config.cellSize; j++) {
                this.grid[i][j] = { objects: [] };
            }
        }
        this.grid = grid;
    }

    add(object: MapObject) {
        getSmallestEnclosingRectPoints(object.body)
            .map(getCellId)
            .forEach(([x, y]) => this.grid[x][y].objects.push(object));
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

function getCellId(point: Vector) {
    const { config } = this;
    const percentageThroughHeight = point.y / config.height;
    const percentageThroughWidth = point.x / config.width;

    return [
        Math.floor(percentageThroughHeight * config.cellSize),
        Math.floor(percentageThroughWidth * config.cellSize),
    ];
}

function getSmallestEnclosingRectPoints(circle: Circle): Vector[] {
    const { x, y, radius } = circle;
    return [
        // Top Left
        { x: (x + radius), y: (y + radius) },
        // Top Right
        { x: (x - radius), y: (y + radius) },
        // Bottom Left
        { x: (x - radius), y: (y - radius) },
        // Bottom Right
        { x: (x - radius), y: (y - radius) },
    ];
}
