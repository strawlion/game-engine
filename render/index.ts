import Renderer from './Renderer';
import RenderObject from './RenderObject';


export default {
    createRenderer,
};

function createRenderer(config: { width: number, height: number}): Renderer {
    const canvas = Object.assign(
        document.createElement('canvas'),
        config
    );
    const context = canvas.getContext('2d');

    return {
        view: canvas,
        nextTick,
    }

    function nextTick(objects: RenderObject[]) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of objects) {
            context.beginPath();
            context.arc(object.body.x, object.body.y, object.body.radius, 0, 2 * Math.PI);
            context.lineWidth = 1;
            context.strokeStyle = '#999';
            context.stroke();
        }
    }

}
