import Renderer from '../../render';
import Physics from '../../physics';
import { Store } from 'vuex';
import GameObjectConfig from './GameObjectConfig';
import GameObject from './GameObject';
import getInputManager from './input/createInputManager';

export default interface Game<GameState> {
    width: number;
    height: number;
    start: () => any;
    renderer: ReturnType<typeof Renderer.createRenderer>;
    physics: typeof Physics;
    inputManager:  ReturnType<typeof getInputManager>;
    createGameObject: (config: GameObjectConfig) => GameObject;
    assetLoader: ReturnType<typeof Renderer.createAssetLoader>;
    store: Store<GameState>;
}
