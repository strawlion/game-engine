import Vector from '../physics/src/Vector';
import Circle from '../physics/src/body/Circle';
import Rectangle from '../physics/src/body/Rectangle';
import Polygon from '../physics/src/body/Polygon';

// type RenderBody = ImageRenderBody;// | ShapeRenderBody;


// export default RenderBody;

export default interface ImageRenderBody {
    // type: 'image';
    image?: HTMLImageElement,
    activeFrame?: any;
    frames?: Record<string, any>;
    scale?: Vector;

    shape?: Circle | Rectangle | Polygon; // TODO: Create separate declaration for shape/rect here
    // TODO: merge color and style
    style?: {
        fill?: string;
        stroke?: string;
        lineWidth?: number;
    };
}
