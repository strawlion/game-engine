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

function createStore<T>(config: CreateStoreConfig<T>): Store {
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
