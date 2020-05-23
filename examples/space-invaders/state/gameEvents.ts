import gameStore from './gameStore';
import { Game } from '../../../src';

export default {
    gameInitialized,
};

function gameInitialized(game: Game) {
    gameStore.commit('gameInitialized', game);
}
