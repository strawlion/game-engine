import Body from '../../physics/src/body/Body';
import RenderBody from '../../render/RenderBody';

export default interface GameObject {
    // TODO: use instanceof instead?
    type: string;
    body: Body;
    renderBody?: RenderBody;

    start?: () => any;
    update?: () => any;
    onCollision?: (otherObject: GameObject) => any;
}



function GameObject(value: string) {
    // this is the decorator factory
    return function(target) {
      // this is the decorator
      // do something with 'target' and 'value'...
    };
}