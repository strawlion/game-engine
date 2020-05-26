import Renderer from './Renderer';
import RenderObject from './RenderObject';
import Circle from '../physics/body/Circle';
import Rectangle from '../physics/body/Rectangle';

const Shape = {
    circle: {
        render(context: CanvasRenderingContext2D, circle: Circle) {
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            context.lineWidth = 1;
            context.strokeStyle = '#999';
            context.stroke();
        }
    },
    rectangle: {
        render(context: CanvasRenderingContext2D, rectangle: Rectangle) {
            context.beginPath();
            context.rect(
                rectangle.x,
                rectangle.y,
                rectangle.width,
                rectangle.height
            );
            context.lineWidth = 1;
            context.strokeStyle = '#999';
            context.stroke();
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

    function nextTick(objects: RenderObject[]) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of objects) {
            context.save();

            // TODO: Separate rotation for render Object
            context.translate(
                // TODO: Why is this math necessary?
                object.body.x,
                object.body.y,
            );
            context.rotate(object.body.rotation);
            context.translate(
                // TODO: Why is this math necessary?
                -1 * object.body.x,
                -1 * object.body.y,
            );

            if (object.renderBody) {
                const widthOffset = object.renderBody.image.width / 2;
                const heightOffset = object.renderBody.image.height / 2;

                context.drawImage(
                    object.renderBody.image,
                    object.body.x - widthOffset,
                    object.body.y - heightOffset,
                );

                // For testing hitbox
                drawBody();
            }
            else {
                drawBody();
            }

            context.restore();

            function drawBody() {
                // @ts-ignore
                Shape[object.body.type].render(context, object.body);
            }
        }

    }

}
