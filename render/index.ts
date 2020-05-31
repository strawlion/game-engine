import Renderer from './Renderer';
import RenderObject from './RenderObject';
import Circle from '../physics/body/Circle';
import Rectangle from '../physics/body/Rectangle';

const Shape = {
    circle: {
        render(context: CanvasRenderingContext2D, circle: Circle, color: any = {}) {
            const { stroke, fill } = color;
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);

            if (stroke) {
                context.lineWidth = 1;
                context.strokeStyle = stroke;
                context.stroke();
            }

            if (fill) {
                context.fillStyle = fill;
                context.fill();
            }
        }
    },
    rectangle: {
        render(context: CanvasRenderingContext2D, rectangle: Rectangle, color: any = {}) {
            const { stroke, fill } = color;
            context.beginPath();
            context.rect(
                rectangle.x,
                rectangle.y,
                rectangle.width,
                rectangle.height
            );

            if (stroke) {
                context.lineWidth = 1;
                context.strokeStyle = stroke;
                context.stroke();
            }

            if (fill) {
                context.fillStyle = fill;
                context.fill();
            }
        }
    }
}

export default {
    createAssetLoader,
    createRenderer,
};

interface AssetLoader {
    load: (url: string) => Promise<HTMLImageElement>;
    get: (url: string) => HTMLImageElement;
}

function createAssetLoader(): AssetLoader {
    const urlToWhenImg = {};
    const urlToImg = {};

    return {
        load,
        get,
    };

    async function load(url) {
        if (!urlToWhenImg[url]) {
            urlToWhenImg[url] = new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    urlToImg[url] = img;
                    resolve(img);
                };
                img.src = url;
            });
        }

        return urlToWhenImg[url];
    }

    function get(url) {
        if (!urlToImg[url]) {
            throw new Error(`Asset: ${url} does not exist or has not finished loading.`);
        }
        return urlToImg[url];
    }
}




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

    // TODO: Don't apply drawing transforms to physics body
    function nextTick(objects: RenderObject[]) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of objects) {

            if (!object) {
                throw Error('Renderer - Invalid object in world!');
            }

            context.save();


            // TODO: Separate rotation for render Object
            context.translate(
                // TODO: Why is this math necessary?
                object.body.x,
                object.body.y,
            );
            context.rotate(object.body.rotation);

            if (object.renderBody && object.renderBody.scale) {
                context.scale(
                    object.renderBody.scale.x,
                    object.renderBody.scale.y,
                )
            }
            context.translate(
                // TODO: Why is this math necessary?
                -1 * object.body.x,
                -1 * object.body.y,
            );


            if (object.renderBody) {

                if (object.renderBody.image) {
                    // TODO: This should be general case
                    if (object.renderBody.activeFrame) {
                        const frame = object.renderBody.frames[object.renderBody.activeFrame];
                        const widthOffset = frame.width / 2;
                        const heightOffset = frame.height / 2;
                        context.drawImage(
                            object.renderBody.image, // Full image - Could be spritesheet
                            frame.x, // Source X
                            frame.y, // Source Y
                            frame.width, // Source width
                            frame.height, // Source height
                            object.body.x - widthOffset, // Destination X
                            object.body.y - heightOffset, // Destination Y
                            frame.width, // Destination width
                            frame.height, // destination height
                        );
                    }
                    else {
                        const widthOffset = object.renderBody.image.width / 2;
                        const heightOffset = object.renderBody.image.height / 2;
                        // TODO: deprecated
                        context.drawImage(
                            object.renderBody.image, // Full image - Could be spritesheet
                            0, // Source X
                            0, // Source Y
                            object.renderBody.image.width, // Source width
                            object.renderBody.image.height, // Source height
                            object.body.x - widthOffset, // Destination X
                            object.body.y - heightOffset, // Destination Y
                            object.renderBody.image.width, // Destination width
                            object.renderBody.image.height, // destination height
                        );

                    }

                    // For testing hitbox - temp
                    drawBody();
                }

                if (object.renderBody.shape) {
                    // TODO: render body should be relative to physics body origin, not separate coords
                    // @ts-ignore
                    Shape[object.renderBody.shape.type].render(context, object.renderBody.shape, object.renderBody.color);
                }



            }
            else {
                drawBody();
            }

            context.restore();

            function drawBody() {
                // @ts-ignore
                Shape[object.body.type].render(context, object.body, { stroke: '#999' });
            }
        }

    }

}
