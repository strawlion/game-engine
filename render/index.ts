import Renderer from './Renderer';
import RenderObject from './RenderObject';
import Circle from '../physics/src/body/Circle';
import Rectangle from '../physics/src/body/Rectangle';
import Polygon from '../physics/src/body/Polygon';
import Camera from './Camera';

const Shape = {
    circle: {
        render(context: CanvasRenderingContext2D, circle: Circle, style: any = {}) {
            const { stroke, fill, lineWidth } = style;
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);

            if (stroke) {
                context.lineWidth = lineWidth || 1;
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
        render(context: CanvasRenderingContext2D, rectangle: Rectangle, style: any = {}) {
            const { stroke, fill, lineWidth } = style;
            context.beginPath();
            context.rect(
                rectangle.x,
                rectangle.y,
                rectangle.width,
                rectangle.height
            );

            if (stroke) {
                context.lineWidth = lineWidth || 1;
                context.strokeStyle = stroke;
                context.stroke();
            }

            if (fill) {
                context.fillStyle = fill;
                context.fill();
            }
        }
    },
    polygon: {
        render(context: CanvasRenderingContext2D, polygon: Polygon, style: any = {}) {
            const { stroke, fill, lineWidth } = style;

            context.beginPath();
            
            for (const point of polygon.points) {
                const isFirstPoint = point === polygon.points[0]
                if (isFirstPoint) {
                    context.moveTo(polygon.x + point.x, polygon.y + point.y);
                }
                else {
                    context.lineTo(polygon.x + point.x, polygon.y + point.y);
                }
            }

            if (stroke) {
                context.lineWidth = lineWidth || 1;
                context.strokeStyle = stroke;
                context.stroke();
            }

            if (fill) {
                context.fillStyle = fill;
                context.fill();
            }
            
            context.closePath();
        }
    },
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
            urlToWhenImg[url] = new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => {
                    urlToImg[url] = img;
                    resolve(img);
                };

                img.onerror = () => {
                    reject(`Image '${url}' failed to load!`);
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


interface RenderConfig {
    width: number;
    height: number;
    camera: Camera;
}

function createRenderer(config: RenderConfig): Renderer {
    const canvas = Object.assign(
        document.createElement('canvas'),
        config
    );
    const context = canvas.getContext('2d');
    
    return {
        view: canvas,
        nextTick,
    };

    // TODO: Don't apply drawing transforms to physics body
    function nextTick(objects: RenderObject[], distanceBetweenFrames: number) {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of objects) {

            if (!object) {
                throw Error('Renderer - Invalid object in world!');
            }

            // TODO: Temp for testing
            // @ts-ignore
            if (object.type === 'background') {
                context.save();
                // How should camera play in? 
                performCameraTransform(config, context);
                const backgroundPattern = context.createPattern(object.renderBody.image, 'repeat');
                context.fillStyle = backgroundPattern;
                // TODO: Only fill visible rect
                // TODO: Draw with game coordinates

                // Transform should be applied inversely to camera, otherwise grid static
                context.fillRect(0, 0, config.width * 2, config.height * 2);
                context.restore();
                continue;
            }

            // TODO: Don't save/restore, instead use setTransform and invert; for performance reasons
            // https://stackoverflow.com/questions/38069462/html5-canvas-save-and-restore-performance
            context.save();


            // TODO: fix body/render body situation
            if (object.body) {
                performObjectTransforms(object, context);
            }

            // TODO: Don't do this for individual objects
            // Camera transform
            if (config.camera) {
                performCameraTransform(config, context);    
            }


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
                    Shape[object.renderBody.shape.type].render(context, object.renderBody.shape, object.renderBody.style);
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


// Handles rotation, scaling etc
// TODO: Should user render body rather than physics body
function performObjectTransforms(object: RenderObject, context: CanvasRenderingContext2D) {         
    // Consider rotation/scaling from center of object
    context.translate(object.body.x, object.body.y);
    context.rotate(object.body.rotation); // TODO: Separate rotation for render Object

    if (object.renderBody && object.renderBody.scale) {
        context.scale(
            object.renderBody.scale.x,
            object.renderBody.scale.y,
        )
    }

    // Reset origin
    context.translate(-object.body.x, -object.body.y);
}


function performCameraTransform(config: RenderConfig, context: CanvasRenderingContext2D) {
    context.translate(
        -config.camera.origin.x, 
        -config.camera.origin.y,
    );
}