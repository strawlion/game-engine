import React from 'react';
import { connect } from 'react-redux'
import store from './store';
import Slider from './Slider';
import Layer from './Layer';
import TerrainPreview from './TerrainPreview';


type ComponentStoreState = ReturnType<typeof mapStateToProps>;
type StoreState = ReturnType<typeof store.getState>;

export default connect<ComponentStoreState, undefined, OwnProps, StoreState>(
    mapStateToProps,
)(TerrainBuilder);

function mapStateToProps(state: StoreState) {
    return {
        layers: state.layers,
        gridConfig: state.gridConfig
    }
}

interface OwnProps {

}

function TerrainBuilder(props: OwnProps & ComponentStoreState) {
    return (
    <div
        className="app"
        style={{
            display: 'flex',
        }}>
        <div
            className="left-column"
            style={{
                minWidth: 270,
                overflow: 'auto',
            }}>
            <div
                className="world-config"
                style={{
                    maxWidth: 250,
                    padding: 10,
                    border: '1px solid gray',
                }}>
                <div
                    className="world-header"
                    style={{
                        fontWeight: 'bold',
                    }}>World</div>
                <Slider
                    name="Width"
                    min={1}
                    max={100}
                    step={1}
                    value={props.gridConfig.width}
                    onChange={value => store.dispatch({ type: 'GridWidthSliderChanged', value })}
                />
                <Slider
                    name="Height"
                    min={1}
                    max={100}
                    step={1}
                    value={props.gridConfig.height}
                    onChange={value => store.dispatch({ type: 'GridHeightSliderChanged', value })}
                />
            </div>

            {
                props.layers.map(layer => (
                    <Layer
                        key={layer.id}
                        layer={layer} />
                ))
            }
            <button
                className="add-layer-button"
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                }}
                onClick={() => store.dispatch({ type: 'AddLayerClicked' })}
            >Add Layer</button>
        </div>
        <div
            className="right-column"
            style={{
                marginLeft: 1,
            }}>
            <TerrainPreview />
        </div>
    </div>
    );
}
