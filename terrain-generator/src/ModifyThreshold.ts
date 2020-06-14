import ModifyThresholdsholdCell from './ModifyThresholdCell';
interface WorldInfo {
    width: number;
    height: number;
}

type ModifyThreshold = (cell: ModifyThresholdsholdCell, grid: WorldInfo) => number;
export default ModifyThreshold;
