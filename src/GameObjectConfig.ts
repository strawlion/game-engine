import GameObject from './GameObject';
import Body from '../physics/body/Body';
import KeyEventHandlers from './input/KeyEventHandler';
import KeyEventId from './input/KeyEventId';
import MouseEventHandlers from './input/MouseEventHandlers';

export default interface GameObjectConfig {
    type: string;
    body: Body;
    image?: string;
    input?: {
        keys?: Partial<Record<KeyEventId, KeyEventHandlers>>;
        mouse?: MouseEventHandlers;
    };
    start?: () => void;
    update?: () => void;
    onCollision?: (otherObject: GameObject) => void;
}
