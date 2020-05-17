import Body from '../physics/Body';
import RenderBody from '../render/RenderBody';

export default interface GameObject {
    // TODO: use instanceof instead?
    type: string;
    body: Body;
    renderBody?: RenderBody;
    readonly isDestroyed: boolean;

    update?: () => any;
    onCollision?: (otherObject: GameObject) => any;
    destroy: () => void;
}
