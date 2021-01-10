import Body from '../physics/src/body/Body';
import RenderBody from './RenderBody';

export default interface RenderObject {
    body: Body;
    renderBody?: RenderBody;
}
