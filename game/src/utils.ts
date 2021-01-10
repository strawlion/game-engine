export default {
    createAnimation,
    // importImages,
};

interface CreateAnimationConfig {
    timeBetweenFrames: number;
    onFrameChanged: (frame: any) => void;
}

/**
 * 
 */
function createAnimation(frames: any[], config: CreateAnimationConfig) {
    let currentFrameIdx = 0;
    let timeoutId = null;

    // TODO: Add support for pausing etc
    // let lastFrameChangeTime = Date.now();
    scheduleNextFrameChange();

    return {
        cancel,       
    };

    function scheduleNextFrameChange() {
        timeoutId = setTimeout(doFrameChange, config.timeBetweenFrames);
    }

    function doFrameChange() {
        onFrameChanged();
        scheduleNextFrameChange();
    }

    function onFrameChanged() {
        currentFrameIdx = (currentFrameIdx + 1) % frames.length;
        config.onFrameChanged(frames[currentFrameIdx]);
    }

    function cancel() {
        clearTimeout(timeoutId);
    }
}

// function importImages(imageFolderPath) {
//     // TODO: Throw if not valid image folder
//     const imageContext = require.context(imageFolderPath, false, /\.(png|jpe?g|svg)$/)
//     return imageContext
//             .keys()
//             .reduce((imageNameToImage, imagePath) => { 
//                 imageNameToImage[imagePath.replace('./', '')] = imageContext(imagePath); 
//                 return imageNameToImage;
//             });
//   }
