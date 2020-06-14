import { createStore, Store } from 'redux';
import LayerConfig from '../src/LayerConfig';
import ModifyThresholdType from './layerFilters/ModifyThresholdType';
import UILayerConfig from './UILayerConfig';
import utils from './utils';
import { createReducer } from '@reduxjs/toolkit'
import { keyframes } from 'styled-components';


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

interface AddLayerFilterClicked {
    type: 'AddLayerFilterClicked';
    layerId: string;
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

interface LayerFilterPropChanged {
    type: 'LayerFilterPropChanged';
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
                LayerFilterPropChanged |
                LayerFilterTypeChanged |
                AddLayerFilterClicked;


// TODO: Add support for record

type Reducer = (state: State, action: Action) => void;

const actionToHandler: Record<Action['type'], Reducer> = {
    AddLayerClicked: (state) => {
        state.layers.push(
            createLayer({
                id: utils.createRandomSeed(),
            })
        );
    },
    RemoveLayerClicked: (state, action: RemoveLayerClicked) => {
        state.layers = state.layers.filter(layer => layer.id !== action.layerId)
    },
    AddLayerFilterClicked: (state, action: AddLayerFilterClicked) => {
        const layer = state.layers.find(l => l.id === action.layerId);
        const maxWorldDistance = Math.sqrt(state.gridConfig.width ** 2 + state.gridConfig.height ** 2);
        layer.filters.push({
            id: utils.createRandomSeed(),
            type: 'ConcentratedOrigin',
            originX: 0,
            originY: 0,
            intensity: Math.floor(maxWorldDistance/2),
        });
    },
    LayerSeedChanged: (state, action: LayerSeedChanged) => {
        const layer = state.layers.find(l => l.id === action.layerId);
        layer.seed = action.value;
    },
    LayerColorChanged: (state, action: LayerColorChanged) => {
        const layer = state.layers.find(l => l.id === action.layerId);
        layer.color = action.value;
    },
    LayerSmoothnessChanged: (state, action: LayerSmoothnessChanged) => {
        const layer = state.layers.find(l => l.id === action.layerId);
        layer.smoothness = action.value;
    },
    LayerThresholdChanged: (state, action: LayerThresholdChanged) => {
        const layer = state.layers.find(l => l.id === action.layerId);
        layer.threshold = action.value;
    },
    LayerFilterPropChanged: (state, action: LayerFilterPropChanged) => {
        const layer = state.layers.find(l => l.id === action.layerId);
        const filter = layer.filters.find(f => f.id === action.filterId);
        filter[action.propName] = action.value;
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
        state.gridConfig.width = action.value;
    },
    GridHeightSliderChanged: (state, action: GridHeightSliderChanged) => {
        state.gridConfig.height = action.value;
    },
}


const defaultState = {
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

const store = createStore(
    createReducer(defaultState, actionToHandler)
);

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
