import Body from '../physics/Body';

export default {
    createRenderer,
};

function createRenderer(config: { width: number, height: number}) {
    const canvas = Object.assign(
        document.createElement('canvas'),
        config
    );
    const context = canvas.getContext('2d');

    return {
        view: canvas,
        nextTick,
    }

    function nextTick(bodies: Body[]) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);


        for (const body of bodies) {
            context.beginPath();
            context.arc(body.x, body.y, body.radius, 0, 2 * Math.PI);
            context.lineWidth = 1;
            context.strokeStyle = '#999';
            context.stroke();
        }


    }

}
