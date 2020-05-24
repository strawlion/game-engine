import Vector from './Vector';

export default interface Body {
    x: number;
    y: number;
    radius: number;
    velocity: Vector;
    rotation: number;
}
