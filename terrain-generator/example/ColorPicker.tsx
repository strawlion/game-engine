import React from 'react';

export default function ColorPicker(props: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
    <div className="colorpicker-container">
        <label>Color</label>
        <input
            type="color"
            value={props.value}
            onChange={event => props.onChange(event.currentTarget.value)} />

        <span>{ props.value }</span>
    </div>
    )
}
