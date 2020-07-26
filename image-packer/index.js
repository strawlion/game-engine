const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const process = require('process');
const { promisify } = require('util');
const getImageSize = promisify(require('image-size'));
const path = require('path');

// TODO: Use maintained lib
const find = require('find');

createSpriteSheet();


async function createSpriteSheet(options = {}) {
    options = {
        rootFolderPath: options.rootFolderPath || process.cwd(),
    };

    // TODO:
    // 1) Link all related frames into one animation strips
    // 2) Support other image types
    // 3) Support logical grouping of animations
    // How to support standing still animation?
    // rootFolderPath 
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

    // TODO: Images seem to overlap in the spritesheet
    const base64Sheet = await mergeImages( 
                            imageMergeDefs, 
                            {
                                Canvas,
                                Image,
                                width: Math.max(...animations.map(a => a.width)),
                                height: animations.reduce((sheetHeight, animation) => sheetHeight + animation.height, 0),
                            }
                        );
    
    console.log(imageMergeDefs)
    console.log(base64Sheet);

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
        animationToFrames[animationName].push({
            frameId: relativeImagePath,
            frameIndex: parseInt(imageName.split('-')[imageName.split('-').length - 1]), // TODO: Handle other formats. Defaulting to aseprite one for now
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
                    width: Math.max(...frames.map(f => f.width)),
                    height: Math.max(...frames.map(f => f.height)),
                }));
}