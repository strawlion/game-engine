import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import store from './store';
import utils from './utils';
import { createSelector } from 'reselect';
import ModifyThresholdType from './layerFilters/ModifyThresholdType';

type ComponentStoreState = ReturnType<typeof mapStateToProps>;
type StoreState = ReturnType<typeof store.getState>;

// TODO: why not rendering properly?
const generateTerrain: (state: StoreState) => ReturnType<typeof utils.generateTerrain> = createSelector(
    state => state.renderConfig,
    state => state.gridConfig,
    state => state.layers,
    state => state.renderConfig.noMatchingLayerColor,
    (renderConfig, gridConfig, layers, noMatchingLayerColor) => {
        const formattedLayers = layers.map(l => ({
            ...l,
            modifyThresholdFns: l.filters.map(f => ModifyThresholdType.ConcentratedOrigin.create(f))
        }));
        return utils.generateTerrain(renderConfig, {
            ...gridConfig,
            layers: formattedLayers,
            noMatchingLayerColor,
        })
    }
);

export default connect<ComponentStoreState, undefined, OwnProps, StoreState>(
    mapStateToProps,
)(TerrainPreview);


function mapStateToProps(state: StoreState) {
    return {
        renderConfig: state.renderConfig,
        // gridConfig: state.gridConfig,
        terrainBlocks: generateTerrain(state),
    }
}

interface OwnProps {
}

function TerrainPreview(props: OwnProps & ComponentStoreState) {
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fillRect(0, 0, props.renderConfig.width, props.renderConfig.height);

        for (const block of props.terrainBlocks) {
            context.beginPath();
            context.rect(
                block.x,
                block.y,
                block.width + 1, // Fudge to prevent gaps
                block.height + 1,
            );

            context.fillStyle = block.color;
            context.fill();
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={props.renderConfig.width}
            height={props.renderConfig.height}>
        </canvas>
    );
}
