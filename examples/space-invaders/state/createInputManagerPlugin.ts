// TODO: Rethink how to make this more intuitive
export default function createInputManagerPlugin() {
    return store => {
        window.document.addEventListener('keydown', event => {
            store.commit('keyDown', event.key.toLowerCase());
        });
        window.document.addEventListener('keyup', event => {
            store.commit('keyUp', event.key.toLowerCase());
        });
    }
}
