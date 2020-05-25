import Vector from '../Vector';

export default interface Circle {
    type: 'circle';
    x: number;
    y: number;
    radius: number;
    velocity: Vector;
    rotation: number;
}
