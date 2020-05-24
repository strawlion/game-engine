import InputEventId from './InputEventId';
import InputEventHandlers from './InputEventHandler';

export default getInputManager;

// TODO: Process events off update loop, use velocity instead of modifying x/y
// TODO: Abstract out
// TODO: Foreign key layouts?
// NOTE: Case sensitive at the moment
function getInputManager(element) {
    const keyToIsDown = {};
    const keyToKeyDownHandlers = {};
    const keyToKeyUpHandlers = {};

    // TODO: Should we set this on the input element instead?
    element.ownerDocument.addEventListener('keydown', event => {
        console.log('key down event');
        keyToIsDown[event.key.toLowerCase()] = true;
        const eventHandlers = keyToKeyDownHandlers[event.key.toLowerCase()] || [];
        eventHandlers.forEach(handler => handler());
    }, true);
    element.ownerDocument.addEventListener('keyup', event => {
        keyToIsDown[event.key.toLowerCase()] = false;
        const eventHandlers = keyToKeyDownHandlers[event.key.toLowerCase()] || [];
        eventHandlers.forEach(handler => handler());
    }, true);

    const inputManager = {
        isKeyDown,
        ifKeyDown,
        onKeyDown,
        onKeyUp,
        register,
    };
    return inputManager;

    function register(inputs: Partial<Record<InputEventId, InputEventHandlers>>) {
        for (const [key, value] of Object.entries(inputs)) {
            if (value.onKeyDown) {
                onKeyDown(key, value.onKeyDown);
            }
            if (value.onKeyUp) {
                onKeyUp(key, value.onKeyUp);
            }
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
}
