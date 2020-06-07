import Vector from './Vector';

interface Cell {
    readonly x: number;
    readonly y: number;
    readonly value: number;
}
type ModifyCellValue = ((cell: Cell, grid: { width: number, height: number }) => number);
export default ModifyCellValue;
