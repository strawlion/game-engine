const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const process = require('process');
const { promisify } = require('util');
const getImageSize = promisify(require('image-size'));
const find = require('find');

createSpriteSheet();


// TODO:
// 1) Support types other than png
// 2) Support animation blending
async function createSpriteSheet(options = {}) {
    options = {
        rootFolderPath: options.rootFolderPath || process.cwd(),
    };

    const imagePaths = await new Promise(resolve => find.file(/\.png$/, options.rootFolderPath, resolve));

    // Note: Assuming one level deep for now                
    const animations = await getAnimations(imagePaths, options.rootFolderPath);
    const imageMergeDefs = animations.map(a => (
                                a.frames.map(f => ({
                                    src: f.absolutePath,
                                    x: f.x,
                                    y: f.y,
                                })
                            )))
                            .flat();

    const base64Sheet = await mergeImages( 
                            imageMergeDefs, 
                            {
                                Canvas,
                                Image,
                                width: Math.max(...animations.map(a => a.width)),
                                height: animations.reduce((sheetHeight, animation) => sheetHeight + animation.height, 0),
                            }
                        );
    
    return base64Sheet;
}


async function getAnimations(imagePaths, rootFolderPath) {
    // TODO: Throw if frame order can't be determined

    const animationToFrames = {};
    for (const imagePath of imagePaths) {
        const relativeImagePath = imagePath.replace(rootFolderPath, '');
        const [animationName, imageName] = relativeImagePath.split('/');
        animationToFrames[animationName] = animationToFrames[animationName] || [];
        const { width, height } = await getImageSize(imagePath); // TODO: parallelize

        const [_, frameIndex] = imageName.split('-').map(v => parseInt(v)); // TODO: Handle other formats. Defaulting to aseprite one for now
        if (frameIndex == null) {
            throw new Error(`Frame index could not be parsed for: ${relativeImagePath}`);
        }

        animationToFrames[animationName].push({
            frameId: relativeImagePath,
            frameIndex,
            width,
            height,
            absolutePath: imagePath,
            relativePath: relativeImagePath,
        });
    }

    // Set spritesheet x,y values
    let yOffset = 0;
    for (const frames of Object.values(animationToFrames)) {
        let xOffset = 0;
        for (const frame of frames) {
            // TODO: should this be relative to animation offset?
            Object.assign(frame, {
                x: xOffset,
                y: yOffset,
            });
            xOffset += frame.width;
        }
        yOffset += Math.max(...frames.map(f => f.height));
    }
    
    return Object.entries(animationToFrames)
                .map(([animationName, frames]) => ({ 
                    name: animationName, 
                    frames,
                    x: frames[0].x,
                    y: frames[0].y,
                    width: frames.reduce((width, f) => width + f.width, 0),
                    height: Math.max(...frames.map(f => f.height)),
                }));
}