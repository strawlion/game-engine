import React from 'react';
import { connect } from 'react-redux'
import store from './store';
import Slider from './Slider';
import TextInput from './TextInput';
import ColorPicker from './ColorPicker';
import UILayerConfig from './UILayerConfig';
import ModifyThresholdType from './layerFilters/ModifyThresholdType';
import ModifyThreshold from '../src/ModifyThreshold';


export default connect<StoreState, undefined, OwnProps, ReturnType<typeof store.getState>>(
    (state): StoreState => ({
        gridConfig: state.gridConfig
    }),
)(Layer);


interface StoreState {
    gridConfig: {
        width: number;
        height: number;
    }
}

interface OwnProps {
    layer: UILayerConfig;
}

// function selectedFilterChanged(event: React.ChangeEvent<HTMLSelectElement>) {
//     const newSelectedAlgorithmId = event.currentTarget.value;
//     const algorithm = ModifyThreshold[this.selectedAlgorithmId];

//     const config = {
//         width: this.gridConfig.width,
//         height: this.gridConfig.height,
//     };

//     const algorithmInstance = algorithm.createMetadataMapping(config, notifyAlgorithmChanged);
//     this.algorithmInstance = algorithmInstance;

//     notifyAlgorithmChanged();

//     function notifyAlgorithmChanged() {
//         const modifyCellFn = (...args) => algorithm.create(algorithmInstance.getConfig())(...args);
//         self.onAlgorithmChange(modifyCellFn);
//     }
// };

function Layer(props: OwnProps & StoreState) {
    const layerFilters = Object.values(ModifyThresholdType);
    const selectedLayerFilterConfig = props.layer.filters[0];
    const selectedLayerFilter = selectedLayerFilterConfig ? layerFilters.find(l => l.id === selectedLayerFilterConfig.type) : null;
    const modifyThresholdFn: ModifyThreshold = (cell, grid) => selectedLayerFilter.create(selectedLayerFilterConfig)(cell, grid);
    return (
    <div
        className="layer-config"
        style={{
            maxWidth: 250,
            padding: 10,
            marginTop: 5,
            border: '1px solid gray',
        }}>
        <div
            className="layer-header"
            style={{
                fontWeight: 'bold',
            }}>
            <span>Layer { props.layer.id }</span>
            <button
                className="remove-layer-button"
                onClick={() => store.dispatch({ type: 'RemoveLayerClicked', layerId: props.layer.id })}
                style={{
                    float: 'right',
                }}>Remove</button>
        </div>
        <div
            className="layer-controls"
            style={{
                marginTop: 10,
            }}
            >
             <TextInput
                name="Seed"
                value={ props.layer.seed }
                onChange={value => store.dispatch({ type: 'LayerSeedChanged', layerId: props.layer.id, value })}
            />
            <ColorPicker
                value={props.layer.color}
                onChange={value => store.dispatch({ type: 'LayerColorChanged', layerId: props.layer.id, value })}
            />

            <Slider
                name="Smoothness"
                min={0.01}
                max={1}
                step={0.01}
                value={props.layer.smoothness}
                onChange={value => store.dispatch({ type: 'LayerSmoothnessChanged', layerId: props.layer.id, value }) }
            />

            <Slider
                name="Threshold"
                min={0.01}
                max={1}
                step={0.01}
                value={props.layer.threshold}
                onChange={value => store.dispatch({ type: 'LayerThresholdChanged', layerId: props.layer.id, value }) }
            />

            <div className="function-controls">
                <div className="filter-header"
                style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                }}>Filter</div>
                <select
                    // onChange={algorithmChanged}
                    >
                    <option disabled selected> -- select an option -- </option>
                    { layerFilters.map(filter => <option key={filter.id}>{ filter.id }</option>)}
                </select>

                 { selectedLayerFilter &&
                    <selectedLayerFilter.settingsComponent
                        layerId={props.layer.id}
                        filterId={selectedLayerFilter.id}
                    />
                }

            </div>
        </div>
    </div>
    );
}
