import RenderObject from './RenderObject';

export default interface Renderer {
    view: Element,
    nextTick: (bodies: RenderObject[], distanceBetweenFrames: number) => any;
}
