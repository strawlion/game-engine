import Camera from '../../render/Camera';
import Game from './Game';
import GameObject from './GameObject';

export default interface GameConfig<GameState> {
    width: number;
    height: number;
    container: HTMLElement,
    targetGameLogicFrameRate?: number;
    initialize?: (game: Game<GameState>) => (void | Promise<void>);
    getInitialState: (game: Game<GameState>) => GameState;
    getWorld: (state: GameState) => GameObject[];
    update?: () => void;

    // Define domains for top level, e.g. render: { camera }, lifecycle: { update }
    camera?: Camera;
}
