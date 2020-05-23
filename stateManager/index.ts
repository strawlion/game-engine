/**
 *
 *
 */

 /*
 Flow
 Component dispatches Event => EventHandler => StateModification => StateModificationHandlers
*/

interface StateEvent {
    type: string;
}

export default {
    createStore,
};

interface CreateStoreConfig<StateStructure> {
    state: StateStructure;
    getters?: Record<string, <Result> (state: StateStructure) => Result>;
    events: Record<string, <Arg> (state: StateStructure, eventData: Arg) => void>;
}

interface Store {

}


function createStore<StateStructure>(config: CreateStoreConfig<StateStructure>): Store {
    // TODO: Instrument proxy interception
    const state = config.state;


    return {
        recordEvent,
    };

    function recordEvent<Arg>(eventName: string, eventData: Arg): void {
        const eventHandler = config.events[eventName];
        if (!eventHandler) {
            throw new Error(`Event Name: ${eventName} is invalid!`);
        }

        eventHandler<Arg>(state, eventData);
    }
}


// Flow:
// Given: (state, event)
// eventHandler(state, event) =>


// Note:
// MUST perform all state assignments at end of eventHandler

// Question: What if we want to take existing state and alter?
function removeInvader(state, event) {
    state.invaders = state.invaders.slice(1); // Removed proxied obj
    // Result: Don't rebuild proxy if object is already proxy
}


// TODO: Finish custom implementation
function createProxyTree(root) {
    if (root)
    if (Array.isArray(root)) {
        // TODO: Should we mutate passed obj instead, since we know it's
        const instrumentedArray = root.map(value => createProxyTree(value));
        return wrapInProxy(instrumentedArray);
    }
    // TODO: Set/map support
    else if (typeof root === 'object') {

        const instrumentedObj = {};
        for (const [key, value] of Object.entries(root)) {
            instrumentedObj[key] = createProxyTree(value);
        }

        return wrapInProxy(instrumentedObj);
    }

    return root;

    function wrapInProxy(obj) {
        const proxy =  new Proxy(
            obj,
            {
                set(originalObject, keyBeingSet, valueBeingSet, proxyObject) {
                    originalObject[keyBeingSet] = createProxyTree(valueBeingSet);
                    return true;
                }
            }
        );
        proxy.__observed = true;
        return proxy;
    }
}
