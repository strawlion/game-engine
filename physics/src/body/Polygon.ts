import Vector from '../Vector';

export default interface Polygon {
    type: 'polygon';
    // defines center of polygon
    x: number; 
    y: number;

    // TODO: should points be relative to base xy? SHould there even be base xy? Seems inefficient
    points: Vector[];

    velocity: Vector;
    rotation: number;
    mass: number;
}
