import React from 'react';


export default function Slider(props: {
    name: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}) {

    return (
        <div className="slider-container">
            <label className="slider-name">{ props.name }</label>
            <input
                type="range"
                className="slider"
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onChange={e => props.onChange(Number(e.currentTarget.value))}
                />
            <span className="slider-value">{ props.value }</span>
        </div>
    )
}
