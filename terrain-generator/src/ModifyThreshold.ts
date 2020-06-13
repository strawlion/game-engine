interface Cell {
    readonly x: number;
    readonly y: number;
    readonly threshold: number;
}

interface WorldInfo {
    width: number;
    height: number;
}

type ModifyThreshold = (cell: Cell, grid: WorldInfo) => number;
export default ModifyThreshold;
