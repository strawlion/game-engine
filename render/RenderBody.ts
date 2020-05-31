import Vector from '../physics/Vector';
import Circle from '../physics/body/Circle';
import Rectangle from '../physics/body/Rectangle';

// type RenderBody = ImageRenderBody;// | ShapeRenderBody;


// export default RenderBody;

export default interface ImageRenderBody {
    // type: 'image';
    image?: HTMLImageElement,
    activeFrame?: any;
    frames?: Record<string, any>;
    scale?: Vector;

    shape?: Circle | Rectangle; // TODO: Create separate declaration for shape/rect here
    color?: {
        fill?: string;
        stroke?: string;
    }
}

// interface ShapeRenderBody {
//     // type: 'shape';

//     scale?: Vector;
// }
