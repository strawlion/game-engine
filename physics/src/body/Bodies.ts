import Body from './Body';
import Vector from '../Vector';
import Circle from './Circle';
import Polygon from './Polygon';

export default {
    circle,
    rectangle,
    polygon,
};

function circle(config: {
        x: number;
        y: number;
        radius: number;
        velocity?: Vector;
        rotation?: number;
        mass?: number;
    }): Circle {
    return {
        ...config,
        type: 'circle',
        velocity: config.velocity || { x: 0, y: 0 },
        rotation: config.rotation || 0,
        mass: config.mass || 0,
    };
}

function rectangle(config: {
    x: number;
    y: number;
    width: number;
    height: number;
    velocity?: Vector;
    rotation?: number;
    mass?: number;
}): Body {
    return {
        ...config,
        type: 'rectangle',
        // TODO: Should x,y/origin be object center or top left?
        // Can this be configurable?
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Origin.html
        x: config.x,// - (config.width/2),
        y: config.y,// - (config.height/2),
        velocity: config.velocity || { x: 0, y: 0 },
        rotation: config.rotation || 0,
        mass: config.mass || 0,
    };
}

function polygon(config: {
    x: number; 
    y: number;

    points: Vector[];
    velocity?: Vector;
    rotation?: number;
    mass?: number;
}): Polygon {
    return {
        ...config,
        type: 'polygon',

        velocity: config.velocity || { x: 0, y: 0 },
        rotation: config.rotation || 0,
        mass: config.mass || 0,
    };}
