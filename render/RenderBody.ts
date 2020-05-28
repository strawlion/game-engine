import Vector from '../physics/Vector';

export default interface RenderBody {
    image: HTMLImageElement,
    activeFrame?: any;
    frames?: Record<string, any>;
    scale?: Vector;
}
