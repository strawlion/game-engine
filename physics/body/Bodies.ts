import Body from './Body';

export default {
    circle,
    rectangle,
};

interface Vector {
    x: number;
    y: number;
}

function circle(config: {
        x: number;
        y: number;
        radius: number;
        velocity?: Vector;
        rotation?: number;
    }): Body {
    return {
        ...config,
        type: 'circle',
        velocity: config.velocity || { x: 0, y: 0 },
        rotation: config.rotation || 0,
    };
}

function rectangle(config: {
    x: number;
    y: number;
    width: number;
    height: number;
    velocity?: Vector;
    rotation?: number;
}): Body {
    return {
        ...config,
        type: 'rectangle',
        velocity: config.velocity || { x: 0, y: 0 },
        rotation: config.rotation || 0,
    };
}
