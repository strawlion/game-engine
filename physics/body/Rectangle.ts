import Vector from '../Vector';

export default interface Rectangle {
    type: 'rectangle';
    x: number;
    y: number;
    width: number;
    height: number;
    velocity: Vector;
    rotation: number;
}
