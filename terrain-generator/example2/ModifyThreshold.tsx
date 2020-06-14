import React from 'react';
import Slider from './Slider';

export default {
    ConcentratedOrigin: {
        id: 'ConcentratedOrigin',
        controls: (
            <div>

                {/* const xSlider = {
                    id: 'originX',
                    name: 'X',
                    type: 'Slider',
                    min: 0,
                    max: options.width,
                    value: 0,
                    step: 1,
                    onChange: newX => {
                        xSlider.value = newX;
                        onChange(getConfig());
                    }
                }; */}
                {/* <Slider
                    name="Smoothness"
                    min={0}
                    max={1}
                    step={0.01}
                    value={props.layer.smoothness}
                    onChange={value => store.dispatch({ type: 'LayerSmoothnessChanged', layerId: props.layer.id, value }) }
                /> */}


                {/* const ySlider = {
                    id: 'originY',
                    name: 'Y',
                    type: 'Slider',
                    min: 0,
                    max: options.height,
                    value: 0,
                    step: 1,
                    onChange: newY => {
                        ySlider.value = newY;
                        onChange(getConfig());
                    }
                }; */}
                {/* <Slider
                    name="Threshold"
                    min={0.01}
                    max={1}
                    step={0.01}
                    value={props.layer.threshold}
                    onChange={value => store.dispatch({ type: 'LayerThresholdChanged', layerId: props.layer.id, value }) }
                /> */}

            {/* const intensitySlider = {
                id: 'intensity',
                name: 'Intensity',
                type: 'Slider',
                min: 0,
                max: maxWorldDistance * 2,
                value: maxWorldDistance / 2,
                step: 1,
                onChange: newY => {
                    intensitySlider.value = newY;
                    onChange(getConfig());
                }
            }; */}
            </div>
        ),
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
        create(config) {
            return (cell, grid) => {
                const distanceFromOrigin = Math.sqrt((config.x - cell.x) ** 2 + (config.y - cell.y) ** 2);
                const percOfMaxDistance = distanceFromOrigin / config.intensity;
                const closenessToOrigin = 1 - percOfMaxDistance;
                return cell.threshold * closenessToOrigin;
            };
        },
    },
};
