import GameObject from './GameObject';
import Body from '../physics/Body';
import InputEventId from './input/InputEventId';
import InputEventHandlers from './input/InputEventHandler';

export default interface GameObjectConfig {
    type: string;
    body: Body;
    image?: string;
    input?: Partial<Record<InputEventId, InputEventHandlers>>;
    start?: () => void;
    update?: () => void;
    onCollision?: (otherObject: GameObject) => void;
}
