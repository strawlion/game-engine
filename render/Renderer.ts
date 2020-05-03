import Body from "../physics/Body";

export default interface Renderer {
    view: Element,
    nextTick: (bodies: Body[]) => any;
}
