import Renderer from './Renderer';
import RenderObject from './RenderObject';


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

            // TODO: Separate rotation for render Object
            context.translate(
                // TODO: Why is this math necessary?
                object.body.x + canvas.width/2,
                object.body.y + canvas.height/2,
            );
            context.rotate(object.body.rotation);

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
                context.beginPath();
                context.arc(object.body.x, object.body.y, object.body.radius, 0, 2 * Math.PI);
                context.lineWidth = 1;
                context.strokeStyle = '#999';
                context.stroke();
            }
        }

    }

}
