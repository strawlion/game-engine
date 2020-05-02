import Body from './Body';

export default {
    circle,
};

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
function circle(x: number, y: number, radius: number): Body {
    return {
        x,
        y,
        radius,
    };
}
