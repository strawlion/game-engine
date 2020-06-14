import LayerConfig from '../src/LayerConfig';
import ConcentratedOriginConfig from './layerFilters/ConcentratedOrigin/ConcentratedOriginConfig';

type LayerFilter = ConcentratedOriginConfig;
export default interface UILayerConfig extends LayerConfig {
    color: string;
    filters: LayerFilter[];
    // algorithm: any;
}
