import Body from './Body';

export default {
    circle,
};

interface Vector {
    x: number;
    y: number;
}

 /**
 * Creates a new rigid body model with a circle hull.
 * The options parameter is an object that specifies any properties you wish to override the defaults.
 * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
 * @method circle
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @return {body} A new circle body
 */
function circle(config: {
        x: number;
        y: number;
        radius: number;
        velocity?: Vector;
        rotation?: number;
    }): Body {
    return {
        ...config,
        velocity: config.velocity || { x: 0, y: 0 },
        rotation: config.rotation || 0,
    };
}
