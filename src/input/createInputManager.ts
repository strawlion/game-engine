import KeyEventId from './KeyEventId';
import KeyEventHandlers from './KeyEventHandler';
import MouseInfo from './MouseInfo';
import MouseEventHandler from './MouseEventHandler';
import MouseEventHandlers from './MouseEventHandlers';

export default getInputManager;

// TODO: Process events off update loop, use velocity instead of modifying x/y
// TODO: Abstract out
// TODO: Foreign key layouts?
// NOTE: Case sensitive at the moment
function getInputManager(element) {
    const keyToIsDown = {};
    const keyToKeyDownHandlers = {};
    const keyToKeyUpHandlers = {};


    const mouseInfo: MouseInfo = {
        isMouseDown: false,
        x: null,
        y: null,
    };
    const mousemoveHandlers: MouseEventHandler[] = [];
    const mousedownHandlers: MouseEventHandler[] = [];
    const mouseupHandlers: MouseEventHandler[] = [];


    // TODO: Should we set this on the input element instead?
    element.ownerDocument.addEventListener('keydown', event => {
        keyToIsDown[event.key.toLowerCase()] = true;
        callHandlers(event.key.toLowerCase(), keyToKeyDownHandlers);
    }, true);
    element.ownerDocument.addEventListener('keyup', event => {
        keyToIsDown[event.key.toLowerCase()] = false;
        callHandlers(event.key.toLowerCase(), keyToKeyUpHandlers);
    }, true);

    element.ownerDocument.addEventListener('mousedown', (event: MouseEvent) => {
        mouseInfo.isMouseDown = true;
        onMouseEvent(event, mousedownHandlers);
    }, true);

    element.ownerDocument.addEventListener('mousemove', (event: MouseEvent) => {
        mouseInfo.isMouseDown = true;
        onMouseEvent(event, mousemoveHandlers);
    }, true);

    element.ownerDocument.addEventListener('mouseup', event => {
        mouseInfo.isMouseDown = false;
        onMouseEvent(event, mouseupHandlers);
    }, true);

    const inputManager = {
        isKeyDown,
        ifKeyDown,
        onKeyDown,
        onKeyUp,
        registerKeyEvents,
        registerMouseEvents,
    };
    return inputManager;

    function registerKeyEvents(inputs: Partial<Record<KeyEventId, KeyEventHandlers>>) {
        for (const [key, value] of Object.entries(inputs)) {
            if (value.onKeyDown) {
                onKeyDown(key, value.onKeyDown);
            }
            if (value.onKeyUp) {
                onKeyUp(key, value.onKeyUp);
            }
        }
    }

    function registerMouseEvents(inputs: MouseEventHandlers) {
        if (inputs.onMouseDown) {
            mousedownHandlers.push(inputs.onMouseDown);
        }
        if (inputs.onMouseMove) {
            mousemoveHandlers.push(inputs.onMouseMove);
        }
        if (inputs.onMouseUp) {
            mouseupHandlers.push(inputs.onMouseUp);
        }
    }


    function isKeyDown(key: string) {
        return keyToIsDown[key];
    }

    // TODO: allow mapping multiple keys to same event
    // TODO: Naming, Down or press?
    function ifKeyDown(key: string, fn) {
        if (isKeyDown(key)) {
            fn();
        }
        return inputManager;
    }

    function onKeyDown(key: string, fn) {
        const eventHandlers = keyToKeyDownHandlers[key] = keyToKeyDownHandlers[key] || [];
        eventHandlers.push(fn);
        return inputManager;
    }
    function onKeyUp(key: string, fn) {
        const eventHandlers = keyToKeyUpHandlers[key] = keyToKeyUpHandlers[key] || [];
        eventHandlers.push(fn);
        return inputManager;
    }

    function callHandlers(key, handlers) {
        const eventHandlers = handlers[key] || [];
        eventHandlers.forEach(handler => handler());
    }

    function onMouseEvent(event, handlers) {
        mouseInfo.x = event.offsetX;
        mouseInfo.y = event.offsetY;
        handlers.forEach(handler => handler(mouseInfo));
    }

}
