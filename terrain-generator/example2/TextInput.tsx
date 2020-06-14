import React from 'react';


export default function TextInput(props: {
    name: string;
    value: string;
    onChange: (value: string) => void;
}) {

    return (
        <div className="text-input">
            <label>{ props.name }</label>
            <input
                type="text"
                value={props.value}
                onChange={e => props.onChange(e.currentTarget.value)} />
        </div>
    )
}
