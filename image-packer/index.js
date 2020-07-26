const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const process = require('process');
var { promisify } = require('util');
const getImageSize = promisify(require('image-size'));

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
    // rootFolderPath 
    const files = await new Promise(resolve => find.file(/\.png$/, options.rootFolderPath, resolve));
    console.log(await getImageSize(files[0]));
    new Image(files[0])

    // mergeImages(['./body.png', './eyes.png', './mouth.png'], {
    //     Canvas,
    //     Image,
    //   })
      
    //     .then(b64 => ...);
    //     // data:image/png;base64,iVBORw0KGgoAA...
}

