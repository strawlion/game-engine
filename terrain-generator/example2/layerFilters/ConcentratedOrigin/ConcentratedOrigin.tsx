import React from 'react';
import Slider from '../../Slider';
import ModifyThresholdCell from '../../../src/ModifyThresholdCell';
import store from '../../store';
import { connect } from 'react-redux';
import ConcentratedOriginConfig from './ConcentratedOriginConfig';
import ConcentratedOriginOwnProps from './ConcentratedOriginOwnProps';
import utils from '../../utils';

type ComponentStoreState = ReturnType<typeof mapStateToProps>;
type StoreState = ReturnType<typeof store.getState>;


export default {
    id: 'ConcentratedOrigin',
    settingsComponent: connect<ComponentStoreState, undefined, ConcentratedOriginOwnProps, StoreState>(
        mapStateToProps,
    )(ConcentratedOrigin),
    getDefaultConfig: (): ConcentratedOriginConfig => ({
        id: utils.createRandomSeed(),
        type: 'ConcentratedOrigin',
        originX: 0,
        originY: 0,
        intensity: 50,
    }),
    create(config: ConcentratedOriginConfig) {
        return (cell: ModifyThresholdCell, grid) => {
            const distanceFromOrigin = Math.sqrt((config.originX - cell.x) ** 2 + (config.originY - cell.y) ** 2);
            const percOfMaxDistance = distanceFromOrigin / config.intensity;
            const closenessToOrigin = 1 - percOfMaxDistance;
            return cell.threshold * closenessToOrigin;
        };
    },
};


function mapStateToProps(state: StoreState, ownProps: ConcentratedOriginOwnProps) {
    const layer = store.getState().layers.find(l => l.id === ownProps.layerId);
    return {
        layer,
        gridConfig: store.getState().gridConfig,
        filter: layer.filters.find(f => f.id === ownProps.filterId),
    };
}

function ConcentratedOrigin(props: ConcentratedOriginOwnProps & ComponentStoreState) {
    return <div>

    //         {/* const xSlider = {
    //             id: 'originX',
    //             name: 'X',
    //             type: 'Slider',
    //             min: 0,
    //             max: options.width,
    //             value: 0,
    //             step: 1,
    //             onChange: newX => {
    //                 xSlider.value = newX;
    //                 onChange(getConfig());
    //             }
    //         }; */}
             <Slider
                 name="X"
                 min={0}
                 max={props.gridConfig.width}
                 step={0.01}
                 value={props.filter.originX}
                 onChange={value => store.dispatch({ type: 'LayerSmoothnessChanged', layerId: props.layer.id, value }) }
             />
    </div>

    //         {/* const ySlider = {
    //             id: 'originY',
    //             name: 'Y',
    //             type: 'Slider',
    //             min: 0,
    //             max: options.height,
    //             value: 0,
    //             step: 1,
    //             onChange: newY => {
    //                 ySlider.value = newY;
    //                 onChange(getConfig());
    //             }
    //         }; */}
    //         {/* <Slider
    //             name="Threshold"
    //             min={0.01}
    //             max={1}
    //             step={0.01}
    //             value={props.layer.threshold}
    //             onChange={value => store.dispatch({ type: 'LayerThresholdChanged', layerId: props.layer.id, value }) }
    //         /> */}

    //     {/* const intensitySlider = {
    //         id: 'intensity',
    //         name: 'Intensity',
    //         type: 'Slider',
    //         min: 0,
    //         max: maxWorldDistance * 2,
    //         value: maxWorldDistance / 2,
    //         step: 1,
    //         onChange: newY => {
    //             intensitySlider.value = newY;
    //             onChange(getConfig());
    //         }
    //     }; */}
    // ),
    // createMetadataMapping(options, onChange) {

    //     const getConfig = () => ({
    //         intensity: intensitySlider.value,
    //         x: xSlider.value,
    //         y: ySlider.value,
    //     });


    //     const maxWorldDistance = Math.sqrt(options.width ** 2 + options.height ** 2);


    //     return {
    //         getConfig,
    //         inputs: [
    //             intensitySlider,
    //             xSlider,
    //             ySlider,
    //         ],
    //     };
    // },
}
