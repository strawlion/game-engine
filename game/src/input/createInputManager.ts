import KeyEventId from './KeyEventId';
import KeyEventHandlers from './KeyEventHandler';
import MouseInfo from './MouseInfo';
import MouseEventHandler from './MouseEventHandler';
import MouseEventHandlers from './MouseEventHandlers';
import Camera from '../../../render/Camera';

export default getInputManager;

interface InputManagerConfig {
    canvasElement: HTMLCanvasElement;
    camera: Camera;
}

// TODO: Process events off update loop, use velocity instead of modifying x/y
// TODO: Abstract out
// TODO: Foreign key layouts?
// NOTE: Case sensitive at the moment
function getInputManager({
    canvasElement,
    camera,
}: InputManagerConfig) {

    const keyToIsDown = {};
    const keyToKeyDownHandlers = {};
    const keyToKeyUpHandlers = {};

    const mouseInfo: MouseInfo = {
        isMouseDown: false,

        // Should we allow null?
        canvasPosition: null, 
        gamePosition: null,
    };
    const mousemoveHandlers: MouseEventHandler[] = [];
    const mousedownHandlers: MouseEventHandler[] = [];
    const mouseupHandlers: MouseEventHandler[] = [];


    // TODO: Should we set this on the input canvasElement instead?
    canvasElement.ownerDocument.addEventListener('keydown', event => {
        keyToIsDown[event.key.toLowerCase()] = true;
        callHandlers(event.key.toLowerCase(), keyToKeyDownHandlers);
    }, true);
    canvasElement.ownerDocument.addEventListener('keyup', event => {
        keyToIsDown[event.key.toLowerCase()] = false;
        callHandlers(event.key.toLowerCase(), keyToKeyUpHandlers);
    }, true);

    canvasElement.ownerDocument.addEventListener('mousedown', (event: MouseEvent) => {
        mouseInfo.isMouseDown = true;
        onMouseEvent(event, mousedownHandlers);
    }, true);

    canvasElement.ownerDocument.addEventListener('mousemove', (event: MouseEvent) => {
        mouseInfo.isMouseDown = true;
        onMouseEvent(event, mousemoveHandlers);
    }, true);

    canvasElement.ownerDocument.addEventListener('mouseup', event => {
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
        mouseInfo,
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
        
        const canvasPosition = { 
            x: event.offsetX, y: event.offsetY 
        };

        Object.assign(mouseInfo, {
            canvasPosition,
            gamePosition: { 
                x: canvasPosition.x + camera.origin.x,   
                y: canvasPosition.y + camera.origin.y,
            } // TODO: May want to clamp to edges of canvas    
        });

        handlers.forEach(handler => handler(mouseInfo));
    }

}
