

// TODO: Have items interact with water
export default class WaterGrid {
    private grid: WaterGridCell[][];
    constructor(config: WaterGridConfig) {
        const grid: WaterGridCell[][] = [];
        for (let x = 0; x < config.width; x++) {
            grid[x] = [];
            for (let y = 0; y < config.height; y++) {
                grid[x][y] = {
                    x,
                    y,
                    type: 'air',
                };
            }
        }
        this.grid = grid;
    }

    // 1. Take the mass of the current cell and the cell below it and
    // figure out how much water the bottom cell should contain. If it
    // has less than that, remove the corresponding amount
    // from the current cell and add it to the bottom cell.

    // 2. Check the cell to the left of this one. If it has less water,
    // move over enough water to make both cells contain the same amount.

    // 3. Do the same thing for the right neighbour.

    // 4. Do the same thing as in step 1., but for the cell above the current one.
    step() {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[0].length; y++) {
                const cell = this.grid[x][y];
                const cellBelow = this.grid[x][y + 1];
                const cellToTheLeft = this.grid[x - 1][y];
                const cellToTheRight = this.grid[x + 1][y];
                if (cell.type !== 'water') {
                    continue;
                }
                const shouldPropagateWaterDown = cellBelow && cell.mass < cellBelow.mass;
                if (shouldPropagateWaterDown) {
                    // DO it
                }

                const shouldPropagateWaterToTheLeft = cellToTheLeft && cell.mass < cellToTheLeft.mass;
                if (shouldPropagateWaterToTheLeft) {
                    // DO it
                }

                const shouldPropagateWaterToTheRight = cellToTheRight && cell.mass < cellToTheRight.mass;
                if (shouldPropagateWaterToTheRight) {
                    // DO it
                }

            }
        }
    }
}


interface WaterGridConfig {
    width: number;
    height: number;
}

interface WaterGridCell {
    x: number;
    y: number;
    type: 'water' | 'ground' | 'air';
    mass?: number; // volume?
}
