import React from 'react';
import { connect } from 'react-redux'
import store from './store';
import Slider from './Slider';
import TextInput from './TextInput';
import ColorPicker from './ColorPicker';
import UILayerConfig from './UILayerConfig';


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

function Layer(props: OwnProps & StoreState) {
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

            {/* <div className="function-controls">
                <div className="filter-header"
                style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                }}>Filter</div>
                <select
                    onChange={algorithmChanged}>
                    <option disabled selected> -- select an option -- </option>
                    { algorithms.map(algorithm => <option key={algorithm.id}>{ algorithm.id }</option>)}
                </select> */}

                 {/* { algorithmInstance && algorithmInstance.inputs.length &&
                    <div
                        className="function-controls">
                        <component
                            v-for="input of algorithmInstance.inputs"
                            :key="input.id"
                            :is="input.type"
                            v-bind="input" />
                    </div>
                } */}

            {/* </div> */}
        </div>
    </div>
    );
}
