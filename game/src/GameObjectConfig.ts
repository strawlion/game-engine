import GameObject from './GameObject';
import Body from '../../physics/body/Body';
import KeyEventHandlers from './input/KeyEventHandler';
import KeyEventId from './input/KeyEventId';
import MouseEventHandlers from './input/MouseEventHandlers';
import RenderBody from '../../render/RenderBody';

export default interface GameObjectConfig {
    type: string;
    body: Body;
    image?: string;
    renderBody?: RenderBody;
    input?: {
        keys?: Partial<Record<KeyEventId, KeyEventHandlers>>;
        mouse?: MouseEventHandlers;
    };
    start?: () => void;
    update?: () => void;
    onCollision?: (otherObject: GameObject) => void;
}
