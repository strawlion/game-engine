import Body from '../physics/Body';
import RenderBody from './RenderBody';

export default interface RenderObject {
    body: Body;
    renderBody?: RenderBody;
}
