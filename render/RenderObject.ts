import Body from '../physics/body/Body';
import RenderBody from './RenderBody';

export default interface RenderObject {
    body: Body;
    renderBody?: RenderBody;
}
