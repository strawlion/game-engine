import { createStore } from './stateManager';

test('do something', () => {

    const store = createStore({
        // state: {},
        // events: {},
    });

    expect(store).toBeTruthy();
});
