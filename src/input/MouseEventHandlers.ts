import MouseEventHandler from './MouseEventHandler'

export default interface MouseEventHandlers {
    onMouseDown?: MouseEventHandler;
    onMouseMove?: MouseEventHandler;
    onMouseUp?: MouseEventHandler;
}
