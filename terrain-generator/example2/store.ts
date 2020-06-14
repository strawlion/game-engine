import { createStore, Store } from 'redux';
import LayerConfig from '../src/LayerConfig';
import ModifyThresholdType from './layerFilters/ModifyThresholdType';
import UILayerConfig from './UILayerConfig';
import utils from './utils';


const Color = {
    dirtBrown: '#573B0C',
    water: '#063fb2',
};


interface State {
    layers: UILayerConfig[],
    renderConfig: {
        width: number;
        height: number;
        noMatchingLayerColor: string;
    },
    gridConfig: {
        width: number;
        height: number;
    };
}

interface AddLayerClicked {
    type: 'AddLayerClicked';
}

interface RemoveLayerClicked {
    type: 'RemoveLayerClicked';
    layerId: string;
}

interface LayerSeedChanged {
    type: 'LayerSeedChanged';
    layerId: string;
    value: string;
}

interface LayerColorChanged {
    type: 'LayerColorChanged';
    layerId: string;
    value: string;
}

interface LayerSmoothnessChanged {
    type: 'LayerSmoothnessChanged';
    layerId: string;
    value: number;
}

interface LayerThresholdChanged {
    type: 'LayerThresholdChanged';
    layerId: string;
    value: number;
}

interface GridWidthSliderChanged {
    type: 'GridWidthSliderChanged';
    value: number;
}

interface GridHeightSliderChanged {
    type: 'GridHeightSliderChanged';
    value: number;
}

// TODO: Make more granular
interface LayerFilterChanged {
    type: 'LayerFilterChanged';
    layerId: string;
    filterId: string;
    propName: string;
    value: number;
}

interface LayerFilterTypeChanged {
    type: 'LayerFilterTypeChanged';
    layerId: string;
    filterId: string;
    value: keyof typeof ModifyThresholdType;
}


type Action =   AddLayerClicked |
                RemoveLayerClicked |
                GridWidthSliderChanged |
                GridHeightSliderChanged |
                LayerSeedChanged |
                LayerColorChanged |
                LayerSmoothnessChanged |
                LayerThresholdChanged |
                LayerFilterChanged |
                LayerFilterTypeChanged;


// TODO: Add support for record

type Reducer = (state: State, action: Action) => State;

const actionToHandler: Record<Action['type'] | 'default', Reducer> = {
    AddLayerClicked: (state) => {
        return {
            ...state,
            layers: [
                ...state.layers,
                createLayer({
                    id: utils.createRandomSeed(),
                })
            ]
        };
    },
    RemoveLayerClicked: (state, action: RemoveLayerClicked) => {
        return {
            ...state,
            layers: state.layers.filter(layer => layer.id !== action.layerId)
        }
    },
    LayerSeedChanged: (state, action: LayerSeedChanged) => {
        return updateLayerValue(state, action.layerId, layer => ({ ...layer, seed: action.value }));
    },
    LayerColorChanged: (state, action: LayerColorChanged) => {
        return updateLayerValue(state, action.layerId, layer => ({ ...layer, color: action.value }));
    },
    LayerSmoothnessChanged: (state, action: LayerSmoothnessChanged) => {
        return updateLayerValue(state, action.layerId, layer => ({ ...layer, smoothness: action.value }));
    },
    LayerThresholdChanged: (state, action: LayerThresholdChanged) => {
        return updateLayerValue(state, action.layerId, layer => ({ ...layer, threshold: action.value }));
    },
    LayerFilterChanged: (state, action: LayerFilterChanged) => {
        return updateLayerValue(state, action.layerId, layer => {
            return {
                ...layer,
                filters: layer.filters.map(f => f.id === action.filterId ? ({ ...f, [action.propName]: action.value })
                                                                         : f)
            };
        })
    },

    // Add/remove changed
    LayerFilterTypeChanged: (state, action: LayerFilterTypeChanged) => {
        return null;
        // ModifyThresholdType[action.value].getDefaultConfig()
        // return updateLayerValue(state, action.layerId, layer => {
        //     return {
        //         ...layer,
        //         filters: layer.filters.map(f => f.id === action.filterId ? ({ ...f, [action.propName]: action.value })
        //                                                                  : f)
        //     };
        // })
    },
    GridWidthSliderChanged: (state, action: GridWidthSliderChanged) => {
        return {
            ...state,
            gridConfig: {
                ...state.gridConfig,
                width: action.value,
            },
        };
    },
    GridHeightSliderChanged: (state, action: GridHeightSliderChanged) => {
        return {
            ...state,
            gridConfig: {
                ...state.gridConfig,
                height: action.value,
            },
        };
    },
    default: (state): State => {
        return state || {
            renderConfig: {
                width: 600,
                height: 400,
                noMatchingLayerColor: 'black',
            },
            gridConfig: {
                width: 50,
                height: 50,
            },
            layers: [
                createLayer({
                    id: 'dirt',
                    color: Color.dirtBrown,
                }),
                createLayer({
                    id: 'originTest',
                    color: Color.water,
                }),
            ],
        };
    },
}


// TODO: Add store extension to shorten action dispatch logic
const store = createStore((state: State, action: Action) => {
    const actionHandler = actionToHandler[action.type] || actionToHandler.default;
    return actionHandler(state, action);
});

export default store;

function createLayer(options): UILayerConfig {
    return {
        id: options.id,
        seed: options.seed || utils.createRandomSeed(),
        color: options.color || utils.createRandomHex(),
        smoothness: 0.32,
        threshold: 0.38,
        filters: [],
    };
}

function updateLayerValue(state: State, layerId: string, updateLayer: (layer: UILayerConfig) => UILayerConfig): State {
    return {
        ...state,
        layers: state.layers.map(layer => {
            const isChangedLayer = layer.id === layerId;
            return isChangedLayer ? updateLayer(layer) : layer;
        })
    };
}
