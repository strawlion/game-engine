import ModifyThreshold from './ModifyThreshold';

export default interface LayerConfig {
    id: string;
    seed?: string;
    threshold: number; // 0<=n<=1 - Defines which data meets the layer criteria
    smoothness: number; // 0<=n<=Infinity - Lower numbers increase smoothness, higher numbers increase volatility
    modifyThresholdFns?: ModifyThreshold[];

    // TODO:
    // color: string;
}
