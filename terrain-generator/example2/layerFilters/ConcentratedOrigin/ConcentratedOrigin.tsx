import React from 'react';
import Slider from '../../Slider';
import ModifyThresholdCell from '../../../src/ModifyThresholdCell';
import store from '../../store';
import { connect } from 'react-redux';
import ConcentratedOriginConfig from './ConcentratedOriginConfig';
import ConcentratedOriginOwnProps from './ConcentratedOriginOwnProps';

type ComponentStoreState = ReturnType<typeof mapStateToProps>;
type StoreState = ReturnType<typeof store.getState>;


export default {
    id: 'ConcentratedOrigin',
    settingsComponent: connect<ComponentStoreState, undefined, ConcentratedOriginOwnProps, StoreState>(
        mapStateToProps,
    )(ConcentratedOrigin),
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
             <Slider
                 name="X"
                 min={0}
                 max={props.gridConfig.width}
                 step={0.01}
                 value={props.filter.originX}
                 onChange={value => store.dispatch({
                     type: 'LayerFilterPropChanged',
                     layerId: props.layer.id,
                     filterId: props.filter.id,
                     propName: 'originX',
                     value,
                }) }
             />
             <Slider
                 name="Y"
                 min={0}
                 max={props.gridConfig.height}
                 step={0.01}
                 value={props.filter.originY}
                 onChange={value => store.dispatch({
                    type: 'LayerFilterPropChanged',
                    layerId: props.layer.id,
                    filterId: props.filter.id,
                    propName: 'originY',
                    value,
               }) }
             />
             <Slider
                 name="Intensity"
                 min={0}
                 max={10000}
                 step={1}
                 value={props.filter.intensity}
                 onChange={value => store.dispatch({
                    type: 'LayerFilterPropChanged',
                    layerId: props.layer.id,
                    filterId: props.filter.id,
                    propName: 'intensity',
                    value,
               }) }
             />
    </div>
}
