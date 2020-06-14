import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import store from './store';
import utils from './utils';
import { defaultMemoize } from 'reselect';

type ComponentStoreState = ReturnType<typeof mapStateToProps>;
type StoreState = ReturnType<typeof store.getState>;

const generateTerrain = defaultMemoize(utils.generateTerrain);

export default connect<ComponentStoreState, undefined, OwnProps, StoreState>(
    mapStateToProps,
)(TerrainPreview);


function mapStateToProps(state: StoreState) {
    return {
        ...state.renderConfig,
        // TODO: Don't recompute terrain on all redux changes

        terrainBlocks: generateTerrain(state.renderConfig, {
            ...state.gridConfig,
            layers: state.layers,
            noMatchingLayerColor: state.renderConfig.noMatchingLayerColor,
        }),
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
        context.fillRect(0, 0, props.width, props.height);

        for (const block of props.terrainBlocks) {
            context.beginPath();
            context.rect(
                block.x,
                block.y,
                block.width,
                block.height
            );

            context.fillStyle = block.color;
            context.fill();
        }
    });

    return (
        <canvas
            ref={canvasRef}
            width={props.width}
            height={props.height}>
        </canvas>
    );
}
