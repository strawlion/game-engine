import Bodies from './Bodies';
import Body from './Body';

export default {
    Bodies,
    nextTick,
};


function nextTick(bodies: Body[]) {
    for (const body of bodies) {
        // Update position
        const velocity = {
            x: 0,
            y: 0,
            ...body.velocity,
        }
        body.x += velocity.x;
        body.y += velocity.y;
    }
}
