import Vector from '../../../physics/src/Vector';

export default interface MouseInfo {
    isMouseDown: boolean;
    canvasPosition?: Vector;
    gamePosition?: Vector;
}
