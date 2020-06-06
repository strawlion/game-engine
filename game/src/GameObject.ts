import Body from '../../physics/body/Body';
import RenderBody from '../../render/RenderBody';

export default interface GameObject {
    // TODO: use instanceof instead?
    type: string;
    body: Body;
    renderBody?: RenderBody;

    update?: () => any;
    onCollision?: (otherObject: GameObject) => any;
}
