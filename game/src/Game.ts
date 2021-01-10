import Renderer from '../../render';
import Physics from '../../physics/src';
import GameObjectConfig from './GameObjectConfig';
import GameObject from './GameObject';
import getInputManager from './input/createInputManager';
import createTimerManager from './timer/createTimerManager';
import Camera from '../../render/Camera';

export default interface Game<GameState> {
    width: number;
    height: number;

    start: () => any;
    createGameObject: (config: GameObjectConfig) => GameObject;
    state?: GameState;

    camera: Camera;
    renderer: ReturnType<typeof Renderer.createRenderer>;
    physics: typeof Physics;
    inputManager:  ReturnType<typeof getInputManager>;
    timerManager: ReturnType<typeof createTimerManager>;
    assetLoader: ReturnType<typeof Renderer.createAssetLoader>;
}
