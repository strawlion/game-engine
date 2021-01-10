const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const process = require('process');
const { promisify } = require('util');
const getImageSize = promisify(require('image-size'));
const find = require('find');
const fs = require('fs');

// NOTE: What is the purpose of this?
// To generate a single spritesheet and associated metadata at build time.
// All relationships between images/animations should be defined in permanent
// format ahead of time.
//
// e.g. duration between frames etc should be defined in json file that lives
// next to animation frames

// TODO: Should we use gifs etc for animation rather than individual png?
// No, because we want spritesheet


// Notes:
// - Animation/images will live next to game object class
//   And perhaps even have metadata defined in class annotation and preprocessed
// - Animation behavior defined inline in class annotation
// - 


/* Animation
{
    // Frames will be neighboring png
    type: 'Animation',
    interpolation: 'linear',
    rate: '1s',
    holdOnFrame: { 1: '2s' },

}
*/
createSpriteSheet();


// TODO:
// 1) Support types other than png
// 2) Support animation blending
// 3) Way to differentiate animation vs static image
async function createSpriteSheet(options = {}) {
    const rootFolderPath = options.rootFolderPath || process.cwd();
    options = {
        rootFolderPath,
        // outputFilename: options.outputFilename || `${rootFolderPath}/${getLastSegment(rootFolderPath)}.png`,
        outputFilename: options.outputFilename || `${rootFolderPath}/${getLastSegment(rootFolderPath)}.json`,
    };

    console.log(`Packing images in ${options.rootFolderPath}...`);

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

    const outputFile = {
        name: getLastSegment(options.outputFilename).split('.')[0],
        animations: animations.map(a => ({
            name: a.name,
            frames: a.frames.map(f => ({
                frameId: f.frameId,
                width: f.width,
                height: f.height,
                x: f.x,
                y: f.y,
            }))
        })),
        sheet: base64Sheet,
    };

    /*
    // filename Walk-0001, Walk-0002
    {
        sheetPath: './sheet.png',
        animations: [
            {
                // TODO: How to show relationships between animations? (animation stitching)
                name: 'Walk',
                frames: [
                    { Walk-0001 },
                    { Walk-0002 },
                ]
            },
            {
                name: 'Jump',
                frames: [
                    { Jump-0001 },
                ]
            },
        ]
    }
    */
    fs.writeFileSync(options.outputFilename, JSON.stringify(outputFile, null, '    '));
    // fs.writeFileSync(options.outputFilename, Buffer.from(base64Sheet.split(',')[1], 'base64'));
    console.log(`Created spritesheet ${options.outputFilename} from ${imagePaths.length} images`);
    return base64Sheet;
}

// JSON File output
/*
{
    name: "$folderName",
    frames: [
        {}
    ]
}
*/


async function getAnimations(imagePaths, rootFolderPath) {
    // TODO: Throw if frame order can't be determined

    const animationToFrames = {};
    for (const imagePath of imagePaths) {
        const relativeImagePath = imagePath.replace(rootFolderPath, '');
        const [__, imageName] = relativeImagePath.split('/');
        const [animationName] = getLastSegment(relativeImagePath).split('-'); // Assumes aseprite format of Walk-0001.png
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

function getLastSegment(path) {
    const parts = path.split('/');
    return parts[parts.length - 1];
}